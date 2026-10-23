import React, { useEffect, useState } from 'react';
import { Home, Leaf, MapPin } from 'lucide-react';

/**
 * Forest-AL Real Estate Loading Screen
 *
 * @param {Object} props
 * @param {boolean} [props.loading=true] - Controls visibility of the loading screen
 * @param {'light' | 'dark'} [props.variant='light'] - Color theme variant
 * @param {string} [props.text='Finding your place in nature…'] - Subtitle loading text
 */
export default function ForestalLoadingScreen({
  loading = true,
  variant = 'light',
  text = 'Duke gjetur vendin tuaj në natyrë…',
}) {
  const [shouldRender, setShouldRender] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 650);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!shouldRender) return null;

  const isDark = variant === 'dark';
  const brandLetters = 'Forest-AL.'.split('');

  const palette = {
    bg: isDark ? '#0F1D19' : '#FFFFFF',
    heading: isDark ? '#F4F9F7' : '#172023',
    subtext: isDark ? '#98B3AA' : '#475A61',
    eyebrow: isDark ? '#B8D1C8' : '#3B4E54',
    emerald: '#05B881',
    roofLine: isDark ? '#1A332B' : '#D8F5EC',
    trackBg: isDark ? 'rgba(5, 184, 129, 0.16)' : '#E8F8F2',
    badgeBg: isDark ? 'rgba(5, 184, 129, 0.08)' : '#F2FCF8',
    badgeBorder: isDark ? 'rgba(5, 184, 129, 0.22)' : '#D8F5EC',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={loading}
      aria-label="Forest-AL Real Estate loading screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.bg,
        color: palette.heading,
        fontFamily:
          "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        padding: '24px',
        opacity: loading ? 1 : 0,
        transform: loading ? 'scale(1)' : 'scale(1.015)',
        pointerEvents: loading ? 'auto' : 'none',
        transition:
          'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

        @keyframes forestalFadeUp {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Letter-by-letter entrance + subtle continuous wave */
        @keyframes forestalLetterIn {
          0% {
            opacity: 0;
            transform: translateY(22px) rotateX(-35deg) scale(0.92);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes forestalLetterWave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes forestalDotGlow {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 4px rgba(5, 184, 129, 0.4);
            filter: drop-shadow(0 0 2px rgba(5, 184, 129, 0.5));
          }
          50% {
            opacity: 0.9;
            text-shadow: 0 0 16px rgba(5, 184, 129, 0.95), 0 0 28px rgba(5, 184, 129, 0.6);
            filter: drop-shadow(0 0 8px rgba(5, 184, 129, 0.9));
          }
        }

        @keyframes forestalProgressSlide {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(65%);
          }
          100% {
            transform: translateX(250%);
          }
        }

        @keyframes forestalTopBadgeFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.06);
          }
        }

        @keyframes forestalTopBadgeAura {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        /* Sequential bottom badge container elevation */
        @keyframes forestalBadgeGlow {
          0%, 100% {
            transform: translateY(0);
            border-color: ${palette.badgeBorder};
            box-shadow: 0 4px 14px rgba(5, 184, 129, 0.04);
          }
          35%, 65% {
            transform: translateY(-4px);
            border-color: #05B881;
            box-shadow: 0 8px 20px rgba(5, 184, 129, 0.16);
          }
        }

        /* Individual icon micro-animations */
        @keyframes forestalHomeBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(-2.5px) scale(1.1);
          }
          65% {
            transform: translateY(0.5px) scale(0.97);
          }
        }

        @keyframes forestalLeafSway {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          35% {
            transform: rotate(-10deg) translateY(-1.5px) scale(1.08);
          }
          70% {
            transform: rotate(8deg) translateY(-1px) scale(1.05);
          }
        }

        @keyframes forestalPinDrop {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          40% {
            transform: translateY(-4px) scale(1.08);
          }
          65% {
            transform: translateY(1px) scale(0.95);
          }
        }

        @keyframes forestalPinRipple {
          0%, 45%, 100% {
            transform: translateX(-50%) scale(0.3);
            opacity: 0;
          }
          65% {
            transform: translateX(-50%) scale(1);
            opacity: 0.55;
          }
          90% {
            transform: translateX(-50%) scale(1.5);
            opacity: 0;
          }
        }

        .forestal-fade-1 {
          animation: forestalFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both;
        }
        .forestal-fade-2 {
          animation: forestalFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) 260ms both;
        }
        .forestal-fade-3 {
          animation: forestalFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) 420ms both;
        }
        .forestal-fade-4 {
          animation: forestalFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) 560ms both;
        }

        .forestal-letter {
          display: inline-block;
          will-change: transform, opacity;
          animation:
            forestalLetterIn 650ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--char-index) * 55ms + 120ms) both,
            forestalLetterWave 2.8s ease-in-out calc(var(--char-index) * 90ms + 900ms) infinite;
        }

        .forestal-letter-dot {
          display: inline;
          color: #05B881;
          font-weight: 700;
          vertical-align: baseline;
          line-height: 1;
          margin-left: 1px;
          animation:
            forestalLetterIn 650ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--char-index) * 55ms + 120ms) both,
            forestalDotGlow 2.2s ease-in-out 1s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .forestal-fade-1,
          .forestal-fade-2,
          .forestal-fade-3,
          .forestal-fade-4,
          .forestal-letter,
          .forestal-letter-dot,
          .forestal-top-badge,
          .forestal-top-aura,
          .forestal-progress-bar,
          .forestal-icon-badge,
          .forestal-icon-home,
          .forestal-icon-leaf,
          .forestal-icon-pin,
          .forestal-pin-ripple {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* Architectural 45-degree mint roof lines background */}
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
          stroke={palette.roofLine}
          strokeWidth="1.5"
        />
        <line
          x1="620"
          y1="-100"
          x2="1520"
          y2="800"
          stroke={palette.roofLine}
          strokeWidth="1.5"
        />
        <line
          x1="180"
          y1="980"
          x2="1060"
          y2="100"
          stroke={palette.roofLine}
          strokeWidth="1"
          strokeOpacity="0.65"
        />
      </svg>

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '460px',
          width: '100%',
        }}
      >
        {/* 1. Eyebrow Badge with Animated Pentagonal Emerald House */}
        <div
          className="forestal-fade-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '18px',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
            }}
          >
            {/* Pulsing emerald aura ring */}
            <span
              className="forestal-top-aura"
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '6px',
                border: `1.5px solid ${palette.emerald}`,
                animation: 'forestalTopBadgeAura 2.6s ease-out infinite',
              }}
            />
            {/* Solid emerald pentagonal house icon */}
            <svg
              className="forestal-top-badge"
              width="17"
              height="17"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              style={{
                animation: 'forestalTopBadgeFloat 2.6s ease-in-out infinite',
              }}
            >
              <path
                d="M10 2.2L2.6 8.3C2.22 8.61 2 9.08 2 9.57V16.6C2 17.37 2.63 18 3.4 18H16.6C17.37 18 18 17.37 18 16.6V9.57C18 9.08 17.78 8.61 17.4 8.3L10 2.2Z"
                fill={palette.emerald}
              />
            </svg>
          </span>

          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: palette.eyebrow,
            }}
          >
            FOREST-AL REAL ESTATE
          </span>
        </div>

        {/* 2. Animated Letter-by-Letter Wordmark: Forest-AL. */}
        <h1
          aria-label="Forest-AL."
          style={{
            margin: '0 0 26px 0',
            fontSize: 'clamp(2.5rem, 5.5vw, 3.6rem)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.08,
            color: palette.heading,
            perspective: '600px',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          {brandLetters.map((char, index) => {
            const isDot = char === '.';
            return (
              <span
                key={index}
                aria-hidden="true"
                className={isDot ? 'forestal-letter-dot' : 'forestal-letter'}
                style={{ '--char-index': index }}
              >
                {char}
              </span>
            );
          })}
        </h1>

        {/* 3. Smooth Pill-Shaped Emerald Progress Indicator */}
        <div
          className="forestal-fade-2"
          style={{
            width: '180px',
            height: '4px',
            backgroundColor: palette.trackBg,
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '18px',
          }}
        >
          <div
            className="forestal-progress-bar"
            style={{
              width: '48%',
              height: '100%',
              backgroundColor: palette.emerald,
              borderRadius: '9999px',
              animation:
                'forestalProgressSlide 1.85s cubic-bezier(0.45, 0, 0.25, 1) infinite',
            }}
          />
        </div>

        {/* 4. Subtitle Loading Text */}
        <p
          className="forestal-fade-3"
          style={{
            margin: '0 0 34px 0',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: palette.subtext,
            letterSpacing: '-0.01em',
          }}
        >
          {text}
        </p>

        {/* 5. Three Minimal Outline Icons with Bespoke Micro-Animations */}
        <div
          className="forestal-fade-4"
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* Home Badge */}
          <div
            className="forestal-icon-badge"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '9999px',
              backgroundColor: palette.badgeBg,
              border: `1px solid ${palette.badgeBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.emerald,
              animation: 'forestalBadgeGlow 3s ease-in-out 0s infinite',
            }}
          >
            <Home
              size={16}
              strokeWidth={1.6}
              className="forestal-icon-home"
              style={{
                animation: 'forestalHomeBounce 3s ease-in-out 0s infinite',
              }}
            />
          </div>

          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '9999px',
              backgroundColor: palette.badgeBorder,
            }}
          />

          {/* Leaf Badge */}
          <div
            className="forestal-icon-badge"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '9999px',
              backgroundColor: palette.badgeBg,
              border: `1px solid ${palette.badgeBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.emerald,
              animation: 'forestalBadgeGlow 3s ease-in-out 0.45s infinite',
            }}
          >
            <Leaf
              size={16}
              strokeWidth={1.6}
              className="forestal-icon-leaf"
              style={{
                transformOrigin: 'bottom center',
                animation: 'forestalLeafSway 3s ease-in-out 0.45s infinite',
              }}
            />
          </div>

          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '9999px',
              backgroundColor: palette.badgeBorder,
            }}
          />

          {/* Location Pin Badge */}
          <div
            className="forestal-icon-badge"
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '9999px',
              backgroundColor: palette.badgeBg,
              border: `1px solid ${palette.badgeBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette.emerald,
              animation: 'forestalBadgeGlow 3s ease-in-out 0.9s infinite',
            }}
          >
            <MapPin
              size={16}
              strokeWidth={1.6}
              className="forestal-icon-pin"
              style={{
                animation: 'forestalPinDrop 3s ease-in-out 0.9s infinite',
              }}
            />
            {/* Tiny ground ripple under the pin */}
            <span
              className="forestal-pin-ripple"
              style={{
                position: 'absolute',
                bottom: '7px',
                left: '50%',
                width: '8px',
                height: '2.5px',
                borderRadius: '9999px',
                backgroundColor: palette.emerald,
                animation: 'forestalPinRipple 3s ease-out 0.9s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
