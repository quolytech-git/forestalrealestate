import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from './Icons';
import { propertiesData } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './HomeProperties.css';

export default function HomeProperties({ 
  onNavigateToProperties, 
  onNavigateProperties, 
  onSelectProperty,
  onNavigateToProperty 
}) {
  const { t, language } = useLanguage();

  const handleNavigateAll = () => {
    if (onNavigateProperties) onNavigateProperties();
    else if (onNavigateToProperties) onNavigateToProperties();
  };

  const handleSelect = (slugOrId) => {
    if (onNavigateToProperty) onNavigateToProperty(slugOrId);
    else if (onSelectProperty) onSelectProperty(slugOrId);
  };

  // Take first 3 properties for homepage showcase
  const showcaseProperties = propertiesData.properties.slice(0, 3);

  return (
    <section id="featured-properties-grid" className="home-properties-section">
      <div className="container">
        {/* Section Header */}
        <div className="home-props-header">
          <div className="home-props-intro">
            <div className="badge-label">
              <GreenHouseBadge />
              <span>{language === 'sq' ? 'Përzgjedhje Ekskluzive' : 'Exclusive Portfolio'}</span>
            </div>
            <h2 className="home-props-title">{t('featured_home_title')}</h2>
            <p className="home-props-subtitle">{t('featured_home_subtitle')}</p>
          </div>

          <button 
            onClick={handleNavigateAll} 
            className="btn btn-green home-props-view-all-btn"
          >
            <span>{t('featured_view_all')}</span>
            <ArrowRight size={16} />
          </button>
        </div>


        {/* 3 Cards Grid */}
        <div className="home-props-grid">
          {showcaseProperties.map((prop) => (
            <article 
              key={prop.id}
              className="home-prop-card"
              onClick={() => handleSelect(prop.slug || prop.id)}
              tabIndex={0}
              role="button"
              aria-label={`Shiko ${prop.title}`}
            >
              <div className="home-prop-img-wrap">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="home-prop-img" 
                  loading="lazy"
                />
                <div className="home-prop-overlay" />
                <span className="home-prop-cat-badge">{prop.category}</span>
                {prop.status && (
                  <span className="home-prop-status-tag">{prop.status}</span>
                )}
              </div>

              <div className="home-prop-body">
                <div className="home-prop-title-row">
                  <h3 className="home-prop-title">{prop.title}</h3>
                  <div className="home-prop-price-pill">
                    <span>{prop.price}</span>
                  </div>
                </div>

                <p className="home-prop-location">
                  <MapPin size={14} className="home-prop-pin" />
                  <span>{prop.location}</span>
                </p>

                <div className="home-prop-divider" />

                <div className="home-prop-specs">
                  <div className="home-spec-item" title="Bedrooms">
                    <BedIcon size={16} color="#475A61" />
                    <span>{prop.bedrooms}</span>
                  </div>
                  <div className="home-spec-item" title="Bathrooms">
                    <BathIcon size={16} color="#475A61" />
                    <span>{prop.bathrooms}</span>
                  </div>
                  <div className="home-spec-item" title="Area">
                    <AreaIcon size={16} color="#475A61" />
                    <span>{prop.area}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="home-props-mobile-btn-wrap">
          <button 
            onClick={handleNavigateAll} 
            className="btn btn-green home-props-mobile-btn"
          >
            <span>{t('featured_view_all')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
