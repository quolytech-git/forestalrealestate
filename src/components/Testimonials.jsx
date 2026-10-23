import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { GreenHouseBadge, CurvedDeco } from './Icons';
import { testimonialsData } from '../data/homelyData';
import './Testimonials.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonialsData.reviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      (prev + 1) % testimonialsData.reviews.length
    );
  };

  const currentReview = testimonialsData.reviews[currentIndex];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-card">
          <CurvedDeco />

          {/* Header */}
          <div className="testimonials-header">
            <div className="badge-label dark">
              <GreenHouseBadge />
              <span className="testimonials-badge-text">{testimonialsData.badge}</span>
            </div>
            <h2 className="testimonials-heading">{testimonialsData.title}</h2>
          </div>

          {/* Testimonial Quote Display */}
          <div className="testimonials-content-box">
            <blockquote className="testimonials-quote">
              “{currentReview.quote}”
            </blockquote>

            <div className="testimonials-footer-row">
              <div className="testimonials-author-block">
                <img 
                  src={currentReview.avatar} 
                  alt={currentReview.name} 
                  className="testimonials-avatar" 
                />
                <div className="testimonials-author-info">
                  <h3 className="testimonials-author-name">{currentReview.name}</h3>
                  <div className="testimonials-role-stars">
                    <span className="testimonials-author-role">{currentReview.role}</span>
                    <div className="testimonials-stars">
                      {[...Array(currentReview.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#07be8a" color="#07be8a" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="testimonials-controls">
                <button 
                  onClick={handlePrev} 
                  className="testimonial-nav-btn"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="testimonials-dots">
                  {testimonialsData.reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`testimonial-dot ${currentIndex === idx ? 'active' : ''}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={handleNext} 
                  className="testimonial-nav-btn"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
