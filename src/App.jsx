import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuDrawer from './components/MenuDrawer';
import Hero from './components/Hero';
import PropertySearchBar from './components/PropertySearchBar';
import Categories from './components/Categories';
import HomeProperties from './components/HomeProperties';
import AboutUs from './components/AboutUs';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AgentsPage from './pages/AgentsPage';
import AgentDetailPage from './pages/AgentDetailPage';
import AboutPage from './pages/AboutPage';
import FeaturedProperty from './components/FeaturedProperty';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import GetInTouchCTA from './components/GetInTouchCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ForestalLoadingScreen from './components/ForestalLoadingScreen';
import PageTransitionLoader from './components/PageTransitionLoader';
import { ContactModal, PropertyModal, ArticleModal } from './components/Modals';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './App.css';

function MainApp() {
  const getInitialRouting = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;

      // Agent Detail: /agents/:slug or /agent/:slug
      const agentMatch = path.match(/^\/(?:agents|agent)\/([a-zA-Z0-9_-]+)/);
      if (agentMatch && agentMatch[1] && agentMatch[1] !== 'agents') {
        return { 
          page: 'agent-detail', 
          propSlug: 'mountain-retreat-villa', 
          blogSlug: 'home-buying-tips', 
          agentSlug: agentMatch[1] 
        };
      }

      // Property Detail: /properties/:slug
      const propMatch = path.match(/^\/properties\/([a-zA-Z0-9_-]+)/);
      if (propMatch && propMatch[1]) {
        return { page: 'property-detail', propSlug: propMatch[1], blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }

      // Blog Detail: /blogs/:slug or /blog/:slug
      const blogMatch = path.match(/^\/(?:blogs|blog)\/([a-zA-Z0-9_-]+)/);
      if (blogMatch && blogMatch[1]) {
        return { page: 'blog-detail', propSlug: 'mountain-retreat-villa', blogSlug: blogMatch[1], agentSlug: 'ilir-hoxha' };
      }

      // Catalog & special pages
      if (path === '/about' || path === '/about-us' || path.includes('/about')) {
        return { page: 'about', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }
      if (path === '/agents' || path.includes('/agents')) {
        return { page: 'agents', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }
      if (path === '/blogs' || path === '/blog' || path.includes('/blogs')) {
        return { page: 'blogs', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }
      if (path === '/properties' || path.includes('/properties')) {
        return { page: 'properties', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }
      if (path === '/contact' || path.includes('/contact')) {
        return { page: 'contact', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
      }
    }
    return { page: 'home', propSlug: 'mountain-retreat-villa', blogSlug: 'home-buying-tips', agentSlug: 'ilir-hoxha' };
  };

  const initialRoute = getInitialRouting();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [selectedPropertySlug, setSelectedPropertySlug] = useState(initialRoute.propSlug);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(initialRoute.blogSlug);
  const [selectedAgentSlug, setSelectedAgentSlug] = useState(initialRoute.agentSlug || 'ilir-hoxha');

  // Loading screen states:
  // 1. Initial screen: full Forestal loading screen animation
  // 4. Page switch: fast progress line only
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageSwitching, setIsPageSwitching] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [propertiesFilter, setPropertiesFilter] = useState("All");
  const [propertiesSearchCriteria, setPropertiesSearchCriteria] = useState(null);

  // Initial loading screen animation timer (extended to 2800ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;

      setIsPageSwitching(true);
      setTimeout(() => setIsPageSwitching(false), 680);

      const agentMatch = path.match(/^\/(?:agents|agent)\/([a-zA-Z0-9_-]+)/);
      if (agentMatch && agentMatch[1] && agentMatch[1] !== 'agents') {
        setCurrentPage('agent-detail');
        setSelectedAgentSlug(agentMatch[1]);
        return;
      }

      const propMatch = path.match(/^\/properties\/([a-zA-Z0-9_-]+)/);
      if (propMatch && propMatch[1]) {
        setCurrentPage('property-detail');
        setSelectedPropertySlug(propMatch[1]);
        return;
      }

      const blogMatch = path.match(/^\/(?:blogs|blog)\/([a-zA-Z0-9_-]+)/);
      if (blogMatch && blogMatch[1]) {
        setCurrentPage('blog-detail');
        setSelectedBlogSlug(blogMatch[1]);
        return;
      }

      if (path === '/about' || path === '/about-us' || path.includes('/about')) {
        setCurrentPage('about');
      } else if (path.includes('agents')) {
        setCurrentPage('agents');
      } else if (path === '/blogs' || path.includes('/blogs') || path === '/blog') {
        setCurrentPage('blogs');
      } else if (path.includes('properties')) {
        setCurrentPage('properties');
      } else if (path.includes('contact')) {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Primary navigation handler
  const navigateTo = (
    page, 
    section = null, 
    filter = "All", 
    search = null, 
    propSlug = null,
    blogSlug = null,
    agentSlug = null
  ) => {
    if (currentPage !== page || propSlug || blogSlug || agentSlug) {
      // Trigger visibly prominent fast top line loader (Requirement 4)
      setIsPageSwitching(true);
      setTimeout(() => setIsPageSwitching(false), 680);
    }

    setCurrentPage(page);
    if (filter) setPropertiesFilter(filter);
    if (search) setPropertiesSearchCriteria(search);
    if (propSlug) setSelectedPropertySlug(propSlug);
    if (blogSlug) setSelectedBlogSlug(blogSlug);
    if (agentSlug) setSelectedAgentSlug(agentSlug);

    let targetPath = '/';
    if (page === 'properties') targetPath = '/properties';
    else if (page === 'agents') targetPath = '/agents';
    else if (page === 'about') targetPath = '/about';
    else if (page === 'contact') targetPath = '/contact';
    else if (page === 'blogs') targetPath = '/blogs';
    else if (page === 'property-detail') {
      const slug = propSlug || selectedPropertySlug || 'mountain-retreat-villa';
      targetPath = `/properties/${slug}`;
    }
    else if (page === 'agent-detail') {
      const slug = agentSlug || selectedAgentSlug || 'ilir-hoxha';
      targetPath = `/agents/${slug}`;
    }
    else if (page === 'blog-detail') {
      const slug = blogSlug || selectedBlogSlug || 'home-buying-tips';
      targetPath = `/blogs/${slug}`;
    }


    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page, propSlug, blogSlug }, '', targetPath);
    }

    // Scroll smoothly to top or specific section
    if (section && page === 'home') {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContact = (property = null) => {
    setSelectedProperty(property);
    setIsContactOpen(true);
  };

  const isLightPage = 
    currentPage === 'properties' || 
    currentPage === 'agents' ||
    currentPage === 'agent-detail' ||
    currentPage === 'about' ||
    currentPage === 'contact' || 
    currentPage === 'property-detail' ||
    currentPage === 'blogs' ||
    currentPage === 'blog-detail';

  return (
    <div className={`homely-app page-${currentPage}-active`}>
      {/* 1. Initial Full Forest-AL Loading Screen (Requirement 1) */}
      <ForestalLoadingScreen loading={isInitialLoading} />

      {/* 2. Secondary Loading Screen for Page Switches (same bg, mint roof lines, minimal progress bar, no letters, no icons) */}
      <PageTransitionLoader active={isPageSwitching} />

      {/* Navigation */}
      <Navbar 
        isLightPage={isLightPage}
        onNavigateHome={() => navigateTo('home')}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenContact={() => navigateTo('contact')}
      />

      {/* Slide-over Drawer Menu */}
      <MenuDrawer 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(page, section) => navigateTo(page, section)}
        onOpenContact={() => navigateTo('contact')}
      />

      {/* Main Content Router */}
      <main id="main">
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Banner */}
            <Hero 
              onOpenContact={() => navigateTo('contact')} 
              onNavigateToProperties={(filter) => navigateTo('properties', null, filter)}
              onNavigateToProperty={(slug) => navigateTo('property-detail', null, null, null, slug)}
            />

            {/* 2. Property Search, Rent & Seller Inquiry Bar */}
            <PropertySearchBar 
              onSearchProperties={(criteria) => {
                navigateTo(
                  'properties', 
                  null, 
                  criteria.propertyType || "All", 
                  criteria
                );
              }}
              onOpenContact={() => navigateTo('contact')}
            />

            {/* 3. Categories Bento Grid */}
            <Categories 
              onNavigateToProperties={(categoryTitle) => {
                navigateTo('properties', null, categoryTitle);
              }}
            />

            {/* 3b. Homepage Properties Showcase with Redirect Button (Requirement 3) */}
            <HomeProperties 
              onNavigateProperties={(cat) => navigateTo('properties', null, cat || "All")}
              onNavigateToProperty={(slug) => navigateTo('property-detail', null, null, null, slug)}
            />

            {/* 4. Featured Property Showcase */}
            <FeaturedProperty 
              onOpenContact={() => handleOpenContact({ title: "Modern Luxe Villa" })}
              onNavigateToProperty={(slug) => navigateTo('property-detail', null, null, null, slug)}
            />

            {/* 6. About Us Section (Requirement 6: who we are, stats & pillars kept on homepage) */}
            <AboutUs 
              onNavigateProperties={() => navigateTo('properties')}
              onNavigateAbout={() => navigateTo('about')}
              onOpenContact={() => navigateTo('contact')}
            />


            {/* 5. Testimonials Section */}
            <Testimonials />

            {/* 6. Blog Insights Section */}
            <Blog 
              onSelectBlog={(slug) => navigateTo('blog-detail', null, null, null, null, slug)}
              onNavigateBlogs={() => navigateTo('blogs')}
              onSelectArticle={(article) => navigateTo('blog-detail', null, null, null, null, article.slug || article.id)}
            />

            {/* 7. Get In Touch & Marquee Ribbon Section */}
            <GetInTouchCTA 
              onOpenContact={() => navigateTo('contact')}
            />

            {/* 8. FAQ Section */}
            <FAQ />
          </>
        )}

        {currentPage === 'properties' && (
          <PropertiesPage 
            initialFilter={propertiesFilter}
            initialSearch={propertiesSearchCriteria}
            onSelectProperty={(prop) => navigateTo('property-detail', null, null, null, prop.slug || prop.id)}
            onOpenContact={(prop) => handleOpenContact(prop)}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'agents' && (
          <AgentsPage 
            onNavigateHome={() => navigateTo('home')}
            onOpenContact={(agent) => handleOpenContact({ title: `Consultation with ${agent?.name || 'Agent'}` })}
            onSelectAgent={(agentSlug) => navigateTo('agent-detail', null, null, null, null, null, agentSlug)}
          />
        )}

        {currentPage === 'agent-detail' && (
          <AgentDetailPage 
            agentSlug={selectedAgentSlug}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAgents={() => navigateTo('agents')}
            onSelectProperty={(slug) => navigateTo('property-detail', null, null, null, slug)}
            onOpenContact={(agent) => handleOpenContact({ title: `Consultation with ${agent?.name || 'Agent'}` })}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigateHome={() => navigateTo('home')}
            onNavigateProperties={(city) => navigateTo('properties', null, 'All', city ? { location: city } : null)}
            onOpenContact={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage 
            propertySlug={selectedPropertySlug}
            onNavigateHome={() => navigateTo('home')}
            onNavigateProperties={() => navigateTo('properties')}
            onSelectProperty={(slug) => navigateTo('property-detail', null, null, null, slug)}
            onOpenContact={(prop) => handleOpenContact(prop)}
          />
        )}


        {currentPage === 'blogs' && (
          <BlogsPage 
            onNavigateHome={() => navigateTo('home')}
            onSelectBlog={(slug) => navigateTo('blog-detail', null, null, null, null, slug)}
          />
        )}

        {currentPage === 'blog-detail' && (
          <BlogDetailPage 
            blogSlug={selectedBlogSlug}
            onNavigateHome={() => navigateTo('home')}
            onNavigateBlogs={() => navigateTo('blogs')}
            onSelectBlog={(slug) => navigateTo('blog-detail', null, null, null, null, slug)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigateHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Footer (Requirement 8: Made by QuolyTech) */}
      <Footer 
        onOpenContact={() => handleOpenContact()}
        onNavigate={(page, section, filter) => navigateTo(page, section, filter)}
      />

      {/* Interactive Modals */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preselectedProperty={selectedProperty}
      />

      <PropertyModal 
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenContact={(prop) => handleOpenContact(prop)}
      />

      <ArticleModal 
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Requirement 7: Framer badge has been completely removed */}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

