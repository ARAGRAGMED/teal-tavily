# Teal AI-Powered Chatbot for Weak Signal Detection

A sophisticated web-based chatbot that leverages Tavily's search API and OpenAI's GPT-4 to detect weak signals and emerging trends from recent news articles. Built with FastAPI backend and modern vanilla JavaScript frontend.

## 🌟 Features

- **Weak Signal Detection**: Identifies early-stage indicators and emerging trends from web search results
- **Multi-language Support**: Supports English, Arabic, French, and Spanish
- **Recent News Focus**: Searches news articles from the past 7 days (configurable)
- **Structured Analysis**: Provides comprehensive reports with Introduction, Key Weak Signals, Emerging Trends, Implications, and Summary sections
- **Source Citations**: All insights are properly cited with numbered references
- **Modern UI**: Glass-morphism design with responsive layout
- **Real-time Chat**: Interactive chatbot interface with typing indicators
- **Domain Exclusion**: Automatically excludes specified domains (e.g., ocpgroup.ma)
- **Date Extraction**: Extracts and displays publication dates for sources
- **Error Handling**: Robust fallbacks for API failures

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js (for serving frontend, optional)
- Tavily API key
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARAGRAGMED/teal-tavily.git
   cd teal-tavily
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   TAVILY_API_KEY=your_tavily_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   TAVILY_RESULT_LIMIT=8
   TAVILY_DAYS_BACK=7
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   python3 -m uvicorn main:app --reload --port 5001
   ```

2. **Open the frontend**
   Visit `http://localhost:5001` in your web browser. The FastAPI server now serves both the API and the static frontend files.

## 🌐 Deployment

The application is deployed on Vercel for live access.

### Live Demo
Visit the live chatbot at: [https://teal-tavily.vercel.app](https://teal-tavily.vercel.app)

### Deploying to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   In your Vercel dashboard, add the following environment variables:
   - `TAVILY_API_KEY`
   - `OPENAI_API_KEY`
   - `TAVILY_RESULT_LIMIT` (default: 8)
   - `TAVILY_DAYS_BACK` (default: 7)

The deployment uses a hybrid setup: static frontend served by Vercel, and Python serverless functions for the API.

## 📖 Usage

1. Select your preferred language from the dropdown
2. Type your question about weak signals or emerging trends
3. The chatbot will search recent news, analyze the results, and provide a structured response

### Example Queries

- "What are the weak signals for AI adoption in healthcare?"
- "Emerging trends in renewable energy"
- "Early indicators of economic shifts in technology sector"

## 🛠 API Endpoints

### GET /
Returns a welcome message confirming the backend is running.

### POST /api/search
Main endpoint for chatbot queries.

**Request Body:**
```json
{
  "message": "Your question here",
  "language": "en"
}
```

**Response:**
```json
{
  "detailed_answer": "Structured analysis with sections...",
  "results": [...],
  "dates": [...]
}
```

## 🏗 Architecture

### Backend (FastAPI)
- **main.py**: Core application with API endpoints
- **search_tavily()**: Handles web search using Tavily API
- **fetch_article_text()**: Extracts full article content with date parsing
- **generate_detailed_answer()**: Uses OpenAI to create structured analysis

### Frontend (Vanilla JS)
- **index.html**: Main HTML structure
- **script.js**: Handles UI interactions, API calls, and markdown rendering
- **style.css**: Modern glass-morphism styling

## 🔧 Configuration

Customize behavior through environment variables:

- `TAVILY_API_KEY`: Your Tavily API key
- `OPENAI_API_KEY`: Your OpenAI API key
- `TAVILY_RESULT_LIMIT`: Number of search results (default: 8)
- `TAVILY_DAYS_BACK`: Search timeframe in days (default: 7)

## 🛡 Security

- API keys are stored in `.env` file (excluded from Git)
- CORS configured for local development
- No sensitive data logged in production

## 📊 Technologies Used

- **Backend**: FastAPI, Python
- **AI/ML**: OpenAI GPT-4, Tavily Search API
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: Showdown (markdown), python-dotenv
- **Styling**: CSS Variables, Flexbox, Glass-morphism

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Tavily](https://tavily.com/) for powerful web search API
- [OpenAI](https://openai.com/) for GPT-4 language model
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent web framework
- [Showdown](https://github.com/showdownjs/showdown) for markdown rendering

---

**Note**: This is a proof-of-concept implementation. For production use, consider adding authentication, rate limiting, and database storage for conversations.