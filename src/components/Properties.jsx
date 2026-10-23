import React, { useState } from 'react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from './Icons';
import { propertiesData } from '../data/homelyData';
import './Properties.css';

export default function Properties({ selectedFilter, searchCriteria, onClearSearch, onSelectProperty }) {
  const [activeCategory, setActiveCategory] = useState(selectedFilter || "All");
  const [showAll, setShowAll] = useState(false);

  // Sync with prop if it changes
  React.useEffect(() => {
    if (selectedFilter) {
      setActiveCategory(selectedFilter);
    }
  }, [selectedFilter]);

  const filteredProperties = propertiesData.properties.filter(item => {
    // 1. Category filter
    if (activeCategory !== "All" && item.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // 2. Search criteria filter
    if (searchCriteria) {
      const { propertyType, priceRange, keyword } = searchCriteria;

      // Type
      if (propertyType && propertyType !== "All" && item.category.toLowerCase() !== propertyType.toLowerCase()) {
        return false;
      }

      // Keyword or Property ID
      if (keyword && keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const codeMatch = item.code && item.code.toLowerCase().includes(q);
        const titleMatch = item.title && item.title.toLowerCase().includes(q);
        const locMatch = item.location && item.location.toLowerCase().includes(q);
        const idMatch = item.id && item.id.toLowerCase().includes(q);
        if (!codeMatch && !titleMatch && !locMatch && !idMatch) {
          return false;
        }
      }

      // Price range
      if (priceRange && item.numericPrice) {
        if (priceRange === "under-550k" && item.numericPrice >= 550000) return false;
        if (priceRange === "550k-600k" && (item.numericPrice < 550000 || item.numericPrice > 600000)) return false;
        if (priceRange === "600k-700k" && (item.numericPrice < 600000 || item.numericPrice > 700000)) return false;
        if (priceRange === "700k-plus" && item.numericPrice < 700000) return false;
      }
    }

    return true;
  });

  const displayedProperties = showAll ? filteredProperties : filteredProperties;

  return (
    <section id="properties" className="properties-section">
      <div className="container">
        {/* Section Header */}
        <div className="properties-header">
          <div className="badge-label">
            <GreenHouseBadge />
            <span>{propertiesData.badge}</span>
          </div>
          <h2 className="properties-heading">{propertiesData.title}</h2>
          <p className="properties-subtitle">{propertiesData.subtitle}</p>

          {/* Filter Pills */}
          <div className="properties-filter-bar">
            {propertiesData.filterCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(cat);
                  if (onClearSearch) onClearSearch();
                }}
                className={`filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active Search Notification Banner */}
          {searchCriteria && (
            <div className="active-search-badge-bar">
              <span>
                Search results for: <strong>
                  {searchCriteria.keyword ? `"${searchCriteria.keyword}"` : ''} 
                  {searchCriteria.propertyType ? `[${searchCriteria.propertyType}]` : ''}
                  {searchCriteria.priceRange ? `[Price filter active]` : ''}
                </strong> ({filteredProperties.length} found)
              </span>
              <button 
                type="button" 
                onClick={onClearSearch} 
                className="clear-search-btn"
              >
                Clear Filter ✕
              </button>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {displayedProperties.length === 0 ? (
            <div className="no-properties-found">
              <p>No properties matched your search criteria.</p>
              <button 
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  if (onClearSearch) onClearSearch();
                }}
                className="btn btn-dark-pill"
              >
                Show All Properties
              </button>
            </div>
          ) : (
            displayedProperties.map((prop) => (
              <div 
                key={prop.id} 
                className="property-card"
                onClick={() => onSelectProperty && onSelectProperty(prop)}
                tabIndex={0}
                role="button"
                aria-label={`View details of ${prop.title}`}
              >
                <div className="property-img-wrapper">
                  {prop.code && (
                    <span className="property-code-badge" title="Property Identification Number">
                      ID: {prop.code}
                    </span>
                  )}
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="property-img" 
                    loading="lazy"
                  />
                </div>

                <div className="property-card-body">
                  <div className="property-info-row">
                    <div>
                      <h3 className="property-title">{prop.title}</h3>
                      <p className="property-location">{prop.location}</p>
                    </div>
                  </div>

                  <div className="property-price-tag">
                    <span>{prop.price}</span>
                  </div>

                  <div className="property-specs-divider" />

                  <div className="property-specs-row">
                    <div className="property-spec-item">
                      <BedIcon size={18} color="#4e6169" />
                      <span>{prop.bedrooms}</span>
                    </div>
                    <div className="property-spec-item">
                      <BathIcon size={18} color="#4e6169" />
                      <span>{prop.bathrooms}</span>
                    </div>
                    <div className="property-spec-item">
                      <AreaIcon size={18} color="#4e6169" />
                      <span>{prop.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Listing CTA */}
        <div className="properties-cta-wrap">
          <button 
            onClick={() => {
              setActiveCategory("All");
              if (onClearSearch) onClearSearch();
              setShowAll(true);
            }} 
            className="btn btn-green properties-cta-btn"
          >
            View all listing
          </button>
        </div>
      </div>
    </section>
  );
}
