import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  UserPlus,
  LogIn
} from 'lucide-react';
import { BOARDS_DATA } from '../data/mockData';
import { loginStudent, registerStudent } from '../services/supabaseService';

export default function Hero({ 
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onContinueToBoardSelect,
  studentSession,
  onLoginSuccess,
  onLogout
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBoard, setRegBoard] = useState(selectedBoard?.id || 'bseb');
  const [regClass, setRegClass] = useState(selectedClass || '10th');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Login Submit (Verified against Database by Email)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const cleanedEmail = emailInput.trim().toLowerCase();
    if (!isValidEmail(cleanedEmail)) {
      setFormError('कृपया वैध ईमेल आईडी दर्ज करें (Please enter valid email address)');
      return;
    }
    if (!passwordInput.trim()) {
      setFormError('कृपया पासवर्ड दर्ज करें (Password is required)');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const result = await loginStudent(cleanedEmail, passwordInput);
      if (!result.success) {
        setFormError(result.error || 'लॉग इन विफल रहा।');
        setIsSubmitting(false);
        return;
      }

      onLoginSuccess(result.user, 'board');
    } catch (err) {
      setFormError(err.message || 'लॉग इन करने में त्रुटि हुई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Create Account Submit (Registered into Database by Email)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const cleanedName = regName.trim();
    const cleanedEmail = regEmail.trim().toLowerCase();

    if (!cleanedName || cleanedName.length < 2) {
      setFormError('कृपया अपना पूरा नाम दर्ज करें (Please enter full name)');
      return;
    }
    if (!isValidEmail(cleanedEmail)) {
      setFormError('कृपया वैध ईमेल आईडी दर्ज करें (Please enter valid email address)');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setFormError('पासवर्ड कम से कम 4 अक्षरों का होना चाहिए (Password minimum 4 chars)');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setFormError('दोनों पासवर्ड मेल नहीं खा रहे हैं (Passwords do not match)');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const boardObj = BOARDS_DATA.find(b => b.id === regBoard) || BOARDS_DATA[0];
      if (onSelectBoard) onSelectBoard(boardObj);
      if (onSelectClass) onSelectClass(regClass);

      const result = await registerStudent({
        email: cleanedEmail,
        name: cleanedName,
        password: regPassword,
        boardId: regBoard,
        classLevel: regClass
      });

      if (!result.success) {
        setFormError(result.error || 'खाता नहीं बनाया जा सका।');
        setIsSubmitting(false);
        return;
      }

      onLoginSuccess(result.user, 'board');
    } catch (err) {
      setFormError(err.message || 'खाता बनाने में त्रुटि हुई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem 1rem 2.5rem 1rem',
      boxSizing: 'border-box'
    }}>
      
      {/* Centered Auth Card */}
      <div className="card animate-fade-in" style={{
        maxWidth: '430px',
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '24px',
        padding: '2rem 1.75rem',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
        boxSizing: 'border-box'
      }}>
        
        {/* App Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#0072f5',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto',
            boxShadow: '0 8px 20px rgba(0, 114, 245, 0.3)'
          }}>
            <GraduationCap size={30} />
          </div>

          <h2 style={{ fontSize: '1.55rem', fontWeight: '800', margin: '0 0 0.2rem 0', color: '#0f172a' }}>
            exam<span style={{ color: '#0072f5' }}>.nainix</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
            बोर्ड परीक्षा अभ्यास पोर्टल 2026 (Official Portal)
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
                नमस्ते, {studentSession.name || studentSession.email}
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
          /* AUTH FORMS CONTAINER */
          <div>
            {/* Mode Switcher Tabs */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '12px',
              padding: '4px',
              marginBottom: '1.25rem'
            }}>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setFormError(''); }}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.5rem',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.84rem',
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
                <LogIn size={15} />
                <span>लॉग इन (Login)</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('register'); setFormError(''); }}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.5rem',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.84rem',
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
                <UserPlus size={15} />
                <span>नया खाता बनाएं (Register)</span>
              </button>
            </div>

            {/* Form Error Banner */}
            {formError && (
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
                {formError}
              </div>
            )}

            {/* TAB 1: LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                {/* Email Address */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
                    ईमेल आईडी (Email Address)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="email"
                      placeholder="उदा. student@gmail.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                        borderRadius: '12px',
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

                {/* Password */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
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
                        borderRadius: '12px',
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#0072f5',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(0, 114, 245, 0.3)'
                  }}
                >
                  <span>{isSubmitting ? 'सत्यापित हो रहा है...' : 'लॉग इन करें / Continue'}</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{ textAlign: 'center', marginTop: '1.1rem' }}>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setFormError(''); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0072f5',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    नया खाता बनाएं? यहाँ क्लिक करें (Create Account) →
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: CREATE ACCOUNT FORM */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                    पूरा नाम (Student Full Name)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="उदा. राहुल कुमार (Rahul Kumar)"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.85rem 0.7rem 2.4rem',
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

                {/* Email Address */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                    ईमेल आईडी (Email Address)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="email"
                      placeholder="उदा. student@gmail.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.85rem 0.7rem 2.4rem',
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

                {/* Board & Class Selection Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                      बोर्ड (Board)
                    </label>
                    <select
                      value={regBoard}
                      onChange={(e) => setRegBoard(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.6rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        fontSize: '0.82rem',
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
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                      कक्षा (Class)
                    </label>
                    <select
                      value={regClass}
                      onChange={(e) => setRegClass(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.6rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="10th">Class 10th (मैट्रिक)</option>
                      <option value="12th">Class 12th (इंटर)</option>
                    </select>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                      पासवर्ड (Password)
                    </label>
                    <input
                      type="password"
                      placeholder="कम से कम 4 अक्षर"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem' }}>
                      पुष्टि करें (Confirm)
                    </label>
                    <input
                      type="password"
                      placeholder="पासवर्ड दोबारा डालें"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)'
                  }}
                >
                  <Sparkles size={17} />
                  <span>{isSubmitting ? 'खाता बन रहा है...' : 'खाता बनाएं और शुरू करें (Create Account)'}</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '1.1rem' }}>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setFormError(''); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    पहले से खाता है? <strong>लॉग इन करें (Login) →</strong>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
