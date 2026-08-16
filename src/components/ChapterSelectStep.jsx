import React from 'react';
import { 
  FileText, 
  Clock, 
  Flame, 
  Play, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2,
  BookOpen
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
      padding: '1.5rem 1.5rem 5rem 1.5rem',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Top Banner Card */}
      <div className="card animate-fade-in" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                onClick={onBackToSubjects}
                className="btn btn-ghost btn-sm"
                style={{ color: '#ffffff', padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <span className="badge badge-primary" style={{ backgroundColor: 'rgba(0, 114, 245, 0.25)', color: '#60a5fa', borderColor: 'rgba(0, 114, 245, 0.4)' }}>
                <Sparkles size={12} /> STEP 3 OF 4: SELECT CHAPTER OR FULL MOCK
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              {subject.name}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, fontWeight: '500' }}>
              {subject.code} • Select an individual chapter test or challenge the full subject mock exam.
            </p>
          </div>

          {/* Full Subject Test CTA */}
          <button
            onClick={() => onStartFullSubjectTest(subject)}
            className="btn btn-secondary"
            style={{
              padding: '0.8rem 1.4rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.9rem',
              boxShadow: '0 6px 20px rgba(0, 114, 245, 0.4)'
            }}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Full Subject Mock (All Chapters)</span>
          </button>
        </div>
      </div>

      {/* Section Subheader */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
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
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.4rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
                  fontSize: '0.95rem',
                  flexShrink: 0
                }}>
                  Ch {idx + 1}
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                    {title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={13} /> {questionsCount} MCQs
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {timeMins} Mins
                    </span>
                    <span className="badge" style={{ backgroundColor: diffBg, color: diffColor, fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                      {difficulty}
                    </span>
                    {isVVI && (
                      <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                        <Flame size={10} fill="currentColor" /> VVI 2026
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartChapterTest(ch, subject)}
                className="btn btn-primary btn-sm"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.82rem',
                  fontWeight: '700'
                }}
              >
                <span>Start Chapter Test</span>
                <Play size={13} fill="currentColor" />
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
