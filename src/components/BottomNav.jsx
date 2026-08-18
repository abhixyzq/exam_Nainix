import React from 'react';
import { Home, Zap, Bookmark, Lock } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Subjects', icon: Home },
    { id: 'test', label: 'Mock Test', icon: Zap },
    { id: 'saved', label: 'Saved VVI', icon: Bookmark },
    { id: 'unlock', label: 'Unlock', icon: Lock }
  ];

  return (
    <nav 
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {navItems.map(item => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab && setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.15rem',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#0072f5' : '#64748b',
              cursor: 'pointer',
              padding: '0.35rem 0.85rem',
              fontWeight: isActive ? '800' : '600',
              fontSize: '0.68rem',
              transition: 'all 0.18s ease',
              position: 'relative'
            }}
          >
            <div style={{
              padding: '0.25rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: isActive ? 'rgba(0, 114, 245, 0.12)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.18s ease'
            }}>
              <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
