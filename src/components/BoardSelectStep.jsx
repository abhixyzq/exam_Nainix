import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { BOARDS_DATA } from '../data/mockData';

const ICON_MAP = {
  GraduationCap,
  BookOpen,
  Award,
  Shield,
  Zap
};

export default function BoardSelectStep({ 
  selectedBoard, 
  selectedClass, 
  onSelectBoard, 
  onSelectClass, 
  onContinueToSubject 
}) {
  return (
    <div className="page-scroll-container" style={{
      padding: '1.5rem 1.5rem 5rem 1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
          <Flame size={12} fill="currentColor" /> STEP 1 OF 4: CHOOSE YOUR BOARD & CLASS
        </span>
        <h2 style={{ 
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', 
          fontWeight: '800', 
          color: '#0f172a',
          letterSpacing: '-0.03em',
          margin: '0 0 0.5rem 0'
        }}>
          Select Your Board Examination
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#475569', maxWidth: '640px', margin: '0 auto', fontWeight: '500' }}>
          Choose your education board and class level to load tailored chapter question banks, model papers, and official timed mock tests.
        </p>
      </div>

      {/* Class Selector Segment Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>Target Class:</span>
        {['10th', '12th'].map(cls => (
          <button
            key={cls}
            onClick={() => onSelectClass(cls)}
            style={{
              padding: '0.5rem 1.4rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.88rem',
              border: selectedClass === cls ? '2px solid #0072f5' : '1px solid #cbd5e1',
              backgroundColor: selectedClass === cls ? '#0072f5' : '#ffffff',
              color: selectedClass === cls ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
              boxShadow: selectedClass === cls ? '0 4px 14px rgba(0, 114, 245, 0.25)' : 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            Class {cls} Board
          </button>
        ))}
      </div>

      {/* Board Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {BOARDS_DATA.map(board => {
          const isSelected = selectedBoard && selectedBoard.id === board.id;
          const IconComp = ICON_MAP[board.icon] || GraduationCap;

          return (
            <div
              key={board.id}
              onClick={() => onSelectBoard(board)}
              className="card"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: isSelected ? '2px solid #0072f5' : '1px solid rgba(255, 255, 255, 0.85)',
                backgroundColor: isSelected ? 'rgba(230, 241, 254, 0.9)' : 'rgba(255, 255, 255, 0.75)',
                boxShadow: isSelected ? '0 12px 32px rgba(0, 114, 245, 0.18)' : 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? '#0072f5' : 'rgba(0, 114, 245, 0.12)',
                    color: isSelected ? '#ffffff' : '#0072f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                  }}>
                    <IconComp size={24} />
                  </div>

                  {board.popular && (
                    <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>
                      POPULAR
                    </span>
                  )}
                </div>

                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '800', 
                  color: '#0f172a',
                  margin: '0 0 0.25rem 0',
                  letterSpacing: '-0.01em'
                }}>
                  {board.name}
                </h3>
                
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.65rem' }}>
                  {board.code} • {board.students} Active Students
                </span>

                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem 0', fontWeight: '500', lineHeight: 1.45 }}>
                  {board.tagline}
                </p>

                <div style={{
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'rgba(241, 245, 249, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  color: '#334155',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}>
                  <CheckCircle2 size={14} style={{ color: '#0072f5', flexShrink: 0 }} />
                  <span>{board.pattern}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBoard(board);
                    onContinueToSubject();
                  }}
                  className={isSelected ? "btn btn-secondary btn-full" : "btn btn-outline btn-full"}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '0.7rem',
                    fontSize: '0.88rem',
                    fontWeight: '700'
                  }}
                >
                  <span>{isSelected ? `Selected Board - Explore Subjects` : `Select ${board.name}`}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
