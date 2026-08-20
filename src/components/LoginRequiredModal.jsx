import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  X, 
  Sparkles,
  LogIn,
  UserPlus 
} from 'lucide-react';
import { BOARDS_DATA } from '../data/mockData';
import { loginStudent, registerStudent } from '../services/supabaseService';

export default function LoginRequiredModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBoard, setRegBoard] = useState('bseb');
  const [regClass, setRegClass] = useState('10th');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    if (!isValidEmail(cleanedEmail)) {
      setError('कृपया वैध ईमेल आईडी दर्ज करें (Enter valid email address)');
      return;
    }
    if (!password.trim()) {
      setError('कृपया पासवर्ड दर्ज करें (Please enter password)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await loginStudent(cleanedEmail, password);
      if (!result.success) {
        setError(result.error || 'लॉग इन विफल रहा।');
        setIsSubmitting(false);
        return;
      }

      onLoginSuccess(result.user, 'board');
      onClose();
    } catch (err) {
      setError(err.message || 'लॉग इन करने में त्रुटि हुई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const cleanedName = regName.trim();
    const cleanedEmail = regEmail.trim().toLowerCase();

    if (!cleanedName || cleanedName.length < 2) {
      setError('कृपया अपना पूरा नाम दर्ज करें (Please enter full name)');
      return;
    }
    if (!isValidEmail(cleanedEmail)) {
      setError('कृपया वैध ईमेल आईडी दर्ज करें (Valid email required)');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setError('पासवर्ड कम से कम 4 अक्षरों का होना चाहिए (Password minimum 4 chars)');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('दोनों पासवर्ड मेल नहीं खा रहे हैं (Passwords do not match)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await registerStudent({
        email: cleanedEmail,
        name: cleanedName,
        password: regPassword,
        boardId: regBoard,
        classLevel: regClass
      });

      if (!result.success) {
        setError(result.error || 'खाता नहीं बनाया जा सका।');
        setIsSubmitting(false);
        return;
      }

      onLoginSuccess(result.user, 'board');
      onClose();
    } catch (err) {
      setError(err.message || 'खाता बनाने में त्रुटि हुई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.78)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '430px',
        width: '100%',
        padding: '1.75rem',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            borderRadius: '50%', 
            padding: '0.35rem',
            border: 'none',
            background: '#f1f5f9',
            cursor: 'pointer',
            zIndex: 10
          }}
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
            {authMode === 'login' ? 'लॉग इन आवश्यक है' : 'नया खाता बनाएं'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
            अभ्यास टेस्ट और प्रश्नों तक पहुँचने के लिए कृपया लॉग इन करें या नया खाता बनाएं।
          </p>
        </div>

        {/* Auth Mode Switcher */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '1rem'
        }}>
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '9px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: authMode === 'login' ? '#ffffff' : 'transparent',
              color: authMode === 'login' ? '#0072f5' : '#64748b',
              boxShadow: authMode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <LogIn size={14} />
            <span>लॉग इन (Login)</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '9px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: authMode === 'register' ? '#ffffff' : 'transparent',
              color: authMode === 'register' ? '#0072f5' : '#64748b',
              boxShadow: authMode === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <UserPlus size={14} />
            <span>खाता बनाएं (Register)</span>
          </button>
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
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '0.35rem' }}>
                ईमेल आईडी (Email Address)
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="email"
                  placeholder="उदा. student@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '0.35rem' }}>
                पासवर्ड (Password)
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
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: '#0072f5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.8rem',
                fontSize: '0.92rem',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(0, 114, 245, 0.25)'
              }}
            >
              <span>{isSubmitting ? 'सत्यापित हो रहा है...' : 'लॉग इन करें / Login'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT FORM */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                पूरा नाम (Full Name)
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="अपना नाम दर्ज करें"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.86rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                ईमेल आईडी (Email Address)
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="email"
                  placeholder="उदा. student@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.86rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                  बोर्ड (Board)
                </label>
                <select
                  value={regBoard}
                  onChange={(e) => setRegBoard(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.5rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {BOARDS_DATA.map(b => (
                    <option key={b.id} value={b.id}>{b.name.split('(')[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                  कक्षा (Class)
                </label>
                <select
                  value={regClass}
                  onChange={(e) => setRegClass(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.5rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="10th">Class 10th</option>
                  <option value="12th">Class 12th</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                  पासवर्ड
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.65rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.82rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                  पुष्टि करें
                </label>
                <input
                  type="password"
                  placeholder="Confirm"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.65rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.82rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: '#059669',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.8rem',
                fontSize: '0.92rem',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Sparkles size={16} />
              <span>{isSubmitting ? 'खाता बन रहा है...' : 'खाता बनाएं और शुरू करें'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
