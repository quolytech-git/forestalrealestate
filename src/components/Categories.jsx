import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GreenHouseBadge } from './Icons';
import { categoriesData } from '../data/homelyData';
import './Categories.css';

export default function Categories({ onSelectCategory, onNavigateToProperties }) {
  const handleCategoryClick = (categoryTitle) => {
    if (onNavigateToProperties) {
      onNavigateToProperties(categoryTitle);
    } else if (onSelectCategory) {
      onSelectCategory(categoryTitle);
    }
  };

  const residential = categoriesData.categories.find(c => c.id === 'residential-homes') || categoriesData.categories[0];
  const luxuryVillas = categoriesData.categories.find(c => c.id === 'luxury-villas') || categoriesData.categories[1];
  const apartments = categoriesData.categories.find(c => c.id === 'apartments') || categoriesData.categories[2];
  const officeSpaces = categoriesData.categories.find(c => c.id === 'office-spaces') || categoriesData.categories[3];

  return (
    <section id="categories" className="categories-section" aria-label="Property Categories">
      {/* Decorative Diagonal Background Hairlines (Matching Framer Template) */}
      <div className="categories-bg-deco" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <line x1="-100" y1="200" x2="600" y2="900" stroke="rgba(7, 190, 138, 0.16)" strokeWidth="1.2" />
          <line x1="120" y1="-100" x2="420" y2="700" stroke="rgba(7, 190, 138, 0.12)" strokeWidth="1" />
        </svg>
      </div>

      <div className="container categories-container">
        <div className="categories-bento-grid">
          
          {/* ========================================================
              ROW 1 - LEFT: Section Intro Block (Heading, Subtitle, CTA)
             ======================================================== */}
          <div className="categories-intro-card">
            <div className="badge-label categories-badge">
              <GreenHouseBadge />
              <span>{categoriesData.badge}</span>
            </div>

            <h2 className="categories-heading">
              Explore best properties with expert services.
            </h2>

            <p className="categories-subtitle">
              {categoriesData.subtitle}
            </p>

            <button 
              type="button"
              onClick={() => {
                if (onNavigateToProperties) {
                  onNavigateToProperties("All");
                }
              }}
              className="categories-cta-btn"
              aria-label="View all properties"
            >
              <span>{categoriesData.buttonText || "View Properties"}</span>
            </button>
          </div>

          {/* ========================================================
              ROW 1 - RIGHT: Category 1 (Residential Homes)
             ======================================================== */}
          <div 
            className="category-card category-card-residential"
            onClick={() => handleCategoryClick(residential.title)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${residential.title}`}
          >
            <div className="category-img-wrap">
              <img 
                src={residential.image} 
                alt={residential.title} 
                className="category-img" 
                loading="lazy"
              />
              <div className="category-overlay" />
            </div>

            {/* Top Right Action Circle */}
            <div className="category-arrow-circle" aria-hidden="true">
              <ArrowRight size={18} className="category-arrow-icon" />
            </div>

            {/* Bottom Content Overlay */}
            <div className="category-card-content">
              <h3 className="category-title">{residential.title}</h3>
              <p className="category-desc">
                {residential.description || "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living."}
              </p>
            </div>
          </div>

          {/* ========================================================
              ROW 2 - LEFT: Category 2 (Luxury Villas - Wide Card)
             ======================================================== */}
          <div 
            className="category-card category-card-villas"
            onClick={() => handleCategoryClick(luxuryVillas.title)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${luxuryVillas.title}`}
          >
            <div className="category-img-wrap">
              <img 
                src={luxuryVillas.image} 
                alt={luxuryVillas.title} 
                className="category-img" 
                loading="lazy"
              />
              <div className="category-overlay" />
            </div>

            <div className="category-arrow-circle" aria-hidden="true">
              <ArrowRight size={18} className="category-arrow-icon" />
            </div>

            <div className="category-card-content">
              <h3 className="category-title">{luxuryVillas.title}</h3>
              <p className="category-desc">
                {luxuryVillas.description || "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living."}
              </p>
            </div>
          </div>

          {/* ========================================================
              ROW 2 - MIDDLE: Category 3 (Apartments - Portrait Card)
             ======================================================== */}
          <div 
            className="category-card category-card-apartments"
            onClick={() => handleCategoryClick(apartments.title)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${apartments.title}`}
          >
            <div className="category-img-wrap">
              <img 
                src={apartments.image} 
                alt={apartments.title} 
                className="category-img" 
                loading="lazy"
              />
              <div className="category-overlay" />
            </div>

            <div className="category-arrow-circle" aria-hidden="true">
              <ArrowRight size={18} className="category-arrow-icon" />
            </div>

            <div className="category-card-content">
              <h3 className="category-title">{apartments.title}</h3>
              <p className="category-desc">
                Modern high-rise architectural marvels tailored for sophisticated urban living.
              </p>
            </div>
          </div>

          {/* ========================================================
              ROW 2 - RIGHT: Category 4 (Office Spaces - Portrait Card)
             ======================================================== */}
          <div 
            className="category-card category-card-offices"
            onClick={() => handleCategoryClick(officeSpaces.title)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${officeSpaces.title}`}
          >
            <div className="category-img-wrap">
              <img 
                src={officeSpaces.image} 
                alt={officeSpaces.title} 
                className="category-img" 
                loading="lazy"
              />
              <div className="category-overlay" />
            </div>

            <div className="category-arrow-circle" aria-hidden="true">
              <ArrowRight size={18} className="category-arrow-icon" />
            </div>

            <div className="category-card-content">
              <h3 className="category-title">{officeSpaces.title}</h3>
              <p className="category-desc">
                Executive commercial spaces engineered for team collaboration and performance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
