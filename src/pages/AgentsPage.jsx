import React, { useState, useMemo } from 'react';
import { Phone, Mail, Award, CheckCircle, Search, MessageSquare, Globe } from 'lucide-react';
import { GreenHouseBadge } from '../components/Icons';
import { agentsData } from '../data/agentsData';
import { useLanguage } from '../context/LanguageContext';
import './AgentsPage.css';

export default function AgentsPage({ onNavigateHome, onOpenContact, onSelectAgent }) {
  const { t, language } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const specialties = [
    "All",
    "Vila Luksoze",
    "Bregdet & Waterfront",
    "Investime Komerciale",
    "Konsulencë Arkitekturore"
  ];

  const filteredAgents = useMemo(() => {
    return agentsData.filter((ag) => {
      if (activeSpecialty !== "All" && ag.specialty !== activeSpecialty) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = ag.name.toLowerCase().includes(q);
        const matchTitle = ag.title.toLowerCase().includes(q);
        const matchBio = (language === 'sq' ? ag.bio : ag.bioEn).toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchBio) return false;
      }
      return true;
    });
  }, [activeSpecialty, searchQuery, language]);

  return (
    <div className="agents-page">
      {/* ======================================================================
          HEADER SECTION
          ====================================================================== */}
      <section className="agents-hero-section">
        <div className="container">
          <nav className="agents-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">{t('nav_home')}</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{t('nav_agents')}</span>
          </nav>

          <div className="agents-hero-content">
            <div className="badge-label agents-badge">
              <GreenHouseBadge />
              <span>{t('agents_badge')}</span>
            </div>

            <h1 className="agents-main-title">
              {t('agents_title')}
            </h1>

            <p className="agents-main-subtitle">
              {t('agents_subtitle')}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="agents-controls-bar">
            {/* Specialty Pills */}
            <div className="agents-filter-pills" role="tablist">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  role="tab"
                  aria-selected={activeSpecialty === spec}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`agents-filter-pill ${activeSpecialty === spec ? 'active' : ''}`}
                >
                  {spec === "All" ? (language === 'sq' ? 'Të gjithë Agjentët' : 'All Agents') : spec}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="agents-search-box">
              <Search size={16} className="agents-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'sq' ? "Kërko agjentin sipas emrit..." : "Search agent by name..."}
                className="agents-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="agents-search-clear">
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          AGENTS GRID
          ====================================================================== */}
      <section className="agents-grid-section">
        <div className="container">
          <div className="agents-cards-grid">
            {filteredAgents.map((agent) => (
              <article 
                key={agent.id} 
                className="agent-card"
                onClick={() => onSelectAgent && onSelectAgent(agent.slug || agent.id)}
                role="button"
                tabIndex={0}
                aria-label={`Shiko profilin e ${agent.name}`}
              >
                {/* Avatar Banner Header */}
                <div className="agent-card-header">
                  <div className="agent-avatar-wrap">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name} 
                      className="agent-avatar-img" 
                    />
                    <span className="agent-verified-badge" title="Agjent i Çertifikuar">
                      <CheckCircle size={16} color="#ffffff" fill="#05B881" />
                    </span>
                  </div>

                  <div className="agent-meta-top">
                    <span className="agent-spec-chip">{agent.specialty}</span>
                    <span className="agent-exp-badge">
                      {language === 'sq' ? agent.experience : agent.experienceEn}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="agent-card-body">
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-job-title">{agent.title}</p>
                  <p className="agent-bio">
                    {language === 'sq' ? agent.bio : agent.bioEn}
                  </p>

                  {/* Stats Strip */}
                  <div className="agent-stats-row">
                    <div className="agent-stat">
                      <span className="agent-stat-val">{agent.activeListings}</span>
                      <span className="agent-stat-lbl">{language === 'sq' ? 'Prona Aktive' : 'Listings'}</span>
                    </div>
                    <div className="agent-stat-divider" />
                    <div className="agent-stat">
                      <span className="agent-stat-val">{agent.closedDeals}+</span>
                      <span className="agent-stat-lbl">{language === 'sq' ? 'Marrëveshje' : 'Deals Closed'}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="agent-languages-row">
                    <Globe size={14} className="agent-lang-icon" />
                    <span className="agent-lang-lbl">{t('agent_languages')}:</span>
                    <span className="agent-lang-list">{agent.languages.join(", ")}</span>
                  </div>

                  <div className="agent-card-divider" />

                  {/* Contact & Profile Buttons */}
                  <div className="agent-buttons-row">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectAgent) onSelectAgent(agent.slug || agent.id);
                      }}
                      className="btn btn-dark agent-view-profile-btn"
                    >
                      <span>{language === 'sq' ? 'Shiko Profilin' : 'View Profile'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenContact) onOpenContact({ agentName: agent.name });
                      }}
                      className="btn btn-green agent-cta-btn"
                    >
                      <MessageSquare size={15} />
                      <span>{t('agent_contact_btn')}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
