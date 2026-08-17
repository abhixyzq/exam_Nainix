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
import BoardLogo from './BoardLogo';

export default function BoardSelectStep({ 
  selectedBoard, 
  selectedClass, 
  onSelectBoard, 
  onSelectClass, 
  onContinueToSubject 
}) {
  return (
    <div className="page-scroll-container" style={{
      padding: '1rem 1rem 6rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem', marginTop: '0.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none' }}>
            <Flame size={12} fill="currentColor" /> STEP 1 OF 4: CHOOSE YOUR BOARD & CLASS
          </span>
        </div>

        <h2 style={{ 
          fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)', 
          fontWeight: '800', 
          color: '#0f172a',
          letterSpacing: '-0.03em',
          margin: '0 0 0.35rem 0'
        }}>
          Select Your Board Examination
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#475569', maxWidth: '580px', margin: '0 auto', fontWeight: '500', lineHeight: 1.45 }}>
          Choose your education board and class level to load tailored chapter question banks, model papers, and official timed mock tests.
        </p>
      </div>

      {/* Class Selector Segment Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'nowrap'
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>Target Class:</span>
        {['10th', '12th'].map(cls => (
          <button
            key={cls}
            onClick={() => onSelectClass(cls)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.82rem',
              border: selectedClass === cls ? '2px solid #0072f5' : '1px solid #cbd5e1',
              backgroundColor: selectedClass === cls ? '#0f1c2e' : '#ffffff',
              color: selectedClass === cls ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
              boxShadow: selectedClass === cls ? '0 4px 14px rgba(15, 28, 46, 0.25)' : 'var(--shadow-sm)',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Class {cls} Board
          </button>
        ))}
      </div>

      {/* Desktop Board Cards Grid */}
      <div className="board-cards-grid" style={{ marginBottom: '2rem' }}>
        {BOARDS_DATA.map(board => {
          const isSelected = selectedBoard && selectedBoard.id === board.id;

          return (
            <React.Fragment key={board.id}>
              {/* Desktop Card Layout */}
              <div
                className="board-card-desktop"
                onClick={() => onSelectBoard(board)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '24px',
                  border: isSelected ? '2px solid #0072f5' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#f0f7ff' : '#ffffff',
                  boxShadow: isSelected ? '0 12px 32px rgba(0, 114, 245, 0.12)' : '0 12px 32px rgba(15, 23, 42, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
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
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      border: '1px solid #e2e8f0'
                    }}>
                      <BoardLogo boardId={board.id} size={36} />
                    </div>

                    {board.popular && (
                      <span className="badge badge-warning" style={{ fontSize: '0.68rem', backgroundColor: '#fffbeb', color: '#b45309', border: 'none' }}>
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
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
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
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      fontSize: '0.88rem',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      backgroundColor: isSelected ? '#0f1c2e' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#0f172a',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <span>{isSelected ? `Continue with ${board.code} →` : `Select ${board.name}`}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Mobile One-Liner List Layout */}
              <div
                className="board-item-mobile"
                onClick={() => {
                  onSelectBoard(board);
                  onContinueToSubject();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #0072f5' : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? '#e6f1fe' : '#ffffff',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 114, 245, 0.12)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <BoardLogo boardId={board.id} size={30} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                      {board.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                      {board.code} • {board.students}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {isSelected ? (
                    <div style={{
                      backgroundColor: '#0072f5',
                      color: '#ffffff',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <span>Selected</span>
                      <CheckCircle2 size={12} />
                    </div>
                  ) : (
                    <ArrowRight size={16} style={{ color: '#94a3b8' }} />
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
}
