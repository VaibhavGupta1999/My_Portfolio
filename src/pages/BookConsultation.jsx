import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookConsultation.css';

const BookConsultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [activeService, setActiveService] = useState(null);

    const opportunities = [
        { id: 'fulltime', icon: '🏢', label: 'Full-Time', desc: 'Permanent position' },
        { id: 'contract', icon: '📋', label: 'Contract', desc: 'Fixed-term role' },
        { id: 'consulting', icon: '💼', label: 'Consulting', desc: 'Advisory role' },
        { id: 'freelance', icon: '🚀', label: 'Freelance', desc: 'Project-based' },
        { id: 'collaboration', icon: '🤝', label: 'Collaboration', desc: 'Partnership' },
        { id: 'other', icon: '✨', label: 'Other', desc: 'Something else' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceSelect = (serviceId) => {
        setActiveService(serviceId);
        setFormData({ ...formData, service: serviceId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Request:', formData);
        setSubmitted(true);
    };

    return (
        <div className="booking-page">
            {/* Animated Background */}
            <div className="booking-bg">
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
            </div>

            <nav className="booking-nav">
                <Link to="/" className="nav-logo">Vaibhav.AI</Link>
                <Link to="/" className="nav-back">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </nav>

            <div className="booking-container">
                {!submitted ? (
                    <>
                        <div className="booking-header">
                            <div className="header-icon">✉️</div>
                            <h1>Let's <span className="gradient-text">Connect</span></h1>
                            <p>I'm open to new opportunities. Tell me about your team and how I can contribute.</p>
                        </div>

                        <form className="booking-form" onSubmit={handleSubmit}>
                            {/* Opportunity Selection */}
                            <div className="form-section">
                                <label className="section-label">What type of opportunity is this?</label>
                                <div className="service-grid">
                                    {opportunities.map(opportunity => (
                                        <button
                                            key={opportunity.id}
                                            type="button"
                                            className={`service-card ${activeService === opportunity.id ? 'active' : ''}`}
                                            onClick={() => handleServiceSelect(opportunity.id)}
                                        >
                                            <span className="service-icon">{opportunity.icon}</span>
                                            <span className="service-label">{opportunity.label}</span>
                                            <span className="service-desc">{opportunity.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="form-section">
                                <label className="section-label">Your Details</label>
                                <div className="input-grid">
                                    <div className="input-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Work Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Company *</label>
                                        <input
                                            type="text"
                                            name="company"
                                            required
                                            placeholder="Your Company"
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Role/Position</label>
                                        <input
                                            type="text"
                                            name="budget"
                                            placeholder="e.g., AI Engineer, ML Lead"
                                            value={formData.budget}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Opportunity Details */}
                            <div className="form-section">
                                <label className="section-label">Tell me about the opportunity</label>
                                <div className="input-group full-width">
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="Describe the role, team, tech stack, and what you're looking for..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn">
                                <span>Send Message</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                                </svg>
                            </button>

                            <p className="form-note">
                                🔒 Your information is secure and will only be used to discuss potential opportunities.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="success-container">
                        <div className="success-icon">🎉</div>
                        <h2>You're All Set!</h2>
                        <p className="success-name">Thanks, {formData.name}!</p>
                        <p className="success-text">
                            I've received your message and will respond to <strong>{formData.email}</strong> within 24 hours.
                        </p>
                        <div className="success-next">
                            <h4>What happens next?</h4>
                            <ul>
                                <li><span>1</span> I'll review your message and the opportunity details</li>
                                <li><span>2</span> I'll reach out via email to schedule a conversation</li>
                                <li><span>3</span> We'll discuss how I can contribute to your team</li>
                            </ul>
                        </div>
                        <Link to="/" className="btn-primary">
                            Return to Home
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookConsultation;
