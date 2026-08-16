import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  BarChart3, 
  Users, 
  FileText, 
  CheckCircle2
} from 'lucide-react';

export default function AdminLoginStep({ onBackToHome }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setErrorMsg('Please enter both Admin ID and Passcode.');
      return;
    }
    // Simulate admin login authentication
    setErrorMsg('');
    setIsLoggedIn(true);
  };

  return (
    <div className="page-scroll-container" style={{
      padding: '1.5rem 1.25rem 2rem 1.25rem',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>

      {/* Header back bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBackToHome}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
          }}
        >
          <ArrowLeft size={15} /> Back to Portal
        </button>

        <span className="badge badge-primary" style={{ backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none', padding: '0.35rem 0.85rem' }}>
          <ShieldCheck size={13} /> SECURE ADMIN GATEWAY
        </span>
      </div>

      {!isLoggedIn ? (
        /* Compact Admin Login Card View */
        <div style={{
          maxWidth: '360px',
          margin: '1.25rem auto 0 auto',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '1.5rem 1.35rem',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.07)',
          boxSizing: 'border-box'
        }} className="animate-fade-in">
          
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#0f1c2e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto',
              boxShadow: '0 6px 16px rgba(15, 28, 46, 0.2)'
            }}>
              <ShieldCheck size={22} />
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.25rem 0', letterSpacing: '-0.02em' }}>
              Admin Login
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Authorized Administrators Only
            </p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.5rem 0.75rem',
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAdminLogin}>
            {/* Admin ID / Username Input */}
            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: '600',
                color: '#475569',
                marginBottom: '0.35rem'
              }}>
                एडमिन आईडी (Admin ID)
              </label>

              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin@nainix.edu or ID"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.8rem 0.7rem 2.3rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Admin Passcode Input */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: '600',
                color: '#475569',
                marginBottom: '0.35rem'
              }}>
                एडमिन पासवर्ड (Passcode)
              </label>

              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.8rem 0.7rem 2.3rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Login CTA */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#0f1c2e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(15, 28, 46, 0.2)'
              }}
            >
              <span>लॉग इन करें (Authenticate)</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Credentials Tip */}
          <div style={{
            marginTop: '1.1rem',
            padding: '0.65rem',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '0.72rem',
            color: '#64748b',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <strong>Demo Access:</strong> Enter any Admin ID & Password to test.
          </div>

        </div>
      ) : (
        /* Logged In Admin Dashboard View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
          
          {/* Top Admin Greeting Banner */}
          <div style={{
            backgroundColor: '#0f1c2e',
            color: '#ffffff',
            padding: '1.75rem 1.5rem',
            borderRadius: '24px',
            boxShadow: '0 16px 40px rgba(15, 28, 46, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                  <CheckCircle2 size={12} /> AUTHENTICATED
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
                  Session ID: #ADM-2026-991
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#ffffff' }}>
                Welcome, System Administrator
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0, fontWeight: '500' }}>
                Real-time Management Portal for Board Exams & Question Bank Operations
              </p>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-pill)',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Sign Out Admin
            </button>
          </div>

          {/* Admin Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0072f5', marginBottom: '0.5rem' }}>
                <Users size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Students Enrolled</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>1,25,480</div>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>+12.4% this month</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#059669', marginBottom: '0.5rem' }}>
                <FileText size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Total VVI Questions</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>15,240</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Class 10th & 12th</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d97706', marginBottom: '0.5rem' }}>
                <BarChart3 size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Active Mock Tests</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>142</div>
              <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '600' }}>Real-time evaluation</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#7c3aed', marginBottom: '0.5rem' }}>
                <Database size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Platform Status</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>99.98%</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Zero latency</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
