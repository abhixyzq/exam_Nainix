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
        height: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.06)'
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
              gap: '0.2rem',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#0072f5' : '#64748b',
              cursor: 'pointer',
              padding: '0.35rem 0.75rem',
              fontWeight: isActive ? '700' : '500',
              fontSize: '0.68rem',
              transition: 'color 0.2s ease'
            }}
          >
            <IconComponent size={18} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
