import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { GreenHouseBadge, BedIcon, BathIcon, CarIcon, BarIcon } from './Icons';
import { featuredPropertyData } from '../data/homelyData';
import './FeaturedProperty.css';

export default function FeaturedProperty({ onOpenContact, onNavigateToProperty }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getIcon = (type) => {
    switch (type) {
      case 'bed': return <BedIcon size={22} color="#172023" />;
      case 'bath': return <BathIcon size={22} color="#172023" />;
      case 'car': return <CarIcon size={22} color="#172023" />;
      case 'cocktail': return <BarIcon size={22} color="#172023" />;
      default: return <BedIcon size={22} color="#172023" />;
    }
  };

  return (
    <section id="featured-property" className="featured-section">
      <div className="container">
        {/* Main Showcase Image */}
        <div className="featured-hero-image-wrap">
          <img 
            src={featuredPropertyData.gallery[activeImageIndex].image} 
            alt={featuredPropertyData.gallery[activeImageIndex].alt} 
            className="featured-hero-img"
          />

          {/* Interactive Image Gallery Thumbnails Bar */}
          <div className="featured-thumbnails-bar">
            {featuredPropertyData.gallery.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`featured-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                aria-label={`Show ${item.alt}`}
              >
                <img src={item.image} alt={item.alt} className="featured-thumb-img" />
              </button>
            ))}
          </div>
        </div>

        {/* Featured Details Block */}
        <div className="featured-details-card">
          <div className="featured-meta-row">
            <div className="badge-label">
              <GreenHouseBadge />
              <span>{featuredPropertyData.badge}</span>
            </div>
          </div>

          <h2 className="featured-title">{featuredPropertyData.title}</h2>

          <div className="featured-location-wrap">
            <MapPin size={18} color="#172023" />
            <span>{featuredPropertyData.location}</span>
          </div>

          <p className="featured-description">{featuredPropertyData.description}</p>

          {/* Feature Specs Grid */}
          <div className="featured-specs-grid">
            {featuredPropertyData.specs.map((sp, idx) => (
              <div key={idx} className="featured-spec-box">
                <div className="featured-spec-icon-wrap">
                  {getIcon(sp.icon)}
                </div>
                <span className="featured-spec-name">{sp.label}</span>
              </div>
            ))}
          </div>

          {/* Price & Action Row */}
          <div className="featured-action-row">
            <button 
              onClick={onOpenContact} 
              className="btn btn-green featured-cta-btn"
            >
              {featuredPropertyData.ctaText}
            </button>

            <div className="featured-price-group">
              <span className="featured-price-value">{featuredPropertyData.price}</span>
              <span className="featured-price-badge">{featuredPropertyData.priceTag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
