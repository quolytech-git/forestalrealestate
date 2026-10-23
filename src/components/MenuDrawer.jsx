import React, { useEffect } from 'react';
import { X, Globe } from 'lucide-react';
import { siteConfig } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './MenuDrawer.css';

export default function MenuDrawer({ isOpen, onClose, onNavigate, onOpenContact }) {
  const { language, toggleLanguage, t } = useLanguage();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { label: t('nav_home'), page: "home" },
    { label: t('nav_properties'), page: "properties" },
    { label: t('nav_agents'), page: "agents" },
    { label: t('nav_about'), page: "about" },
    { label: t('nav_blog'), page: "blogs" },
    { label: t('nav_contact'), page: "contact" }
  ];


  const handleLinkClick = (e, item) => {
    e.preventDefault();
    onClose();
    if (item.action === 'contact') {
      if (onNavigate) {
        onNavigate('contact');
      } else if (onOpenContact) {
        onOpenContact();
      }
    } else if (item.page) {
      if (onNavigate) {
        onNavigate(item.page, item.section);
      }
    }
  };


  return (
    <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <aside 
        className={`drawer-panel ${isOpen ? 'open' : ''}`} 
        onClick={(e) => e.stopPropagation()}
        aria-label="Navigation Drawer"
      >
        {/* Close Button */}
        <button 
          className="drawer-close-btn" 
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={20} color="#172023" strokeWidth={2.5} />
        </button>

        {/* Primary Nav Links */}
        <nav className="drawer-nav">
          <ul className="drawer-menu-list">
            {navLinks.map((item, index) => (
              <li key={index} className="drawer-menu-item">
                <a 
                  href={item.href || "#"} 
                  onClick={(e) => handleLinkClick(e, item)}
                  className="drawer-menu-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info inside Drawer */}
        <div className="drawer-info-group">
          {/* Language Selector */}
          <div className="drawer-info-block drawer-lang-block">
            <h4 className="drawer-info-title">{language === 'sq' ? 'Gjuha / Language' : 'Language'}</h4>
            <div className="drawer-lang-buttons">
              <button
                type="button"
                onClick={() => { if (language !== 'sq') toggleLanguage(); }}
                className={`drawer-lang-btn ${language === 'sq' ? 'active' : ''}`}
              >
                🇦🇱 Shqip (AL)
              </button>
              <button
                type="button"
                onClick={() => { if (language !== 'en') toggleLanguage(); }}
                className={`drawer-lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                🇬🇧 English (EN)
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="drawer-info-block">
            <h4 className="drawer-info-title">{t('nav_contact')}</h4>
            <a href={`mailto:${siteConfig.email}`} className="drawer-info-link">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="drawer-info-link">
              {siteConfig.phone}
            </a>
          </div>


          {/* Socials */}
          <div className="drawer-info-block">
            <h4 className="drawer-info-title">Socials</h4>
            <div className="drawer-socials">
              {siteConfig.socials.map((soc, idx) => (
                <a 
                  key={idx} 
                  href={soc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="drawer-social-link"
                >
                  {soc.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
