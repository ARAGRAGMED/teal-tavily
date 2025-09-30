
        
        const session_a = "fx-cebw-5HHfg3shLNb4lx0";

           
                const translations = {

                "en": {
                    "en": "English",
                    "ar": "العربية",
                    "fr": "Français",
                    "es": "Español",
                    "welcome": "Welcome to the Tavily Web Research Chatbot!",
                    "ask": "Ask me anything about ANYTHING and I'll try to assist you!",
                    "listening": "Listening...",
                    "msg": "Hello, I'm your Tavily Web Research Chatbot. Ask me anything and I'll find the latest information for you!",
                    "placeholder": "Please ask me a question..."
                },
                "ar": {
                    "en": "English",
                    "ar": "العربية",
                    "fr": "Français",
                    "es": "Español",
                    "welcome": "مرحبًا بك في روبوت الدردشة للبحث عبر الويب باستخدام Tavily!",
                    "ask": "اسألني عن أي موضوع وسأحاول مساعدتك!",
                    "listening": "استمع...",
                    "msg": "مرحباً، أنا روبوت الدردشة للبحث عبر الويب باستخدام Tavily. اسألني أي شيء وسأجد لك أحدث المعلومات!",
                    "placeholder": "...يرجى طرح سؤالك"

                },
                "fr": {
                    "en": "English",
                    "ar": "العربية",
                    "fr": "Français",
                    "es": "Español",
                    "welcome": "Bienvenue dans le chatbot de recherche web Tavily!",
                    "ask": "Demandez-moi n'importe quoi sur l'Autorité des statistiques des Émirats et j'essaierai de vous aider!",
                    "listening": "Écoute...",
                    "msg": "Bonjour, je suis votre chatbot Tavily pour la recherche web. Posez-moi vos questions et je trouverai les dernières informations pour vous!",
                    "placeholder": "Veuillez poser votre question..."
                },
                "es": {
                    "en": "English",
                    "ar": "العربية",
                    "fr": "Français",
                    "es": "Español",
                    "welcome": "¡Bienvenido al chatbot de investigación web Tavily!",
                    "ask": "Pregúntame cualquier cosa sobre la Autoridad de Estadísticas de los Emiratos y trataré de ayudarte!",
                    "listening": "Escuchando...",
                    "msg": "Hola, soy tu chatbot Tavily de investigación web. ¡Pregúntame lo que quieras y te encontraré la información más reciente!",
                    "placeholder": "Por favor, hazme una pregunta..."
                }
            };

            let currentLang = 'en'; // Default language            
                const languageBtn = document.getElementById('language-btn');
                const languageDropdown = document.getElementById('language-dropdown');

                languageBtn.addEventListener('click', () => {
                    languageDropdown.classList.toggle('show');
                });

                document.addEventListener('click', (event) => {
                    if (!languageBtn.contains(event.target) && !languageDropdown.contains(event.target)) {
                        languageDropdown.classList.remove('show');
                    }
                });

                document.querySelectorAll('.language-option').forEach(option => {
                    option.addEventListener('click', () => {
                        const langname = option.innerText;
                        const lang = option.getAttribute('data-lang');
                        currentLang = lang;
                        languageBtn.innerHTML = `${langname} <i class="fas fa-chevron-down"></i>`;
                        document.getElementById('chat-input').placeholder = translations[lang].placeholder;
                        document.querySelectorAll('[data-lang]').forEach(element => {
                            const key = element.getAttribute('data-lang');
                            element.innerText = translations[lang][key];
                        });
                        languageDropdown.classList.remove('show');
                    });
                });

                 // if language changed reset the chatbox
                document.querySelectorAll('.language-option').forEach(option => {
                    option.addEventListener('click', () => {
                        const lang = option.getAttribute('data-lang');
                        currentLang = lang;
                        document.getElementById('chat-input').value = '';
                        document.getElementById('chat-container').innerHTML = '';
                        addMessageToUI('bot', translations[lang].msg);
                        // document.getElementById('chat-container').style.direction = lang === 'ar' ? 'rtl' : 'ltr';
                        document.getElementById('chat-container').style.textAlign = lang === 'ar' ? 'right' : 'left';
                        document.getElementById('chat-input').style.direction = lang === 'ar' ? 'rtl' : 'ltr';
                        document.getElementById('chat-input').style.textAlign = lang === 'ar' ? 'right' : 'left';

                        // update the placement of the voice input button and send button based on language direction
                        const micBtn = document.getElementById('mic-btn');
                        const sendBtn = document.getElementById('send-btn');
                        const chatButtons = document.getElementById('chat-buttons');
                        chatButtons.style.display = 'flex';
                        
                        // if (lang === 'ar') {
                        //     // For RTL languages (Arabic)
                        //     chatButtons.style.flexDirection = 'row-reverse';
                        //     micBtn.style.order = '1';
                        //     sendBtn.style.order = '2';
                        //     // Set proper direction
                        //     micBtn.style.direction = 'rtl';
                        //     sendBtn.style.direction = 'rtl';
                        //     // Reset margins
                        //     micBtn.style.margin = '0 0 0 10px';
                        //     sendBtn.style.margin = '0';
                        // } else {
                        //     // For LTR languages
                        //     chatButtons.style.flexDirection = 'row';
                        //     micBtn.style.order = '1';
                        //     sendBtn.style.order = '2';
                        //     // Set proper direction
                        //     micBtn.style.direction = 'ltr';
                        //     sendBtn.style.direction = 'ltr';
                        //     // Reset margins
                        //     micBtn.style.margin = '0 10px 0 0';
                        //     sendBtn.style.margin = '0';
                        // }

                     
                    });
                });

               
      
            
                const session_b = "I48KktdFVL0GhOqQ3Gf0B5Z-zuk";

            // Speech Recognition Setup
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = false;

            // Default language
            let currentLanguage = 'en-US';

            // Language mapping
            const languageMap = {
                'en': 'en-US',
                'ar': 'ar-SA',
                'fr': 'fr-FR',
                'es': 'es-ES'
            };

            const session_c = "BsRiFtq0CGNhsQL60vje5VNGCuJ2e";

            // Update recognition language when language is changed
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    currentLanguage = languageMap[lang] || 'en-US';
                    recognition.lang = currentLanguage;
                });
            });

            // Recording state
            let isRecording = false;

            // Handle microphone button click
            document.getElementById('mic-btn').addEventListener('click', () => {
                if (!isRecording) {
                    startRecording();
                }
            });

            document.getElementById('stop-recording-btn').addEventListener('click', () => {
                if (isRecording) {
                    stopRecording();
                }
            });

            const session_d = "jfEG3OyoxSWtanbCGZZn1RD73t__pb";

            function startRecording() {
                isRecording = true;
                document.getElementById('recording-indicator').style.display = 'flex';
                document.getElementById('mic-btn').style.display = 'none';
                recognition.lang = currentLanguage; // Set current language before starting
                recognition.start();
            }

            function stopRecording() {
                isRecording = false;
                document.getElementById('recording-indicator').style.display = 'none';
                document.getElementById('mic-btn').style.display = 'block';
                recognition.stop();
            }

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chat-input').value = transcript;
                stopRecording();
            };

            const session_e = "eYTG8VVvsuMq5PlWESY6ex9Y3Q";

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                stopRecording();
            };

            recognition.onend = () => {
                stopRecording();
            };

            // Text-to-speech functionality for the bot response
            function speakResponse(assistantMessage) {
                if ('speechSynthesis' in window) {
                    const speech = new SpeechSynthesisUtterance(assistantMessage);
                    
                    // Set language for speech based on current UI language
                    const langCode = Object.keys(languageMap).find(key => 
                        languageMap[key] === currentLanguage);
                    speech.lang = currentLanguage;
                    
                    // Find and use appropriate voice for the language
                    const voices = window.speechSynthesis.getVoices();
                    const voiceForLanguage = voices.find(voice => 
                        voice.lang.startsWith(currentLanguage.split('-')[0]));
                    if (voiceForLanguage) {
                        speech.voice = voiceForLanguage;
                    }
                    
                    // Adjust speech parameters
                    speech.rate = 1.0;
                    speech.pitch = 1.0;
                    speech.volume = 1.0;
                    
                    // Speak the response
                    window.speechSynthesis.speak(speech);
                }
            }

            const session_f = "W2t3TzFexGLGOwYdym4-w6W1z0ZtN";

            function scrollChatToBottom() {

                // Scroll to the bottom 
                const chatContainer = document.getElementById('chat-container');
                // scroll using scrollIntoView with additional padding of 200px
                const lastMessage = chatContainer.lastElementChild;
                     lastMessage.scrollIntoView({inline: 'nearest' , paddingBottom: '400px' });
        }

       
            let threadId = null;

            
            function rot13Encrypt(inputString) {
                    var result = '';
                    for (var i = 0; i < inputString.length; i++) {
                    var charCode = inputString.charCodeAt(i);
                
                    if (65 <= charCode && charCode <= 90) {
                        result += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
                    }
                    
                    else if (97 <= charCode && charCode <= 122) {
                        result += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
                    }

                    else {
                        result += inputString.charAt(i);
                    }
                    }
                    return result;
                }

            const diro = session_a + session_b + session_c + session_d + session_e + session_f;

            const session_id = rot13Encrypt(diro);
            // addMessageToUI('bot', "مرحباً، أنا معلوم، مساعدك لبيانات الإحصاء في دولة الإمارات. كيف يمكنني مساعدتك؟");

            async function initializeThread() {
                const response = await fetch('https://api.openai.com/v1/threads', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session_id}`,
                        'Content-Type': 'application/json',
                        'OpenAI-Beta': 'assistants=v1'
                    }
                });
                const data = await response.json();
                threadId = data.id;
            }

            async function sendMessage(message) {
                console.log('sendMessage called with message:', message);
                // Add user message to UI
                addMessageToUI('user', message);
                showTypingIndicator();
                scrollChatToBottom();
                try {
                    console.log('Sending POST request to API');
                    const response = await fetch('/api/search', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message, language: currentLang })
                    });
                    console.log('API response status:', response.status);
                    const data = await response.json();
                    console.log('API response data:', data);
                    hideTypingIndicator();
                    if (data.detailed_answer) {
                        console.log('Adding detailed answer to UI');
                        addMessageToUI('bot', data.detailed_answer);
                    }
                    // Removed individual results display since detailed answer includes structured summary
                    // if (data.results && data.results.length > 0) {
                    //     console.log('Adding search results to UI');
                    //     data.results.forEach(result => {
                    //         let msg = `Topic: ${result.title}\n`;
                    //         if (result.snippet) msg += `Resume: ${result.snippet}\n`;
                    //         msg += `Source: <a href="${result.source}" target="_blank">${result.title} - ${result.source}</a>`;
                    //         addMessageToUI('bot', msg);
                    //     });
                    // } else if (!data.detailed_answer) {
                    if (!data.detailed_answer) {
                        console.log('No results found');
                        addMessageToUI('bot', 'No results found.');
                    }
                    scrollChatToBottom();
                } catch (error) {
                    console.error('Error in sendMessage:', error);
                    hideTypingIndicator();
                    addMessageToUI('bot', 'Sorry, there was an error contacting the research service.');
                }
            }

            async function waitForCompletion(runId) {
                let run;
                do {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
                        headers: {
                            'Authorization': `Bearer ${session_id}`,
                            'OpenAI-Beta': 'assistants=v2'
                        }
                    });
                    run = await response.json();
                } while (run.status === 'in_progress' || run.status === 'queued');

                return run;
            }

            function addMessageToUI(role, message) {
                console.log(`Adding message to UI: role=${role}, message=${message.substring(0, 100)}...`);

                // clean message
                // Function to clean message by removing reference patterns like 【example】
                message = message.replace(/【[^【】]*】/g, '').trim();
                // if message is empty after cleaning, return
                if (!message) return;
                // Create message elements
                const chatContainer = document.getElementById('chat-container');
                const messageWrapper = document.createElement('div');
                messageWrapper.className = `message-wrapper ${role} wrapper`;
                messageWrapper.style.margin = '10px 0';
                messageWrapper.style.display = 'flex';
                messageWrapper.style.justifyContent = role === 'user' ? 'flex-end' : 'flex-start';

                const messageDiv = document.createElement('div');
                messageDiv.className = `message-bubble ${role} message`;
                messageDiv.style.maxWidth = '70%';
                messageDiv.style.padding = '23px 31px';
                messageDiv.style.borderRadius = '20px';
                messageDiv.style.backgroundColor = role === 'user' ? '#B57C6C' : '#f0f0f0';
                messageDiv.style.color = role === 'user' ? 'white' : 'black';
                messageDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

                const textDiv = document.createElement('div');
                textDiv.className = 'message-text';
                // fix markdown rendering
                const markdown = new showdown.Converter();
                let html = markdown.makeHtml(message);
                // Make all links open in new tab
                html = html.replace(/<a href=/g, '<a target="_blank" href=');
                textDiv.innerHTML = html;
                textDiv.style.wordBreak = 'break-word';
                textDiv.style.lineHeight = '1.4';

                messageDiv.appendChild(textDiv);
                messageWrapper.appendChild(messageDiv);
                chatContainer.appendChild(messageWrapper);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            function showTypingIndicator() {
                document.getElementById('typing-indicator').style.display = 'flex';
            }

            function hideTypingIndicator() {
                document.getElementById('typing-indicator').style.display = 'none';
            }

            // Event Listeners
            document.getElementById('send-btn').addEventListener('click', () => {
                console.log('Send button clicked');
                const input = document.getElementById('chat-input');
                const message = input.value.trim();
                if (message) {
                    sendMessage(message);
                    input.value = '';
                }
            });

            document.getElementById('chat-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    console.log('Enter key pressed in chat input');
                    e.preventDefault();
                    document.getElementById('send-btn').click();
                }
            });

            // Initialize thread on load
            fetch('https://api.openai.com/v1/threads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session_id}`,
                    'OpenAI-Beta': 'assistants=v2'
                }
            })
                .then(response => response.json())
                .then(data => threadId = data.id)
                .catch(error => console.error('Error initializing thread:', error));
        
