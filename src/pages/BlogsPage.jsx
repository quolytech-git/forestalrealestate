import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { GreenHouseBadge } from '../components/Icons';
import { blogData } from '../data/homelyData';
import './BlogsPage.css';

export default function BlogsPage({ onNavigateHome, onSelectBlog }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "Tip", "Guides", "Updates", "Insights", "Advice"];

  // Filter and search
  const filteredArticles = useMemo(() => {
    return blogData.articles.filter((art) => {
      // 1. Category Filter
      if (activeCategory !== "All") {
        if (art.tag.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchExcerpt = art.excerpt && art.excerpt.toLowerCase().includes(query);
        const matchAuthor = art.author && art.author.name.toLowerCase().includes(query);
        if (!matchTitle && !matchExcerpt && !matchAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleReset = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="blogs-page">
      {/* ======================================================================
          HERO & BREADCRUMB
          ====================================================================== */}
      <section className="blogs-hero-section">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="blogs-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Blogs</span>
          </nav>

          {/* Centered Header Content */}
          <div className="blogs-hero-header">
            <div className="badge-label blogs-badge">
              <GreenHouseBadge />
              <span>{blogData.badge}</span>
            </div>

            <h1 className="blogs-main-title">
              {blogData.title}
            </h1>

            <p className="blogs-main-subtitle">
              {blogData.subtitle}
            </p>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="blogs-controls-container">
            {/* Category Filter Pills */}
            <div className="blogs-filter-pills" role="tablist" aria-label="Filter articles by topic">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`blogs-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat === "All" ? "All Insights" : cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="blogs-search-wrapper">
              <Search size={16} className="blogs-search-icon" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, market trends..."
                className="blogs-search-input"
                aria-label="Search articles"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="blogs-search-clear-btn"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          ARTICLES SHOWCASE GRID
          ====================================================================== */}
      <section className="blogs-grid-section">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="blogs-empty-box">
              <Sparkles size={36} color="#798a91" />
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching your search or category filter. Try clearing your filters.</p>
              <button onClick={handleReset} className="btn btn-green reset-blogs-btn">
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <>
              <div className="blogs-grid-layout">
                {displayedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="blog-item-card"
                    onClick={() => onSelectBlog && onSelectBlog(article.slug || article.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read ${article.title}`}
                  >
                    {/* Image Container with Tag Badge */}
                    <div className="blog-item-img-wrap">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="blog-item-img" 
                        loading="lazy"
                      />
                      <div className="blog-item-overlay" />
                      <span className="blog-item-tag-chip">
                        {article.tag}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="blog-item-body">
                      <div className="blog-item-meta-top">
                        <span className="blog-item-date">{article.date}</span>
                        {article.readTime && (
                          <span className="blog-item-readtime">
                            <Clock size={12} />
                            {article.readTime}
                          </span>
                        )}
                      </div>

                      <h3 className="blog-item-title">
                        {article.title}
                      </h3>

                      <p className="blog-item-excerpt">
                        {article.excerpt}
                      </p>

                      {/* Author & Read Link Footer */}
                      <div className="blog-item-footer">
                        {article.author && (
                          <div className="blog-item-author">
                            <img 
                              src={article.author.avatar} 
                              alt={article.author.name} 
                              className="blog-item-author-avatar"
                            />
                            <span className="blog-item-author-name">{article.author.name}</span>
                          </div>
                        )}
                        <span className="blog-item-read-link">
                          <span>Read</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="blogs-load-more-row">
                  <button 
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="btn btn-dark blogs-load-more-btn"
                  >
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
