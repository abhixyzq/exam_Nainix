import React, { useState } from 'react';
import { 
  Zap, 
  Calculator, 
  Globe, 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Languages, 
  Search, 
  Lock, 
  ArrowRight,
  ListOrdered,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Zap,
  Calculator,
  Globe,
  BookOpen,
  Atom,
  FlaskConical,
  Languages
};

export default function SubjectSelectStep({ 
  selectedBoard,
  selectedClass,
  subjects, 
  unlockedSubjects, 
  onSelectSubject, 
  onUnlockSubject 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);

  const categories = ['ALL', 'SCIENCE', 'MATHEMATICS', 'SOCIAL SCIENCE', 'LANGUAGE'];

  const filteredSubjects = subjects.filter(sub => {
    if (activeCategory !== 'ALL' && sub.category.toUpperCase() !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = sub.name.toLowerCase().includes(q);
      const matchCode = sub.code.toLowerCase().includes(q);
      const matchChap = sub.chapters?.some(c => (c.title || c).toLowerCase().includes(q));
      return matchName || matchCode || matchChap;
    }
    return true;
  });

  return (
    <div className="page-scroll-container" style={{
      padding: '1.25rem 1.25rem 5rem 1.25rem',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.72rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none' }}>
              <Sparkles size={12} /> STEP 2 OF 4: SELECT SUBJECT
            </span>
            <span className="badge badge-warning" style={{ fontSize: '0.72rem', backgroundColor: '#fffbeb', color: '#b45309', border: 'none' }}>
              {selectedBoard ? selectedBoard.name : 'ALL BOARDS'} • CLASS {selectedClass}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Choose a Subject to View Chapters
          </h2>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or chapters..."
            style={{
              width: '100%',
              padding: '0.65rem 0.9rem 0.65rem 2.4rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              fontWeight: '500',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        marginBottom: '1.5rem',
        paddingBottom: '0.35rem',
        WebkitOverflowScrolling: 'touch'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.75rem',
              fontWeight: '800',
              padding: '0.45rem 1.1rem',
              whiteSpace: 'nowrap',
              border: activeCategory === cat ? 'none' : '1px solid #cbd5e1',
              backgroundColor: activeCategory === cat ? '#0f1c2e' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
              transition: 'all 0.18s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subject Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredSubjects.map(sub => {
          const isUnlocked = sub.isFree || unlockedSubjects.includes(sub.id);
          const IconComp = ICON_MAP[sub.iconName] || BookOpen;

          return (
            <div
              key={sub.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)',
                boxSizing: 'border-box'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(0, 114, 245, 0.1)',
                      color: '#0072f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComp size={22} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 2px 0', color: '#0f172a' }}>
                        {sub.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                        {sub.code} • {sub.questionsCount}+ VVI Questions
                      </span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none' }}>
                      {sub.isFree ? 'FREE' : 'UNLOCKED'}
                    </span>
                  ) : (
                    <span className="badge badge-warning" style={{ fontSize: '0.68rem', backgroundColor: '#fffbeb', color: '#b45309', border: 'none' }}>
                      <Lock size={10} /> ₹{sub.price}
                    </span>
                  )}
                </div>

                {/* Chapter Quick Accordion */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => setExpandedSubjectId(expandedSubjectId === sub.id ? null : sub.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <ListOrdered size={14} style={{ color: '#0072f5' }} />
                      {sub.chapters ? sub.chapters.length : 0} Chapters Included
                    </span>
                    <ChevronRight size={14} style={{ transform: expandedSubjectId === sub.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedSubjectId === sub.id && sub.chapters && (
                    <ul style={{ 
                      marginTop: '0.65rem', 
                      paddingLeft: '1.25rem', 
                      fontSize: '0.78rem', 
                      color: '#475569',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }} className="animate-fade-in">
                      {sub.chapters.map((ch, idx) => (
                        <li key={idx}>{ch.title || ch}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action */}
              <div>
                {isUnlocked ? (
                  <button
                    onClick={() => onSelectSubject(sub)}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      fontSize: '0.88rem',
                      fontWeight: '800',
                      border: 'none',
                      backgroundColor: '#0f1c2e',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 4px 14px rgba(15, 28, 46, 0.2)'
                    }}
                  >
                    <span>View Chapters & Start Test</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => onUnlockSubject(sub)}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      fontSize: '0.88rem',
                      fontWeight: '800',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    <Lock size={15} />
                    <span>Unlock Subject (₹{sub.price})</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
