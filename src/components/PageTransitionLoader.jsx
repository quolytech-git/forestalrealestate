import React, { useEffect, useState } from 'react';

/**
  * Forest-AL Page Transition Loader
  * Displayed during route switching:
  * - Exact same background and architectural mint roof lines as the main loading screen
  * - Pure minimal pill progress bar ("pafatet")
  * - NO letters and NO icons
  */
export default function PageTransitionLoader({ active = false }) {
  const [shouldRender, setShouldRender] = useState(active);

  useEffect(() => {
    if (active) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Duke ngarkuar faqen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <style>{`
        @keyframes pageTransitionProgressSlide {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(45%);
          }
          100% {
            transform: translateX(230%);
          }
        }
      `}</style>

      {/* Identical Architectural 45-degree mint roof lines SVG background as main screen */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line
          x1="-120"
          y1="660"
          x2="640"
          y2="-100"
          stroke="#D8F5EC"
          strokeWidth="1.5"
        />
        <line
          x1="620"
          y1="-100"
          x2="1520"
          y2="800"
          stroke="#D8F5EC"
          strokeWidth="1.5"
        />
        <line
          x1="180"
          y1="980"
          x2="1060"
          y2="100"
          stroke="#D8F5EC"
          strokeWidth="1"
          strokeOpacity="0.65"
        />
      </svg>

      {/* Pure minimal pill progress bar (No letters, No icons) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '180px',
          height: '4px',
          backgroundColor: '#E8F8F2',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '46%',
            height: '100%',
            backgroundColor: '#05B881',
            borderRadius: '9999px',
            boxShadow: '0 0 12px #05B881',
            animation:
              'pageTransitionProgressSlide 1.35s cubic-bezier(0.45, 0, 0.25, 1) infinite',
          }}
        />
      </div>
    </div>
  );
}
