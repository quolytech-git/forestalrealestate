import React from 'react';
import { GreenHouseBadge } from './Icons';
import { blogData } from '../data/homelyData';
import './Blog.css';

export default function Blog({ onSelectArticle, onSelectBlog, onNavigateBlogs }) {
  return (
    <section id="blog" className="blog-section">
      <div className="container">
        {/* Section Header */}
        <div className="blog-header">
          <div className="blog-intro">
            <div className="badge-label">
              <GreenHouseBadge />
              <span>{blogData.badge}</span>
            </div>
            <h2 className="blog-heading">{blogData.title}</h2>
            <p className="blog-subtitle">{blogData.subtitle}</p>
          </div>

          <button 
            onClick={() => {
              if (onNavigateBlogs) {
                onNavigateBlogs();
              } else if (onSelectArticle) {
                onSelectArticle(blogData.articles[0]);
              }
            }} 
            className="btn btn-dark blog-header-btn"
          >
            {blogData.buttonText}
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="blog-grid">
          {blogData.articles.map((item) => (
            <article 
              key={item.id} 
              className="blog-card"
              onClick={() => {
                if (onSelectBlog) {
                  onSelectBlog(item.slug || item.id);
                } else if (onSelectArticle) {
                  onSelectArticle(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Read ${item.title}`}
            >
              <div className="blog-img-wrap">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="blog-img" 
                  loading="lazy"
                />
              </div>

              <div className="blog-card-body">
                <div className="blog-title-meta">
                  <h3 className="blog-card-title">{item.title}</h3>
                  <span className="blog-date">{item.date}</span>
                </div>

                <div className="blog-tag-pill">
                  {item.tag}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
