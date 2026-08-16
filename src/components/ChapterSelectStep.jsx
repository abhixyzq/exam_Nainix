import React from 'react';
import { 
  FileText, 
  Clock, 
  Flame, 
  Play, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';

export default function ChapterSelectStep({ 
  subject, 
  onBackToSubjects, 
  onStartChapterTest, 
  onStartFullSubjectTest 
}) {
  if (!subject) return null;

  const chapters = subject.chapters || [];

  return (
    <div className="page-scroll-container" style={{
      padding: '1.25rem 1.25rem 5rem 1.25rem',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Top Banner Card */}
      <div style={{
        backgroundColor: '#0f1c2e',
        color: '#ffffff',
        padding: '1.75rem 1.5rem',
        borderRadius: '24px',
        marginBottom: '1.5rem',
        boxShadow: '0 16px 40px rgba(15, 28, 46, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <button
                onClick={onBackToSubjects}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <ArrowLeft size={13} /> Back
              </button>
              <span className="badge badge-primary" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <Sparkles size={12} /> STEP 3 OF 4: SELECT CHAPTER OR FULL MOCK
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              {subject.name}
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0, fontWeight: '500', lineHeight: 1.45 }}>
              {subject.code} • Select an individual chapter test or challenge the full subject mock exam.
            </p>
          </div>

          {/* Full Subject Test CTA */}
          <button
            onClick={() => onStartFullSubjectTest(subject)}
            style={{
              padding: '0.8rem 1.4rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.88rem',
              border: 'none',
              backgroundColor: '#0072f5',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(0, 114, 245, 0.4)',
              whiteSpace: 'nowrap'
            }}
          >
            <Play size={15} fill="currentColor" />
            <span>Start Full Subject Mock</span>
          </button>
        </div>
      </div>

      {/* Section Subheader */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
          Chapter-wise VVI Tests ({chapters.length} Chapters)
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
          Select a chapter to practice timed MCQs
        </span>
      </div>

      {/* Chapters List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {chapters.map((ch, idx) => {
          const title = typeof ch === 'string' ? ch : ch.title;
          const questionsCount = ch.questionsCount || 15;
          const timeMins = ch.timeMins || 10;
          const difficulty = ch.difficulty || "Medium";
          const isVVI = ch.isVVI !== false;

          let diffColor = '#059669';
          let diffBg = '#ecfdf5';
          if (difficulty === 'Medium') { diffColor = '#0284c7'; diffBg = '#e0f2fe'; }
          if (difficulty === 'Hard') { diffColor = '#dc2626'; diffBg = '#fee2e2'; }

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.4rem',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 114, 245, 0.1)',
                  color: '#0072f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  flexShrink: 0
                }}>
                  Ch {idx + 1}
                </div>

                <div>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: '800', margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                    {title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={13} /> {questionsCount} MCQs
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {timeMins} Mins
                    </span>
                    <span className="badge" style={{ backgroundColor: diffBg, color: diffColor, fontSize: '0.68rem', padding: '0.2rem 0.55rem', border: 'none' }}>
                      {difficulty}
                    </span>
                    {isVVI && (
                      <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem', backgroundColor: '#fffbeb', color: '#b45309', border: 'none' }}>
                        <Flame size={10} fill="currentColor" /> VVI 2026
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartChapterTest(ch, subject)}
                style={{
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  border: 'none',
                  backgroundColor: '#0f1c2e',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(15, 28, 46, 0.2)'
                }}
              >
                <span>Start Chapter Test</span>
                <Play size={12} fill="currentColor" />
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
