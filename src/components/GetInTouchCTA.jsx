import React from 'react';
import { getInTouchData, marqueeTexts } from '../data/homelyData';
import './GetInTouchCTA.css';

export default function GetInTouchCTA({ onOpenContact }) {
  return (
    <section id="contact-banner" className="get-in-touch-section">
      <div className="container">
        {/* Banner with Video/Background */}
        <div className="get-in-touch-card">
          {/* Background Video */}
          <div className="get-in-touch-video-wrap">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              poster={getInTouchData.posterImage}
              className="get-in-touch-video"
            >
              <source src={getInTouchData.videoUrl} type="video/mp4" />
              <source src={getInTouchData.fallbackVideoUrl} type="video/mp4" />
              <img src={getInTouchData.posterImage} alt="Luxury Home" className="get-in-touch-video" />
            </video>
            <div className="get-in-touch-overlay" />
          </div>

          {/* Centered Content */}
          <div className="get-in-touch-content">
            <h2 className="get-in-touch-title">{getInTouchData.title}</h2>
            <button 
              onClick={onOpenContact} 
              className="btn btn-white get-in-touch-btn"
            >
              {getInTouchData.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Ribbon Directly Below Card */}
      <div className="marquee-ribbon">
        <div className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="marquee-item">{marqueeTexts[0]}</span>
              <span className="marquee-divider" />
              <span className="marquee-item">{marqueeTexts[1]}</span>
              <span className="marquee-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
