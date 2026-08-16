import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode,
  Zap
} from 'lucide-react';

import { PLATFORM_INFO } from '../data/mockData';

export default function PaymentModal({ subject, onClose, onPaymentSuccess }) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(PLATFORM_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(subject.id);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(5px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--surface-container-lowest)',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            border: 'none',
            background: 'transparent',
            color: 'var(--on-surface-variant)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--secondary-container)',
            color: 'var(--on-secondary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.2, margin: 0 }}>
              Unlock {subject.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
              {subject.code} • Unlimited Access
            </span>
          </div>
        </div>

        {/* Pricing Banner */}
        <div style={{
          backgroundColor: 'var(--primary-container)',
          color: 'var(--on-primary-container)',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              One-time Lifetime Access
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              ₹{subject.price} <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', opacity: 0.7 }}>₹199</span>
            </div>
          </div>
          <span className="badge badge-success" style={{ padding: '0.35rem 0.65rem' }}>
            75% OFF
          </span>
        </div>

        {/* Interactive QR Code Box */}
        <div style={{
          border: '1px solid var(--outline-variant)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          textAlign: 'center',
          marginBottom: '1.25rem',
          backgroundColor: 'var(--surface-container-low)'
        }}>
          <div style={{ 
            fontSize: '0.85rem', 
            fontWeight: '600', 
            marginBottom: '0.85rem',
            color: 'var(--on-surface)' 
          }}>
            Scan to pay ₹50 via any UPI App (Google Pay, PhonePe, Paytm):
          </div>

          {/* Render QR graphic */}
          <div style={{
            width: '170px',
            height: '170px',
            margin: '0 auto 0.85rem auto',
            backgroundColor: '#ffffff',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--primary)'
          }}>
            <QrCode size={130} style={{ color: 'var(--primary)' }} />
          </div>

          {/* VPA Copy Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--surface-container-lowest)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--outline-variant)',
            maxWidth: '280px',
            margin: '0 auto'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>
              UPI ID: {PLATFORM_INFO.upiId}
            </span>
            <button
              onClick={handleCopyVpa}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--on-surface-variant)',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Copy UPI ID"
            >
              {copied ? <Check size={14} style={{ color: 'var(--secondary)' }} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Simulating Payment Process CTA */}
        <div>
          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="btn btn-secondary btn-full btn-lg"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {isProcessing ? (
              <span>Activating Subject...</span>
            ) : (
              <>
                <Zap size={18} />
                <span>Confirm & Unlock Subject (₹50)</span>
              </>
            )}
          </button>

          <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem', color: 'var(--on-surface-variant)' }}>
            🔒 Instant auto-activation via Bank Webhook Guard
          </p>
        </div>

      </div>
    </div>
  );
}

