import React from 'react';
import { User, LogOut, Phone } from 'lucide-react';

export default function Navbar({ 
  onOpenAdmin,
  onGoHome,
  studentSession,
  onLogout
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

      {/* Right Side: Logged In Student Session or Admin Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {studentSession ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
              <Phone size={12} />
              <span>{studentSession.mobile}</span>
            </span>

            <button
              onClick={onLogout}
              title="Log Out"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut size={18} strokeWidth={2.2} />
            </button>
          </div>
        ) : (
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
        )}
      </div>

    </header>
  );
}
