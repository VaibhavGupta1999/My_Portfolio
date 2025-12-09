import React from 'react';
import './About.css';
import vaibhavPhoto from '../../assets/vaibhav.jpg';

const About = () => {
    const expertise = [
        { icon: "🤖", title: "AI Agents", desc: "Autonomous systems that think and act" },
        { icon: "🧠", title: "LLM Integration", desc: "GPT-4, Llama, Claude expertise" },
        { icon: "⚡", title: "Automation", desc: "End-to-end workflow optimization" },
        { icon: "📊", title: "ML Models", desc: "Predictive & analytical solutions" },
        { icon: "💬", title: "Conversational AI", desc: "Human-like chatbot experiences" },
        { icon: "👁️", title: "Computer Vision", desc: "Image & video intelligence" }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-image-wrapper">
                    <div className="image-glow"></div>
                    <div className="image-frame">
                        <img src={vaibhavPhoto} alt="Vaibhav Gupta" className="about-photo" />
                    </div>
                    <div className="floating-card card-exp">
                        <span className="card-number">2+</span>
                        <span className="card-text">Years in AI</span>
                    </div>
                    <div className="floating-card card-projects">
                        <span className="card-number">25+</span>
                        <span className="card-text">AI Projects</span>
                    </div>
                </div>

                <div className="about-content">
                    <div className="section-badge">About Me</div>
                    <h2 className="about-title">
                        Turning Complex AI Problems into <span className="gradient-text">Elegant Solutions</span>
                    </h2>

                    <div className="about-text">
                        <p>
                            I'm <strong>Vaibhav Gupta</strong> — an AI/ML Engineer with 2+ years of experience building production-grade
                            Agentic AI systems and Generative AI pipelines. I specialize in
                            <span className="highlight"> multi-agent frameworks and LLMs</span>.
                        </p>
                        <p>
                            My expertise spans LangGraph, LangChain, PyTorch, and state-of-the-art models like Llama 3, GPT-4, and Qwen.
                            I bring a strong foundation in software engineering combined with deep AI/ML knowledge
                            to deliver systems that are reliable, scalable, and genuinely transformative.
                        </p>
                        <p>
                            I'm passionate about AI that <span className="highlight">ships, scales, and succeeds</span> — and I'm looking for my next opportunity to make an impact.
                        </p>
                    </div>

                    <div className="expertise-grid">
                        {expertise.map((item, index) => (
                            <div key={index} className="expertise-item">
                                <span className="expertise-icon">{item.icon}</span>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about-cta">
                        <a href="/portfolio" className="btn-primary">
                            See My Work
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="/book" className="btn-outline">Let's Talk</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
