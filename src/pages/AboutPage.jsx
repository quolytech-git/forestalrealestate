import React, { useState } from 'react';
import { 
  Trees, ShieldCheck, Compass, Award, Users, 
  MapPin, CheckCircle, ArrowRight, ArrowLeft, 
  Building2, Phone, Mail, Sparkles 
} from 'lucide-react';
import { GreenHouseBadge } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';
import './AboutPage.css';

export default function AboutPage({ onNavigateHome, onNavigateProperties, onOpenContact }) {
  const { t, language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("Tirana");

  // Regional cities from the user's reference image
  const cities = [
    { 
      name: "Tirana", 
      nameEn: "Tirana", 
      propertiesCount: 142, 
      type: "Rezidenca & Penthouse", 
      avgPrice: "€320,000",
      x: 185, 
      y: 200 
    },
    { 
      name: "Vlorë", 
      nameEn: "Vlora", 
      propertiesCount: 88, 
      type: "Vila Bregdetare & Marina", 
      avgPrice: "€450,000",
      x: 155, 
      y: 330 
    },
    { 
      name: "Durrës", 
      nameEn: "Durres", 
      propertiesCount: 95, 
      type: "Apartamente & Vila me Pamje nga Deti", 
      avgPrice: "€210,000",
      x: 160, 
      y: 195 
    },
    { 
      name: "Shkodër", 
      nameEn: "Shkodra", 
      propertiesCount: 42, 
      type: "Rezidenca Historike & Liqen", 
      avgPrice: "€180,000",
      x: 150, 
      y: 95 
    },
    { 
      name: "Pogradec", 
      nameEn: "Pogradec", 
      propertiesCount: 36, 
      type: "Shtëpi Pushimi Liqenore", 
      avgPrice: "€165,000",
      x: 245, 
      y: 285 
    },
    { 
      name: "Sarandë", 
      nameEn: "Saranda", 
      propertiesCount: 78, 
      type: "Vila Jonike & Resort Suites", 
      avgPrice: "€390,000",
      x: 195, 
      y: 430 
    },
    { 
      name: "Korçë", 
      nameEn: "Korca", 
      propertiesCount: 30, 
      type: "Vila Tradicionale & Malore", 
      avgPrice: "€195,000",
      x: 255, 
      y: 325 
    },
    { 
      name: "Elbasan", 
      nameEn: "Elbasan", 
      propertiesCount: 26, 
      type: "Toka Zhvillimore & Rezidenca", 
      avgPrice: "€140,000",
      x: 200, 
      y: 235 
    }
  ];

  const currentCityData = cities.find(c => c.name === selectedCity) || cities[0];

  const stats = [
    { value: "15+", label: t('about_stat_exp'), desc: language === 'sq' ? 'Përvojë elitare në treg' : 'Premier market experience' },
    { value: "450+", label: t('about_stat_properties'), desc: language === 'sq' ? 'Transaksione të përfunduara' : 'High-value transactions closed' },
    { value: "99%", label: t('about_stat_satisfaction'), desc: language === 'sq' ? 'Vlerësim 5-yje nga klientët' : '5-Star client satisfaction' },
    { value: "25+", label: t('about_stat_agents'), desc: language === 'sq' ? 'Ekspertë të liçensuar' : 'Certified luxury specialists' }
  ];

  const pillars = [
    {
      icon: <Trees size={24} className="about-pillar-icon" />,
      title: t('about_pillar_1_title'),
      desc: t('about_pillar_1_desc')
    },
    {
      icon: <ShieldCheck size={24} className="about-pillar-icon" />,
      title: t('about_pillar_2_title'),
      desc: t('about_pillar_2_desc')
    },
    {
      icon: <Compass size={24} className="about-pillar-icon" />,
      title: t('about_pillar_3_title'),
      desc: t('about_pillar_3_desc')
    }
  ];

  const offices = [
    {
      city: "Tiranë (Kryeqytet)",
      cityEn: "Tirana Headquarters",
      address: "Bulevardi Dëshmorët e Kombit, Kulla Twin Towers, Kati 14",
      phone: "+355 4 220 8899",
      email: "tirana@forest-al.com",
      role: language === 'sq' ? 'Zyra Qendrore & Portofoli Rezidencial VIP' : 'Headquarters & VIP Residential Portfolio'
    },
    {
      city: "Vlorë (Riviera)",
      cityEn: "Vlora Riviera Office",
      address: "Rruga Lungomare, Kompleksi Marina Bay, Kati 3",
      phone: "+355 33 400 112",
      email: "vlora@forest-al.com",
      role: language === 'sq' ? 'Prona Bregdetare & Zhvillime Turistike' : 'Waterfront Estates & Coastal Resorts'
    },
    {
      city: "Sarandë (Jon)",
      cityEn: "Saranda Office",
      address: "Rruga Butrinti, Jonian Panorama, Sarandë",
      phone: "+355 85 220 445",
      email: "saranda@forest-al.com",
      role: language === 'sq' ? 'Vila Ekskluzive Jonike & Resorte Private' : 'Ionian Sea Luxury Villas & Private Resorts'
    }
  ];

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
  };

  const handleExploreCityProperties = (cityName) => {
    if (onNavigateProperties) {
      onNavigateProperties(cityName);
    }
  };

  return (
    <div className="about-page">
      {/* ======================================================================
          1. BREADCRUMBS & HERO INTRO
          ====================================================================== */}
      <section className="about-hero-section">
        <div className="container">
          <nav className="about-breadcrumb" aria-label="Breadcrumbs">
            <button onClick={onNavigateHome} className="breadcrumb-btn">{t('nav_home')}</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{t('nav_about')}</span>
          </nav>

          <div className="about-hero-content">
            <div className="badge-label about-hero-badge">
              <GreenHouseBadge />
              <span>{t('about_badge')}</span>
            </div>

            <h1 className="about-hero-title">
              {t('about_title')}
            </h1>

            <p className="about-hero-subtitle">
              {language === 'sq'
                ? 'Forest-AL Real Estate u themelua për të ripërcaktuar përvojën imobiliare në Shqipëri dhe rajon — duke bashkuar kryeveprat arkitekturore moderne me qetësinë dhe harmoninë e peizazheve natyrore.'
                : 'Forest-AL Real Estate was created to redefine prime luxury real estate across Albania and the region — unifying visionary modern architecture with the peaceful grandeur of pristine natural landscapes.'}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          2. HERITAGE & DUAL PHOTO SHOWCASE
          ====================================================================== */}
      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-images">
            <div className="about-img-main-card">
              <img 
                src="https://framerusercontent.com/images/8HTNh4ap2maatw0wkHq9XEIqjHM.jpg" 
                alt="Forest-AL Architectural Masterpiece" 
                className="about-story-img"
              />
              <div className="about-exp-floating-tag">
                <span className="exp-big">15+</span>
                <span className="exp-label">
                  {language === 'sq' ? 'Vite Suksesi & Përkushtimi' : 'Years of Trust & Distinction'}
                </span>
              </div>
            </div>

            <div className="about-img-sub-card">
              <img 
                src="https://framerusercontent.com/images/PODFQRwgAeQkguVu6307kqQRvY.jpg" 
                alt="Villa Living in Harmony with Nature" 
                className="about-story-img"
              />
            </div>
          </div>

          <div className="about-story-text">
            <h2 className="about-section-heading">
              {language === 'sq' ? 'Pasioni për Bukurinë, Përkushtimi ndaj Klientit' : 'Architectural Passion, Uncompromising Service'}
            </h2>

            <p className="about-text-p lead">
              {t('about_desc_1')}
            </p>

            <p className="about-text-p">
              {t('about_desc_2')}
            </p>

            <p className="about-text-p">
              {language === 'sq'
                ? 'Nga vilat panoramike në kodrat e Tiranës deri te pronat spektakolare në Rivierën Shqiptare, ne përzgjedhim vetëm prona që plotësojnë standarde rigoroze të ndërtimit, ligjshmërisë dhe vlerës së qëndrueshme investuese.'
                : 'From panoramic estates across the Tirana hills to sun-drenched private waterfronts along the Albanian Riviera, we exclusively curate properties meeting the most rigorous benchmarks of design integrity, legal title security, and enduring capital appreciation.'}
            </p>

            <div className="about-signature-block">
              <div className="founder-info">
                <span className="founder-name">Bordi Drejtues i Forest-AL</span>
                <span className="founder-title">
                  {language === 'sq' ? 'Ekselencë në Pronat Luksoze' : 'Luxury Real Estate Advisory'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          3. NUMERICAL STATS COUNTERS
          ====================================================================== */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((st, idx) => (
              <div key={idx} className="about-stat-card">
                <span className="stat-card-value">{st.value}</span>
                <h4 className="stat-card-title">{st.label}</h4>
                <p className="stat-card-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          4. STRATEGIC PILLARS
          ====================================================================== */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="about-section-header-center">
            <div className="badge-label">
              <GreenHouseBadge />
              <span>{language === 'sq' ? 'Shtyllat Tona Strategjike' : 'Our Strategic Pillars'}</span>
            </div>
            <h2 className="about-center-title">
              {language === 'sq' ? 'Pse Klientët Zgjedhin Forest-AL' : 'Why Discerning Clients Choose Forest-AL'}
            </h2>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((pil, idx) => (
              <div key={idx} className="about-pillar-card">
                <div className="pillar-icon-bubble">
                  {pil.icon}
                </div>
                <h3 className="pillar-card-title">{pil.title}</h3>
                <p className="pillar-card-desc">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          5. INTERACTIVE ALBANIA MAP & CITIES EXPLORATION (FROM USER IMAGE)
          ====================================================================== */}
      <section className="about-map-section" id="albania-map-search">
        <div className="container">
          {/* Faded watermark typography as in user reference */}
          <div className="map-watermark-text" aria-hidden="true">
            {language === 'sq' ? 'Kërko në hartë' : 'Search on map'}
          </div>

          <div className="about-map-grid">
            {/* Left Column: Heading, Subtitles, City Buttons */}
            <div className="about-map-info-col">
              <div className="map-title-wrapper">
                <h2 className="map-main-heading">
                  {language === 'sq' ? 'Kërkoni pronë' : 'Search for Property'}
                </h2>
                <div className="map-heading-underline" />
              </div>

              <p className="map-main-subtitle">
                {language === 'sq' 
                  ? 'Zbuloni prona të jashtëzakonshme për shitje pranë jush. Filloni kërkimin tuaj tani!'
                  : 'Discover extraordinary properties for sale near you. Start your search today!'}
              </p>

              {/* Qytetet Kryesore Block */}
              <div className="map-cities-block">
                <h3 className="map-cities-heading">
                  {language === 'sq' ? 'Qytetet kryesore' : 'Main Cities'}
                </h3>
                <p className="map-cities-sub">
                  {language === 'sq' 
                    ? 'Eksploroni qytetet kryesore dhe pronat e disponueshme në secilin prej tyre.'
                    : 'Explore the key cities and properties available in each of them.'}
                </p>

                {/* 2-Column City Selection Grid (Identical to user image) */}
                <div className="map-cities-grid">
                  {cities.map((city) => {
                    const isSelected = selectedCity === city.name;
                    return (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => handleCitySelect(city.name)}
                        className={`map-city-pill-btn ${isSelected ? 'active' : ''}`}
                      >
                        <span className="city-pill-name">{city.name}</span>
                        <span className="city-pill-count">{city.propertiesCount}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected City Quick Info Card */}
                <div className="selected-city-card">
                  <div className="selected-city-header">
                    <div>
                      <span className="city-focus-label">
                        {language === 'sq' ? 'Qyteti i Përzgjedhur:' : 'Selected City:'}
                      </span>
                      <h4 className="city-focus-name">{currentCityData.name}</h4>
                    </div>
                    <span className="city-focus-count-badge">
                      {currentCityData.propertiesCount} {language === 'sq' ? 'prona' : 'listings'}
                    </span>
                  </div>

                  <div className="selected-city-details-row">
                    <span className="city-detail-item">
                      <strong>{language === 'sq' ? 'Lloji:' : 'Type:'}</strong> {currentCityData.type}
                    </span>
                    <span className="city-detail-item">
                      <strong>{language === 'sq' ? 'Çmimi Mesatar:' : 'Avg Price:'}</strong> {currentCityData.avgPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleExploreCityProperties(currentCityData.name)}
                    className="btn btn-green city-explore-btn"
                  >
                    <span>{language === 'sq' ? `Shiko Pronat në ${currentCityData.name}` : `View Properties in ${currentCityData.name}`}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Outline button as in image: "Eksploroni të gjitha qytetet ->" */}
                <button
                  type="button"
                  onClick={() => onNavigateProperties && onNavigateProperties()}
                  className="map-explore-all-btn"
                >
                  <span>{language === 'sq' ? 'Eksploroni të gjitha qytetet' : 'Explore all cities'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: High-Resolution Authentic Albania Map Image */}
            <div className="about-map-vector-col">
              <div className="albania-map-container albania-map-image-container">
                <div className="albania-map-image-wrapper">
                  <img
                    src="/images/albania-map.jpg"
                    alt="Harta e Shqipërisë - Forest-AL Real Estate"
                    className="albania-map-real-img"
                  />

                  {/* Proportional Interactive Hotspot Rings matching the map image */}
                  {[
                    { name: "Shkodër", top: "24.5%", left: "36%" },
                    { name: "Durrës", top: "45%", left: "34.5%" },
                    { name: "Tirana", top: "45%", left: "45.5%" },
                    { name: "Vlorë", top: "68.8%", left: "34.2%" },
                    { name: "Korçë", top: "65.2%", left: "75%" },
                    { name: "Sarandë", top: "86.8%", left: "51.5%" },
                  ].map((hotspot) => {
                    const isSelected = selectedCity === hotspot.name;
                    return (
                      <button
                        key={hotspot.name}
                        type="button"
                        onClick={() => handleCitySelect(hotspot.name)}
                        className={`map-hotspot-pin ${isSelected ? 'active' : ''}`}
                        style={{ top: hotspot.top, left: hotspot.left }}
                        aria-label={`Zgjidh ${hotspot.name}`}
                        title={hotspot.name}
                      >
                        <span className="hotspot-pulse" />
                        <span className="hotspot-dot" />
                      </button>
                    );
                  })}
                </div>

                {/* Floating Map Legend Indicator */}
                <div className="map-floating-legend">
                  <span className="legend-indicator" />
                  <span>
                    {language === 'sq' 
                      ? 'Kliko mbi qytetet për të filtruar pronat' 
                      : 'Click any city to filter listings'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          6. REGIONAL OFFICES & DIRECT CONTACT
          ====================================================================== */}
      <section className="about-offices-section">
        <div className="container">
          <div className="about-section-header-center">
            <div className="badge-label">
              <GreenHouseBadge />
              <span>{language === 'sq' ? 'Prania Jonë' : 'Our Presence'}</span>
            </div>
            <h2 className="about-center-title">
              {language === 'sq' ? 'Zyrat Tona Rajonale në Shqipëri' : 'Our Regional Offices in Albania'}
            </h2>
          </div>

          <div className="about-offices-grid">
            {offices.map((off, idx) => (
              <div key={idx} className="about-office-card">
                <div className="office-card-header">
                  <Building2 size={24} className="office-icon" />
                  <h3 className="office-city-title">
                    {language === 'sq' ? off.city : off.cityEn}
                  </h3>
                </div>

                <p className="office-role-badge">{off.role}</p>

                <div className="office-details-list">
                  <div className="office-detail-item">
                    <MapPin size={16} className="off-ico" />
                    <span>{off.address}</span>
                  </div>
                  <div className="office-detail-item">
                    <Phone size={16} className="off-ico" />
                    <a href={`tel:${off.phone}`}>{off.phone}</a>
                  </div>
                  <div className="office-detail-item">
                    <Mail size={16} className="off-ico" />
                    <a href={`mailto:${off.email}`}>{off.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          7. BOTTOM CTA
          ====================================================================== */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <h2 className="about-cta-heading">
              {language === 'sq' 
                ? 'Gati për të gjetur shtëpinë tuaj të përsosur në natyrë?' 
                : 'Ready to find your extraordinary place in nature?'}
            </h2>
            <p className="about-cta-sub">
              {language === 'sq'
                ? 'Konsulentët tanë të certifikuar janë të gatshëm t\'ju shoqërojnë në çdo hap me profesionalizëm dhe konfidencialitet të plotë.'
                : 'Our certified real estate advisors are ready to guide you at every step with discretion, mastery, and bespoke care.'}
            </p>
            <div className="about-cta-btns">
              <button onClick={onOpenContact} className="btn btn-green">
                <span>{t('hero_contact')}</span>
              </button>
              <button onClick={onNavigateProperties} className="btn btn-white">
                <span>{t('hero_explore')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
