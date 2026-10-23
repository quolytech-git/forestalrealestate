import React, { useState, useMemo } from 'react';
import { 
  Phone, Mail, MessageSquare, Award, CheckCircle, 
  Star, Globe, MapPin, ArrowLeft, ArrowRight, 
  Send, ShieldCheck, Calendar, Clock 
} from 'lucide-react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from '../components/Icons';
import { agentsData } from '../data/agentsData';
import { propertiesData } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './AgentDetailPage.css';

export default function AgentDetailPage({ 
  agentSlug, 
  onNavigateHome, 
  onNavigateAgents, 
  onSelectProperty,
  onOpenContact 
}) {
  const { t, language } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const agent = useMemo(() => {
    return (
      agentsData.find((a) => a.slug === agentSlug || a.id === agentSlug) || 
      agentsData[0]
    );
  }, [agentSlug]);

  // Find all properties represented by this agent
  const agentProperties = useMemo(() => {
    const assignedIds = agent.assignedProperties || [];
    return propertiesData.properties.filter((p) => 
      assignedIds.includes(p.slug) || assignedIds.includes(p.id)
    );
  }, [agent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSent(true);
      setTimeout(() => {
        setFormSent(false);
        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="agent-detail-page">
      {/* ======================================================================
          1. BREADCRUMBS & TOP NAV
          ====================================================================== */}
      <section className="agent-detail-header-section">
        <div className="container">
          <nav className="agent-breadcrumb" aria-label="Breadcrumbs">
            <button onClick={onNavigateHome} className="breadcrumb-btn">
              {t('nav_home')}
            </button>
            <span className="breadcrumb-sep">/</span>
            <button onClick={onNavigateAgents} className="breadcrumb-btn">
              {t('nav_agents')}
            </button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{agent.name}</span>
          </nav>

          <button onClick={onNavigateAgents} className="agent-back-btn">
            <ArrowLeft size={16} />
            <span>{language === 'sq' ? 'Kthehu tek Agjentët' : 'Back to Agents'}</span>
          </button>
        </div>
      </section>

      {/* ======================================================================
          2. AGENT PROFILE HERO CARD
          ====================================================================== */}
      <section className="agent-hero-card-section">
        <div className="container">
          <div className="agent-profile-card">
            {/* Left: Avatar & Quick Badges */}
            <div className="agent-profile-avatar-col">
              <div className="agent-hero-avatar-wrap">
                <img 
                  src={agent.avatar} 
                  alt={agent.name} 
                  className="agent-hero-avatar"
                />
                <span className="agent-hero-verified" title="Agjent i Çertifikuar nga Forest-AL">
                  <CheckCircle size={20} color="#ffffff" fill="#05B881" />
                </span>
              </div>

              <div className="agent-rating-badge">
                <div className="agent-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} color="#FFB800" fill="#FFB800" />
                  ))}
                </div>
                <span className="agent-rating-score">{agent.rating}</span>
                <span className="agent-reviews-count">({agent.reviewsCount} {language === 'sq' ? 'vlerësime' : 'reviews'})</span>
              </div>
            </div>

            {/* Right: Info, Bios & Contact Actions */}
            <div className="agent-profile-info-col">
              <div className="agent-header-meta">
                <span className="agent-specialty-pill">{agent.specialty}</span>
                <span className="agent-license-tag">{agent.license}</span>
              </div>

              <h1 className="agent-hero-name">{agent.name}</h1>
              <p className="agent-hero-title">{agent.title}</p>

              <p className="agent-hero-lead">
                {language === 'sq' ? agent.aboutBio : agent.aboutBioEn}
              </p>

              {/* Stats Bar */}
              <div className="agent-hero-stats-row">
                <div className="agent-stat-cell">
                  <span className="stat-number">{agent.activeListings}</span>
                  <span className="stat-name">{language === 'sq' ? 'Prona Aktive' : 'Active Listings'}</span>
                </div>
                <div className="stat-divider-line" />
                <div className="agent-stat-cell">
                  <span className="stat-number">{agent.closedDeals}+</span>
                  <span className="stat-name">{language === 'sq' ? 'Transaksione' : 'Closed Deals'}</span>
                </div>
                <div className="stat-divider-line" />
                <div className="agent-stat-cell">
                  <span className="stat-number">{language === 'sq' ? agent.experience : agent.experienceEn}</span>
                  <span className="stat-name">{language === 'sq' ? 'Eksperiencë' : 'Experience'}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="agent-hero-actions-row">
                <a 
                  href={`tel:${agent.phone}`} 
                  className="btn btn-green agent-call-btn"
                >
                  <Phone size={16} />
                  <span>{agent.phone}</span>
                </a>

                {agent.whatsapp && (
                  <a 
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-white agent-wa-btn"
                  >
                    <MessageSquare size={16} color="#05B881" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a 
                  href={`mailto:${agent.email}`} 
                  className="btn btn-dark agent-mail-btn"
                >
                  <Mail size={16} />
                  <span>{agent.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          3. MAIN CONTENT: BIO, ACHIEVEMENTS & INQUIRY FORM
          ====================================================================== */}
      <section className="agent-content-section">
        <div className="container agent-content-grid">
          {/* Left Column: Narrative, Achievements & Languages */}
          <div className="agent-details-col">
            {/* Bio Narrative */}
            <div className="agent-section-block">
              <h2 className="agent-block-title">
                {language === 'sq' ? `Rreth ${agent.name}` : `About ${agent.name}`}
              </h2>
              <p className="agent-narrative-text">
                {language === 'sq' ? agent.aboutBio : agent.aboutBioEn}
              </p>
              <p className="agent-narrative-text">
                {language === 'sq' 
                  ? `${agent.name} drejton një ekip të specializuar që përdor teknologjinë më moderne të vlerësimit, pamjet ajrore me dron dhe marketingun global për të garantuar që çdo pronë të arrijë vlerën më të lartë në treg.`
                  : `${agent.name} commands a bespoke advisory unit leveraging cutting-edge market analytics, drone cinematography, and global syndication to ensure maximum asset valuation and seamless escrow executions.`}
              </p>
            </div>

            {/* Achievements & Milestones */}
            {agent.achievements && agent.achievements.length > 0 && (
              <div className="agent-section-block">
                <h3 className="agent-block-subtitle">
                  <Award size={20} className="block-icon" />
                  <span>{language === 'sq' ? 'Arritje & Çertifikime' : 'Achievements & Recognition'}</span>
                </h3>
                <div className="agent-achievements-timeline">
                  {agent.achievements.map((ach, idx) => (
                    <div key={idx} className="timeline-item">
                      <span className="timeline-year">{ach.year}</span>
                      <p className="timeline-text">{ach.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spoken Languages */}
            <div className="agent-section-block">
              <h3 className="agent-block-subtitle">
                <Globe size={19} className="block-icon" />
                <span>{language === 'sq' ? 'Gjuhët e Folura' : 'Languages Spoken'}</span>
              </h3>
              <div className="agent-lang-tags">
                {agent.languages.map((lng, idx) => (
                  <span key={idx} className="agent-lang-tag">
                    {lng}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Consultation Booking Form */}
          <div className="agent-form-col">
            <div className="agent-inquiry-box">
              <div className="agent-form-header">
                <div className="badge-label">
                  <GreenHouseBadge />
                  <span>{language === 'sq' ? 'Konsulencë Private' : 'Private Consultation'}</span>
                </div>
                <h3 className="agent-form-title">
                  {language === 'sq' ? `Kontakto ${agent.name}` : `Direct Message to ${agent.name}`}
                </h3>
                <p className="agent-form-subtitle">
                  {language === 'sq' 
                    ? 'Dërgoni kërkesën tuaj dhe agjenti do t\'ju përgjigjet brenda 2 orëve.' 
                    : 'Submit your inquiry and the agent will reply within 2 business hours.'}
                </p>
              </div>

              {formSent ? (
                <div className="agent-form-success">
                  <CheckCircle size={36} color="#05B881" />
                  <h4>{language === 'sq' ? 'Mesazhi u dërgua me sukses!' : 'Message sent successfully!'}</h4>
                  <p>
                    {language === 'sq' 
                      ? `${agent.name} do t'ju kontaktojë së shpejti në numrin ose emailin e dhënë.`
                      : `${agent.name} will reach out to you shortly at the provided contact.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="agent-booking-form">
                  <div className="form-group">
                    <label>{language === 'sq' ? 'Emri dhe Mbiemri *' : 'Full Name *'}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={language === 'sq' ? 'Emri juaj' : 'Your name'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'sq' ? 'Telefoni' : 'Phone'}</label>
                      <input 
                        type="tel" 
                        placeholder="+355 69 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{language === 'sq' ? 'Data e preferuar për takim / vizitë' : 'Preferred Meeting Date'}</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{language === 'sq' ? 'Mesazhi juaj' : 'Your Message'}</label>
                    <textarea 
                      rows="4" 
                      placeholder={language === 'sq' ? 'Përshkruani kërkesën tuaj...' : 'Detail your inquiry...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-green agent-submit-btn">
                    <Send size={16} />
                    <span>{language === 'sq' ? 'Dërgo Mesazh Agjentit' : 'Send Message to Agent'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          4. AGENT'S ACTIVE LISTINGS SHOWCASE
          ====================================================================== */}
      {agentProperties.length > 0 && (
        <section className="agent-listings-section">
          <div className="container">
            <div className="agent-listings-header">
              <div>
                <div className="badge-label">
                  <GreenHouseBadge />
                  <span>{language === 'sq' ? 'Portofoli Ekskluziv' : 'Exclusive Portfolio'}</span>
                </div>
                <h2 className="agent-listings-title">
                  {language === 'sq' 
                    ? `Prona të Përfaqësuara nga ${agent.name}` 
                    : `Properties Represented by ${agent.name}`}
                </h2>
              </div>
            </div>

            <div className="agent-listings-grid">
              {agentProperties.map((prop) => (
                <article 
                  key={prop.id}
                  className="agent-prop-card"
                  onClick={() => onSelectProperty && onSelectProperty(prop.slug || prop.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Shiko ${prop.title}`}
                >
                  <div className="agent-prop-img-wrap">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="agent-prop-img"
                      loading="lazy" 
                    />
                    <span className="agent-prop-cat-badge">{prop.category}</span>
                    <span className="agent-prop-price-badge">{prop.price}</span>
                  </div>

                  <div className="agent-prop-body">
                    <h3 className="agent-prop-title">{prop.title}</h3>
                    <p className="agent-prop-location">
                      <MapPin size={14} className="agent-prop-pin" />
                      <span>{prop.location}</span>
                    </p>

                    <div className="agent-prop-specs-row">
                      <div className="agent-prop-spec">
                        <BedIcon size={15} color="#475A61" />
                        <span>{prop.bedrooms}</span>
                      </div>
                      <div className="agent-prop-spec">
                        <BathIcon size={15} color="#475A61" />
                        <span>{prop.bathrooms}</span>
                      </div>
                      <div className="agent-prop-spec">
                        <AreaIcon size={15} color="#475A61" />
                        <span>{prop.area}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
