import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
      padding: '0.75rem 1rem 5.5rem 1rem',
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Clean Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', 
          fontWeight: '800', 
          color: '#0f172a',
          letterSpacing: '-0.025em',
          margin: '0 0 0.3rem 0'
        }}>
          अपना परीक्षा बोर्ड चुनें <span style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.7 }}>(Select Board)</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
          विषयवार प्रश्न बैंक और मॉक टेस्ट के लिए अपना बोर्ड और कक्षा चुनें।
        </p>
      </div>

      {/* Class Selector Segment Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginRight: '0.2rem' }}>कक्षा (Class):</span>
        {['10th', '12th'].map(cls => {
          const isSelected = selectedClass === cls;
          return (
            <button
              key={cls}
              onClick={() => onSelectClass(cls)}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: isSelected ? '2px solid #0072f5' : '1px solid #cbd5e1',
                backgroundColor: isSelected ? '#0072f5' : '#ffffff',
                color: isSelected ? '#ffffff' : '#0f172a',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 14px rgba(0, 114, 245, 0.25)' : 'var(--shadow-sm)',
                transition: 'all 0.18s ease'
              }}
            >
              Class {cls}
            </button>
          );
        })}
      </div>

      {/* Clean Boards Container */}
      <div className="board-cards-grid" style={{ marginBottom: '1.5rem' }}>
        {BOARDS_DATA.map(board => {
          const isSelected = selectedBoard && selectedBoard.id === board.id;

          return (
            <React.Fragment key={board.id}>
              {/* Desktop Card Layout */}
              <div
                className="board-card-desktop"
                onClick={() => {
                  onSelectBoard(board);
                  onContinueToSubject();
                }}
                style={{
                  padding: '1.25rem 1.4rem',
                  borderRadius: '20px',
                  border: isSelected ? '2px solid #0072f5' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#f0f7ff' : '#ffffff',
                  boxShadow: isSelected ? '0 10px 28px rgba(0, 114, 245, 0.12)' : '0 4px 16px rgba(15, 23, 42, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <BoardLogo boardId={board.id} size={36} />
                  </div>

                  <div>
                    <h3 style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: '800', 
                      color: '#0f172a',
                      margin: '0 0 0.15rem 0'
                    }}>
                      {board.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>
                      {board.code}
                    </span>
                  </div>
                </div>

                {/* Direct Class 10th / 12th Quick Selection Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBoard(board);
                      onSelectClass('10th');
                      onContinueToSubject();
                    }}
                    style={{
                      borderRadius: '10px',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      border: isSelected && selectedClass === '10th' ? '2px solid #0072f5' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      backgroundColor: isSelected && selectedClass === '10th' ? '#0072f5' : '#ffffff',
                      color: isSelected && selectedClass === '10th' ? '#ffffff' : '#0f172a',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    10th (मैट्रिक)
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBoard(board);
                      onSelectClass('12th');
                      onContinueToSubject();
                    }}
                    style={{
                      borderRadius: '10px',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      border: isSelected && selectedClass === '12th' ? '2px solid #0072f5' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      backgroundColor: isSelected && selectedClass === '12th' ? '#0072f5' : '#ffffff',
                      color: isSelected && selectedClass === '12th' ? '#ffffff' : '#0f172a',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    12th (इंटर)
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
                  padding: '0.75rem 0.85rem',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #0072f5' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#e6f1fe' : '#ffffff',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 114, 245, 0.12)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '0.6rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <BoardLogo boardId={board.id} size={28} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '800', margin: '0 0 0.1rem 0', color: '#0f172a' }}>
                      {board.name}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                      {board.code}
                    </span>
                  </div>
                </div>

                {/* Direct Class 10th / 12th Quick Selection Buttons on Mobile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBoard(board);
                      onSelectClass('10th');
                      onContinueToSubject();
                    }}
                    style={{
                      borderRadius: '8px',
                      padding: '0.3rem 0.55rem',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      border: isSelected && selectedClass === '10th' ? '1.5px solid #0072f5' : '1px solid #cbd5e1',
                      backgroundColor: isSelected && selectedClass === '10th' ? '#0072f5' : '#ffffff',
                      color: isSelected && selectedClass === '10th' ? '#ffffff' : '#0f172a',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    10th
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBoard(board);
                      onSelectClass('12th');
                      onContinueToSubject();
                    }}
                    style={{
                      borderRadius: '8px',
                      padding: '0.3rem 0.55rem',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      border: isSelected && selectedClass === '12th' ? '1.5px solid #0072f5' : '1px solid #cbd5e1',
                      backgroundColor: isSelected && selectedClass === '12th' ? '#0072f5' : '#ffffff',
                      color: isSelected && selectedClass === '12th' ? '#ffffff' : '#0f172a',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    12th
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
}

