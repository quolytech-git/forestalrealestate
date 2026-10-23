import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Grid, 
  LayoutList, 
  RotateCcw,
  Sparkles,
  Car
} from 'lucide-react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from '../components/Icons';
import { propertiesData } from '../data/homelyData';
import './PropertiesPage.css';

export default function PropertiesPage({ 
  initialFilter = "All", 
  initialSearch = null,
  onSelectProperty, 
  onOpenContact,
  onNavigateHome
}) {
  // Filter States
  const [activeCategory, setActiveCategory] = useState(initialFilter || "All");
  const [keyword, setKeyword] = useState(initialSearch?.keyword || "");
  const [priceRange, setPriceRange] = useState(initialSearch?.priceRange || "all");
  const [bedrooms, setBedrooms] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // "grid" (3-col) or "detailed" (2-col large)
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync initial props if changed
  React.useEffect(() => {
    if (initialFilter && initialFilter !== "All") {
      setActiveCategory(initialFilter);
    }
    if (initialSearch?.keyword) {
      setKeyword(initialSearch.keyword);
    }
  }, [initialFilter, initialSearch]);

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory("All");
    setKeyword("");
    setPriceRange("all");
    setBedrooms("all");
    setSortBy("featured");
  };

  const isAnyFilterActive = 
    activeCategory !== "All" || 
    keyword.trim() !== "" || 
    priceRange !== "all" || 
    bedrooms !== "all";

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return propertiesData.properties
      .filter((prop) => {
        // 1. Category
        if (activeCategory !== "All" && prop.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }

        // 2. Keyword or Property ID (e.g. HM-101, Miami, Villa)
        if (keyword.trim()) {
          const q = keyword.toLowerCase().trim();
          const matchCode = prop.code && prop.code.toLowerCase().includes(q);
          const matchTitle = prop.title && prop.title.toLowerCase().includes(q);
          const matchLoc = prop.location && prop.location.toLowerCase().includes(q);
          const matchId = prop.id && prop.id.toLowerCase().includes(q);
          if (!matchCode && !matchTitle && !matchLoc && !matchId) {
            return false;
          }
        }

        // 3. Price Range
        if (priceRange !== "all" && prop.numericPrice) {
          if (priceRange === "under-600k" && prop.numericPrice >= 600000) return false;
          if (priceRange === "600k-800k" && (prop.numericPrice < 600000 || prop.numericPrice > 800000)) return false;
          if (priceRange === "800k-1500k" && (prop.numericPrice < 800000 || prop.numericPrice > 1500000)) return false;
          if (priceRange === "1500k-plus" && prop.numericPrice < 1500000) return false;
        }

        // 4. Bedrooms
        if (bedrooms !== "all") {
          const minBeds = parseInt(bedrooms, 10);
          if (prop.bedCount && prop.bedCount < minBeds) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.numericPrice || 0) - (b.numericPrice || 0);
        if (sortBy === "price-high") return (b.numericPrice || 0) - (a.numericPrice || 0);
        if (sortBy === "area") return (b.areaNumeric || 0) - (a.areaNumeric || 0);
        return 0; // "featured" keeps original order
      });
  }, [activeCategory, keyword, priceRange, bedrooms, sortBy]);

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  return (
    <div className="properties-page">
      {/* ======================================================================
          PAGE HEADER & BREADCRUMB
          ====================================================================== */}
      <section className="properties-page-hero">
        <div className="container">
          <nav className="properties-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Properties</span>
          </nav>

          <div className="properties-hero-content">
            <div className="badge-label properties-hero-badge">
              <GreenHouseBadge />
              <span>Properties Catalog</span>
            </div>

            <h1 className="properties-page-title">
              Discover inspiring designed homes.
            </h1>

            <p className="properties-page-subtitle">
              Experience elegance and comfort with our exclusive collection of luxury villas, residential homes, penthouses, and executive office spaces.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          TOP-OF-PAGE GOOD LOOKING FILTER BAR
          ====================================================================== */}
      <section className="properties-filter-section" aria-label="Properties Filter Controls">
        <div className="container">
          <div className="properties-filter-card">
            
            {/* Top Row: Category Tabs */}
            <div className="filter-category-row">
              <div className="filter-category-pills">
                {propertiesData.filterCategories.map((cat, idx) => {
                  const count = cat === "All" 
                    ? propertiesData.properties.length 
                    : propertiesData.properties.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(cat)}
                      className={`filter-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                    >
                      <span>{cat}</span>
                      <span className="cat-count-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Layout Switcher (Grid vs Detailed) */}
              <div className="view-mode-switcher">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  title="3-Column Compact Grid"
                  aria-label="Grid View"
                >
                  <Grid size={17} />
                </button>
                <button 
                  onClick={() => setViewMode("detailed")}
                  className={`view-btn ${viewMode === "detailed" ? "active" : ""}`}
                  title="2-Column Detailed Showcase"
                  aria-label="Detailed View"
                >
                  <LayoutList size={17} />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="filter-divider" />

            {/* Bottom Row: Search, Price, Beds, Sort & Reset */}
            <div className="filter-controls-row">
              
              {/* 1. Keyword & ID Search */}
              <div className="filter-search-wrap">
                <Search size={17} className="filter-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, location, or Property ID (e.g. HM-101)..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="filter-search-input"
                  aria-label="Search properties by keyword or ID"
                />
                {keyword && (
                  <button 
                    onClick={() => setKeyword("")} 
                    className="filter-clear-input-btn"
                    aria-label="Clear keyword search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* 2. Price Range Dropdown */}
              <div className="filter-select-wrap">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="filter-dropdown-select"
                  aria-label="Filter by price range"
                >
                  <option value="all">All Prices</option>
                  <option value="under-600k">Under $600,000</option>
                  <option value="600k-800k">$600,000 – $800,000</option>
                  <option value="800k-1500k">$800,000 – $1,500,000</option>
                  <option value="1500k-plus">$1,500,000+</option>
                </select>
              </div>

              {/* 3. Bedrooms Dropdown */}
              <div className="filter-select-wrap">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="filter-dropdown-select"
                  aria-label="Filter by bedrooms"
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              {/* 4. Sort Dropdown */}
              <div className="filter-select-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-dropdown-select"
                  aria-label="Sort properties"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Size: Largest Area</option>
                </select>
              </div>

              {/* 5. Reset All Button */}
              {isAnyFilterActive && (
                <button 
                  onClick={handleResetFilters}
                  className="filter-reset-btn"
                  title="Reset all filters"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Active Criteria Chips Strip */}
            {isAnyFilterActive && (
              <div className="active-chips-strip">
                <span className="active-chips-label">Active filters:</span>
                {activeCategory !== "All" && (
                  <span className="filter-chip">
                    Category: {activeCategory}
                    <button onClick={() => setActiveCategory("All")} aria-label="Remove category filter">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {keyword && (
                  <span className="filter-chip">
                    Query: "{keyword}"
                    <button onClick={() => setKeyword("")} aria-label="Remove search query">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {priceRange !== "all" && (
                  <span className="filter-chip">
                    Price: {priceRange}
                    <button onClick={() => setPriceRange("all")} aria-label="Remove price filter">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {bedrooms !== "all" && (
                  <span className="filter-chip">
                    Beds: {bedrooms}+
                    <button onClick={() => setBedrooms("all")} aria-label="Remove bedrooms filter">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

          </div>

          {/* Results Summary Bar */}
          <div className="results-summary-row">
            <p className="results-count-text">
              Showing <strong>{displayedProperties.length}</strong> of <strong>{filteredProperties.length}</strong> luxury properties
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          BIG DETAILED PROPERTY SHOWCASE GRID
          ====================================================================== */}
      <section className="properties-listing-section">
        <div className="container">
          {filteredProperties.length === 0 ? (
            <div className="no-properties-box">
              <div className="no-props-icon-wrap">
                <SlidersHorizontal size={36} color="#798a91" />
              </div>
              <h3 className="no-props-title">No Matching Properties Found</h3>
              <p className="no-props-desc">
                We couldn't find any properties matching your current filter criteria. Try adjusting your keywords, price range, or category.
              </p>
              <button onClick={handleResetFilters} className="btn btn-green reset-cta-btn">
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className={`properties-cards-layout ${viewMode === "detailed" ? "detailed-layout" : "grid-layout"}`}>
              {displayedProperties.map((prop) => (
                <article 
                  key={prop.id} 
                  className={`big-property-card ${viewMode === "detailed" ? "card-detailed-view" : "card-grid-view"}`}
                  onClick={() => onSelectProperty && onSelectProperty(prop)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View detailed specifications for ${prop.title}`}
                >
                  {/* Media Wrapper */}
                  <div className="big-prop-img-wrapper">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="big-prop-img"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="big-prop-img-overlay" />

                    {/* Top Floating Badges */}
                    <div className="big-prop-badges-top">
                      <div className="badge-group-left">
                        {prop.code && (
                          <span className="prop-id-tag">
                            ID: {prop.code}
                          </span>
                        )}
                        <span className="prop-cat-tag">
                          {prop.category}
                        </span>
                      </div>
                      {prop.status && (
                        <span className="prop-status-tag">
                          <Sparkles size={12} />
                          {prop.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="big-prop-body">
                    {/* Header Row: Title & Price Tag */}
                    <div className="big-prop-header-row">
                      <div className="title-and-loc">
                        <h2 className="big-prop-title">{prop.title}</h2>
                        <p className="big-prop-location">
                          <MapPin size={15} className="loc-pin-icon" />
                          <span>{prop.location}</span>
                        </p>
                      </div>

                      <div className="big-prop-price-badge">
                        <span className="price-num">{prop.price}</span>
                      </div>
                    </div>

                    {/* Description Excerpt */}
                    <p className="big-prop-desc">
                      {prop.description}
                    </p>

                    {/* Divider */}
                    <div className="big-prop-divider" />

                    {/* Detailed Specifications Row */}
                    <div className="big-prop-specs-grid">
                      <div className="prop-spec-chip" title="Bedrooms">
                        <BedIcon size={17} color="#3e525b" />
                        <span>{prop.bedrooms}</span>
                      </div>
                      <div className="prop-spec-chip" title="Bathrooms">
                        <BathIcon size={17} color="#3e525b" />
                        <span>{prop.bathrooms}</span>
                      </div>
                      <div className="prop-spec-chip" title="Living Area">
                        <AreaIcon size={17} color="#3e525b" />
                        <span>{prop.area}</span>
                      </div>
                      {prop.parking && (
                        <div className="prop-spec-chip" title="Parking Space">
                          <Car size={16} color="#3e525b" />
                          <span>{prop.parking}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="big-prop-actions-footer">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProperty) onSelectProperty(prop);
                        }}
                        className="btn-view-prop-details"
                      >
                        <span>View Details</span>
                        <ArrowRight size={15} />
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenContact) onOpenContact(prop);
                        }}
                        className="btn-inquire-tour"
                      >
                        <span>Schedule Tour</span>
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredProperties.length && (
            <div className="load-more-container">
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="btn-load-more"
              >
                <span>Load More Properties</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
