import React from 'react';
import { X, Bookmark, BookOpen, Trash2, CheckCircle } from 'lucide-react';
import { MOCK_QUESTIONS } from '../data/mockData';

export default function BookmarksModal({ bookmarkedIds, onRemoveBookmark, onClose }) {
  // Collect all bookmarked questions across all subjects
  const allQuestions = Object.values(MOCK_QUESTIONS).flat();
  const bookmarkedQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '640px',
        width: '100%',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--surface-container-lowest)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bookmark size={20} fill="currentColor" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                Saved VVI Question Hub
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>
                {bookmarkedQuestions.length} Questions Bookmarked for Revision
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ borderRadius: '50%', padding: '0.4rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Questions List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {bookmarkedQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--on-surface-variant)' }}>
              <Bookmark size={48} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                No Bookmarked Questions Yet
              </h4>
              <p style={{ fontSize: '0.85rem', maxWidth: '320px', margin: '0 auto' }}>
                Tap "Save" during practice tests to save high-priority VVI questions here for quick revision.
              </p>
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => (
              <div 
                key={q.id} 
                className="card"
                style={{
                  padding: '1rem',
                  border: '1px solid var(--outline-variant)',
                  backgroundColor: 'var(--surface-container-low)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                      Q{idx + 1}
                    </span>
                    {q.chapter && (
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--on-surface-variant)' }}>
                        • {q.chapter}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(q.id)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--error)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                    title="Remove from bookmarks"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  {q.question || q.questionEn}
                </h4>

                {/* Options List */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {(q.options || q.optionsEn || []).map((opt, oIdx) => {
                    const isCorrect = oIdx === q.correctIndex;
                    return (
                      <div
                        key={oIdx}
                        style={{
                          padding: '0.45rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.8rem',
                          border: isCorrect ? '1.5px solid var(--secondary)' : '1px solid var(--outline-variant)',
                          backgroundColor: isCorrect ? 'var(--secondary-container)' : 'var(--surface-container-lowest)',
                          color: isCorrect ? 'var(--on-secondary-container)' : 'var(--on-surface)',
                          fontWeight: isCorrect ? '700' : '400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <span style={{ fontWeight: '800' }}>{String.fromCharCode(65 + oIdx)}.</span>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {isCorrect && <CheckCircle size={13} style={{ color: 'var(--secondary)' }} />}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Explanation Box */}
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-lowest)',
                  borderLeft: '3px solid var(--primary)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={13} />
                    <span>VVI Explanation:</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>
                    {q.explanation || q.explanationEn}
                  </p>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'var(--surface-container-low)'
        }}>
          <button onClick={onClose} className="btn btn-primary btn-sm" style={{ padding: '0.45rem 1.25rem' }}>
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

