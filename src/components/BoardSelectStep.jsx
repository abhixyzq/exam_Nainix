import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { BOARDS_DATA } from '../data/mockData';
import BoardLogo from './BoardLogo';
import ClassSelectModal from './ClassSelectModal';

export default function BoardSelectStep({ 
  selectedBoard, 
  selectedClass, 
  onSelectBoard, 
  onSelectClass, 
  onContinueToSubject 
}) {
  const [modalBoard, setModalBoard] = useState(null);

  const handleBoardClick = (board) => {
    setModalBoard(board);
  };

  const handleSelectClassAndContinue = (cls) => {
    if (modalBoard) {
      onSelectBoard(modalBoard);
      onSelectClass(cls);
      onContinueToSubject();
      setModalBoard(null);
    }
  };

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
                onClick={() => handleBoardClick(board)}
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
                  gap: '1rem',
                  marginBottom: '0.75rem'
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBoardClick(board);
                  }}
                  style={{
                    borderRadius: '12px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: isSelected ? '#0072f5' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{isSelected ? `Selected (${selectedClass})` : 'Select Board'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Mobile One-Liner List Layout */}
              <div
                className="board-item-mobile"
                onClick={() => handleBoardClick(board)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
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
                    <h4 style={{ fontSize: '0.92rem', fontWeight: '800', margin: '0 0 0.1rem 0', color: '#0f172a' }}>
                      {board.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                      {board.code}
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
                      <span>{selectedClass} Selected</span>
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

      {/* Class Select Pop-up Modal */}
      <ClassSelectModal
        board={modalBoard}
        isOpen={!!modalBoard}
        onClose={() => setModalBoard(null)}
        onSelectClassAndContinue={handleSelectClassAndContinue}
      />

    </div>
  );
}

