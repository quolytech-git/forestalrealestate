import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './PageLoadingLine.css';

/**
 * Enhanced Fast Page Transition Loading Line
 * Visible, sleek neon-emerald sweep with glowing head & status indicator
 */
export default function PageLoadingLine({ active = false }) {
  const [visible, setVisible] = useState(active);
  const [progress, setProgress] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    let t1, t2, t3, t4;
    if (active) {
      setVisible(true);
      setProgress(15);
      
      t1 = setTimeout(() => setProgress(55), 120);
      t2 = setTimeout(() => setProgress(85), 320);
      t3 = setTimeout(() => setProgress(100), 520);
    } else {
      setProgress(100);
      t4 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [active]);

  if (!visible) return null;

  return (
    <div 
      className={`page-transition-line-container ${active ? 'loading' : 'completed'}`}
      role="progressbar"
      aria-label="Faqja po ngarkohet"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* 1. Neon glowing line across the top */}
      <div 
        className="page-transition-line-bar" 
        style={{ width: `${progress}%` }}
      >
        <span className="page-transition-glow-head" />
      </div>

      {/* 2. Floating center glass pill badge so transition is 100% noticeable */}
      <div className="page-transition-status-pill">
        <span className="page-transition-pulse-dot" />
        <span className="page-transition-text">
          {language === 'sq' ? 'Duke ngarkuar faqen…' : 'Loading page…'}
        </span>
      </div>
    </div>
  );
}

