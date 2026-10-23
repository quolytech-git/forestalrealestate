import React, { useId } from 'react';
import './ForestalLogo.css';

// Forest-AL Full Logo (Roofs + Wordmark), animated on mount
export const ForestalLogo = ({ className = "", dark = false }) => {
  const clipId = `fl-clip-${useId().replace(/:/g, '')}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="100 220 1505 495"
      className={`forestal-logo ${className}`}
      style={{ color: dark ? "#172023" : "#ffffff" }}
      role="img"
      aria-label="Forest-AL"
    >
      <defs>
        <clipPath id={clipId}>
          <rect className="fl-wipe" x="130" y="530" width="1480" height="150" />
        </clipPath>
      </defs>

      <g className="fl-house fl-house-left">
        <polygon className="fl-ink fl-roof fl-roof-left" points="118,478 452,237 978,483 872,483 453,288 148,478" />
        <rect className="fl-ink fl-chimney fl-chimney-left" x="740" y="338" width="57" height="62" />
      </g>
      <g className="fl-house fl-house-right">
        <polygon className="fl-ink fl-roof fl-roof-right" points="652,334 777,233 1297,483 1183,483 777,286 684,350" />
        <rect className="fl-ink fl-chimney fl-chimney-right" x="1011" y="316" width="58" height="62" />
      </g>

      <g clipPath={`url(#${clipId})`}>
        <text
          className="fl-ink fl-word"
          x="150"
          y="657"
          textLength="1438"
          lengthAdjust="spacingAndGlyphs"
        >
          FOREST-AL
        </text>
      </g>

      <rect className="fl-ink fl-line" x="144" y="679" width="1445" height="20" />
    </svg>
  );
};

// Kept for existing imports
export const HomelyLogo = ForestalLogo;

// Green House Badge Icon (used next to section labels)
export const GreenHouseBadge = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path 
      fill="#07BE8A" 
      d="M17.5 9.375v7.5a.625.625 0 0 1-.625.625H3.125a.625.625 0 0 1-.625-.625v-7.5a1.24 1.24 0 0 1 .366-.884l6.25-6.25a1.25 1.25 0 0 1 1.768 0l6.25 6.25a1.24 1.24 0 0 1 .366.884"
    />
  </svg>
);

// Bed Icon
export const BedIcon = ({ size = 20, color = "#172023" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
  </svg>
);

// Bathtub / Pool Icon
export const BathIcon = ({ size = 20, color = "#172023" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6h6a2 2 0 0 1 2 2v2H7V8a2 2 0 0 1 2-2Z" />
    <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z" />
    <path d="M6 19v2M18 19v2" />
  </svg>
);

// Parking / Car Icon
export const CarIcon = ({ size = 20, color = "#172023" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

// Area / m² Icon
export const AreaIcon = ({ size = 20, color = "#172023" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4l-3 3 3 3M4 7h12M13 16l3-3-3-3M16 13H4" />
  </svg>
);

// Bar / Cocktail Icon
export const BarIcon = ({ size = 20, color = "#172023" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8M12 11v11M5 3l7 8 7-8H5Z" />
  </svg>
);

// Decorative Outline Arc
export const CurvedDeco = () => (
  <svg width="280" height="280" viewBox="0 0 280 280" fill="none" style={{ position: "absolute", right: 0, top: 0, pointerEvents: "none", opacity: 0.25 }}>
    <path d="M280 0C280 154.64 154.64 280 0 280" stroke="#07BE8A" strokeWidth="1.5" />
  </svg>
);
