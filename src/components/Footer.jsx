import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { HomelyLogo } from './Icons';
import { footerData, siteConfig } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer({ onOpenContact, onNavigate }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { language, t } = useLanguage();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const handleLink = (e, link) => {
    e.preventDefault();
    if (link.href === '/agents' || link.label.toLowerCase().includes('agent')) {
      if (onNavigate) {
        onNavigate('agents');
      }
    } else if (link.href === '#about-us' || link.label.toLowerCase().includes('rreth') || link.label.toLowerCase().includes('about')) {
      if (onNavigate) {
        onNavigate('about');
      }
    } else if (link.href === '#contact') {

      if (onNavigate) {
        onNavigate('contact');
      } else {
        onOpenContact();
      }
    } else if (link.href === '#properties') {
      if (onNavigate) {
        onNavigate('properties', null, link.label);
      }
    } else if (link.href === '#blog') {
      if (onNavigate) {
        onNavigate('blogs');
      }
    } else {
      const sectionId = link.href.replace('#', '');
      if (onNavigate) {
        onNavigate('home', sectionId);
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };


  return (
    <footer className="footer-root">
      <div className="container">
        {/* Top Banner CTA */}
        <div className="footer-top-cta">
          <h2 className="footer-cta-heading">{t('footer_cta_heading') || footerData.ctaHeading}</h2>
          <button 
            onClick={() => {
              if (onNavigate) {
                onNavigate('contact');
              } else {
                onOpenContact();
              }
            }} 
            className="btn btn-white footer-cta-btn"
          >
            {t('btn_get_in_touch') || footerData.ctaButton}
          </button>
        </div>

        <div className="footer-divider" />

        {/* Main Footer Links & Subscribe Grid */}
        <div className="footer-main-grid">
          {/* Brand & Subscribe */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <HomelyLogo dark={false} />
            </a>

            <div className="footer-subscribe-box">
              <h4 className="footer-subscribe-title">{t('footer_subscribe_title') || footerData.subscribeTitle}</h4>
              <p className="footer-subscribe-sub">{t('footer_subscribe_sub') || footerData.subscribeSubtitle}</p>
              
              <form onSubmit={handleSubscribe} className="footer-subscribe-form">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email" 
                  required
                  className="footer-email-input" 
                />
                <button 
                  type="submit" 
                  className={`footer-submit-btn ${isSubscribed ? 'success' : ''}`}
                  aria-label="Subscribe"
                >
                  {isSubscribed ? <Check size={18} /> : <ArrowRight size={18} />}
                </button>
              </form>

              {isSubscribed && (
                <span className="footer-sub-success">Thank you for subscribing!</span>
              )}
            </div>
          </div>

          {/* Column 2: Properties */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{t('nav_properties') || 'Properties'}</h4>
            <ul className="footer-links-list">
              {footerData.menuLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLink(e, link)}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pages */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{language === 'sq' ? 'Faqet' : 'Pages'}</h4>
            <ul className="footer-links-list">
              {footerData.pageLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLink(e, link)}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-divider" />

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2025 Forest-AL Real Estate —{' '}
            <a 
              href="https://quolytech.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-brand-link quolytech-credit"
            >
              Made by QuolyTech
            </a>
          </p>

          <div className="footer-legal-links">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service:\nAll content, images, and brand trademarks are property of Forest-AL."); }} className="footer-legal-link">
              {footerData.terms}
            </a>
            <span className="footer-legal-sep">•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy:\nWe respect your confidentiality and never sell personal information."); }} className="footer-legal-link">
              {footerData.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

