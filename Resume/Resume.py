

from fpdf import FPDF

class OnePageModernPDF(FPDF):
    def header(self):
        # --- Name ---
        self.set_font('Helvetica', 'B', 24)
        self.set_text_color(26, 35, 126)  # Navy Blue
        self.cell(0, 8, 'Vaibhav Gupta', 0, 1, 'C')
        
        # --- Contact ---
        self.set_font('Helvetica', '', 9)
        self.set_text_color(80, 80, 80) # Dark Grey
        self.cell(0, 5, 'Alwar, Rajasthan  |  vaibhavgupta1148@gmail.com  |  +91-7424809555', 0, 1, 'C')
        self.set_text_color(26, 35, 126)
        self.cell(0, 5, 'linkedin.com/in/vaibhav-gupta-b929ba237', 0, 1, 'C')
        self.ln(3) 

    def section_title(self, label):
        self.ln(2) # Breathing room before section
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(26, 35, 126) # Navy Blue
        self.cell(0, 6, label.upper(), 0, 1, 'L')
        
        # Clean separator line
        self.set_draw_color(220, 220, 220)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(2) # Space after line

    def job_header(self, role, company, location, date):
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(0, 0, 0)
        self.cell(100, 5, role, 0, 0, 'L')
        
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 5, f"{location} | {date}", 0, 1, 'R')
        
        self.set_font('Helvetica', 'B', 9)
        self.set_text_color(26, 35, 126)
        self.cell(0, 5, company, 0, 1, 'L')
        self.ln(1)

    def project_header(self, title, tech_stack):
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(0, 0, 0)
        self.cell(0, 5, title, 0, 1, 'L')
        
        if tech_stack:
            self.set_font('Helvetica', 'I', 9)
            self.set_text_color(26, 35, 126)
            self.cell(0, 4, tech_stack, 0, 1, 'L')
        self.ln(1)

    def bullet(self, text):
        self.set_font('Helvetica', '', 9.5) # 9.5 is perfect for 1-page
        self.set_text_color(30, 30, 30)
        self.set_x(12) 
        self.multi_cell(0, 4.5, f"{chr(149)}  {text}") # Tight line height
        self.ln(1)

# --- Generate PDF ---
pdf = OnePageModernPDF()
# Margins: Left 10, Top 10, Right 10 (Maximizes space while looking clean)
pdf.set_margins(10, 10, 10) 
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=10)

# SUMMARY
pdf.section_title('Professional Summary')
pdf.set_font('Helvetica', '', 9.5)
pdf.multi_cell(0, 4.5, "AI/ML Engineer with 2+ years of experience architecting Agentic AI systems and Generative AI pipelines. Expert in multi-agent frameworks (LangGraph), LLMs (Qwen, Llama 3), and RAG systems. Proven track record of delivering scalable AI solutions with measurable business impact.")

# EXPERIENCE
pdf.section_title('Experience')

# Job 1
pdf.job_header("Machine Learning Engineer", "Glarus Technology", "Delhi", "Mar 2024 - Present")
pdf.bullet("Architected autonomous multi-agent framework using Llama 3.2B & Groq API for NL-to-code generation, achieving 95% accuracy in HTML5/Tailwind output.")
pdf.bullet("Engineered parallel agent pipelines for UI generation, reducing content latency by 40% vs sequential baselines.")
pdf.bullet("Developed production virtual try-on system integrating SCHP, MODNet & PIFuHD for photorealistic garment rendering.")
pdf.ln(1)

# Job 2
pdf.job_header("AI Engineer", "Softage.ai", "Delhi", "Jun 2023 - Mar 2024")
pdf.bullet("Designed high-performance RAG pipelines with LangChain & Pinecone, improving response accuracy by 25% for chatbots.")
pdf.bullet("Built Large Action Models (LAMs) for RL-based autonomous decision-making in predictive modeling scenarios.")
pdf.bullet("Optimized ML inference pipelines across NLP/CV domains, reducing latency by 35% for recommendation systems.")
pdf.ln(1)

# Job 3
pdf.job_header("AI/ML Research Intern", "Gilbert Research Center", "Remote", "Jan 2023 - May 2023")
pdf.bullet("Transitioned 3 academic prototypes (Sentiment Analysis, Diabetes Prediction) to production demos for healthcare sectors.")

# PROJECTS
pdf.section_title('Key Projects')

# Project 1 (LangGraph)
pdf.project_header("Agentic Resume Optimization System", "Tech: LangGraph, FastAPI, Groq (Qwen 32B), Tavily, Streamlit")
pdf.bullet("Built multi-agent system with 4 specialist agents for automated resume optimization, improving ATS match rates by 45%.")
pdf.bullet("Implemented real-time company research & JD gap analysis using Groq and Tavily API.")
pdf.ln(1)

# Project 2
pdf.project_header("Enterprise Conversational AI", "Tech: LangChain, GPT-4, Pinecone, FastAPI")
pdf.bullet("Developed autonomous chatbot handling multi-domain queries with sub-200ms latency using optimized RAG pipelines.")
pdf.ln(1)

# Project 3
pdf.project_header("MCQ Generator (GenAI)", "Tech: PyTorch, Hugging Face, LLMs")
pdf.bullet("Fine-tuned LLM for auto-generating exam-grade MCQs, deployed for ed-tech platforms with 92% quality rating.")

# SKILLS
pdf.section_title('Technical Skills')
pdf.set_font('Helvetica', '', 9.5)
pdf.multi_cell(0, 4.5, "Languages: Python, SQL, JavaScript, Java, R, HTML5/CSS3\n"
                       "AI Frameworks: LangGraph, LangChain, PyTorch, TensorFlow, Hugging Face, FastAPI\n"
                       "GenAI: Multi-Agent Systems, RAG, Prompt Engineering, GPT-4, Llama 3, Qwen\n"
                       "Cloud/Tools: AWS, GCP, Docker, Git, Pinecone, Streamlit, MLflow")

# EDUCATION & CERTS
pdf.section_title('Education & Certifications')
pdf.job_header("B.Tech in Computer Science", "2019 - 2023", "", "")
pdf.bullet("Certifications: AI Engineer (Pro5.ai) | ML & Data Science (GeeksforGeeks) | Advanced Python (RKCL, Grade A)")

# Output
pdf.output('Vaibhav_Gupta_OnePage_Final.pdf')
print("Successfully generated: Vaibhav_Gupta_OnePage_Final.pdf")