import React from 'react';
import { User } from 'lucide-react';

export default function Navbar({ 
  onOpenAdmin,
  onGoHome
}) {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'transparent',
      borderBottom: 'none',
      padding: '0 1.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 40,
      flexShrink: 0
    }}>
      
      {/* Brand Text Logo Only */}
      <div 
        onClick={onGoHome}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <span style={{ 
          fontSize: '1.4rem', 
          fontWeight: '800', 
          letterSpacing: '-0.035em',
          color: '#0f172a'
        }}>
          exam<span style={{ color: '#0072f5' }}>.nainix</span>
        </span>
      </div>

      {/* Right Side: Single User/Man Icon leading to Admin Portal */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onOpenAdmin}
          title="Admin Portal (/admin)"
          aria-label="Admin Portal"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.06)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <User size={22} strokeWidth={2.2} />
        </button>
      </div>

    </header>
  );
}
