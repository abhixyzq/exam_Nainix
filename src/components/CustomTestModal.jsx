import React, { useState } from 'react';
import { X, CheckSquare, Square, Sliders, Play, CheckCircle, Sparkles } from 'lucide-react';

export default function CustomTestModal({ subject, isOpen, onClose, onStartCustomTest }) {
  if (!isOpen || !subject) return null;

  const chapters = subject.chapters || [];

  // Default select first 2-3 chapters or empty
  const [selectedChapterIndexes, setSelectedChapterIndexes] = useState([0, 1].filter(i => i < chapters.length));
  const [questionCount, setQuestionCount] = useState(20);
  const [timeMins, setTimeMins] = useState(15);

  const toggleChapter = (index) => {
    if (selectedChapterIndexes.includes(index)) {
      if (selectedChapterIndexes.length === 1) return; // Keep at least one selected
      setSelectedChapterIndexes(selectedChapterIndexes.filter(i => i !== index));
    } else {
      setSelectedChapterIndexes([...selectedChapterIndexes, index]);
    }
  };

  const selectAll = () => {
    setSelectedChapterIndexes(chapters.map((_, idx) => idx));
  };

  const handleStart = () => {
    const chosenChapters = selectedChapterIndexes.map(idx => chapters[idx]);
    onStartCustomTest({
      chapters: chosenChapters,
      questionCount,
      timeMins,
      subjectName: subject.name
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '480px',
        width: '100%',
        maxHeight: '90vh',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0f1c2e',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#0072f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sliders size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                कस्टम चैप्टर कॉम्बो टेस्ट
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0, fontWeight: '500' }}>
                Custom Multi-Chapter Test ({subject.name})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div style={{
          padding: '1.25rem 1.5rem',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Chapter Selection Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a' }}>
              1. अध्याय चुनें ({selectedChapterIndexes.length}/{chapters.length} Selected):
            </span>
            <button
              onClick={selectAll}
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#0072f5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Select All
            </button>
          </div>

          {/* Chapter Checkbox List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '0.2rem'
          }}>
            {chapters.map((ch, idx) => {
              const title = typeof ch === 'string' ? ch : ch.title;
              const isChecked = selectedChapterIndexes.includes(idx);

              return (
                <div
                  key={idx}
                  onClick={() => toggleChapter(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    border: isChecked ? '2px solid #0072f5' : '1px solid #e2e8f0',
                    backgroundColor: isChecked ? '#f0f7ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ color: isChecked ? '#0072f5' : '#94a3b8' }}>
                      {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
                      Ch {idx + 1}: {title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question Count Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
              2. कुल प्रश्नों की संख्या (Questions Count):
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[10, 15, 20, 30, 50].map(count => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  style={{
                    flex: 1,
                    minWidth: '55px',
                    padding: '0.45rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    border: questionCount === count ? '2px solid #0072f5' : '1px solid #cbd5e1',
                    backgroundColor: questionCount === count ? '#0072f5' : '#ffffff',
                    color: questionCount === count ? '#ffffff' : '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  {count} Qs
                </button>
              ))}
            </div>
          </div>

          {/* Time Duration Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
              3. समय सीमा (Time Duration):
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[10, 15, 20, 30].map(mins => (
                <button
                  key={mins}
                  onClick={() => setTimeMins(mins)}
                  style={{
                    flex: 1,
                    minWidth: '55px',
                    padding: '0.45rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    border: timeMins === mins ? '2px solid #0072f5' : '1px solid #cbd5e1',
                    backgroundColor: timeMins === mins ? '#0072f5' : '#ffffff',
                    color: timeMins === mins ? '#ffffff' : '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  {mins} Mins
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <button
            onClick={handleStart}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '14px',
              fontSize: '0.9rem',
              fontWeight: '800',
              border: 'none',
              backgroundColor: '#0072f5',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 114, 245, 0.3)'
            }}
          >
            <Play size={16} fill="currentColor" />
            <span>कॉम्बो टेस्ट शुरू करें ({selectedChapterIndexes.length} Ch • {questionCount} Qs) →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
