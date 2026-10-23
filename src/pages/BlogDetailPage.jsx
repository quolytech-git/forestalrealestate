import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Share2, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Quote, 
  Lightbulb, 
  Bookmark,
  Calendar
} from 'lucide-react';
import { blogData } from '../data/homelyData';
import './BlogDetailPage.css';

export default function BlogDetailPage({
  blogSlug,
  onNavigateHome,
  onNavigateBlogs,
  onSelectBlog
}) {
  // Find article by slug or fallback to first
  const currentArticle = blogData.articles.find(
    (a) => a.slug === blogSlug || a.id === blogSlug
  ) || blogData.articles[0];

  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blogSlug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Related articles (pick 3 other articles)
  const relatedArticles = blogData.articles
    .filter((a) => a.id !== currentArticle.id)
    .slice(0, 3);

  return (
    <article className="blog-detail-page">
      {/* ======================================================================
          TOP HEADER: Breadcrumb, Title & Meta Strip
          ====================================================================== */}
      <header className="blog-detail-header-section">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="blog-detail-breadcrumb" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-sep">/</span>
            <button onClick={onNavigateBlogs} className="breadcrumb-link">Blogs</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">{currentArticle.title}</span>
          </nav>

          {/* Article Main Title */}
          <h1 className="blog-detail-title">
            {currentArticle.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="blog-detail-meta-bar">
            {/* Left: Author Avatar & Name */}
            {currentArticle.author && (
              <div className="blog-meta-author-group">
                <img 
                  src={currentArticle.author.avatar} 
                  alt={currentArticle.author.name} 
                  className="blog-meta-avatar" 
                />
                <span className="blog-meta-author-name">{currentArticle.author.name}</span>
              </div>
            )}

            <span className="blog-meta-divider" />

            {/* Date */}
            <div className="blog-meta-item">
              <Calendar size={15} className="blog-meta-icon" />
              <span>{currentArticle.date}</span>
            </div>

            {/* Read Time */}
            {currentArticle.readTime && (
              <>
                <span className="blog-meta-divider" />
                <div className="blog-meta-item">
                  <Clock size={15} className="blog-meta-icon" />
                  <span>{currentArticle.readTime}</span>
                </div>
              </>
            )}

            {/* Category Tag Pill */}
            <span className="blog-detail-tag-pill">
              {currentArticle.tag}
            </span>

            {/* Right: Share Button */}
            <button 
              type="button" 
              onClick={handleShare}
              className="blog-detail-share-btn" 
              title="Share this article"
              aria-label="Share article"
            >
              {copiedLink ? <Check size={15} color="#07be8a" /> : <Share2 size={15} />}
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================================
          HERO BANNER IMAGE
          ====================================================================== */}
      <section className="blog-hero-image-section">
        <div className="container">
          <div className="blog-hero-img-wrap">
            <img 
              src={currentArticle.image} 
              alt={currentArticle.title} 
              className="blog-hero-main-img" 
            />
          </div>
        </div>
      </section>

      {/* ======================================================================
          ARTICLE CONTENT BODY
          ====================================================================== */}
      <section className="blog-body-section">
        <div className="container blog-reading-container">
          
          {/* Lead Intro Paragraph */}
          {currentArticle.contentLead && (
            <p className="blog-lead-paragraph">
              {currentArticle.contentLead}
            </p>
          )}

          {/* Main Article Subheading */}
          {currentArticle.mainHeading && (
            <h2 className="blog-main-heading">
              {currentArticle.mainHeading}
            </h2>
          )}

          {/* Intro Narrative */}
          {currentArticle.intro && (
            <p className="blog-body-text">
              {currentArticle.intro}
            </p>
          )}

          {/* Structured Sections with Headings & Bullets */}
          {currentArticle.sections && currentArticle.sections.map((section, sIdx) => (
            <div key={sIdx} className="blog-content-section-block">
              <h3 className="blog-section-subheading">
                {section.heading}
              </h3>

              {section.text && (
                <p className="blog-body-text">
                  {section.text}
                </p>
              )}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="blog-bullets-list">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="blog-bullet-item">
                      <span className="bullet-point-dot" />
                      <div className="bullet-content">
                        <strong className="bullet-title">{bullet.title}: </strong>
                        <span className="bullet-text">{bullet.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Stylized Quote Callout */}
          {currentArticle.quote && (
            <blockquote className="blog-quote-callout">
              <div className="quote-icon-wrap">
                <Quote size={28} className="quote-deco-icon" />
              </div>
              <p className="quote-content-text">
                "{currentArticle.quote.text}"
              </p>
              {currentArticle.quote.author && (
                <cite className="quote-author-cite">
                  — {currentArticle.quote.author}
                </cite>
              )}
            </blockquote>
          )}

          {/* Key Takeaway Box */}
          {currentArticle.takeaway && (
            <div className="blog-takeaway-card">
              <div className="takeaway-header">
                <Lightbulb size={20} className="takeaway-icon" />
                <h4 className="takeaway-title">Key Takeaway</h4>
              </div>
              <p className="takeaway-text">
                {currentArticle.takeaway}
              </p>
            </div>
          )}

          {/* Bottom Share & Bookmark Strip */}
          <div className="blog-bottom-share-strip">
            <span className="share-strip-label">Found this helpful? Share with others:</span>
            <button 
              type="button" 
              onClick={handleShare}
              className="blog-share-pill-btn"
            >
              {copiedLink ? <Check size={16} color="#07be8a" /> : <Share2 size={16} />}
              <span>{copiedLink ? "Link Copied to Clipboard" : "Share Article"}</span>
            </button>
          </div>

          {/* Author Bio Card */}
          {currentArticle.author && (
            <div className="blog-author-bio-card">
              <img 
                src={currentArticle.author.avatar} 
                alt={currentArticle.author.name} 
                className="author-bio-avatar" 
              />
              <div className="author-bio-content">
                <span className="author-bio-label">Written by</span>
                <h4 className="author-bio-name">{currentArticle.author.name}</h4>
                <span className="author-bio-role">{currentArticle.author.role}</span>
                <p className="author-bio-desc">{currentArticle.author.bio}</p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ======================================================================
          RELATED ARTICLES SHOWCASE SECTION
          ====================================================================== */}
      <section className="blog-related-section" aria-label="Related Articles">
        <div className="container">
          <div className="related-header-row">
            <div className="related-title-wrap">
              <span className="related-kicker">Keep Reading</span>
              <h2 className="related-section-title">Related Insights</h2>
            </div>
            <button 
              onClick={onNavigateBlogs} 
              className="related-view-all-link"
            >
              <span>View All Articles</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="related-articles-grid">
            {relatedArticles.map((relArt) => (
              <article 
                key={relArt.id} 
                className="related-article-card"
                onClick={() => {
                  if (onSelectBlog) {
                    onSelectBlog(relArt.slug || relArt.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read ${relArt.title}`}
              >
                <div className="related-card-img-wrap">
                  <img 
                    src={relArt.image} 
                    alt={relArt.title} 
                    className="related-card-img" 
                    loading="lazy"
                  />
                  <span className="related-card-tag">{relArt.tag}</span>
                </div>

                <div className="related-card-body">
                  <div className="related-card-meta">
                    <span className="related-card-date">{relArt.date}</span>
                    {relArt.readTime && (
                      <span className="related-card-readtime">
                        <Clock size={12} />
                        {relArt.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="related-card-title">{relArt.title}</h3>
                  <p className="related-card-excerpt">{relArt.excerpt}</p>

                  <div className="related-card-footer">
                    {relArt.author && (
                      <span className="related-card-author-name">{relArt.author.name}</span>
                    )}
                    <span className="related-read-link">
                      <span>Read</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
