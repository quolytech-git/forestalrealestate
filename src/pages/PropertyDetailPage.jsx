import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Waves, 
  Key, 
  Lightbulb, 
  Cpu, 
  Clock, 
  Sparkles, 
  Sun, 
  ShieldCheck, 
  CloudSun, 
  ArrowRight, 
  Car,
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';
import { BedIcon, BathIcon, AreaIcon, GreenHouseBadge } from '../components/Icons';
import { propertiesData } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './PropertyDetailPage.css';

export default function PropertyDetailPage({ 
  propertySlug, 
  onNavigateHome, 
  onNavigateProperties, 
  onSelectProperty,
  onOpenContact 
}) {
  const { t, language } = useLanguage();
  // Find current property by slug or id
  const currentProperty = propertiesData.properties.find(
    (p) => p.slug === propertySlug || p.id === propertySlug
  ) || propertiesData.properties[1]; // fallback to Mountain Retreat Villa

  // Image Gallery active selection
  const gallery = currentProperty.gallery && currentProperty.gallery.length >= 4 
    ? currentProperty.gallery 
    : [
        currentProperty.image,
        "/images/site/8HTNh4ap2maatw0wkHq9XEIqjHM.jpg",
        "/images/site/PODFQRwgAeQkguVu6307kqQRvY.jpg",
        "/images/site/d8WIpr8sGjaXLg92wgLTYhyryk.jpg"
      ];

  const [activeMainImg, setActiveMainImg] = useState(gallery[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync main image if property changes
  useEffect(() => {
    setActiveMainImg(gallery[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [propertySlug]);

  // Similar properties (exclude current property, pick 3)
  const similarProperties = propertiesData.properties
    .filter((p) => p.id !== currentProperty.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="property-detail-page">
      {/* ======================================================================
          TOP HEADER: Breadcrumb & Title Row
          ====================================================================== */}
      <section className="property-detail-header-section">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="property-detail-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-sep">/</span>
            <button onClick={onNavigateProperties} className="breadcrumb-link">Properties</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">{currentProperty.title}</span>
          </nav>

          {/* Header Main Block */}
          <div className="property-header-main-row">
            {/* Left: Category Badge, Title, Location */}
            <div className="property-header-left">
              <div className="badge-label property-cat-badge">
                <GreenHouseBadge />
                <span>{currentProperty.category}</span>
              </div>

              <h1 className="property-detail-title">
                {currentProperty.title}
              </h1>

              <div className="property-detail-loc-wrap">
                <MapPin size={17} className="property-loc-pin" />
                <span className="property-loc-text">{currentProperty.location}</span>
                {currentProperty.code && (
                  <span className="property-code-tag">ID: {currentProperty.code}</span>
                )}
              </div>
            </div>

            {/* Right: Quick Specs Strip */}
            <div className="property-header-right-specs">
              <div className="header-spec-item" title="Bedrooms">
                <BedIcon size={22} color="#172023" />
                <span className="header-spec-val">{currentProperty.bedrooms}</span>
              </div>

              <div className="header-spec-item" title="Bathrooms">
                <BathIcon size={22} color="#172023" />
                <span className="header-spec-val">{currentProperty.bathrooms}</span>
              </div>

              <div className="header-spec-item" title="Living Area">
                <AreaIcon size={22} color="#172023" />
                <span className="header-spec-val">{currentProperty.area}</span>
              </div>

              {currentProperty.parking && (
                <div className="header-spec-item" title="Garage / Parking">
                  <Car size={20} color="#172023" />
                  <span className="header-spec-val">{currentProperty.parking}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          IMAGE GALLERY: 1 Large Hero + 3 Thumbnails Grid
          ====================================================================== */}
      <section className="property-gallery-section" aria-label="Property Media Gallery">
        <div className="container">
          <div className="property-gallery-grid">
            
            {/* Left Main Large Hero View */}
            <div className="gallery-main-hero">
              <img 
                src={activeMainImg} 
                alt={`${currentProperty.title} primary view`} 
                className="gallery-main-img"
              />
              <div className="gallery-img-gradient" />
              
              <button 
                type="button" 
                onClick={handleShare}
                className="gallery-share-btn" 
                title="Share property listing"
              >
                {copiedLink ? <Check size={16} color="#07be8a" /> : <Share2 size={16} />}
                <span>{copiedLink ? "Link Copied!" : "Share"}</span>
              </button>
            </div>

            {/* Right Column with 3 Secondary Images (Top Wide + Bottom 2 Split) */}
            <div className="gallery-thumbs-col">
              {/* Top Wide Thumbnail */}
              <div 
                className={`gallery-thumb-wrap thumb-wide ${activeMainImg === gallery[1] ? 'is-active' : ''}`}
                onClick={() => setActiveMainImg(gallery[1])}
                role="button"
                tabIndex={0}
                aria-label="View architectural patio"
              >
                <img 
                  src={gallery[1]} 
                  alt={`${currentProperty.title} patio showcase`} 
                  className="gallery-thumb-img" 
                />
              </div>

              {/* Bottom Row: 2 Squares */}
              <div className="gallery-bottom-pair">
                <div 
                  className={`gallery-thumb-wrap thumb-square ${activeMainImg === gallery[2] ? 'is-active' : ''}`}
                  onClick={() => setActiveMainImg(gallery[2])}
                  role="button"
                  tabIndex={0}
                  aria-label="View interior living lounge"
                >
                  <img 
                    src={gallery[2]} 
                    alt={`${currentProperty.title} lounge view`} 
                    className="gallery-thumb-img" 
                  />
                </div>

                <div 
                  className={`gallery-thumb-wrap thumb-square ${activeMainImg === gallery[3] ? 'is-active' : ''}`}
                  onClick={() => setActiveMainImg(gallery[3])}
                  role="button"
                  tabIndex={0}
                  aria-label="View entrance architecture"
                >
                  <img 
                    src={gallery[3]} 
                    alt={`${currentProperty.title} entrance detail`} 
                    className="gallery-thumb-img" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================================
          MAIN CONTENT 2-COLUMN BODY (Details on Left, Sticky Sidebar on Right)
          ====================================================================== */}
      <section className="property-body-section">
        <div className="container">
          <div className="property-body-layout">
            
            {/* ----------------------------------------------------------------
                LEFT COLUMN: Property Narrative & Architectural Details
                ---------------------------------------------------------------- */}
            <div className="property-main-details-col">
              
              {/* 1. Property Details Highlights Strip */}
              <div className="property-details-block">
                <h2 className="section-sub-title">Property details</h2>
                
                <div className="property-highlights-list">
                  {/* Highlight 1: Private Pool */}
                  <div className="highlight-item-row">
                    <div className="highlight-icon-box">
                      <Waves size={20} className="hl-icon" />
                    </div>
                    <div className="highlight-text-wrap">
                      <h4 className="highlight-row-title">
                        {currentProperty.keyHighlights?.[0]?.title || "Property details"}
                      </h4>
                      <p className="highlight-row-desc">
                        {currentProperty.keyHighlights?.[0]?.desc || "One of the few homes in the area with a private pool."}
                      </p>
                    </div>
                  </div>

                  {/* Highlight 2: Smart home access */}
                  <div className="highlight-item-row">
                    <div className="highlight-icon-box">
                      <Key size={20} className="hl-icon" />
                    </div>
                    <div className="highlight-text-wrap">
                      <h4 className="highlight-row-title">
                        {currentProperty.keyHighlights?.[1]?.title || "Smart home access"}
                      </h4>
                      <p className="highlight-row-desc">
                        {currentProperty.keyHighlights?.[1]?.desc || "Easily check yourself in with a modern keypad system."}
                      </p>
                    </div>
                  </div>

                  {/* Highlight 3: Energy efficient */}
                  <div className="highlight-item-row">
                    <div className="highlight-icon-box">
                      <Lightbulb size={20} className="hl-icon" />
                    </div>
                    <div className="highlight-text-wrap">
                      <h4 className="highlight-row-title">
                        {currentProperty.keyHighlights?.[2]?.title || "Energy efficient"}
                      </h4>
                      <p className="highlight-row-desc">
                        {currentProperty.keyHighlights?.[2]?.desc || "Built in 2025 with sustainable and smart-home features."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-divider" />

              {/* 2. Narrative Story Paragraphs */}
              <div className="property-narrative-block">
                <p className="narrative-paragraph intro-paragraph">
                  {currentProperty.story?.intro || currentProperty.description}
                </p>

                <h3 className="narrative-heading">
                  {currentProperty.story?.locationTitle || "A Prime Location with Stunning Views"}
                </h3>
                <p className="narrative-paragraph">
                  {currentProperty.story?.locationText || "Perched atop picturesque hills, this villa boasts panoramic views of the surrounding valleys and serene sunsets. Conveniently located near essential amenities yet secluded enough to provide privacy, residents enjoy the best of both worlds."}
                </p>

                <h3 className="narrative-heading">
                  {currentProperty.story?.architectureTitle || "Exquisite Architectural Design"}
                </h3>
                <p className="narrative-paragraph">
                  {currentProperty.story?.architectureText || "Designed with sophistication and style, each villa features:"}
                </p>

                <ul className="narrative-bullets-list">
                  {(currentProperty.story?.bullets || [
                    "Modern Open Layouts: Spacious, light-filled interiors with high ceilings and large windows.",
                    "Premium Finishes: Imported marble flooring, designer fixtures, and customizable interior options.",
                    "Expansive Outdoor Spaces: Private terraces, landscaped gardens, and infinity pools for ultimate relaxation."
                  ]).map((bullet, idx) => (
                    <li key={idx} className="narrative-bullet-item">
                      <span className="bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-divider" />

              {/* 3. What this property offers (Amenities Grid) */}
              <div className="property-amenities-block">
                <h3 className="section-sub-title">What this property offers</h3>
                
                <div className="amenities-chips-grid">
                  <div className="amenity-chip-item">
                    <Cpu size={18} className="amenity-icon" />
                    <span>Smart Home Integration</span>
                  </div>

                  <div className="amenity-chip-item">
                    <Clock size={18} className="amenity-icon" />
                    <span>Spacious Living Areas</span>
                  </div>

                  <div className="amenity-chip-item">
                    <Sparkles size={18} className="amenity-icon" />
                    <span>Energy Efficiency</span>
                  </div>

                  <div className="amenity-chip-item">
                    <Sun size={18} className="amenity-icon" />
                    <span>Natural Light</span>
                  </div>

                  <div className="amenity-chip-item">
                    <ShieldCheck size={18} className="amenity-icon" />
                    <span>Security Systems</span>
                  </div>

                  <div className="amenity-chip-item">
                    <CloudSun size={18} className="amenity-icon" />
                    <span>Outdoor Spaces</span>
                  </div>
                </div>
              </div>

              {/* 4. Property Video Tour Showcase */}
              <div className="property-video-block">
                <div className="property-video-header-row">
                  <h3 className="section-sub-title">{t('prop_video_title')}</h3>
                  <span className="video-hd-pill">4K Ultra HD</span>
                </div>
                <p className="property-video-desc">
                  {t('prop_video_desc')}
                </p>

                <div className="property-video-card">
                  <video 
                    controls 
                    preload="metadata"
                    poster={currentProperty.image}
                    className="property-video-player"
                    aria-label={`Video tour for ${currentProperty.title}`}
                  >
                    <source src={currentProperty.videoUrl || "/videos/YBVRytrmInuZC9iFvG4acDpplg.mp4"} type="video/mp4" />
                    <source src="/videos/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              </div>

              <div className="detail-divider" />

              {/* 5. Location Map Card */}
              <div className="property-location-block">
                <h3 className="section-sub-title">{t('prop_location_title')}</h3>
                
                <div className="property-map-card">
                  {/* Stylized Interactive Map Mockup */}
                  <div className="map-canvas-wrapper">
                    <iframe 
                      title={`Map for ${currentProperty.title}`}
                      width="100%" 
                      height="340" 
                      style={{ border: 0, borderRadius: '18px' }} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(currentProperty.location + ', USA')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    />
                    
                    <div className="map-pin-overlay-pill">
                      <MapPin size={16} color="#07be8a" />
                      <span>{currentProperty.location}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------------------
                RIGHT COLUMN: Sticky Pricing & Testimonial Sidebar
                ---------------------------------------------------------------- */}
            <aside className="property-sidebar-col">
              <div className="property-sticky-sidebar-inner">
                
                {/* 1. Price & CTA Card */}
                <div className="sidebar-pricing-card">
                  <div className="pricing-card-deco-wave" />
                  
                  <div className="pricing-card-content">
                    <div className="pricing-amount-row">
                      <span className="pricing-main-value">{currentProperty.price}</span>
                      <span className="pricing-badge-label">
                        {currentProperty.priceLabel || "Discounted Price"}
                      </span>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => onOpenContact && onOpenContact(currentProperty)}
                      className="sidebar-get-in-touch-btn"
                    >
                      <span>Get in touch</span>
                    </button>
                  </div>
                </div>

                {/* 2. Client Testimonial Card */}
                <div className="sidebar-testimonial-card">
                  <div className="testimonial-badge-icon">
                    <GreenHouseBadge />
                  </div>

                  <blockquote className="testimonial-quote-text">
                    "{currentProperty.testimonial?.quote || "I found my ideal home in no time! The listings were detailed, the photos were accurate, and the whole process felt seamless. Customer service was top-notch, answering all my questions. I will definitely use this platform again in the future!"}"
                  </blockquote>

                  <div className="testimonial-author-row">
                    <img 
                      src={currentProperty.testimonial?.avatar || "/images/site/5Nt0GP2b2ZiPcgOrUdwFiBwv4o.jpg"} 
                      alt={currentProperty.testimonial?.author || "Emily & John Smith"} 
                      className="testimonial-avatar-img"
                    />
                    <div className="testimonial-author-meta">
                      <h4 className="author-name">
                        {currentProperty.testimonial?.author || "Emily & John Smith"}
                      </h4>
                      <span className="author-role">
                        {currentProperty.testimonial?.role || "Buyer"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ======================================================================
          SIMILAR PROPERTIES SHOWCASE SECTION
          ====================================================================== */}
      <section className="similar-properties-section" aria-label="Similar Properties">
        <div className="container">
          <div className="similar-header-row">
            <h2 className="similar-section-title">Similar Properties</h2>
            <button 
              onClick={onNavigateProperties} 
              className="similar-view-all-link"
            >
              <span>View All Properties</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="similar-cards-grid">
            {similarProperties.map((simProp) => (
              <article 
                key={simProp.id} 
                className="similar-property-card"
                onClick={() => {
                  if (onSelectProperty) {
                    onSelectProperty(simProp.slug || simProp.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${simProp.title}`}
              >
                <div className="similar-card-img-wrap">
                  <img 
                    src={simProp.image} 
                    alt={simProp.title} 
                    className="similar-card-img" 
                    loading="lazy"
                  />
                  <div className="similar-card-overlay" />
                  {simProp.category && (
                    <span className="similar-card-cat-badge">{simProp.category}</span>
                  )}
                </div>

                <div className="similar-card-body">
                  <div className="similar-card-title-row">
                    <h3 className="similar-card-title">{simProp.title}</h3>
                    <div className="similar-card-price-pill">
                      <span>{simProp.price}</span>
                    </div>
                  </div>

                  <p className="similar-card-location">
                    <MapPin size={14} className="sim-loc-pin" />
                    <span>{simProp.location}</span>
                  </p>

                  <div className="similar-card-divider" />

                  <div className="similar-card-specs">
                    <div className="sim-spec-item" title="Bedrooms">
                      <BedIcon size={17} color="#556870" />
                      <span>{simProp.bedrooms}</span>
                    </div>
                    <div className="sim-spec-item" title="Bathrooms">
                      <BathIcon size={17} color="#556870" />
                      <span>{simProp.bathrooms}</span>
                    </div>
                    <div className="sim-spec-item" title="Area">
                      <AreaIcon size={17} color="#556870" />
                      <span>{simProp.area}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
