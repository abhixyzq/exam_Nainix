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
  onGoToSubjects,
  onStartFreeTest
}) {
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

            <h1 className="hero-headline-font" style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
              fontWeight: '600',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#0f172a',
              margin: '0 0 0.95rem 0'
            }}>
              Your Exam. Your <span className="hero-text-glow" style={{ fontWeight: '700' }}>Preparation.</span>
            </h1>

            <p style={{
              fontSize: '0.98rem',
              color: '#475569',
              lineHeight: 1.6,
              fontWeight: '500',
              margin: '0 0 1.5rem 0',
              maxWidth: '580px'
            }}>
              Practice important questions, attempt timed mock tests and track your preparation with detailed performance analytics.
            </p>

            {/* Quick Stats Pill Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.4rem',
              flexWrap: 'wrap',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(203, 213, 225, 0.7)'
            }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a' }}>25,000+</div>
                <div style={{ fontSize: '0.75rem', color: '#0072f5', fontWeight: '700' }}>Verified VVI MCQs</div>
              </div>

              <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(203, 213, 225, 0.7)' }} />

              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a' }}>99.4%</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>Topper Success Rate</div>
              </div>

              <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(203, 213, 225, 0.7)' }} />

              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a' }}>2.5 Lakh+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Board Aspirants</div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Login Card matching reference image (asspp.vercel.app) */}
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
                  onClick={onContinueToBoardSelect}
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

                <button
                  onClick={onGoToSubjects}
                  className="btn btn-outline btn-full"
                  style={{
                    borderRadius: '12px',
                    padding: '0.65rem',
                    fontSize: '0.82rem',
                    fontWeight: '700'
                  }}
                >
                  <span>Browse Subjects Directly</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Free Quick Challenge Option */}
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
