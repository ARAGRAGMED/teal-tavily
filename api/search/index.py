import os
import requests
import openai
from dotenv import load_dotenv
import datetime
import json
import re
from http.server import BaseHTTPRequestHandler

load_dotenv()
API_KEY = os.getenv('TAVILY_API_KEY')
RESULT_LIMIT = int(os.getenv('TAVILY_RESULT_LIMIT', 5))
DAYS_BACK = int(os.getenv('TAVILY_DAYS_BACK', 7))
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY

def search_tavily(query, language='en'):
    print(f"Searching Tavily for query: {query}, language: {language}, days back: {DAYS_BACK}")
    url = 'https://api.tavily.com/search'
    data = {
        'api_key': API_KEY,
        'query': query,
        'search_depth': 'basic',
        'exclude_domains': ['ocpgroup.ma'],
        'lang': language,
        'days': DAYS_BACK,
        'topic': 'news',
        'include_raw_content': False,
        'include_images': False
    }
    response = requests.post(url, json=data)
    print(f"Tavily API response status: {response.status_code}")
    return response.json()

def fetch_article_text(url):
    print(f"Extracting content from {url} using Tavily")
    extract_url = 'https://api.tavily.com/extract'
    data = {
        'api_key': API_KEY,
        'url': url
    }
    try:
        response = requests.post(extract_url, json=data, timeout=15)
        response.raise_for_status()
        extract_data = response.json()
        extracted_text = extract_data.get('content', '')[:2000]  # Truncate to 2000 chars
        print(f"Extracted content from {url}: {extracted_text[:500]}...")  # Log first 500 chars
        
        # Extract publication date from the extracted text
        date = None
        # Fallback to regex
        date_match = re.search(r'\b\d{4}-\d{2}-\d{2}\b', extracted_text)
        if date_match:
            date = date_match.group()
        # Also try other formats
        if not date:
            date_match = re.search(r'\b\d{2}/\d{2}/\d{4}\b', extracted_text)
            if date_match:
                date = date_match.group()
        if not date:
            date_match = re.search(r'\b\d{2}-\d{2}-\d{4}\b', extracted_text)
            if date_match:
                date = date_match.group()
        if date:
            print(f"Date from regex for {url}: {date}")
        
        print(f"Final extracted date from {url}: {date}")
        return extracted_text, date
    except Exception as e:
        print(f"Error extracting {url}: {e}")
        return "Error extracting article text.", None

def generate_detailed_answer(user_question, tavily_results, language='en'):
    print(f"Generating detailed answer for question: {user_question}, language: {language}")
    current_date = datetime.date.today().isoformat()
    sources = ""
    for i, r in enumerate(tavily_results, 1):
        date = r.get('date')  # First try Tavily's date
        full_text, extracted_date = fetch_article_text(r['source'])
        if full_text == "Error extracting article text.":
            # Fallback to snippet if extraction fails
            full_text = r.get('snippet', 'No content available')
            print(f"Using snippet for {r['source']} due to extraction failure")
        if not date and extracted_date:
            date = extracted_date  # Fallback to extracted date
            print(f"Using extracted date for {r['source']}: {date}")
        date_str = f" ({date})" if date else ""
        sources += f"[{i}] {r['title']}{date_str} - URL: {r['source']}: {full_text}\n\n"
    prompt = f"""
You are an expert analyst specializing in horizon scanning, weak signal detection, and emerging trend analysis. Your role is to provide insightful, forward-looking analysis based on recent web search results.

Generate a comprehensive answer to the user question, focusing on identifying weak signals and emerging trends from the provided sources.

INSTRUCTIONS:
- Write in {language}.
- Use ONLY the provided search results as your knowledge base.
- Cite insights directly with [number] references to specific sources.
- Prioritize and highlight recent sources first if publication dates are available.
- Be analytical and objective; avoid speculation beyond the data.
- Ensure all claims are supported by the sources.

Current date: {current_date}

STRUCTURE YOUR RESPONSE AS FOLLOWS:
1. **Introduction**: Provide brief context on the question and the relevance of weak signals/emerging trends.
2. **Key Weak Signals**: Identify 2-4 unusual or early-stage indicators from the sources that could signal future changes. Explain each with evidence and citation.
3. **Emerging Trends**: Connect the weak signals into 1-3 broader patterns or trends. Describe how they interconnect and their potential trajectory.
4. **Implications**: Discuss why these trends matter, including potential risks, opportunities, and strategic considerations for stakeholders.
5. **Summary**: Provide 3-4 concise bullet points recapping the most critical insights.
6. **Sources**: List all sources in markdown format: [number] [title (date)](url). Order by recency if dates are available.

User question: {user_question}

Web search results:
{sources}
"""
    print(f"OpenAI prompt: {prompt}")
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
        temperature=0.7,
    )
    answer = response.choices[0].message.content
    print(f"OpenAI response: {answer}")
    return answer

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            query = data.get('message')
            language = data.get('language', 'en')
            if not query:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No message provided'}).encode('utf-8'))
                return
            
            tavily_response = search_tavily(query, language)
            results = []
            for result in tavily_response.get('results', [])[:RESULT_LIMIT]:
                results.append({
                    'title': result.get('title', ''),
                    'snippet': result.get('content', ''),
                    'source': result.get('url', ''),
                    'date': result.get('published_date', '')
                })
            detailed_answer = generate_detailed_answer(query, results, language)
            dates = [r.get('date', '') for r in results]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'detailed_answer': detailed_answer,
                'results': results,
                'dates': dates
            }).encode('utf-8'))
        except Exception as e:
            print(f"Error: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Internal server error'}).encode('utf-8'))

    def do_GET(self):
        self.send_response(405)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'error': 'Method not allowed'}).encode('utf-8'))