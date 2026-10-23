import React, { useState, useEffect } from 'react';
import { Phone, Menu, Globe } from 'lucide-react';
import { HomelyLogo } from './Icons';
import { siteConfig } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar({ isLightPage = false, onNavigateHome, onOpenMenu, onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDarkNavbar = isLightPage || isScrolled;

  return (
    <header className={`navbar-wrapper ${showDarkNavbar ? 'scrolled' : 'transparent'}`}>
      <nav className={`navbar-container ${showDarkNavbar ? 'floating-pill' : 'at-top'}`}>
        {/* Left: Brand Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="navbar-logo" 
          aria-label="Forest-AL Real Estate Home"
        >
          <HomelyLogo dark={showDarkNavbar} />
        </a>

        {/* Right: Language Switcher, Phone & Menu Button */}
        <div className="navbar-right">
          {/* Requirement 2: Language Switcher Button (Defaults to Albanian) */}
          <button 
            type="button"
            onClick={toggleLanguage}
            className={`navbar-lang-pill ${showDarkNavbar ? 'lang-pill-dark' : 'lang-pill-light'}`}
            aria-label={language === 'sq' ? 'Kalo në Anglisht (EN)' : 'Kalo në Shqip (AL)'}
            title={language === 'sq' ? 'Gjuha aktuale: Shqip. Kliko për English.' : 'Current language: English. Click for Albanian.'}
          >
            <Globe size={14} className="lang-globe-icon" />
            <span className={`lang-tag ${language === 'sq' ? 'active' : ''}`}>AL</span>
            <span className="lang-sep">|</span>
            <span className={`lang-tag ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>

          <a 
            href={`tel:${siteConfig.phone}`} 
            className={`navbar-phone ${showDarkNavbar ? 'dark-text' : 'white-text'}`}
          >
            <Phone size={17} className="phone-icon" />
            <span className="phone-number">{siteConfig.phone}</span>
          </a>

          <div className="navbar-divider" />

          <button 
            onClick={onOpenMenu}
            className={`navbar-menu-btn ${showDarkNavbar ? 'menu-btn-dark' : 'menu-btn-white'}`}
            aria-label="Open menu navigation"
          >
            <Menu size={18} strokeWidth={2.2} />
            <span>{t('nav_menu') || 'Menu'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

