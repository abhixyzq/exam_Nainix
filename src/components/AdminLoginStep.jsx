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
  Sparkles,
  CheckCircle2,
  KeyRound
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
      padding: '1.5rem 1.25rem 5rem 1.25rem',
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
        /* Login Card View */
        <div style={{
          maxWidth: '460px',
          margin: '2rem auto 0 auto',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)'
        }} className="animate-fade-in">
          
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#0f1c2e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 20px rgba(15, 28, 46, 0.25)'
            }}>
              <ShieldCheck size={28} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
              Admin Portal Login
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Authorized Nainix Exam Panel Administrators Only
            </p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.65rem 0.85rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAdminLogin}>
            {/* Admin ID / Username Input */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '0.45rem'
              }}>
                एडमिन आईडी (Admin ID / Email)
              </label>

              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin@nainix.edu or ID"
                  style={{
                    width: '100%',
                    padding: '0.8rem 0.85rem 0.8rem 2.5rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Admin Passcode Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '0.45rem'
              }}>
                एडमिन पासवर्ड (Access Passcode)
              </label>

              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.8rem 0.85rem 0.8rem 2.5rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.88rem',
                    fontWeight: '600',
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
                borderRadius: '12px',
                padding: '0.9rem',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(15, 28, 46, 0.25)'
              }}
            >
              <span>लॉग इन करें (Authenticate Admin)</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Credentials Tip */}
          <div style={{
            marginTop: '1.5rem',
            padding: '0.8rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontSize: '0.75rem',
            color: '#64748b',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <strong>Demo Access:</strong> Enter any Admin ID & Password to access the Admin Control Dashboard.
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
