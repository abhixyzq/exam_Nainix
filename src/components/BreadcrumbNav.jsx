import React from 'react';
import { ChevronRight, Home, Layers, BookOpen, FileText, Play, Award } from 'lucide-react';

export default function BreadcrumbNav({ 
  currentStep, 
  selectedBoard, 
  selectedClass,
  selectedSubject, 
  selectedChapter,
  onNavigate 
}) {
  const steps = [
    { id: 'board', label: selectedBoard ? selectedBoard.name : 'Board Select', icon: Layers },
    { id: 'subject', label: selectedSubject ? selectedSubject.name : 'Subjects', icon: BookOpen, disabled: !selectedBoard },
    { id: 'chapter', label: selectedChapter ? (selectedChapter === 'all' ? 'Full Mock' : selectedChapter.title) : 'Chapters', icon: FileText, disabled: !selectedSubject },
    { id: 'test', label: 'Start Test', icon: Play, disabled: true },
    { id: 'results', label: 'Results', icon: Award, disabled: true }
  ];

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      padding: '0.45rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.78rem',
      fontWeight: '600',
      color: '#64748b',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      flexShrink: 0,
      zIndex: 30
    }}>
      <button
        onClick={() => onNavigate('landing')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'none',
          border: 'none',
          color: currentStep === 'landing' ? '#0072f5' : '#475569',
          fontWeight: '700',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {steps.map((s, idx) => {
        const Icon = s.icon;
        const isActive = currentStep === s.id;
        const isPast = ['landing', 'board', 'subject', 'chapter', 'test', 'results'].indexOf(currentStep) > ['landing', 'board', 'subject', 'chapter', 'test', 'results'].indexOf(s.id);

        if (s.disabled && !isActive && !isPast) return null;

        return (
          <React.Fragment key={s.id}>
            <ChevronRight size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
            
            <button
              onClick={() => {
                if (!s.disabled && (isPast || isActive)) {
                  onNavigate(s.id);
                }
              }}
              disabled={s.disabled || (!isPast && !isActive)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'none',
                border: 'none',
                color: isActive ? '#0072f5' : isPast ? '#0f172a' : '#94a3b8',
                fontWeight: isActive ? '800' : isPast ? '700' : '500',
                cursor: (isPast || isActive) && !s.disabled ? 'pointer' : 'default',
                padding: '0.2rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'rgba(0, 114, 245, 0.08)' : 'transparent',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={13} />
              <span>{s.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
