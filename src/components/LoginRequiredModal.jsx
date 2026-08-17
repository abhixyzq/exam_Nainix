import React, { useState } from 'react';
import { ShieldAlert, Phone, Lock, ArrowRight, X } from 'lucide-react';

export default function LoginRequiredModal({ isOpen, onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedMobile = mobile.trim();
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      setError('कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें (Enter valid 10-digit mobile number)');
      return;
    }
    if (!password.trim()) {
      setError('कृपया पासवर्ड दर्ज करें (Please enter password)');
      return;
    }

    setError('');
    onLoginSuccess({ mobile: cleanedMobile });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '400px',
        width: '100%',
        padding: '1.75rem',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1rem', right: '1rem', borderRadius: '50%', padding: '0.35rem' }}
        >
          <X size={18} />
        </button>

        {/* Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            <ShieldAlert size={26} />
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#0f172a' }}>
            लॉग इन आवश्यक है
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
            अभ्यास टेस्ट और प्रश्नों तक पहुँचने के लिए कृपया पहले लॉग इन करें।
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '0.6rem 0.85rem',
            borderRadius: '10px',
            fontSize: '0.78rem',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {/* Quick Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#64748b', marginBottom: '0.35rem' }}>
              <span className="hindi-ultra-thin">मोबाइल नंबर</span> (Mobile Number)
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="tel"
                placeholder="10-अंकों का मोबाइल नंबर"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#64748b', marginBottom: '0.35rem' }}>
              <span className="hindi-ultra-thin">पासवर्ड</span> (Password)
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                placeholder="पासवर्ड दर्ज करें"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#0072f5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem',
              fontSize: '0.92rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 114, 245, 0.25)'
            }}
          >
            <span>लॉग इन करके प्रवेश करें / Login to Enter</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
