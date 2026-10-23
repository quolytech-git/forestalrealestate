import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Search, 
  Check, 
  Home, 
  DollarSign, 
  Key, 
  Mail, 
  User, 
  Phone, 
  Building 
} from 'lucide-react';
import './PropertySearchBar.css';

export default function PropertySearchBar({ onSearchProperties, onOpenContact }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Buy Tab State
  const [buyData, setBuyData] = useState({
    propertyType: '',
    priceRange: '',
    customPrice: '',
    keyword: ''
  });

  // Rent Tab State
  const [rentData, setRentData] = useState({
    propertyType: '',
    priceRange: '',
    keyword: ''
  });

  // Sell Tab State (Contact fields)
  const [sellData, setSellData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    estimatedValue: ''
  });

  const [submittedMessage, setSubmittedMessage] = useState(null);

  // Scroll observer to trigger focused state smoothly when scrolled to section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle Buy Search Submission
  const handleBuySearch = (e) => {
    e.preventDefault();
    if (onSearchProperties) {
      onSearchProperties({
        mode: 'buy',
        propertyType: buyData.propertyType,
        priceRange: buyData.customPrice ? buyData.customPrice : buyData.priceRange,
        keyword: buyData.keyword
      });
    }
  };

  // Handle Rent Search Submission
  const handleRentSearch = (e) => {
    e.preventDefault();
    if (onSearchProperties) {
      onSearchProperties({
        mode: 'rent',
        propertyType: rentData.propertyType,
        priceRange: rentData.priceRange,
        keyword: rentData.keyword
      });
    }
  };

  // Handle Sell Form Submission (Contact Us)
  const handleSellSubmit = (e) => {
    e.preventDefault();
    const clientName = sellData.name.trim() || 'Jane Smith';
    const clientEmail = sellData.email.trim() || 'jane@framer.com';

    setSubmittedMessage(
      `Thank you, ${clientName}! Our senior valuation specialist will contact you at ${clientEmail} within 2 hours to evaluate your ${sellData.propertyType || 'property'} for sale.`
    );

    setTimeout(() => {
      setSubmittedMessage(null);
      setSellData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        estimatedValue: ''
      });
    }, 6000);
  };

  return (
    <section 
      id="search-section" 
      ref={sectionRef} 
      className={`property-search-section ${isInView ? 'is-focused' : ''}`}
      aria-label="Property Search, Rental and Seller Inquiry"
    >
      <div className="container property-search-container">
        <div className="property-search-card-wrapper">
          
          {/* Section Header Hint / Smooth Separation */}
          <div className="search-section-intro">
            <span className="search-mode-indicator">
              {activeTab === 'buy' && 'Find & Buy Inspiring Properties'}
              {activeTab === 'rent' && 'Discover Premium Long-Term Rentals'}
              {activeTab === 'sell' && 'Contact Us to Sell & Value Your Property'}
            </span>
          </div>

          {/* Top Unified Tabs Strip: Buy / Rent / Sell */}
          <div className="property-search-tabs-strip">
            <button
              type="button"
              onClick={() => {
                setActiveTab('buy');
                setSubmittedMessage(null);
              }}
              className={`search-tab-pill ${activeTab === 'buy' ? 'active' : ''}`}
            >
              <Home size={15} className="tab-icon" />
              <span>Buy</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('rent');
                setSubmittedMessage(null);
              }}
              className={`search-tab-pill ${activeTab === 'rent' ? 'active' : ''}`}
            >
              <Key size={15} className="tab-icon" />
              <span>Rent</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('sell');
                setSubmittedMessage(null);
              }}
              className={`search-tab-pill ${activeTab === 'sell' ? 'active' : ''}`}
            >
              <Building size={15} className="tab-icon" />
              <span>Sell</span>
            </button>
          </div>

          {/* Main Card Body */}
          <div className={`property-search-card-body tab-${activeTab}`}>
            {submittedMessage ? (
              <div className="search-success-feedback">
                <div className="search-success-icon">
                  <Check size={20} color="#07be8a" strokeWidth={3} />
                </div>
                <div className="search-success-text">
                  <strong>Inquiry Received Successfully!</strong>
                  <p>{submittedMessage}</p>
                </div>
              </div>
            ) : (
              <>
                {/* 1. BUY TAB CONTENT: Property Type, Suggested/Custom Price, Property ID / Keyword */}
                {activeTab === 'buy' && (
                  <form onSubmit={handleBuySearch} className="property-search-form fade-in">
                    {/* Field 1: Property Type */}
                    <div className="search-field-group">
                      <label className="search-field-label">Property Type</label>
                      <div className="search-input-col select-col">
                        <select
                          value={buyData.propertyType}
                          onChange={(e) => setBuyData({ ...buyData, propertyType: e.target.value })}
                          className="search-select-input"
                          aria-label="Select Property Type"
                        >
                          <option value="">All Types</option>
                          <option value="Luxury Villas">Luxury Villas</option>
                          <option value="Residential Homes">Residential Homes</option>
                          <option value="Apartments">Apartments</option>
                          <option value="Office Spaces">Office Spaces</option>
                        </select>
                        <ChevronDown size={15} className="search-dropdown-icon" />
                      </div>
                    </div>

                    {/* Field 2: Price Range (Suggested or Custom) */}
                    <div className="search-field-group">
                      <label className="search-field-label">Price Range</label>
                      <div className="search-input-col select-col">
                        <select
                          value={buyData.priceRange}
                          onChange={(e) => setBuyData({ ...buyData, priceRange: e.target.value })}
                          className="search-select-input"
                          aria-label="Suggested Price Range"
                        >
                          <option value="">Suggested Price Range</option>
                          <option value="under-550k">Under $550,000</option>
                          <option value="550k-600k">$550,000 – $600,000</option>
                          <option value="600k-700k">$600,000 – $700,000</option>
                          <option value="700k-plus">$700,000+</option>
                          <option value="custom">Custom Budget...</option>
                        </select>
                        <ChevronDown size={15} className="search-dropdown-icon" />
                      </div>
                      {buyData.priceRange === 'custom' && (
                        <input
                          type="text"
                          placeholder="e.g. $650,000"
                          value={buyData.customPrice}
                          onChange={(e) => setBuyData({ ...buyData, customPrice: e.target.value })}
                          className="search-custom-input"
                          aria-label="Custom Budget"
                          autoFocus
                        />
                      )}
                    </div>

                    {/* Field 3: Property ID or Keyword */}
                    <div className="search-field-group flex-wide">
                      <label className="search-field-label">Property ID or Keyword</label>
                      <div className="search-input-col">
                        <input
                          type="text"
                          placeholder="Property ID (e.g. HM-101) or location..."
                          value={buyData.keyword}
                          onChange={(e) => setBuyData({ ...buyData, keyword: e.target.value })}
                          className="search-text-input"
                          aria-label="Property ID or Location"
                        />
                        <Search size={16} className="search-inline-icon" />
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <div className="search-action-col">
                      <button 
                        type="submit" 
                        onClick={handleBuySearch}
                        className="search-btn-submit"
                      >
                        <span>Search Properties</span>
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. RENT TAB CONTENT: Rental Type, Monthly Price Range, Property ID */}
                {activeTab === 'rent' && (
                  <form onSubmit={handleRentSearch} className="property-search-form fade-in">
                    {/* Field 1: Rental Property Type */}
                    <div className="search-field-group">
                      <label className="search-field-label">Rental Type</label>
                      <div className="search-input-col select-col">
                        <select
                          value={rentData.propertyType}
                          onChange={(e) => setRentData({ ...rentData, propertyType: e.target.value })}
                          className="search-select-input"
                          aria-label="Select Rental Type"
                        >
                          <option value="">All Rental Types</option>
                          <option value="Apartments">Apartments</option>
                          <option value="Luxury Villas">Luxury Villas</option>
                          <option value="Residential Homes">Residential Homes</option>
                          <option value="Office Spaces">Office Spaces</option>
                        </select>
                        <ChevronDown size={15} className="search-dropdown-icon" />
                      </div>
                    </div>

                    {/* Field 2: Monthly Price Range */}
                    <div className="search-field-group">
                      <label className="search-field-label">Monthly Rent Range</label>
                      <div className="search-input-col select-col">
                        <select
                          value={rentData.priceRange}
                          onChange={(e) => setRentData({ ...rentData, priceRange: e.target.value })}
                          className="search-select-input"
                          aria-label="Monthly Rent Range"
                        >
                          <option value="">Suggested Monthly Rent</option>
                          <option value="under-3k">Under $3,000 / mo</option>
                          <option value="3k-5k">$3,000 – $5,000 / mo</option>
                          <option value="5k-8k">$5,000 – $8,000 / mo</option>
                          <option value="8k-plus">$8,000+ / mo</option>
                        </select>
                        <ChevronDown size={15} className="search-dropdown-icon" />
                      </div>
                    </div>

                    {/* Field 3: Property ID or City */}
                    <div className="search-field-group flex-wide">
                      <label className="search-field-label">Property ID or Location</label>
                      <div className="search-input-col">
                        <input
                          type="text"
                          placeholder="Property ID (e.g. HM-103) or city (Miami)..."
                          value={rentData.keyword}
                          onChange={(e) => setRentData({ ...rentData, keyword: e.target.value })}
                          className="search-text-input"
                          aria-label="Rental Property ID or City"
                        />
                        <Search size={16} className="search-inline-icon" />
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <div className="search-action-col">
                      <button 
                        type="submit" 
                        onClick={handleRentSearch}
                        className="search-btn-submit"
                      >
                        <span>Search Rentals</span>
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. SELL TAB CONTENT: Contact Us Fields (Name, Email, Phone, Property Type, Est. Value) */}
                {activeTab === 'sell' && (
                  <form onSubmit={handleSellSubmit} className="property-search-form sell-form-grid fade-in">
                    {/* Field 1: Name */}
                    <div className="search-field-group">
                      <label className="search-field-label">Your Name</label>
                      <div className="search-input-col">
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          value={sellData.name}
                          onChange={(e) => setSellData({ ...sellData, name: e.target.value })}
                          className="search-text-input"
                          aria-label="Your Name"
                        />
                        <User size={15} className="search-inline-icon" />
                      </div>
                    </div>

                    {/* Field 2: Email */}
                    <div className="search-field-group">
                      <label className="search-field-label">Email Address</label>
                      <div className="search-input-col">
                        <input
                          type="email"
                          placeholder="jane@framer.com"
                          value={sellData.email}
                          onChange={(e) => setSellData({ ...sellData, email: e.target.value })}
                          className="search-text-input"
                          aria-label="Email Address"
                        />
                        <Mail size={15} className="search-inline-icon" />
                      </div>
                    </div>

                    {/* Field 3: Phone */}
                    <div className="search-field-group">
                      <label className="search-field-label">Phone Number</label>
                      <div className="search-input-col">
                        <input
                          type="tel"
                          placeholder="+1 (212) 456-7890"
                          value={sellData.phone}
                          onChange={(e) => setSellData({ ...sellData, phone: e.target.value })}
                          className="search-text-input"
                          aria-label="Phone Number"
                        />
                        <Phone size={15} className="search-inline-icon" />
                      </div>
                    </div>

                    {/* Field 4: Property Type to Sell */}
                    <div className="search-field-group">
                      <label className="search-field-label">Property Type</label>
                      <div className="search-input-col select-col">
                        <select
                          value={sellData.propertyType}
                          onChange={(e) => setSellData({ ...sellData, propertyType: e.target.value })}
                          className="search-select-input"
                          aria-label="Property Type to Sell"
                        >
                          <option value="">Select Property Type</option>
                          <option value="Luxury Villa">Luxury Villa</option>
                          <option value="Residential Home">Residential Home</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Commercial Space">Commercial Space</option>
                        </select>
                        <ChevronDown size={15} className="search-dropdown-icon" />
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <div className="search-action-col sell-submit-col">
                      <button 
                        type="submit" 
                        onClick={handleSellSubmit}
                        className="search-btn-submit"
                      >
                        <span>Contact Us to Sell</span>
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
