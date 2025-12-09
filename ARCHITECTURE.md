# Portfolio Architecture

## Overview

This portfolio is a **full-stack application** with a React frontend and Express.js backend, featuring an AI-powered chatbot assistant.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────┐  │  │
│  │  │  Hero   │  │  About  │  │Portfolio│  │BookConsult.  │  │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └──────────────┘  │  │
│  │                         ↕                                  │  │
│  │              ┌─────────────────────┐                       │  │
│  │              │   Chatbot Widget    │ ◄── Floating UI       │  │
│  │              │  ┌───────────────┐  │                       │  │
│  │              │  │  ChatWindow   │  │                       │  │
│  │              │  │  MessageList  │  │                       │  │
│  │              │  │  InputArea    │  │                       │  │
│  │              │  └───────────────┘  │                       │  │
│  │              └─────────────────────┘                       │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP API Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (Node.js)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  POST /api/chat              → AI conversation endpoint    │  │
│  │  POST /api/generate-requirements → Lead capture & docs     │  │
│  │  POST /api/send-email        → Email simulation            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ Groq SDK                          │
│                              ▼                                   │
│              ┌─────────────────────────┐                         │
│              │   Groq Cloud API        │                         │
│              │   (Llama 3.3-70B)       │                         │
│              └─────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Tech Stack
- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **React Router DOM 7** - Client-side routing

### Component Hierarchy

```
App.jsx
├── Routes
│   ├── "/" → HomePage
│   │   ├── Hero.jsx          # Landing section with animated background
│   │   └── About.jsx         # Biography with expertise cards
│   ├── "/portfolio" → Portfolio.jsx  # Project showcase grid
│   └── "/book" → BookConsultation.jsx  # Contact form
│
└── Chatbot.jsx               # Global floating widget (all pages)
    └── ChatWindow.jsx        # Main chat interface
        ├── MessageList.jsx   # Renders chat messages
        └── InputArea.jsx     # User text input
```

### Page Descriptions

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Hero section + About section |
| `/portfolio` | Portfolio | Project cards with tech stack & metrics |
| `/book` | BookConsultation | Hiring inquiry form |

---

## Chatbot Architecture

### Flow Diagram

```
User Opens Chat
       │
       ▼
┌──────────────────┐
│  Initial Message │  "Hey there! 👋 I'm Vaibhav's AI assistant..."
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Quick Actions   │  [💼 Experience] [🚀 Projects] [🛠️ Skills] [📧 Contact]
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User Message    │  (typed or quick action selected)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────────┐
│  callGroqAPI()   │────▶│  POST /api/chat     │
└────────┬─────────┘     │  {messages, session}│
         │               └─────────────────────┘
         │                        │
         │◄───────────────────────┘
         ▼
┌──────────────────┐
│  Bot Response    │
└────────┬─────────┘
         │
         ▼ (if contact-related keywords detected)
┌──────────────────┐
│  Contact Form    │  [Name] [Email] [Phone]
│  Overlay         │  [Later] [Send Details ✨]
└────────┬─────────┘
         │ (on submit)
         ▼
┌──────────────────┐     ┌──────────────────────────┐
│ handleContact    │────▶│ POST /api/generate-      │
│ Submit()         │     │ requirements             │
└──────────────────┘     │ {messages, contactInfo}  │
                         └──────────────────────────┘
```

### Key Components

#### `Chatbot.jsx`
- **State**: `isOpen` (boolean)
- **Renders**: Floating action button (FAB) or ChatWindow
- **Purpose**: Toggle visibility of chat interface

#### `ChatWindow.jsx`
- **States**:
  - `messages[]` - Chat history
  - `isTyping` - Loading indicator
  - `showQuickActions` - Show/hide action buttons
  - `showContactForm` - Show/hide lead capture form
  - `contactInfo` - Form data {name, email, phone}
  - `sessionId` - Unique session identifier

- **Key Functions**:
  - `callGroqAPI(text)` - Sends message to backend
  - `handleUserMessage(text)` - Processes user input
  - `handleQuickAction(action)` - Converts action to message
  - `handleContactSubmit(e)` - Submits lead with requirements doc
  - `checkForContactPrompt(text)` - Detects if AI is asking for contact info

---

## Backend Architecture

### Server Configuration (`server.js`)

```javascript
Express Server (port 3000)
├── Middleware
│   ├── cors()           # Cross-origin requests
│   └── express.json()   # JSON body parsing
│
├── Groq SDK Client
│   └── Model: llama-3.3-70b-versatile
│
└── Endpoints
    ├── POST /api/chat
    ├── POST /api/generate-requirements
    └── POST /api/send-email
```

### API Endpoints

#### `POST /api/chat`
Main conversation endpoint for the chatbot.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What are Vaibhav's skills?"}
  ],
  "sessionId": "session_1702156800000"
}
```

**Response:**
```json
{
  "response": "Vaibhav specializes in AI/ML with expertise in..."
}
```

**System Prompt Includes:**
- Complete biography
- Work experience (3 companies)
- Key projects (3 major projects)
- Technical skills
- Response rules (concise, professional, 1 emoji max)

---

#### `POST /api/generate-requirements`
Generates a structured requirements document from the conversation.

**Request:**
```json
{
  "messages": [...conversationHistory],
  "contactInfo": {
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1234567890"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Requirements document generated and email sent!",
  "requirements": "1. CLIENT INFORMATION\n..."
}
```

**Generated Document Sections:**
1. Client Information
2. Project Overview
3. Selected Service(s)
4. Detailed Requirements
5. Target Users
6. Expected Outcomes
7. Timeline & Urgency
8. Budget Range
9. Additional Notes

---

#### `POST /api/send-email`
Email simulation endpoint (logs to console in development).

---

## Data Flow

### Chat Message Flow
```
User Input → Frontend State → API Request → Groq LLM → API Response → Update State → Render
```

### Lead Capture Flow
```
Contact Form Submit
       ↓
Compose message with contact info
       ↓
Send to /api/generate-requirements
       ↓
Groq LLM generates requirements doc
       ↓
Log to console (future: send email)
       ↓
Confirmation message to user
```

---

## File Structure Deep Dive

```
Portfolio/
│
├── public/
│   └── Vaibhav_Gupta_OnePage_Final.pdf   # Downloadable resume
│
├── src/
│   ├── assets/
│   │   └── vaibhav.jpg                   # Profile photo
│   │
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.jsx                  # Animated landing section
│   │   │   └── Hero.css                  # Gradient orbs, particles
│   │   │
│   │   ├── About/
│   │   │   ├── About.jsx                 # Bio + expertise cards
│   │   │   └── About.css                 # Glassmorphism styling
│   │   │
│   │   └── Chatbot/
│   │       ├── Chatbot.jsx               # FAB container
│   │       ├── Chatbot.css               # Widget styling
│   │       ├── ChatWindow.jsx            # Main chat logic
│   │       ├── MessageList.jsx           # Message rendering
│   │       └── InputArea.jsx             # Text input component
│   │
│   ├── pages/
│   │   ├── Portfolio.jsx                 # Project cards
│   │   ├── Portfolio.css
│   │   ├── BookConsultation.jsx          # Contact form
│   │   └── BookConsultation.css
│   │
│   ├── App.jsx                           # Routes configuration
│   ├── main.jsx                          # React DOM render
│   └── index.css                         # Global CSS variables
│
├── Resume/
│   └── Resume.py                         # PDF generator (fpdf)
│
├── server.js                             # Express + Groq backend
├── package.json                          # Dependencies
├── vite.config.js                        # Vite configuration
└── .env                                  # GROQ_API_KEY
```

---

## Security Considerations

1. **API Key**: Stored in `.env`, never committed to git
2. **CORS**: Enabled for development; restrict in production
3. **Input Validation**: Email format checked before submission
4. **Session Management**: In-memory (use Redis/DB in production)

---

## Future Enhancements

- [ ] Persistent chat history (Firebase/MongoDB)
- [ ] Email integration (SendGrid/Nodemailer)
- [ ] Analytics tracking
- [ ] Rate limiting on API endpoints
- [ ] WebSocket for real-time typing indicators
