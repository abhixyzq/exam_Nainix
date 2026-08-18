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
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '1.75rem',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
        position: 'relative',
        color: '#0f172a'
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
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

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
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.25, margin: '0 0 0.2rem 0', color: '#0f172a' }}>
              Unlock {subject.name}
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
              {subject.code} • Unlimited Lifetime Access
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
              One-time Lifetime Access
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#ffffff' }}>
              ₹{subject.price} <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: '#94a3b8', fontWeight: '500' }}>₹199</span>
            </div>
          </div>
          <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '800', fontSize: '0.78rem', border: 'none' }}>
            75% OFF
          </span>
        </div>

        {/* Interactive QR Code Box */}
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
            Scan to pay ₹{subject.price} via any UPI App (Google Pay, PhonePe, Paytm):
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

        {/* Simulating Payment Process CTA */}
        <div>
          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            style={{
              width: '100%',
              borderRadius: '14px',
              padding: '0.85rem',
              fontSize: '0.92rem',
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
            {isProcessing ? (
              <span>Activating Subject...</span>
            ) : (
              <>
                <Zap size={18} />
                <span>Confirm & Unlock Subject (₹{subject.price})</span>
              </>
            )}
          </button>

          <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem', color: '#64748b', fontWeight: '500' }}>
            🔒 Instant auto-activation via Bank Webhook Guard
          </p>
        </div>

      </div>
    </div>
  );
}

