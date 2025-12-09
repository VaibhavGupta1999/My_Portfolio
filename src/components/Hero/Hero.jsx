import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-container">
            {/* Animated Background */}
            <div className="hero-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <div className="grid-overlay"></div>
            </div>

            {/* Floating Particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${15 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>

            <div className="hero-content">
                <div className="hero-main">
                    <div className="hero-badge-wrapper">
                        <span className="hero-badge">
                            <span className="badge-dot"></span>
                            Open to Opportunities
                        </span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line">I Build</span>
                        <span className="title-line gradient-text">Intelligent AI</span>
                        <span className="title-line">That Drives Results</span>
                    </h1>

                    <p className="hero-subtitle">
                        AI/ML Engineer with 2+ years of experience building production-grade Agentic AI systems,
                        multi-agent frameworks, and enterprise-scale automation solutions.
                    </p>

                    <div className="hero-cta-group">
                        <Link to="/portfolio" className="btn-primary">
                            <span>View My Work</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/book" className="btn-secondary">
                            <span>Contact Me</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                            </svg>
                        </Link>
                    </div>

                    <div className="hero-socials">
                        <a href="https://github.com/VaibhavGupta1999" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/vaibhav-gupta-b929ba237" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">2+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">Projects Delivered</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Technologies Mastered</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-card">
                        <div className="card-header">
                            <span className="card-dot red"></span>
                            <span className="card-dot yellow"></span>
                            <span className="card-dot green"></span>
                        </div>
                        <div className="card-content">
                            <div className="code-line">
                                <span className="code-keyword">const</span> ai = <span className="code-func">createAgent</span>({'{'}
                            </div>
                            <div className="code-line indent">
                                <span className="code-prop">model</span>: <span className="code-string">"llama-3.3"</span>,
                            </div>
                            <div className="code-line indent">
                                <span className="code-prop">task</span>: <span className="code-string">"automate"</span>,
                            </div>
                            <div className="code-line indent">
                                <span className="code-prop">intelligence</span>: <span className="code-number">∞</span>
                            </div>
                            <div className="code-line">
                                {'}'});
                            </div>
                            <div className="code-line">
                                <span className="code-keyword">await</span> ai.<span className="code-func">transform</span>(<span className="code-string">"your-business"</span>);
                            </div>
                            <div className="code-cursor"></div>
                        </div>
                    </div>

                    <div className="floating-badges">
                        <div className="floating-badge badge-1">🤖 AI Agents</div>
                        <div className="floating-badge badge-2">⚡ Automation</div>
                        <div className="floating-badge badge-3">🧠 LLMs</div>
                        <div className="floating-badge badge-4">📊 Analytics</div>
                    </div>
                </div>
            </div>

            <p className="hero-ai-prompt">
                <span className="prompt-icon">💬</span>
                Got questions? Chat with my <span className="highlight">AI Assistant</span> in the corner
            </p>
        </section>
    );
};

export default Hero;
