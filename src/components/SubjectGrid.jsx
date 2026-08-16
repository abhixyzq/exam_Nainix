import React, { useState } from 'react';
import { 
  Zap, 
  Lock, 
  Unlock, 
  ChevronRight, 
  BookOpen, 
  Atom, 
  Calculator, 
  Globe, 
  FlaskConical, 
  Dna, 
  Languages, 
  ListOrdered,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Zap,
  Calculator,
  Globe,
  BookOpen,
  Atom,
  FlaskConical,
  Dna,
  Languages
};

export default function SubjectGrid({ 
  subjects, 
  unlockedSubjects, 
  onStartTest, 
  onUnlockSubject 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);

  const categories = ['ALL', 'SCIENCE', 'MATHEMATICS', 'LANGUAGE', 'SOCIAL SCIENCE'];

  const filteredSubjects = subjects.filter(sub => {
    if (activeCategory !== 'ALL' && sub.category.toUpperCase() !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      padding: '0.5rem 1.5rem 1rem 1.5rem',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      paddingBottom: '70px',
      boxSizing: 'border-box'
    }}>
      
      {/* Category Pills Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '0.85rem',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingRight: '1rem', WebkitOverflowScrolling: 'touch' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
              style={{ 
                borderRadius: 'var(--radius-pill)', 
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                padding: '0.4rem 1rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: '700' }}>
          Showing {filteredSubjects.length} Board Subjects
        </span>
      </div>

      {/* Grid Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.25rem',
        alignContent: 'start',
        paddingRight: '2px',
        boxSizing: 'border-box'
      }}>
        {filteredSubjects.map(sub => {
          const isUnlocked = sub.isFree || unlockedSubjects.includes(sub.id);
          const IconComponent = ICON_MAP[sub.iconName] || BookOpen;

          return (
            <div 
              key={sub.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.35rem',
                borderRadius: 'var(--radius-xl)',
                boxSizing: 'border-box'
              }}
            >
              <div>
                {/* Header Row */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'space-between',
                  gap: '0.65rem',
                  marginBottom: '1.1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    {/* Azure Icon Box */}
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(0, 114, 245, 0.12)',
                      color: '#0072f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                    }}>
                      <IconComponent size={23} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ 
                        fontSize: '1.15rem', 
                        fontWeight: '800', 
                        margin: '0 0 2px 0', 
                        letterSpacing: '-0.01em',
                        color: '#0f172a',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {sub.name}
                      </h3>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#475569', 
                        fontWeight: '600', 
                        display: 'block' 
                      }}>
                        {sub.code} • {sub.questionsCount}+ VVI Questions
                      </span>
                    </div>
                  </div>

                  {/* Status Pill Badge */}
                  {isUnlocked ? (
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0072f5' }} />
                      {sub.isFree ? 'FREE' : 'UNLOCKED'}
                    </span>
                  ) : (
                    <span className="badge badge-warning" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                      <Lock size={10} />
                      ₹{sub.price}
                    </span>
                  )}
                </div>

                {/* Chapter Dropdown Accordion */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => setExpandedSubjectId(expandedSubjectId === sub.id ? null : sub.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      color: '#475569',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <ListOrdered size={14} style={{ color: '#0072f5' }} />
                      {sub.chapters.length} Chapters Included
                    </span>
                    <ChevronRight 
                      size={14} 
                      style={{ 
                        transform: expandedSubjectId === sub.id ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </button>

                  {expandedSubjectId === sub.id && (
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
                        <li key={idx}>{ch}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isUnlocked ? (
                  <button
                    onClick={() => onStartTest(sub)}
                    className="btn btn-primary btn-full"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      padding: '0.75rem 1rem',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <span>Start Practice Test</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => onUnlockSubject(sub)}
                    className="btn btn-secondary btn-full"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      padding: '0.75rem 1rem',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <Lock size={16} />
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








