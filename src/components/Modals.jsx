import React, { useState } from 'react';
import { X, Bed, Bath, Maximize2, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from './Icons';
import './Modals.css';

// 1. Contact / Inquiry Modal
export function ContactModal({ isOpen, onClose, preselectedProperty = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: preselectedProperty ? preselectedProperty.title : 'Luxury Villas',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // keep message for 3 seconds then close
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card contact-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} color="#172023" />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="modal-success-icon-wrap">
              <CheckCircle size={48} color="#07be8a" />
            </div>
            <h3 className="modal-success-title">Message Received</h3>
            <p className="modal-success-desc">
              Thank you for reaching out, <strong>{formData.name}</strong>. One of our dedicated Homely luxury property advisors will contact you at <strong>{formData.email}</strong> shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="badge-label">
              <GreenHouseBadge />
              <span>Get in touch</span>
            </div>
            <h3 className="modal-title">Begin Your Property Journey</h3>
            <p className="modal-subtitle">
              Speak directly with an accredited advisor to schedule private walkthroughs or discuss acquisition details.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-form-group">
                <label className="modal-form-label">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Alexander Vance"
                  className="modal-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label className="modal-form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="alex@domain.com"
                    className="modal-form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="modal-form-group">
                  <label className="modal-form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    className="modal-form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-form-group">
                <label className="modal-form-label">Interested In</label>
                <select 
                  className="modal-form-select"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                >
                  <option value="Luxury Villas">Luxury Villas</option>
                  <option value="Residential Homes">Residential Homes</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Office Spaces">Office Spaces</option>
                  <option value="Futuristic Haven">Futuristic Haven</option>
                  <option value="Modern Luxe Villa">Modern Luxe Villa</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label className="modal-form-label">Message / Scheduling Request</label>
                <textarea 
                  rows={3}
                  placeholder="Tell us about your requirements, preferred timeframe, or questions..."
                  className="modal-form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-green modal-submit-btn">
                Send Inquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Property Detail Modal
export function PropertyModal({ property, onClose, onOpenContact }) {
  if (!property) return null;

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card property-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close property details">
          <X size={20} color="#172023" />
        </button>

        <div className="property-modal-media">
          <img src={property.image} alt={property.title} className="property-modal-img" />
          <div className="property-modal-badge-overlay">
            <span className="property-modal-cat">{property.category}</span>
          </div>
        </div>

        <div className="property-modal-content">
          <div className="property-modal-header-row">
            <div>
              <h2 className="property-modal-title">{property.title}</h2>
              <div className="property-modal-loc">
                <MapPin size={16} color="#71848c" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="property-modal-price">
              <span>{property.price}</span>
            </div>
          </div>

          <div className="property-modal-specs-bar">
            <div className="property-modal-spec">
              <BedIcon size={20} color="#172023" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="property-modal-spec">
              <BathIcon size={20} color="#172023" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="property-modal-spec">
              <AreaIcon size={20} color="#172023" />
              <span>{property.area}</span>
            </div>
          </div>

          <p className="property-modal-desc">{property.description}</p>

          <div className="property-modal-actions">
            <button 
              onClick={() => {
                onClose();
                onOpenContact(property);
              }}
              className="btn btn-green modal-cta-btn"
            >
              Inquire About Property
            </button>
            <button onClick={onClose} className="btn btn-pill-dark">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Blog Article Reader Modal
export function ArticleModal({ article, onClose }) {
  if (!article) return null;

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close article">
          <X size={20} color="#172023" />
        </button>

        <div className="article-modal-hero">
          <img src={article.image} alt={article.title} className="article-modal-img" />
          <div className="article-modal-tag-pill">{article.tag}</div>
        </div>

        <div className="article-modal-body">
          <div className="article-modal-meta">
            <span className="article-meta-item">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="article-meta-dot">•</span>
            <span className="article-meta-item">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>

          <h2 className="article-modal-title">{article.title}</h2>

          <div className="article-modal-text">
            {article.content ? (
              article.content.split('\n\n').map((para, i) => (
                <p key={i} className="article-paragraph">{para}</p>
              ))
            ) : (
              <p className="article-paragraph">{article.excerpt}</p>
            )}
          </div>

          <div className="article-modal-footer">
            <button onClick={onClose} className="btn btn-dark">
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
