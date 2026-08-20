import React from 'react';
import { User, LogOut, Mail } from 'lucide-react';

export default function Navbar({ 
  currentStep,
  onBack,
  onOpenAdmin,
  onGoHome,
  studentSession,
  onLogout
}) {
  const showBackBtn = currentStep && currentStep !== 'landing' && currentStep !== 'board';

  return (
    <header style={{
      height: '56px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    }}>
      
      {/* Left Side: Back Button & Nainix Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {showBackBtn && (
          <button
            onClick={onBack}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8fafc',
              color: '#334155'
            }}
            title="Go Back"
          >
            <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>← Back</span>
          </button>
        )}

        <div 
          onClick={onGoHome}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.45rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            backgroundColor: '#0072f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 114, 245, 0.25)'
          }}>
            <User size={18} />
          </div>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: '900',
            letterSpacing: '-0.035em',
            color: '#0f172a'
          }}>
            exam<span style={{ color: '#0072f5' }}>.nainix</span>
          </span>
        </div>
      </div>

      {/* Right Side: Logged In Student Session or Admin Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {studentSession ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
              <Mail size={12} />
              <span>{studentSession.email || studentSession.name}</span>
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
