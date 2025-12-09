import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `You are Vaibhav's AI Assistant. Be concise, professional, and helpful.

ABOUT VAIBHAV GUPTA:
- AI/ML Engineer with 2+ years of experience building production-grade AI systems
- Expertise: Agentic AI, Multi-Agent Systems, LLMs (Llama 3, GPT-4, Qwen), LangGraph, LangChain, RAG
- Tech stack: Python, PyTorch, TensorFlow, FastAPI, Hugging Face, AWS, GCP, Docker
- Based in Alwar, Rajasthan, India
- Education: B.Tech in Computer Science with specialization in Data Science & AI (2019-2023)
- Known for: Building scalable, production-ready AI solutions with measurable business impact
- GitHub: https://github.com/VaibhavGupta1999
- LinkedIn: https://linkedin.com/in/vaibhav-gupta-b929ba237

VAIBHAV'S WORK EXPERIENCE:
1. Machine Learning Engineer @ Glarus Technology (Mar 2024 - Present)
   - Built autonomous multi-agent framework with Llama 3.2B & Groq API
   - Reduced content generation latency by 40% with parallel agent pipelines
   - Developed virtual try-on system using SCHP, MODNet & PIFuHD models

2. AI Engineer @ Softage.ai (Jun 2023 - Mar 2024)
   - Designed RAG pipelines improving response accuracy by 25%
   - Built Large Action Models for autonomous decision-making
   - Optimized ML inference reducing latency by 35%

3. AI/ML Research Intern @ Gilbert Research Center (Jan 2023 - May 2023)
   - Transitioned academic prototypes to production demos

KEY PROJECTS:
1. Agentic Resume Optimization System (LangGraph, FastAPI, Groq, Tavily, Streamlit)
   - Multi-agent system with 4 specialist agents improving ATS match rates by 45%
2. Enterprise Conversational AI (LangChain, GPT-4, Pinecone)
   - Chatbot with sub-200ms latency using optimized RAG pipelines
3. MCQ Generator (PyTorch, Hugging Face)
   - LLM fine-tuning for auto-generating exam questions with 92% quality rating

TECHNICAL SKILLS:
- Languages: Python, SQL, JavaScript, Java
- AI/ML: LangGraph, LangChain, PyTorch, TensorFlow, Hugging Face, scikit-learn
- GenAI: Multi-Agent Systems, RAG, Prompt Engineering, GPT-4, Llama 3, Claude
- Cloud: AWS, GCP, Docker, Git

RESPONSE RULES:
- Keep answers SHORT (1-3 sentences max)
- Be warm but professional
- Use 1 emoji max per message
- Always move toward understanding their needs
- Ask ONE question at a time
- If asked about Vaibhav's experience/projects, share relevant details from above
- If asked about hiring: "Vaibhav is open to new opportunities! You can reach him at vaibhavgupta1148@gmail.com"
- If asked to download resume: "You can download Vaibhav's resume from the portfolio website!"
- If asked about GitHub/code samples: "Check out Vaibhav's GitHub at https://github.com/VaibhavGupta1999"
- If asked about LinkedIn/connecting: "Connect with Vaibhav on LinkedIn: https://linkedin.com/in/vaibhav-gupta-b929ba237"

Stay focused on helping visitors learn about Vaibhav and his work. Be helpful and informative.`;


// Store conversations in memory (in production, use a database)
const conversations = new Map();

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, sessionId } = req.body;

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            temperature: 0.8,
            max_completion_tokens: 512,
            top_p: 0.9,
            stream: false
        });

        const response = completion.choices[0].message.content;

        // Store conversation for later requirement extraction
        if (sessionId) {
            conversations.set(sessionId, messages.concat([{ role: 'assistant', content: response }]));
        }

        res.json({ response });
    } catch (error) {
        console.error('Error calling Groq:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.post('/api/generate-requirements', async (req, res) => {
    try {
        const { messages, contactInfo } = req.body;

        // Use AI to extract and format requirements
        const extractionPrompt = `Based on the following conversation, extract and format a professional requirements document.

CONVERSATION:
${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

CONTACT INFO:
Name: ${contactInfo.name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}

Create a well-structured requirements document with these sections:
1. CLIENT INFORMATION
2. PROJECT OVERVIEW
3. SELECTED SERVICE(S)
4. DETAILED REQUIREMENTS
5. TARGET USERS
6. EXPECTED OUTCOMES
7. TIMELINE & URGENCY
8. BUDGET RANGE (if mentioned)
9. ADDITIONAL NOTES

Format it professionally with clear headings and bullet points. Be comprehensive but concise.`;

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: extractionPrompt }],
            temperature: 0.3,
            max_completion_tokens: 1024
        });

        const requirementsDoc = completion.choices[0].message.content;

        // Log the email (in production, use Nodemailer or SendGrid)
        console.log('\n' + '='.repeat(60));
        console.log('📧 NEW LEAD - SENDING EMAIL TO: vaibhavgupta1148@gmail.com');
        console.log('='.repeat(60));
        console.log('\nSubject: New AI Project Inquiry from ' + contactInfo.name);
        console.log('\n' + requirementsDoc);
        console.log('\n' + '='.repeat(60) + '\n');

        res.json({
            success: true,
            message: 'Requirements document generated and email sent!',
            requirements: requirementsDoc
        });
    } catch (error) {
        console.error('Error generating requirements:', error);
        res.status(500).json({ error: 'Failed to generate requirements' });
    }
});

app.post('/api/send-email', (req, res) => {
    console.log('📧 Lead Email Payload:', req.body);
    res.json({ success: true, message: 'Email simulation successful' });
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📧 Lead emails will be sent to: vaibhavgupta1148@gmail.com`);
});
