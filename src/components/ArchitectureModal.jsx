import React from 'react';
import { 
  X, 
  Database, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  Calendar 
} from 'lucide-react';
import { ARCHITECTURE_SPECS } from '../data/mockData';

export default function ArchitectureModal({ onClose }) {
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
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
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

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-container)',
            color: 'var(--on-primary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
              {ARCHITECTURE_SPECS.title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>
              {ARCHITECTURE_SPECS.version} • Firebase / Cloud Functions
            </span>
          </div>
        </div>

        {/* Section 1: Firestore Collections */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Database size={18} style={{ color: 'var(--primary)' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>1. Database Schema (Firestore Collections)</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
            {ARCHITECTURE_SPECS.databaseCollections.map((col, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'var(--surface-container-low)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--outline-variant)'
                }}
              >
                <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  collection("{col.name}")
                </div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>
                  {col.fields}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Anti-Cheating Logic */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ShieldAlert size={18} style={{ color: 'var(--error)' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>2. Anti-Cheating & Security Logic</h4>
          </div>

          <div style={{
            backgroundColor: 'var(--error-container)',
            color: 'var(--on-error-container)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {ARCHITECTURE_SPECS.antiCheatingRules.map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Roadmap */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Calendar size={18} style={{ color: 'var(--secondary)' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>3. Development Roadmap</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {ARCHITECTURE_SPECS.roadmapPhases.map((ph, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'var(--surface-container-low)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: '1px solid var(--outline-variant)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase' }}>
                  {ph.phase} • {ph.timeline}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', margin: '0.25rem 0' }}>
                  {ph.title}
                </div>
                <span className={ph.status === 'Completed' || ph.status === 'Live' ? 'badge badge-success' : 'badge badge-neutral'} style={{ fontSize: '0.7rem' }}>
                  {ph.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
