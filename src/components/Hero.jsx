import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  Phone,
  Lock
} from 'lucide-react';
import { BOARDS_DATA } from '../data/mockData';

export default function Hero({ 
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onContinueToBoardSelect,
  onStartFreeTest,
  studentSession,
  onLoginSuccess,
  onLogout
}) {
  const [mobileInput, setMobileInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

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
    <div style={{ width: '100%', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
      
      {/* Upper Hero Content (Centered Max-width 1280px) */}
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.5rem', flex: 1, display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        
        {/* Hero Main Grid Container - Left Text + Right Floating Selector Card */}
        <div className="hero-grid-container">
          
          {/* Left Column Text Content */}
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0072f5' }} />
                DIGITAL EXAM PREPARATION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline-font" style={{ 
              fontSize: 'clamp(2.7rem, 5.2vw, 4.2rem)', 
              lineHeight: 1.08, 
              color: '#0f172a',
              margin: '0 0 1rem 0'
            }}>
              Your Exam.{' '}
              <span className="hero-text-glow">Your Preparation.</span>
            </h1>

            {/* Sub-headline Description */}
            <p style={{ 
              fontSize: 'clamp(0.95rem, 1.8vw, 1.12rem)', 
              color: '#475569', 
              lineHeight: 1.55,
              marginBottom: '1.75rem',
              maxWidth: '560px'
            }}>
              Practice important questions, attempt timed mock tests and track your preparation with detailed performance analytics.
            </p>

            {/* Highlights Stats Row */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.75rem', 
              paddingTop: '0.75rem',
              borderTop: '1px solid #cbd5e1'
            }}>
              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>25,000+</div>
                <div style={{ fontSize: '0.75rem', color: '#0072f5', fontWeight: '700' }}>Verified VVI MCQs</div>
              </div>

              <div style={{ width: '1px', height: '32px', backgroundColor: '#cbd5e1' }} />

              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>99.4%</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>Topper Success Rate</div>
              </div>

              <div style={{ width: '1px', height: '32px', backgroundColor: '#cbd5e1' }} />

              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>2.5 Lakh+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Board Aspirants</div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Login Card matching reference image */}
          <div className="hero-login-card-col">
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              padding: '1.75rem 1.6rem',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
              transform: 'none',
              transition: 'none'
            }}>
              
              {studentSession ? (
                /* Logged-In Active Session Card */
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.2rem 0.65rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '9999px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }} />
                      सक्रिय सत्र (ACTIVE LOGGED-IN SESSION)
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    नमस्ते, {studentSession.mobile}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                    आपकी परीक्षा तैयारी अनलॉक हो चुकी है। अब अपनी विषयवार परीक्षा शुरू करें।
                  </p>

                  <button
                    onClick={onContinueToBoardSelect}
                    style={{
                      width: '100%',
                      backgroundColor: '#0072f5',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 14px rgba(0, 114, 245, 0.25)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <span>बोर्ड और विषय चुनें / Select Board</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={onLogout}
                    style={{
                      width: '100%',
                      backgroundColor: '#f8fafc',
                      color: '#ef4444',
                      border: '1px solid #fca5a5',
                      borderRadius: '12px',
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
                /* Unauthenticated Form View */
                <form onSubmit={handleFormSubmit}>
                  {/* Card Badge Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.74rem', padding: '0.2rem 0.65rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '9999px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                      <span className="hindi-ultra-thin" style={{ fontWeight: '400' }}>सदस्य पोर्टल</span> (STUDENT PORTAL)
                    </span>
                  </div>

                  <h3 className="hindi-ultra-thin" style={{
                    fontSize: '1.8rem',
                    fontWeight: '300',
                    color: '#0f172a',
                    margin: '0 0 1.1rem 0',
                    letterSpacing: '0.01em'
                  }}>
                    लॉग इन करें <span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.85 }}>(Log In)</span>
                  </h3>

                  {loginError && (
                    <div style={{
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      marginBottom: '1rem',
                      fontWeight: '500'
                    }}>
                      {loginError}
                    </div>
                  )}

                  {/* Field 1: Mobile Number Input */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      color: '#64748b',
                      marginBottom: '0.4rem'
                    }}>
                      <span className="hindi-ultra-thin">मोबाइल नंबर</span> (Mobile Number)
                    </label>

                    <div style={{ position: 'relative' }}>
                      <Phone size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        type="tel"
                        placeholder="10-अंकों का मोबाइल नंबर दर्ज करें"
                        maxLength={10}
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          fontSize: '0.88rem',
                          fontWeight: '400',
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
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      color: '#64748b',
                      marginBottom: '0.4rem'
                    }}>
                      <span className="hindi-ultra-thin">पासवर्ड</span> (Password)
                    </label>

                    <div style={{ position: 'relative' }}>
                      <Lock size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        type="password"
                        placeholder="पासवर्ड दर्ज करें"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          fontSize: '0.88rem',
                          fontWeight: '400',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Main Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        backgroundColor: '#0f1c2e',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.85rem',
                        fontSize: '0.92rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(15, 28, 46, 0.25)'
                      }}
                    >
                      <span className="hindi-ultra-thin" style={{ fontSize: '1rem', fontWeight: '400' }}>लॉग इन करें</span>
                      <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>/ Continue</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {/* Free Quick Challenge Option */}
              {!studentSession && (
                <button
                  onClick={onStartFreeTest}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    color: '#0072f5',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    marginTop: '0.75rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Or try quick free Science practice test →
                </button>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Full Screen Width Edge-to-Edge White Background Footer Features Strip */}
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #cbd5e1',
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.04)',
        padding: '1.1rem 0',
        boxSizing: 'border-box',
        flexShrink: 0
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
          <div className="hero-features-grid">
            {/* Column 1 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '7px', height: '7px', backgroundColor: '#0072f5', borderRadius: '2px', display: 'inline-block' }} />
                <h4 style={{ 
                  fontSize: '0.78rem', 
                  fontWeight: '800', 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase',
                  color: '#0f172a',
                  margin: 0
                }}>
                  BOARD MOCK TESTS
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.45, fontWeight: '500' }}>
                Official pattern timed mock exams for Class 10th & 12th with real-time scorecards and 1st division target predictions.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '7px', height: '7px', backgroundColor: '#0072f5', borderRadius: '2px', display: 'inline-block' }} />
                <h4 style={{ 
                  fontSize: '0.78rem', 
                  fontWeight: '800', 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase',
                  color: '#0f172a',
                  margin: 0
                }}>
                  CHAPTER-WISE PRACTICE
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.45, fontWeight: '500' }}>
                Practice individual chapter VVI questions with step-by-step Hindi/English explanations and instant answer verification.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '7px', height: '7px', backgroundColor: '#0072f5', borderRadius: '2px', display: 'inline-block' }} />
                <h4 style={{ 
                  fontSize: '0.78rem', 
                  fontWeight: '800', 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase',
                  color: '#0f172a',
                  margin: 0
                }}>
                  REAL-TIME ANALYTICS
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.45, fontWeight: '500' }}>
                Track speed per question, overall accuracy, weak chapters, and save important VVI questions to your personal revision hub.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
