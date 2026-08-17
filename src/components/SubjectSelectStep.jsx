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
      padding: '0.75rem 1rem 5.5rem 1rem',
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Clean Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none' }}>
            {selectedBoard ? selectedBoard.name : 'BIHAR BOARD'} • CLASS {selectedClass}
          </span>
        </div>

        <h2 style={{ 
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', 
          fontWeight: '800', 
          color: '#0f172a',
          letterSpacing: '-0.025em',
          margin: '0 0 0.3rem 0'
        }}>
          विषय चुनें <span style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.7 }}>(Select Subject)</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
          अभ्यास करने और अध्यायवार ऑनलाइन टेस्ट शुरू करने के लिए अपना विषय चुनें।
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.25rem'
      }}>
        {/* Category Pills */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.2rem',
          WebkitOverflowScrolling: 'touch',
          flex: 1
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '0.35rem 0.95rem',
                whiteSpace: 'nowrap',
                border: activeCategory === cat ? '2px solid #0072f5' : '1px solid #cbd5e1',
                backgroundColor: activeCategory === cat ? '#0072f5' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : '#0f172a',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="विषय खोजें (Search)..."
            style={{
              width: '100%',
              padding: '0.45rem 0.85rem 0.45rem 2.2rem',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              fontSize: '0.8rem',
              outline: 'none',
              fontWeight: '500',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Clean Subject Cards Container */}
      <div className="subject-cards-grid" style={{ marginBottom: '1.5rem' }}>
        {filteredSubjects.map(sub => {
          const isUnlocked = sub.isFree || unlockedSubjects.includes(sub.id);
          const IconComp = ICON_MAP[sub.iconName] || BookOpen;

          return (
            <React.Fragment key={sub.id}>
              {/* Desktop Card Layout */}
              <div
                className="subject-card-desktop"
                onClick={() => isUnlocked ? onSelectSubject(sub) : onUnlockSubject(sub)}
                style={{
                  padding: '1.25rem 1.4rem',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
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
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={24} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                        {sub.name}
                      </h3>
                      {sub.isFree && (
                        <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.15rem 0.55rem', backgroundColor: '#dcfce7', color: '#15803d', border: 'none' }}>
                          FREE
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                      {sub.chapters ? sub.chapters.length : 0} Chapters • {sub.questionsCount}+ VVI Questions
                    </span>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(sub);
                      }}
                      style={{
                        borderRadius: '12px',
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        border: 'none',
                        backgroundColor: '#0072f5',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 4px 14px rgba(0, 114, 245, 0.25)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>अध्याय देखें / View →</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnlockSubject(sub);
                      }}
                      style={{
                        borderRadius: '12px',
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Lock size={14} />
                      <span>Unlock (₹{sub.price})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile One-Liner List Layout */}
              <div
                className="subject-item-mobile"
                onClick={() => isUnlocked ? onSelectSubject(sub) : onUnlockSubject(sub)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-sm)',
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
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={20} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: '800', margin: '0 0 0.1rem 0', color: '#0f172a' }}>
                      {sub.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600', display: 'block' }}>
                      {sub.chapters ? sub.chapters.length : 0} अध्याय (Chapters)
                    </span>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(sub);
                      }}
                      style={{
                        borderRadius: '9999px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        border: 'none',
                        backgroundColor: '#0072f5',
                        color: '#ffffff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      View →
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnlockSubject(sub);
                      }}
                      style={{
                        borderRadius: '9999px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <Lock size={12} />
                      <span>₹{sub.price}</span>
                    </button>
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
