import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Grid, 
  X, 
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function TestEngine({ 
  subject, 
  questions, 
  onFinishTest, 
  onCancelTest, 
  onToggleBookmark,
  bookmarkedIds = []
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Timer: 15 minutes (900 seconds) countdown
  const [timeLeft, setTimeLeft] = useState(900);

  const handleFinalSubmit = useCallback(() => {
    const timeSpentSeconds = 900 - timeLeft;
    onFinishTest({
      subject,
      questions,
      userAnswers,
      timeSpentSeconds
    });
  }, [timeLeft, onFinishTest, subject, questions, userAnswers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinalSubmit]);

  const currentQ = questions[currentIndex] || questions[0];
  const isBookmarked = bookmarkedIds.includes(currentQ.id);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unattemptedCount = questions.length - answeredCount;

  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'var(--background)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 20
    }}>

      
      {/* ASPP Clean Header Bar */}
      <header style={{
        height: '56px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: 'var(--shadow-sm)',
        position: 'relative'
      }}>
        {/* Top Progress Meter Line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          backgroundColor: '#0072f5',
          transition: 'width 0.3s ease'
        }} />

        {/* Back & Subject */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
          <button
            onClick={onCancelTest}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.35rem', borderRadius: '50%', flexShrink: 0 }}
            title="Exit Test"
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ 
              fontSize: '0.92rem', 
              fontWeight: '800', 
              lineHeight: 1.1, 
              margin: 0,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '140px'
            }}>
              {subject.name}
            </h2>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600', display: 'block', whiteSpace: 'nowrap' }}>
              Q {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Center Timer Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          backgroundColor: timeLeft < 180 ? '#fee2e2' : '#e6f1fe',
          border: timeLeft < 180 ? '1px solid #fca5a5' : '1px solid #bfdbfe',
          color: timeLeft < 180 ? '#ef4444' : '#0072f5',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-pill)',
          fontWeight: '700',
          fontSize: '0.8rem',
          flexShrink: 0
        }}>
          <Clock size={13} className={timeLeft < 180 ? 'animate-pulse' : ''} />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
          <button
            onClick={() => setShowMobilePalette(true)}
            className="btn btn-outline btn-sm mobile-palette-btn"
            style={{ padding: '0.35rem 0.55rem', borderRadius: '8px' }}
            title="Question Palette Grid"
          >
            <Grid size={15} />
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem' }}
          >
            <CheckCircle size={13} />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        padding: '1rem',
        gap: '1rem',
        overflow: 'hidden',
        maxWidth: '1380px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Question & Options Area */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          
          {/* ASPP Pure White Floating Question Card */}
          <div className="card" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.25rem 1.1rem',
            backgroundColor: '#ffffff',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxSizing: 'border-box'
          }}>
            <div>
              {/* Question Meta Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1.1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid #e2e8f0',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0072f5' }} />
                    QUESTION {currentIndex + 1} OF {questions.length}
                  </span>

                  {currentQ.isVVI && (
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                      <Flame size={12} fill="currentColor" />
                      VVI 2026
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <button
                    onClick={() => onToggleBookmark && onToggleBookmark(currentQ.id)}
                    className="btn btn-outline btn-sm"
                    style={{
                      borderColor: isBookmarked ? '#0072f5' : '#cbd5e1',
                      backgroundColor: isBookmarked ? '#e6f1fe' : '#ffffff',
                      color: isBookmarked ? '#0072f5' : '#0f172a',
                      padding: '0.3rem 0.7rem',
                      fontWeight: '600'
                    }}
                    title="Bookmark for Revision"
                  >
                    <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={toggleMarkForReview}
                    className="btn btn-outline btn-sm"
                    style={{
                      borderColor: markedForReview[currentQ.id] ? '#d97706' : '#cbd5e1',
                      backgroundColor: markedForReview[currentQ.id] ? '#fffbeb' : '#ffffff',
                      color: markedForReview[currentQ.id] ? '#d97706' : '#0f172a',
                      padding: '0.3rem 0.7rem',
                      fontWeight: '600'
                    }}
                  >
                    <span>{markedForReview[currentQ.id] ? 'Reviewed' : 'Mark Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Text (Full Visibility without Clipping) */}
              <h3 style={{ 
                fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', 
                fontWeight: '700', 
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                color: '#0f172a',
                overflow: 'visible'
              }}>
                {currentQ.question || currentQ.questionEn}
              </h3>
            </div>

            {/* Option Selection Cards */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem',
              marginBottom: '0.5rem'
            }}>
              {(currentQ.options || currentQ.optionsEn || []).map((optText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const optionLetter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected 
                        ? '2px solid #0072f5' 
                        : '1px solid #cbd5e1',
                      backgroundColor: isSelected 
                        ? '#e6f1fe' 
                        : '#ffffff',
                      color: '#0f172a',
                      fontWeight: isSelected ? '700' : '500',
                      fontSize: '0.92rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: isSelected 
                        ? '0 4px 14px rgba(0, 114, 245, 0.15)' 
                        : 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                      wordBreak: 'break-word'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#0072f5' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      flexShrink: 0
                    }}>
                      {optionLetter}
                    </div>

                    <span style={{ flex: 1, lineHeight: 1.4 }}>{optText}</span>

                    {isSelected && (
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#0072f5',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Question Matrix Palette */}
        <div className="desktop-palette-sidebar card" style={{
          width: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.35rem',
          backgroundColor: '#ffffff',
          flexShrink: 0
        }}>
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.55rem',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                Question Palette
              </h4>
              <span className="badge badge-primary">{questions.length} TOTAL</span>
            </div>

            {/* Legend Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.45rem', 
              fontSize: '0.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f172a' }} />
                <span>Answered ({answeredCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706' }} />
                <span>Review ({reviewCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                <span>Remaining ({unattemptedCount})</span>
              </div>
            </div>

            {/* Matrix Buttons Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              maxHeight: '310px',
              overflowY: 'auto',
              paddingRight: '2px'
            }}>
              {questions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                let bg = '#f1f5f9';
                let border = '1px solid #cbd5e1';
                let color = '#475569';

                if (isAns) { 
                  bg = '#0f172a'; 
                  border = '1px solid #0f172a';
                  color = '#ffffff'; 
                } else if (isMarked) { 
                  bg = '#d97706'; 
                  border = '1px solid #d97706';
                  color = '#ffffff'; 
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      border: currentIndex === idx ? '2px solid #0072f5' : border,
                      backgroundColor: bg,
                      color: color,
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn btn-primary btn-full"
            >
              <span>Submit Final Test</span>
            </button>
          </div>

        </div>

      </div>

      {/* Footer Navigation */}
      <footer style={{
        height: '54px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn btn-outline btn-sm"
          style={{ opacity: currentIndex === 0 ? 0.4 : 1, padding: '0.4rem 0.95rem' }}
        >
          <ArrowLeft size={15} />
          <span>Previous</span>
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => {
              toggleMarkForReview();
              handleNext();
            }}
            className="btn btn-outline btn-sm"
            style={{ 
              borderColor: '#fcd34d', 
              backgroundColor: '#fffbeb', 
              color: '#d97706', 
              padding: '0.4rem 0.85rem' 
            }}
          >
            Mark & Next
          </button>

          {/* Dynamic Save & Next / Submit Test Button */}
          {(() => {
            const isLastQuestion = currentIndex === questions.length - 1;
            return (
              <button
                onClick={() => {
                  if (isLastQuestion) {
                    setShowSubmitModal(true);
                  } else {
                    handleNext();
                  }
                }}
                className="btn btn-primary btn-sm"
                style={{ 
                  backgroundColor: isLastQuestion ? '#0f1c2e' : '#0072f5',
                  borderColor: isLastQuestion ? '#0f1c2e' : '#0072f5',
                  color: '#ffffff',
                  padding: '0.4rem 1.1rem',
                  fontWeight: '800'
                }}
              >
                <span>{isLastQuestion ? 'Submit Test' : 'Save & Next'}</span>
                {isLastQuestion ? <CheckCircle size={15} /> : <ArrowRight size={15} />}
              </button>
            );
          })()}
        </div>
      </footer>



      {/* Mobile Question Palette Bottom Drawer */}
      {showMobilePalette && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(5px)'
        }}>
          <div className="card animate-fade-in" style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 'var(--radius-xl)',
            borderTopRightRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            backgroundColor: 'var(--surface-container-lowest)',
            maxHeight: '75vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
                Question Palette Grid
              </h3>
              <button
                onClick={() => setShowMobilePalette(false)}
                className="btn btn-ghost btn-sm"
                style={{ borderRadius: '50%', padding: '0.35rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              overflowY: 'auto',
              paddingBottom: '1rem'
            }}>
              {questions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                let bg = 'var(--surface-container-high)';
                let color = 'var(--on-surface-variant)';

                if (isAns) { bg = 'var(--secondary)'; color = 'var(--on-secondary)'; }
                else if (isMarked) { bg = 'var(--warning)'; color = '#ffffff'; }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMobilePalette(false);
                    }}
                    style={{
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      border: currentIndex === idx ? '2px solid var(--primary)' : 'none',
                      backgroundColor: bg,
                      color: color,
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowMobilePalette(false);
                setShowSubmitModal(true);
              }}
              className="btn btn-secondary btn-full"
              style={{ marginTop: '0.5rem' }}
            >
              Submit Final Test
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backdropFilter: 'blur(5px)'
        }}>
          <div className="card animate-fade-in" style={{ maxWidth: '380px', width: '100%', padding: '1.35rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-container)',
                color: 'var(--on-secondary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.65rem auto'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.3rem' }}>
                Submit Test Evaluation?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                You answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setShowSubmitModal(false)} className="btn btn-outline btn-full">
                Continue
              </button>
              <button onClick={handleFinalSubmit} className="btn btn-secondary btn-full">
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


