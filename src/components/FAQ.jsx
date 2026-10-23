import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { GreenHouseBadge } from './Icons';
import { faqData } from '../data/homelyData';
import { useLanguage } from '../context/LanguageContext';
import './FAQ.css';

export default function FAQ() {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState(1); // default 1st question open

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container faq-container">
        {/* Left Column: Architectural Photo Collage */}
        <div className="faq-images-col">
          <div className="faq-images-grid">
            <div className="faq-img-cell cell-top">
              <img 
                src={faqData.images[0]} 
                alt="Architectural exterior view" 
                className="faq-img"
                loading="lazy" 
              />
            </div>
            <div className="faq-img-cell cell-bottom-left">
              <img 
                src={faqData.images[1]} 
                alt="Sunlit lounge interior" 
                className="faq-img"
                loading="lazy" 
              />
            </div>
            <div className="faq-img-cell cell-right">
              <img 
                src={faqData.images[2]} 
                alt="Metropolitan high-rise window view" 
                className="faq-img"
                loading="lazy" 
              />
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="faq-content-col">
          <div className="badge-label">
            <GreenHouseBadge />
            <span>{t('faq_badge')}</span>
          </div>

          <h2 className="faq-heading">{t('faq_title')}</h2>
          <p className="faq-subtitle">{t('faq_subtitle')}</p>

          <div className="faq-accordion-list">
            {faqData.questions.map((q) => {
              const isOpen = openId === q.id;
              return (
                <div 
                  key={q.id} 
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button 
                    onClick={() => toggleItem(q.id)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{q.question}</span>
                    <div className="faq-icon-bubble">
                      {isOpen ? (
                        <Minus size={18} color="#172023" strokeWidth={2.5} />
                      ) : (
                        <Plus size={18} color="#172023" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{q.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
