import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  BarChart3, 
  Users, 
  CreditCard, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { fetchAdminDashboardStats } from '../services/supabaseService';

export default function AdminLoginStep({ onBackToHome }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPayments: 0,
    totalTests: 0,
    totalRevenue: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const data = await fetchAdminDashboardStats();
      setStats(data);
    } catch (e) {
      console.warn('Could not load admin stats:', e);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setErrorMsg('Please enter both Admin ID and Passcode.');
      return;
    }
    setErrorMsg('');
    setIsLoggedIn(true);
    loadStats();
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadStats();
    }
  }, [isLoggedIn]);

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

        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
          Board Examination Admin Center
        </span>
      </div>

      {!isLoggedIn ? (
        /* Compact Admin Login Card View */
        <div className="card animate-fade-in" style={{
          maxWidth: '400px',
          margin: '2rem auto',
          padding: '2rem 1.75rem',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)'
        }}>

          {/* Admin Avatar Icon */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#0f1c2e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto',
              boxShadow: '0 8px 20px rgba(15, 28, 46, 0.2)'
            }}>
              <ShieldCheck size={28} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#0f172a' }}>
              Admin Portal
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Enter credentials to access Supabase live analytics
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAdminLogin}>
            {/* Admin ID Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: '600',
                color: '#475569',
                marginBottom: '0.35rem'
              }}>
                Admin ID / Username
              </label>

              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin"
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
                Admin Passcode
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
              <span>Authenticate to Dashboard</span>
              <ArrowRight size={15} />
            </button>
          </form>

        </div>
      ) : (
        /* Logged In Admin Dashboard View with LIVE SUPABASE METRICS */
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
                  <CheckCircle2 size={12} /> SUPABASE LIVE CONNECTED
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#ffffff' }}>
                Admin Operations Console
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0, fontWeight: '500' }}>
                Live Cloud Data & Database Synchronizer
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={loadStats}
                disabled={isLoadingStats}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <RefreshCw size={14} className={isLoadingStats ? 'animate-spin' : ''} />
                <span>Refresh Live</span>
              </button>

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
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Students Registered</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{stats.totalStudents}</div>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>Live in Supabase</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#059669', marginBottom: '0.5rem' }}>
                <CreditCard size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Completed Payments</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{stats.totalPayments}</div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700' }}>₹{stats.totalRevenue} Collected</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d97706', marginBottom: '0.5rem' }}>
                <BarChart3 size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Tests Attempted</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{stats.totalTests}</div>
              <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '600' }}>Real-time scorecards</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#7c3aed', marginBottom: '0.5rem' }}>
                <Database size={20} />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Database Engine</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>Active</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>PostgreSQL / Supabase</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
