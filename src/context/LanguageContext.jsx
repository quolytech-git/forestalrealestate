import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  sq: {
    // Navigation
    nav_home: "Kreu",
    nav_properties: "Pronat",
    nav_agents: "Agjentët",
    nav_about: "Rreth Nesh",
    nav_blog: "Blog",
    nav_contact: "Kontakt",
    nav_menu: "Meny",
    nav_call: "+1-212-456-7890",

    // Hero
    hero_badge: "Agjencia Imobiliare Forest-AL",
    hero_title: "Gjeni vendin tuaj të përsosur në natyrë.",
    hero_subtitle: "Zbuloni vila luksoze, rezidenca bashkëkohore dhe hapësira të jashtëzakonshme arkitekturore të rrethuara nga gjelbërimi.",
    hero_explore: "Eksploroni Pronat",
    hero_contact: "Na Kontaktoni",
    hero_view_details: "Shiko Detajet",

    // Search bar
    search_tab_buy: "Bli Pronë",
    search_tab_rent: "Qira",
    search_tab_sell: "Shit Pronën",
    search_location_label: "Vendndodhja",
    search_location_placeholder: "Zgjidhni qytetin...",
    search_type_label: "Lloji i Pronës",
    search_type_all: "Të gjitha llojet",
    search_price_label: "Çmimi",
    search_price_any: "Çdo çmim",
    search_btn: "Kërko Prona",
    search_reset: "Pastro",

    // Featured Home section
    featured_home_title: "Pronat më të Zgjedhura",
    featured_home_subtitle: "Një përzgjedhje ekskluzive e pronave tona më të kërkuara në lokacionet më të lakmuara.",
    featured_view_all: "Shiko të gjitha pronat",

    // About Us
    about_badge: "Kush Jemi Ne",
    about_title: "Forest-AL Real Estate — Ekselencë Imobiliare në Harmoni me Natyrën",
    about_desc_1: "E themeluar me pasionin për të lidhur arkitekturën moderne me natyrën e paprekur, Forest-AL Real Estate është lideri kryesor në tregun e pronave luksoze dhe rezidenciale.",
    about_desc_2: "Ekipi ynë i specializuar ofron shërbim elitar dhe konfidencial për çdo klient, duke garantuar investime të sigurta dhe shtëpi të ëndrrave me vlerë të qëndrueshme.",
    about_stat_exp: "Vite Përvojë",
    about_stat_properties: "Prona të Shitura",
    about_stat_satisfaction: "Klientë të Kënaqur",
    about_stat_agents: "Agjentë Ekspertë",
    about_pillar_1_title: "Arkitekturë e Përzgjedhur",
    about_pillar_1_desc: "Çdo pronë kalon standarde rigoroze të cilësisë, dizajnit dhe qëndrueshmërisë mjedisore.",
    about_pillar_2_title: "Siguri & Transparencë",
    about_pillar_2_desc: "Verifikim i plotë ligjor dhe mbështetje juridike nga fillimi deri në marrjen e çelësave.",
    about_pillar_3_title: "Shërbim Konsulence VIP",
    about_pillar_3_desc: "Këshillim i personalizuar për investime strategjike dhe blerje të pronave ekskluzive.",

    // Agents
    agents_badge: "Ekipi Ynë",
    agents_title: "Takoni Agjentët Tanë Ekspertë",
    agents_subtitle: "Profesionistë me përvojë shumëvjeçare të përkushtuar për t'ju udhëhequr në çdo hap të blerjes apo shitjes së pronës.",
    agent_contact_btn: "Kontakto Agjentin",
    agent_listings: "prona aktive",
    agent_languages: "Gjuhët",

    // Common buttons & tags
    btn_get_in_touch: "Merr në Kontakt",
    btn_view_details: "Shiko Detajet",
    btn_read_more: "Lexo Më Shumë",
    btn_load_more: "Ngarko Më Shumë",
    btn_subscribe: "Abonohu",
    btn_share: "Shpërndaj",
    btn_link_copied: "Lidhja u Kopjua!",

    // Properties catalog
    properties_title: "Zbuloni shtëpi të dizajnuara me frymëzim",
    properties_subtitle: "Përjetoni elegancën dhe rehatinë me koleksionin tonë të pasur me vila, rezidenca dhe apartamente luksoze.",
    filter_all: "Të gjitha",
    filter_category: "Kategoria",
    filter_price: "Gama e çmimit",
    filter_bedrooms: "Dhoma gjumi",
    filter_sort: "Rendit sipas",

    // Property Detail
    prop_details_title: "Detajet e pronës",
    prop_offers_title: "Çfarë ofron kjo pronë",
    prop_location_title: "Vendndodhja",
    prop_video_title: "Video Tur Virtual i Pronës",
    prop_video_desc: "Përjetoni një vizitë gjithëpërfshirëse kinematografike brenda dhe jashtë kësaj prone madhështore.",
    similar_properties_title: "Prona të Ngjashme",
    similar_view_all: "Shiko të gjitha pronat",

    // Blog
    blog_title: "Njohuri mbi tregun imobiliar",
    blog_subtitle: "Qëndroni të informuar me analizat dhe këshillat më të fundit nga ekspertët tanë",
    blog_read_all: "Lexo të gjithë artikujt",
    related_insights_title: "Artikuj të Ngjashëm",

    // FAQ
    faq_badge: "Pyetjet e Shpeshta",
    faq_title: "Gjithçka rreth pronave Forest-AL",
    faq_subtitle: "E dimë se blerja, shitja apo investimi në patundshmëri mund të kërkojë sqarime. Ja përgjigjet e pyetjeve më thelbësore.",

    // Footer
    footer_cta_heading: "Filloni rrugën drejt suksesit — na kontaktoni sot.",
    footer_made_by: "Made by QuolyTech",
    footer_subscribe_title: "Regjistrohuni",
    footer_subscribe_sub: "Merrni ofertat më të reja dhe analizat e tregut direkt në emailin tuaj.",
  },
  en: {
    // Navigation
    nav_home: "Home",
    nav_properties: "Properties",
    nav_agents: "Agents",
    nav_about: "About Us",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_menu: "Menu",
    nav_call: "+1-212-456-7890",

    // Hero
    hero_badge: "Forest-AL Real Estate",
    hero_title: "Finding your place in nature.",
    hero_subtitle: "Discover luxury villas, contemporary residences, and extraordinary architectural spaces surrounded by natural serenity.",
    hero_explore: "Explore Properties",
    hero_contact: "Contact Us",
    hero_view_details: "View Details",

    // Search bar
    search_tab_buy: "Buy Property",
    search_tab_rent: "Rent",
    search_tab_sell: "Sell Property",
    search_location_label: "Location",
    search_location_placeholder: "Select location...",
    search_type_label: "Property Type",
    search_type_all: "All Types",
    search_price_label: "Price Range",
    search_price_any: "Any Price",
    search_btn: "Search Properties",
    search_reset: "Reset",

    // Featured Home section
    featured_home_title: "Featured Properties",
    featured_home_subtitle: "An exclusive selection of our premier listings across the most coveted destinations.",
    featured_view_all: "View All Properties",

    // About Us
    about_badge: "About Us",
    about_title: "Forest-AL Real Estate — Architectural Distinction in Harmony with Nature",
    about_desc_1: "Founded with a passion for integrating modern architecture with unspoiled landscapes, Forest-AL Real Estate is the leading agency in premier luxury properties.",
    about_desc_2: "Our dedicated team delivers elite, discreet concierge representation for every client, ensuring secure capital investments and dream homes of enduring value.",
    about_stat_exp: "Years Experience",
    about_stat_properties: "Properties Sold",
    about_stat_satisfaction: "Satisfied Clients",
    about_stat_agents: "Expert Agents",
    about_pillar_1_title: "Curated Architecture",
    about_pillar_1_desc: "Every residence meets rigorous benchmarks for structural distinction and environmental synergy.",
    about_pillar_2_title: "Integrity & Due Diligence",
    about_pillar_2_desc: "Comprehensive legal verification and title assurance from initial consultation to keys handover.",
    about_pillar_3_title: "VIP Advisory Services",
    about_pillar_3_desc: "Bespoke strategic counseling for private acquisitions and prime portfolio expansion.",

    // Agents
    agents_badge: "Our Team",
    agents_title: "Meet Our Expert Agents",
    agents_subtitle: "Seasoned industry professionals committed to guiding you through every step of acquiring or selling your property.",
    agent_contact_btn: "Contact Agent",
    agent_listings: "active listings",
    agent_languages: "Languages",

    // Common buttons & tags
    btn_get_in_touch: "Get in touch",
    btn_view_details: "View Details",
    btn_read_more: "Read More",
    btn_load_more: "Load More",
    btn_subscribe: "Subscribe",
    btn_share: "Share",
    btn_link_copied: "Link Copied!",

    // Properties catalog
    properties_title: "Discover inspiring designed homes.",
    properties_subtitle: "Experience elegance and comfort with our exclusive collection of luxury villas, residential homes, and apartments.",
    filter_all: "All",
    filter_category: "Category",
    filter_price: "Price Range",
    filter_bedrooms: "Bedrooms",
    filter_sort: "Sort by",

    // Property Detail
    prop_details_title: "Property details",
    prop_offers_title: "What this property offers",
    prop_location_title: "Location",
    prop_video_title: "Property Video Tour",
    prop_video_desc: "Experience a cinematic walkthrough exploring the interior flow and outdoor spaces of this premier villa.",
    similar_properties_title: "Similar Properties",
    similar_view_all: "View All Properties",

    // Blog
    blog_title: "Real estate insights",
    blog_subtitle: "Stay ahead in the property market with expert advice and updates",
    blog_read_all: "Read all articles",
    related_insights_title: "Related Insights",

    // FAQ
    faq_badge: "FAQs",
    faq_title: "Everything about Forest-AL homes",
    faq_subtitle: "We know that buying, selling, or investing in real estate can be overwhelming. Here are frequently asked questions to guide you.",

    // Footer
    footer_cta_heading: "Begin your path to success — contact us today.",
    footer_made_by: "Made by QuolyTech",
    footer_subscribe_title: "Subscribe",
    footer_subscribe_sub: "Stay informed on the newest listings, luxury market trends, and exclusive private offerings.",
  }
};

const LanguageContext = createContext({
  language: 'sq',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  // Requirement 2: Default must be Albania ("the first it shoud be albania")
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forestal_lang');
      if (saved === 'en' || saved === 'sq') return saved;
    }
    return 'sq'; // Default ALBANIA
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('forestal_lang', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key) => {
    const dict = translations[language] || translations.sq;
    return dict[key] || translations.en[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'sq' ? 'en' : 'sq'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
