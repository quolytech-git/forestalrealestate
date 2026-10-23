import React from 'react';
import { Award, ShieldCheck, Compass, Users, Sparkles, Building2, Trees } from 'lucide-react';
import { GreenHouseBadge } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import './AboutUs.css';

export default function AboutUs({ onOpenContact, onNavigateProperties, onNavigateAbout }) {
  const { t, language } = useLanguage();

  const stats = [
    { value: "15+", label: t('about_stat_exp') },
    { value: "450+", label: t('about_stat_properties') },
    { value: "99%", label: t('about_stat_satisfaction') },
    { value: "25+", label: t('about_stat_agents') }
  ];

  const pillars = [
    {
      icon: <Trees size={22} className="pillar-icon" />,
      title: t('about_pillar_1_title'),
      desc: t('about_pillar_1_desc')
    },
    {
      icon: <ShieldCheck size={22} className="pillar-icon" />,
      title: t('about_pillar_2_title'),
      desc: t('about_pillar_2_desc')
    },
    {
      icon: <Compass size={22} className="pillar-icon" />,
      title: t('about_pillar_3_title'),
      desc: t('about_pillar_3_desc')
    }
  ];

  return (
    <section id="about-us" className="about-us-section" aria-label="Rreth Nesh">
      <div className="container">
        {/* Main 2-Column Showcase */}
        <div className="about-us-grid">
          {/* Left Column: Visual Media Collage */}
          <div className="about-media-col">
            <div className="about-main-img-card">
              <img 
                src="/images/site/8HTNh4ap2maatw0wkHq9XEIqjHM.jpg" 
                alt="Forest-AL Luxury Villa Architecture" 
                className="about-main-img"
              />
              <div className="about-experience-badge">
                <span className="exp-num">15+</span>
                <span className="exp-text">{language === 'sq' ? 'Vite Suksesi në Patundshmëri' : 'Years of Real Estate Distinction'}</span>
              </div>
            </div>

            <div className="about-secondary-img-card">
              <img 
                src="/images/site/PODFQRwgAeQkguVu6307kqQRvY.jpg" 
                alt="Forest-AL Nature Villa Living" 
                className="about-sec-img"
              />
            </div>
          </div>

          {/* Right Column: Story & Content */}
          <div className="about-content-col">
            <div className="badge-label about-badge">
              <GreenHouseBadge />
              <span>{t('about_badge')}</span>
            </div>

            <h2 className="about-title">
              {t('about_title')}
            </h2>

            <p className="about-paragraph lead">
              {t('about_desc_1')}
            </p>

            <p className="about-paragraph">
              {t('about_desc_2')}
            </p>

            {/* Three Pillars */}
            <div className="about-pillars-list">
              {pillars.map((pil, idx) => (
                <div key={idx} className="about-pillar-item">
                  <div className="pillar-icon-box">
                    {pil.icon}
                  </div>
                  <div className="pillar-text-wrap">
                    <h4 className="pillar-title">{pil.title}</h4>
                    <p className="pillar-desc">{pil.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="about-action-row">
              <button 
                onClick={onOpenContact} 
                className="btn btn-green about-cta-btn"
              >
                <span>{t('btn_get_in_touch')}</span>
              </button>
              <button 
                onClick={onNavigateAbout || onNavigateProperties} 
                className="btn btn-dark about-secondary-btn"
              >
                <span>{language === 'sq' ? 'Zbulo Faqen e Plotë Rreth Nesh' : 'Explore Full About Us Page'}</span>
              </button>
            </div>
          </div>
        </div>


        {/* Stats Row Strip */}
        <div className="about-stats-strip">
          {stats.map((st, idx) => (
            <div key={idx} className="about-stat-box">
              <span className="stat-val">{st.value}</span>
              <span className="stat-lbl">{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
