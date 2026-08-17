import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Flame, 
  Play, 
  ArrowLeft, 
  Sparkles,
  BookOpen,
  Sliders
} from 'lucide-react';
import CustomTestModal from './CustomTestModal';

export default function ChapterSelectStep({ 
  subject, 
  onBackToSubjects, 
  onStartChapterTest, 
  onStartFullSubjectTest,
  onStartCustomTest
}) {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  if (!subject) return null;

  const chapters = subject.chapters || [];

  return (
    <div className="page-scroll-container" style={{
      padding: '0.75rem 1rem 5.5rem 1rem',
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Top Banner Card */}
      <div style={{
        backgroundColor: '#0f1c2e',
        color: '#ffffff',
        padding: '1.25rem 1.5rem',
        borderRadius: '24px',
        marginBottom: '1.5rem',
        boxShadow: '0 12px 36px rgba(15, 28, 46, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                onClick={onBackToSubjects}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <ArrowLeft size={13} /> विषय बदलें (Back)
              </button>
              <span className="badge badge-primary" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.7rem' }}>
                {chapters.length} कुल अध्याय (Chapters)
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', margin: '0 0 0.25rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              {subject.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, fontWeight: '500' }}>
              अध्यायवार प्रश्न उत्तर अभ्यास एवं संपूर्ण विषय मॉक टेस्ट।
            </p>
          </div>

          {/* Action CTAs: Custom Combo Test + Full Mock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsCustomModalOpen(true)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease'
              }}
            >
              <Sliders size={14} />
              <span>कस्टम चैप्टर कॉम्बो (Combo Test)</span>
            </button>

            <button
              onClick={() => onStartFullSubjectTest(subject)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: 'none',
                backgroundColor: '#0072f5',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 6px 20px rgba(0, 114, 245, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              <Play size={14} fill="currentColor" />
              <span>संपूर्ण विषय मॉक टेस्ट</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Subheader */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.2rem 0' }}>
          अध्यायवार प्रश्न सेट (Select Chapter)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
          अभ्यास शुरू करने के लिए अपना अध्याय चुनें
        </p>
      </div>

      {/* Clean Chapters Grid Container */}
      <div className="chapter-cards-grid" style={{ marginBottom: '1.5rem' }}>
        {chapters.map((ch, idx) => {
          const title = typeof ch === 'string' ? ch : ch.title;
          const questionsCount = ch.questionsCount || 15;
          const timeMins = ch.timeMins || 10;

          return (
            <React.Fragment key={idx}>
              {/* Desktop Card Layout */}
              <div
                className="chapter-card-desktop"
                onClick={() => onStartChapterTest(ch, subject)}
                style={{
                  padding: '1.1rem 1.3rem',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.88rem',
                    flexShrink: 0
                  }}>
                    Ch {idx + 1}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 0.2rem 0', color: '#0f172a' }}>
                      {title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FileText size={12} /> {questionsCount} MCQs
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {timeMins} Mins
                      </span>
                      <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', backgroundColor: '#fffbeb', color: '#b45309', border: 'none' }}>
                        <Flame size={10} fill="currentColor" /> VVI 2026
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartChapterTest(ch, subject);
                  }}
                  style={{
                    borderRadius: '12px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    border: 'none',
                    backgroundColor: '#0072f5',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 14px rgba(0, 114, 245, 0.25)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>टेस्ट शुरू करें / Start →</span>
                </button>
              </div>

              {/* Mobile One-Liner List Layout */}
              <div
                className="chapter-item-mobile"
                onClick={() => onStartChapterTest(ch, subject)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 0.95rem',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '0.6rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.78rem',
                    flexShrink: 0
                  }}>
                    Ch {idx + 1}
                  </div>

                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '800', margin: '0 0 0.1rem 0', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                      {questionsCount} Qs • {timeMins} Mins
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartChapterTest(ch, subject);
                  }}
                  style={{
                    borderRadius: '9999px',
                    padding: '0.35rem 0.7rem',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    border: 'none',
                    backgroundColor: '#0072f5',
                    color: '#ffffff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    marginLeft: '0.5rem'
                  }}
                >
                  Start →
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Custom Multi-Chapter Test Modal */}
      <CustomTestModal
        subject={subject}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onStartCustomTest={(config) => {
          setIsCustomModalOpen(false);
          if (onStartCustomTest) {
            onStartCustomTest(config);
          }
        }}
      />

    </div>
  );
}
