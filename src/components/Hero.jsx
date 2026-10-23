import React from 'react';
import { heroData } from '../data/homelyData';
import './Hero.css';

export default function Hero({ onOpenContact, onNavigateToProperties, onNavigateToProperty }) {
  return (
    <section id="hero" className="hero-section">
      {/* Background Image Container */}
      <div className="hero-bg-container">
        <img 
          src={heroData.bgImage} 
          alt="Futuristic Haven in Palm Springs" 
          className="hero-bg-img"
          loading="eager"
        />
        <div className="hero-gradient-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-content-container">
        <div className="hero-text-block">
          <span className="hero-location-tag">{heroData.location}</span>
          <h1 className="hero-title">
            <span>Futuristic</span>
            <span>Haven</span>
          </h1>

          <div className="hero-btn-group">
            <button 
              onClick={onOpenContact}
              className="hero-btn-primary"
            >
              {heroData.ctaText}
            </button>
            <button 
              onClick={() => {
                if (onNavigateToProperty) {
                  onNavigateToProperty("futuristic-haven");
                } else if (onNavigateToProperties) {
                  onNavigateToProperties("All");
                }
              }}
              className="hero-btn-secondary"
            >
              {heroData.detailsText}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Specs Bar - Docked at bottom right */}
      <div className="hero-specs-card">
        {/* Spec 1: Bedrooms */}
        <div className="hero-spec-item">
          <div className="hero-spec-icon-wrap">
            <img src="/icon-bed.svg" alt="Bedrooms" width="33" height="26" />
          </div>
          <span className="hero-spec-name">{heroData.specs.bedrooms.label}</span>
        </div>

        <div className="hero-spec-divider" />

        {/* Spec 2: Swingpool */}
        <div className="hero-spec-item">
          <div className="hero-spec-icon-wrap">
            <img src="/icon-pool.svg" alt="Swingpool" width="33" height="32" />
          </div>
          <span className="hero-spec-name">{heroData.specs.pool.label}</span>
        </div>

        <div className="hero-spec-divider" />

        {/* Spec 3: Parking Space */}
        <div className="hero-spec-item">
          <div className="hero-spec-icon-wrap">
            <img src="/icon-parking.svg" alt="Parking Space" width="24" height="24" />
          </div>
          <span className="hero-spec-name">{heroData.specs.parking.label}</span>
        </div>

        <div className="hero-spec-divider" />

        {/* Spec 4: Price */}
        <div className="hero-spec-price-item">
          <h4 className="hero-spec-price-value">{heroData.specs.price}</h4>
          <p className="hero-spec-price-label">{heroData.specs.priceLabel}</p>
        </div>
      </div>
    </section>
  );
}
