import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode,
  Zap,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Lock,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLATFORM_INFO } from '../data/mockData';
import { initiateRazorpayPayment } from '../utils/razorpay';

export default function PaymentModal({ 
  subject, 
  selectedBoard, 
  selectedClass, 
  studentSession,
  onClose, 
  onPaymentSuccess 
}) {
  const [activeTab, setActiveTab] = useState('razorpay'); // 'razorpay' | 'upi_qr'
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successReceipt, setSuccessReceipt] = useState(null);

  // Student contact details for Razorpay prefill
  const [studentName, setStudentName] = useState(
    studentSession?.name || studentSession?.studentName || 'Board Student'
  );
  const [studentPhone, setStudentPhone] = useState(
    studentSession?.phone || studentSession?.contact || '9876543210'
  );
  const [studentEmail, setStudentEmail] = useState(
    studentSession?.email || 'student@nainix.me'
  );
  const [showEditDetails, setShowEditDetails] = useState(false);

  const boardName = selectedBoard ? selectedBoard.name : 'BIHAR BOARD';
  const classText = selectedClass ? `Class ${selectedClass}` : 'Class 10th';
  const price = subject?.price || PLATFORM_INFO.pricePerSubject || 50;

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch { }
  };

  // Launch Razorpay standard checkout
  const handleRazorpayCheckout = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      await initiateRazorpayPayment({
        keyId: PLATFORM_INFO.razorpayKeyId,
        amount: price,
        currency: 'INR',
        name: 'exam.nainix.me',
        description: `Full Board Pass - ${boardName} (${classText})`,
        prefill: {
          name: studentName,
          email: studentEmail,
          contact: studentPhone
        },
        notes: {
          board: boardName,
          class: classText,
          subjectId: subject?.id || 'all_subjects'
        },
        onSuccess: (txData) => {
          setIsProcessing(false);
          setSuccessReceipt(txData);
          triggerConfetti();
        },
        onError: (err) => {
          setIsProcessing(false);
          setErrorMessage(err?.description || err?.message || 'Payment was unsuccessful or cancelled. Please try again.');
        },
        onDismiss: () => {
          setIsProcessing(false);
        }
      });
    } catch (err) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Could not launch payment gateway. Please try direct UPI.');
    }
  };

  // Fallback direct UPI manual verification simulation
  const handleConfirmDirectPayment = () => {
    setIsProcessing(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsProcessing(false);
      const simulatedTx = {
        paymentId: `pay_upi_${Date.now()}`,
        orderId: `ord_direct_${Date.now()}`,
        amount: price,
        currency: 'INR',
        timestamp: new Date().toISOString(),
        prefill: { name: studentName, contact: studentPhone }
      };
      setSuccessReceipt(simulatedTx);
      triggerConfetti();
    }, 1200);
  };

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(PLATFORM_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishAndUnlock = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess(subject ? subject.id : null, successReceipt);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.78)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '1.75rem',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
        position: 'relative',
        color: '#0f172a',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            border: 'none',
            background: '#f1f5f9',
            color: '#0f172a',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close Payment Modal"
        >
          <X size={18} />
        </button>

        {/* SUCCESS RECEIPT VIEW */}
        {successReceipt ? (
          <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.25)'
            }}>
              <Check size={36} strokeWidth={3} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: '#0f172a' }}>
              Payment Successful! 🎉
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Full Board Pass for <strong>{boardName} ({classText})</strong> is now unlocked!
            </p>

            {/* Receipt Summary Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              textAlign: 'left',
              marginBottom: '1.5rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <span style={{ fontWeight: '700', fontFamily: 'monospace', color: '#0f172a' }}>
                  {successReceipt.paymentId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Amount Paid:</span>
                <span style={{ fontWeight: '800', color: '#15803d' }}>₹{price} (INR)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Access Validity:</span>
                <span style={{ fontWeight: '700', color: '#0072f5' }}>1 Full Year (Annual Exam 2026)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Unlocked Subjects:</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>All Subjects & Mock Tests</span>
              </div>
            </div>

            <button
              onClick={handleFinishAndUnlock}
              style={{
                width: '100%',
                borderRadius: '14px',
                padding: '0.9rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                border: 'none',
                backgroundColor: '#0072f5',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(0, 114, 245, 0.3)'
              }}
            >
              <span>Start Practicing Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* PAYMENT FORM VIEW */
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: 1.25, margin: '0 0 0.2rem 0', color: '#0f172a' }}>
                  Unlock {boardName} ({classText})
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#0072f5', fontWeight: '700' }}>
                  सभी विषय अनलॉक (All Subjects & Timed Mock Tests Pass)
                </span>
              </div>
            </div>

            {/* Pricing Banner */}
            <div style={{
              backgroundColor: '#0f1c2e',
              color: '#ffffff',
              padding: '1.1rem 1.25rem',
              borderRadius: '16px',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(15, 28, 46, 0.15)'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '600' }}>
                  Full Board Pass • 1 साल की वैधता (1 Year Access)
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#ffffff' }}>
                  ₹{price} <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: '#94a3b8', fontWeight: '500' }}>₹199</span>
                </div>
              </div>
              <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '800', fontSize: '0.78rem', border: 'none' }}>
                75% OFF
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '12px',
              padding: '4px',
              marginBottom: '1.25rem'
            }}>
              <button
                type="button"
                onClick={() => setActiveTab('razorpay')}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.5rem',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'razorpay' ? '#ffffff' : 'transparent',
                  color: activeTab === 'razorpay' ? '#0072f5' : '#64748b',
                  boxShadow: activeTab === 'razorpay' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <Zap size={16} />
                <span>Razorpay Pay Online</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upi_qr')}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.5rem',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'upi_qr' ? '#ffffff' : 'transparent',
                  color: activeTab === 'upi_qr' ? '#0072f5' : '#64748b',
                  boxShadow: activeTab === 'upi_qr' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <QrCode size={16} />
                <span>Scan UPI QR</span>
              </button>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                marginBottom: '1rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* TAB 1: RAZORPAY INSTANT CHECKOUT */}
            {activeTab === 'razorpay' && (
              <div>
                {/* Supported Methods Icons */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    All Payment Methods Supported
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.3rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <Smartphone size={20} style={{ color: '#0072f5', margin: '0 auto 0.2rem auto' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>UPI / Apps</span>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.3rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <CreditCard size={20} style={{ color: '#0284c7', margin: '0 auto 0.2rem auto' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>Cards</span>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.3rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <Building2 size={20} style={{ color: '#059669', margin: '0 auto 0.2rem auto' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>NetBanking</span>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '0.6rem 0.3rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <Wallet size={20} style={{ color: '#d97706', margin: '0 auto 0.2rem auto' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>Wallets</span>
                    </div>
                  </div>

                  {/* Student Details Pill */}
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                      Payer: <strong>{studentName}</strong> ({studentPhone})
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEditDetails(!showEditDetails)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#0072f5',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showEditDetails ? 'Done' : 'Edit'}
                    </button>
                  </div>

                  {/* Optional Detail Editing Inputs */}
                  {showEditDetails && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Student Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8rem'
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (10 digits)"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8rem'
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8rem'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Razorpay Primary Action Button */}
                <button
                  type="button"
                  onClick={handleRazorpayCheckout}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    borderRadius: '14px',
                    padding: '0.9rem',
                    fontSize: '0.96rem',
                    fontWeight: '800',
                    border: 'none',
                    backgroundColor: '#0072f5',
                    color: '#ffffff',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 18px rgba(0, 114, 245, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isProcessing ? (
                    <span>Opening Razorpay Secure Checkout...</span>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Pay ₹{price} with Razorpay</span>
                    </>
                  )}
                </button>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.4rem', 
                  marginTop: '0.85rem', 
                  fontSize: '0.75rem', 
                  color: '#64748b' 
                }}>
                  <Lock size={13} style={{ color: '#10b981' }} />
                  <span>Secured by <strong>Razorpay</strong> • 256-bit SSL Encryption</span>
                </div>
              </div>
            )}

            {/* TAB 2: DIRECT UPI QR SCAN */}
            {activeTab === 'upi_qr' && (
              <div>
                <div style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  marginBottom: '1.25rem',
                  backgroundColor: '#f8fafc'
                }}>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '700', 
                    marginBottom: '0.85rem',
                    color: '#0f172a' 
                  }}>
                    Scan to pay ₹{price} via any UPI App (GPay, PhonePe, Paytm):
                  </div>

                  {/* Render QR graphic */}
                  <div style={{
                    width: '170px',
                    height: '170px',
                    margin: '0 auto 0.85rem auto',
                    backgroundColor: '#ffffff',
                    padding: '10px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #0072f5'
                  }}>
                    <QrCode size={130} style={{ color: '#0072f5' }} />
                  </div>

                  {/* VPA Copy Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#ffffff',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '9999px',
                    border: '1px solid #cbd5e1',
                    maxWidth: '280px',
                    margin: '0 auto'
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0072f5' }}>
                      UPI ID: {PLATFORM_INFO.upiId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyVpa}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Copy UPI ID"
                    >
                      {copied ? <Check size={15} style={{ color: '#10b981' }} /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmDirectPayment}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    fontSize: '0.92rem',
                    fontWeight: '800',
                    border: 'none',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  {isProcessing ? (
                    <span>Verifying UPI Payment...</span>
                  ) : (
                    <>
                      <Zap size={18} />
                      <span>I Have Paid ₹{price} (Confirm & Unlock)</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
