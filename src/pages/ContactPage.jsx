import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { GreenHouseBadge } from '../components/Icons';
import { contactPageData, siteConfig } from '../data/homelyData';
import './ContactPage.css';

export default function ContactPage({ onNavigateHome }) {
  const [inquiryType, setInquiryType] = useState('Buying a Home');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const inquiryCategories = [
    'Buying a Home',
    'Selling a Property',
    'Luxury Rental',
    'General Inquiry'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury concierge response submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        name: formData.name.trim() || 'Valued Client',
        email: formData.email.trim() || 'your email',
        type: inquiryType
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="contact-page">
      {/* ======================================================================
          PAGE HEADER & BREADCRUMB
          ====================================================================== */}
      <section className="contact-page-hero">
        <div className="container">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Contact</span>
          </nav>

          <div className="contact-hero-content">
            <div className="badge-label contact-hero-badge">
              <GreenHouseBadge />
              <span>{contactPageData.badge}</span>
            </div>

            <h1 className="contact-page-title">
              {contactPageData.title}
            </h1>

            <p className="contact-page-subtitle">
              {contactPageData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          MAIN SPLIT CONTACT CARD & FORM SECTION
          ====================================================================== */}
      <section className="contact-main-section" aria-label="Contact Form and Details">
        <div className="container">
          <div className="contact-split-card">
            
            {/* ----------------------------------------------------------------
                LEFT COLUMN: Image Banner & Contact Information
                ---------------------------------------------------------------- */}
            <div className="contact-info-col">
              <div className="contact-info-bg-wrap">
                <img 
                  src={contactPageData.card.bgImage} 
                  alt="Homely Luxury Estate Living" 
                  className="contact-info-bg-img"
                  loading="eager"
                />
                <div className="contact-info-overlay" />
              </div>

              <div className="contact-info-inner">
                {/* Top Heading */}
                <div className="contact-info-header">
                  <h2 className="contact-info-title">{contactPageData.card.heading}</h2>
                  <p className="contact-info-desc">{contactPageData.card.subheading}</p>
                </div>

                {/* Bottom Details List */}
                <div className="contact-info-details-list">
                  <a href={`tel:${contactPageData.card.phone}`} className="contact-detail-row">
                    <div className="contact-icon-bubble">
                      <Phone size={18} />
                    </div>
                    <div className="contact-detail-text">
                      <span className="contact-detail-label">Direct Line</span>
                      <strong className="contact-detail-value">{contactPageData.card.phone}</strong>
                    </div>
                  </a>

                  <a href={`mailto:${contactPageData.card.email}`} className="contact-detail-row">
                    <div className="contact-icon-bubble">
                      <Mail size={18} />
                    </div>
                    <div className="contact-detail-text">
                      <span className="contact-detail-label">Email Inquiries</span>
                      <strong className="contact-detail-value">{contactPageData.card.email}</strong>
                    </div>
                  </a>

                  <div className="contact-detail-row">
                    <div className="contact-icon-bubble">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-detail-text">
                      <span className="contact-detail-label">Main Office</span>
                      <strong className="contact-detail-value">{contactPageData.card.address}</strong>
                    </div>
                  </div>

                  {/* Guaranteed Response Pill */}
                  <div className="contact-response-guarantee">
                    <Sparkles size={14} className="sparkle-icon" />
                    <span>Advisors respond in under 2 hours</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ----------------------------------------------------------------
                RIGHT COLUMN: Interactive Contact Form
                ---------------------------------------------------------------- */}
            <div className="contact-form-col">
              {submittedData ? (
                <div className="contact-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={54} color="#07be8a" strokeWidth={2.4} />
                  </div>
                  <h3 className="success-heading">Inquiry Received!</h3>
                  <p className="success-message">
                    Thank you, <strong>{submittedData.name}</strong>. Your inquiry regarding <strong>{submittedData.type}</strong> has been routed to our senior luxury property partner. A dedicated advisor will reach out to you at <strong>{submittedData.email}</strong> shortly.
                  </p>
                  
                  <div className="success-actions">
                    <button 
                      type="button" 
                      onClick={() => setSubmittedData(null)}
                      className="btn-send-another"
                    >
                      Send Another Message
                    </button>
                    <button 
                      type="button" 
                      onClick={onNavigateHome}
                      className="btn-return-home"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  {/* Category Pills Header */}
                  <div className="contact-type-selector">
                    <span className="contact-type-label">I'm interested in:</span>
                    <div className="contact-type-pills">
                      {inquiryCategories.map((cat, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setInquiryType(cat)}
                          className={`contact-type-pill ${inquiryType === cat ? 'active' : ''}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field Row 1: Name & Phone */}
                  <div className="form-fields-row">
                    <div className="form-input-group">
                      <label className="form-label" htmlFor="contact-name">
                        Name <span className="required-star">*</span>
                      </label>
                      <input 
                        id="contact-name"
                        type="text" 
                        required 
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input-field"
                      />
                    </div>

                    <div className="form-input-group">
                      <label className="form-label" htmlFor="contact-phone">
                        Phone number <span className="required-star">*</span>
                      </label>
                      <input 
                        id="contact-phone"
                        type="tel" 
                        required 
                        placeholder="XXX-XXX-XXXX" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input-field"
                      />
                    </div>
                  </div>

                  {/* Field Row 2: Email */}
                  <div className="form-input-group">
                    <label className="form-label" htmlFor="contact-email">
                      Email address <span className="required-star">*</span>
                    </label>
                    <input 
                      id="contact-email"
                      type="email" 
                      required 
                      placeholder="Your email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input-field"
                    />
                  </div>

                  {/* Field Row 3: Message */}
                  <div className="form-input-group">
                    <label className="form-label" htmlFor="contact-message">
                      Message
                    </label>
                    <textarea 
                      id="contact-message"
                      rows={5}
                      placeholder="Write here your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea-field"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-action-row">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight size={17} strokeWidth={2.4} />
                        </>
                      )}
                    </button>

                    <div className="form-privacy-note">
                      <ShieldCheck size={16} className="privacy-shield-icon" />
                      <span>Your information is strictly confidential.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================================
          OFFICE LOCATIONS SHOWCASE
          ====================================================================== */}
      <section className="contact-offices-section" aria-label="Our Real Estate Offices">
        <div className="container">
          <div className="offices-header-block">
            <div className="badge-label">
              <Building2 size={14} color="#07be8a" />
              <span>Global Presence</span>
            </div>
            <h2 className="offices-main-title">Visit our regional advisory offices</h2>
            <p className="offices-sub-title">
              Private client lounges available for confidential consultations and architectural previews.
            </p>
          </div>

          <div className="offices-cards-grid">
            {contactPageData.offices.map((office) => (
              <div key={office.id} className="office-location-card">
                <div className="office-card-top">
                  <span className="office-city-tag">{office.city}</span>
                  <div className="office-dot-indicator" />
                </div>
                
                <h3 className="office-role-title">{office.role}</h3>
                
                <p className="office-address">
                  <MapPin size={15} className="office-icon-pin" />
                  <span>{office.address}</span>
                </p>

                <div className="office-divider" />

                <div className="office-contacts">
                  <a href={`tel:${office.phone}`} className="office-contact-link">
                    <Phone size={14} />
                    <span>{office.phone}</span>
                  </a>
                  <a href={`mailto:${office.email}`} className="office-contact-link">
                    <Mail size={14} />
                    <span>{office.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          FAQ QUICK ACCORDION SECTION
          ====================================================================== */}
      <section className="contact-faq-section" aria-label="Frequently Asked Questions">
        <div className="container">
          <div className="contact-faq-card">
            <h3 className="contact-faq-heading">Frequently Asked Questions</h3>
            <div className="contact-faq-list">
              {contactPageData.faqTeaser.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`contact-faq-item ${isOpen ? 'active' : ''}`}>
                    <button 
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="contact-faq-trigger"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="contact-faq-content">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
