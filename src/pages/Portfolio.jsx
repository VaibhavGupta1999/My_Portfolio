import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const projects = [
    {
        id: 1,
        title: "Agentic Resume Optimization System",
        category: "Multi-Agent AI",
        client: "Personal Project",
        description: "Built a production-ready multi-agent system using LangGraph and FastAPI, coordinating 4 specialist agents (Manager, Company Research, JD Matching, Translation) to automate resume optimization with real-time feedback.",
        metrics: "45% improvement in ATS match rates (33% → 78%) • 4 specialist agents • Real-time gap analysis",
        tech: ["LangGraph", "FastAPI", "Groq", "Qwen 32B", "Tavily API", "Streamlit"],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "Autonomous Multi-Agent Code Generator",
        category: "AI Agent",
        client: "Glarus Technology",
        description: "Architected an autonomous multi-agent framework using Llama 3.2B and Groq API for converting natural language into production-grade HTML5/Tailwind code with 95% accuracy.",
        metrics: "95% code accuracy • 40% latency reduction • Parallel agent processing",
        tech: ["Llama 3.2B", "Groq API", "LangGraph", "Python", "HTML5/Tailwind"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "Virtual Try-On Pipeline",
        category: "Computer Vision",
        client: "Glarus Technology",
        description: "Developed a robust end-to-end virtual try-on pipeline orchestrating SCHP, MODNet, and PIFuHD models to achieve photorealistic garment alignment for e-commerce applications.",
        metrics: "Photorealistic rendering • Multi-model orchestration • E-commerce ready",
        tech: ["SCHP", "MODNet", "PIFuHD", "PyTorch", "OpenCV"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "Enterprise RAG Pipeline",
        category: "RAG System",
        client: "Softage.ai",
        description: "Designed and deployed high-performance Retrieval-Augmented Generation pipelines using LangChain and vector databases, increasing contextual response accuracy by 25% for enterprise chatbots.",
        metrics: "25% accuracy improvement • Sub-200ms latency • Enterprise-scale",
        tech: ["LangChain", "Pinecone", "GPT-4", "FastAPI", "Python"],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 5,
        title: "Large Action Models (LAMs)",
        category: "ML Model",
        client: "Softage.ai",
        description: "Built Large Action Models for complex reinforcement learning tasks, enabling autonomous decision-making in predictive modeling scenarios with improved accuracy.",
        metrics: "Autonomous decision-making • RL-based • 35% latency reduction",
        tech: ["PyTorch", "Reinforcement Learning", "Python", "FastAPI"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 6,
        title: "MCQ Generator (GenAI)",
        category: "LLM Fine-tuning",
        client: "Ed-Tech Platform",
        description: "Fine-tuned LLM models to auto-generate exam-grade multiple-choice questions from educational content, streamlining content creation for ed-tech platforms.",
        metrics: "92% quality rating from educators • Automated content generation",
        tech: ["PyTorch", "Hugging Face", "FastAPI", "Transformers"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
];

const Portfolio = () => {
    return (
        <div className="portfolio-page">
            <nav className="portfolio-nav">
                <Link to="/" className="nav-logo">Vaibhav Gupta</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="/Vaibhav_Gupta_OnePage_Final.pdf" download className="nav-link">📄 Resume</a>
                    <Link to="/book" className="btn-secondary small">Contact Me</Link>
                </div>
            </nav>

            <header className="portfolio-header">
                <div className="header-badge">My Work</div>
                <h1>Building <span className="gradient-text">AI Solutions</span> That Drive Results</h1>
                <p>Explore the projects I've worked on throughout my career — showcasing my expertise in AI engineering, from concept to production.</p>
                <a href="/Vaibhav_Gupta_OnePage_Final.pdf" download className="btn-primary" style={{ marginTop: '1rem' }}>
                    📄 Download Resume
                </a>
            </header>

            <section id="projects" className="projects-section">
                <div className="projects-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-image-wrapper">
                                <img src={project.image} alt={project.title} className="project-image" />
                                <div className="project-overlay" style={{ background: project.gradient }}>
                                    <span className="project-category-badge">{project.category}</span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-client">{project.client}</div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-metrics">{project.metrics}</div>
                                <div className="project-tech">
                                    {project.tech.map(t => (
                                        <span key={t} className="tech-badge">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <h2>Interested in Working Together?</h2>
                <p>I'm actively looking for opportunities where I can apply my AI expertise to solve challenging problems.</p>
                <div className="cta-buttons">
                    <Link to="/book" className="btn-primary">Get in Touch</Link>
                    <a href="/Vaibhav_Gupta_OnePage_Final.pdf" download className="btn-secondary">
                        📄 Download Resume
                    </a>
                </div>
            </section>

            <footer className="portfolio-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="nav-logo">Vaibhav Gupta</div>
                        <p>AI/ML Engineer building intelligent solutions for forward-thinking companies.</p>
                    </div>
                    <div className="footer-links">
                        <Link to="/">Home</Link>
                        <Link to="/portfolio">Portfolio</Link>
                        <Link to="/book">Contact</Link>
                        <a href="/Vaibhav_Gupta_OnePage_Final.pdf" download>Resume</a>
                        <a href="https://github.com/VaibhavGupta1999" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://linkedin.com/in/vaibhav-gupta-b929ba237" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} Vaibhav Gupta. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
