import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  BookOpen,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function TestResults({ 
  resultData, 
  onRetakeTest, 
  onBackToHome, 
  onToggleBookmark,
  bookmarkedIds = [] 
}) {
  const { subject, questions, userAnswers, timeSpentSeconds } = resultData;
  const [filter, setFilter] = useState('all');

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  questions.forEach(q => {
    const selected = userAnswers[q.id];
    if (selected === undefined) {
      unattemptedCount++;
    } else if (selected === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalQ = questions.length;
  const percentage = Math.round((correctCount / totalQ) * 100);


  // Board Division evaluation
  let divisionLabel = "1st Division";
  let divisionBadgeColor = "var(--success)";
  let divisionBadgeBg = "var(--success-bg)";
  let divisionDesc = "Outstanding performance! You are on track for top board honors.";

  if (percentage < 30) {
    divisionLabel = "Needs Revision";
    divisionBadgeColor = "var(--error)";
    divisionBadgeBg = "var(--error-container)";
    divisionDesc = "Focus on weak chapters and review the explanations below.";
  } else if (percentage < 45) {
    divisionLabel = "3rd Division";
    divisionBadgeColor = "var(--warning)";
    divisionBadgeBg = "var(--warning-bg)";
    divisionDesc = "Good effort! Practice more questions to cross 60%+ for 1st Division.";
  } else if (percentage < 60) {
    divisionLabel = "2nd Division";
    divisionBadgeColor = "var(--primary)";
    divisionBadgeBg = "var(--primary-container)";
    divisionDesc = "Solid score! A little extra practice will push you into 1st Division.";
  }

  useEffect(() => {
    if (percentage >= 60) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  }, [percentage]);

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const filteredQuestions = questions.filter(q => {
    const sel = userAnswers[q.id];
    if (filter === 'correct') return sel === q.correctIndex;
    if (filter === 'incorrect') return sel !== undefined && sel !== q.correctIndex;
    if (filter === 'unanswered') return sel === undefined;
    return true;
  });

  return (
    <div className="page-scroll-container" style={{
      padding: '1.25rem 1rem 6rem 1rem',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxSizing: 'border-box'
    }}>
      {/* World-Class Score Dashboard Hero Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: divisionBadgeBg,
            color: divisionBadgeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Trophy size={32} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: divisionBadgeBg, color: divisionBadgeColor, border: 'none', fontWeight: '800' }}>
                {divisionLabel}
              </span>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700' }}>
                {subject.name} • Official Scorecard
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#0f172a', letterSpacing: '-0.03em' }}>
              {percentage}% Marks Secured
            </h2>
            
            <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, fontWeight: '500', maxWidth: '580px', lineHeight: 1.5 }}>
              {divisionDesc}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={onRetakeTest}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.82rem',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RotateCcw size={14} /> Retake Test
          </button>

          <button
            onClick={onBackToHome}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '800',
              fontSize: '0.82rem',
              border: 'none',
              backgroundColor: '#0f1c2e',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(15, 28, 46, 0.2)'
            }}
          >
            <Home size={14} /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem'
      }}>
        {/* Total Questions */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '1.1rem 1.25rem',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Total Questions
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
            {totalQ}
          </div>
        </div>

        {/* Correct Answers */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '1.1rem 1.25rem',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Correct
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#059669', marginTop: '0.2rem' }}>
            {correctCount}
          </div>
        </div>

        {/* Incorrect Answers */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '1.1rem 1.25rem',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Incorrect
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#dc2626', marginTop: '0.2rem' }}>
            {incorrectCount}
          </div>
        </div>

        {/* Time Taken */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '1.1rem 1.25rem',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Time Spent
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
            {formatSeconds(timeSpentSeconds)}
          </div>
        </div>
      </div>

        {/* Filter Tabs Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.6rem'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: 'var(--on-surface)' }}>
            Detailed Solution Review
          </h4>

          <div style={{
            display: 'flex',
            gap: '0.35rem',
            backgroundColor: 'var(--surface-container-low)',
            padding: '3px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--outline-variant)'
          }}>
            {[
              { id: 'all', label: `All (${totalQ})` },
              { id: 'correct', label: `Correct (${correctCount})` },
              { id: 'incorrect', label: `Incorrect (${incorrectCount})` },
              { id: 'unanswered', label: `Unattempted (${unattemptedCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: filter === tab.id ? 'var(--primary)' : 'transparent',
                  color: filter === tab.id ? 'var(--on-primary)' : 'var(--on-surface-variant)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Question Review Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredQuestions.map((q) => {
            const questionIndex = questions.findIndex(item => item.id === q.id);
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;
            const isUnattempted = userChoice === undefined;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div 
                key={q.id} 
                className="card"
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--surface-container-lowest)',
                  border: '1px solid var(--outline-variant)'
                }}
              >
                {/* Question Header Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-neutral" style={{ fontWeight: '800', fontSize: '0.75rem' }}>
                      Q{questionIndex + 1}
                    </span>

                    {isCorrect ? (
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                        <CheckCircle2 size={13} />
                        Correct (+1)
                      </span>
                    ) : isUnattempted ? (
                      <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                        <HelpCircle size={13} />
                        Unattempted (0)
                      </span>
                    ) : (
                      <span className="badge" style={{ backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)', fontSize: '0.75rem', fontWeight: '700' }}>
                        <XCircle size={13} />
                        Incorrect (0)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleBookmark && onToggleBookmark(q.id)}
                    className="btn btn-ghost btn-sm"
                    style={{
                      padding: '0.25rem 0.55rem',
                      color: isBookmarked ? 'var(--primary)' : 'var(--on-surface-variant)',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}
                  >
                    <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Question Title */}
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  lineHeight: 1.45, 
                  color: 'var(--on-surface)',
                  marginBottom: '1rem'
                }}>
                  <MathRenderer text={q.question || q.questionEn} />
                </h4>

                {/* Options List with Student Choice & Correct Answer Highlights */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                  {(q.options || q.optionsEn || []).map((optText, optIdx) => {
                    const isUserChoice = userChoice === optIdx;
                    const isRightOption = optIdx === q.correctIndex;
                    const optionLetter = String.fromCharCode(65 + optIdx);

                    let borderStyle = '1px solid var(--outline-variant)';
                    let bgStyle = 'var(--surface-container-low)';
                    let textColor = 'var(--on-surface)';
                    let badgeText = null;

                    if (isRightOption) {
                      borderStyle = '2px solid var(--success)';
                      bgStyle = 'var(--success-bg)';
                      textColor = '#065f46';
                      badgeText = 'Correct Answer ✓';
                    } else if (isUserChoice && !isRightOption) {
                      borderStyle = '2px solid var(--error)';
                      bgStyle = 'var(--error-container)';
                      textColor = 'var(--on-error-container)';
                      badgeText = 'Your Choice ✗';
                    }

                    return (
                      <div
                        key={optIdx}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: borderStyle,
                          backgroundColor: bgStyle,
                          color: textColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          fontWeight: (isRightOption || isUserChoice) ? '700' : '500'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ 
                            fontWeight: '800', 
                            opacity: 0.85 
                          }}>
                            {optionLetter}.
                          </span>
                          <span><MathRenderer text={optText} /></span>
                        </div>

                        {badgeText && (
                          <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase' }}>
                            {badgeText}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Explanation Box with High Contrast Text */}
                <div style={{
                  backgroundColor: 'var(--primary-container)',
                  color: 'var(--on-primary-container)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '4px solid var(--primary)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ fontWeight: '800', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={15} />
                    <span>Explanation & Solution:</span>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45, fontWeight: '500', opacity: 0.95 }}>
                    <MathRenderer text={q.explanation || q.explanationEn} />
                  </p>
                </div>

              </div>
            );
          })}
        </div>

    </div>
  );
}




