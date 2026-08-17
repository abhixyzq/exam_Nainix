import React from 'react';
import { X, GraduationCap, ChevronRight } from 'lucide-react';
import BoardLogo from './BoardLogo';

export default function ClassSelectModal({ board, isOpen, onClose, onSelectClassAndContinue }) {
  if (!isOpen || !board) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '380px',
        width: '100%',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1rem', right: '1rem', borderRadius: '50%', padding: '0.35rem' }}
        >
          <X size={18} />
        </button>

        {/* Board Header Info */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <BoardLogo boardId={board.id} size={40} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.2rem 0', color: '#0f172a' }}>
            {board.name}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '600' }}>
            अपनी कक्षा का चयन करें (Choose Your Class)
          </p>
        </div>

        {/* 10th and 12th Class Choice Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Class 10th Card */}
          <button
            onClick={() => onSelectClassAndContinue('10th')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.95rem 1.1rem',
              borderRadius: '16px',
              border: '2px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0072f5';
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <GraduationCap size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0f172a' }}>
                  Class 10th (मैट्रिक)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>
                  Matriculation Board Exam
                </div>
              </div>
            </div>

            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#0072f5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ChevronRight size={16} />
            </div>
          </button>

          {/* Class 12th Card */}
          <button
            onClick={() => onSelectClassAndContinue('12th')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.95rem 1.1rem',
              borderRadius: '16px',
              border: '2px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0072f5';
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <GraduationCap size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0f172a' }}>
                  Class 12th (इंटरमीडिएट)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>
                  Intermediate Board Exam
                </div>
              </div>
            </div>

            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#0072f5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ChevronRight size={16} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
