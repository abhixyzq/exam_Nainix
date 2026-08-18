import React, { useState } from 'react';
import { GraduationCap, Phone, Lock, ArrowRight } from 'lucide-react';

export default function Hero({ 
  onContinueToBoardSelect,
  studentSession,
  onLoginSuccess,
  onLogout
}) {
  const [mobileInput, setMobileInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const cleanedMobile = mobileInput.trim();
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      setLoginError('कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें (Valid 10-digit mobile required)');
      return;
    }
    if (!passwordInput.trim()) {
      setLoginError('कृपया पासवर्ड दर्ज करें (Password is required)');
      return;
    }

    setLoginError('');
    onLoginSuccess({ mobile: cleanedMobile });
    onContinueToBoardSelect();
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      
      {/* Centered Direct App Login Card */}
      <div className="card animate-fade-in" style={{
        maxWidth: '380px',
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '2rem 1.5rem',
        boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
        boxSizing: 'border-box'
      }}>
        
        {/* App Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            backgroundColor: '#0072f5',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem auto',
            boxShadow: '0 8px 20px rgba(0, 114, 245, 0.3)'
          }}>
            <GraduationCap size={32} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 0.25rem 0', color: '#0f172a' }}>
            exam<span style={{ color: '#0072f5' }}>.nainix</span>
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
            छात्र परीक्षा पोर्टल (Student Login)
          </p>
        </div>

        {studentSession ? (
          /* Logged-In Active Session Card */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.25rem 0.75rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '9999px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block', marginRight: '4px' }} />
                सक्रिय सत्र (ACTIVE SESSION)
              </span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.3rem 0' }}>
                नमस्ते, {studentSession.mobile}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
                अभ्यास और मॉक टेस्ट शुरू करने के लिए आगे बढ़ें।
              </p>
            </div>

            <button
              onClick={onContinueToBoardSelect}
              style={{
                width: '100%',
                backgroundColor: '#0072f5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '0.85rem',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(0, 114, 245, 0.3)',
                marginBottom: '0.75rem'
              }}
            >
              <span>परीक्षा बोर्ड चुनें / Continue →</span>
            </button>

            <button
              onClick={onLogout}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                color: '#ef4444',
                border: '1px solid #fca5a5',
                borderRadius: '14px',
                padding: '0.65rem',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              लॉग आउट करें (Log Out)
            </button>
          </div>
        ) : (
          /* Student Login Form */
          <form onSubmit={handleFormSubmit}>
            {loginError && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                padding: '0.6rem 0.8rem',
                borderRadius: '12px',
                fontSize: '0.78rem',
                marginBottom: '1rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {loginError}
              </div>
            )}

            {/* Field 1: Mobile Number Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '0.4rem'
              }}>
                मोबाइल नंबर (Mobile Number)
              </label>

              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="tel"
                  placeholder="10-अंकों का मोबाइल नंबर दर्ज करें"
                  maxLength={10}
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                    borderRadius: '14px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Field 2: Password Input */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '0.4rem'
              }}>
                पासवर्ड (Password)
              </label>

              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  placeholder="पासवर्ड दर्ज करें"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                    borderRadius: '14px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#0072f5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(0, 114, 245, 0.3)'
              }}
            >
              <span>लॉग इन करें / Continue</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
