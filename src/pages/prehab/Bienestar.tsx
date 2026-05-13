import { useState } from 'react'
import { Brain, Heart, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const MOOD_EMOJIS = ['😔', '😕', '😐', '🙂', '😊']

export function Bienestar() {
  const { t } = useLanguage()
  const [tecnicaAbierta, setTecnicaAbierta] = useState<number | null>(null)
  const [fraseIdx] = useState(() => Math.floor(Math.random() * t.wellness.quotes.length))

  return (
    <div>
      {/* Frase de apoyo */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        marginBottom: '20px',
        backgroundColor: 'var(--color-mental-bg)',
        textAlign: 'center',
      }}>
        <Brain size={28} style={{ color: 'var(--color-mental)', margin: '0 auto 10px' }} />
        <p style={{ fontSize: 'var(--text-base)', fontStyle: 'italic', color: '#4A3570', lineHeight: '1.6' }}>
          "{t.wellness.quotes[fraseIdx]}"
        </p>
      </div>

      {/* Termómetro de bienestar */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          {t.wellness.howAreYou}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>
          {t.wellness.moodNote}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {t.wellness.moods.map((label, idx) => (
            <button
              key={idx}
              className="pressable"
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '72px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg)',
                border: 'none',
                cursor: 'pointer',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '28px' }}>{MOOD_EMOJIS[idx]}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Técnicas de relajación */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.wellness.relaxTitle}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {t.wellness.techniques.map((tecnica, i) => (
          <div
            key={i}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${tecnicaAbierta === i ? 'var(--color-mental)' : 'var(--color-border)'}`,
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <button
              style={{
                width: '100%',
                padding: '20px',
                textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'none', border: 'none', cursor: 'pointer',
                minHeight: '72px',
              }}
              onClick={() => setTecnicaAbierta(tecnicaAbierta === i ? null : i)}
            >
              <span style={{ fontSize: '26px', flexShrink: 0 }}>{tecnica.icono}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', lineHeight: '1.3' }}>
                  {tecnica.titulo}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '3px' }}>
                  {tecnica.duracion}
                </p>
              </div>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', flexShrink: 0 }}>
                {tecnicaAbierta === i ? '▲' : '▼'}
              </span>
            </button>

            {tecnicaAbierta === i && (
              <div style={{
                padding: '0 20px 20px',
                borderTop: '1px solid var(--color-border)',
              }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.6', margin: '16px 0 12px' }}>
                  {tecnica.descripcion}
                </p>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tecnica.pasos.map((paso, pi) => (
                    <li key={pi} style={{ display: 'flex', gap: '12px', minHeight: '56px', alignItems: 'flex-start' }}>
                      <span style={{
                        width: '24px', height: '24px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 'var(--text-xs)', fontWeight: 700,
                        backgroundColor: 'var(--color-mental-bg)', color: 'var(--color-mental)',
                        flexShrink: 0, marginTop: '3px',
                      }}>
                        {pi + 1}
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5', flex: 1 }}>
                        {paso}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contacto de apoyo */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        backgroundColor: 'var(--color-exercise-bg)',
        borderLeft: '4px solid var(--color-exercise)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={18} style={{ flexShrink: 0 }} />
          {t.wellness.contactTitle}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
          {t.wellness.contactDesc}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)' }}>
          <Phone size={16} />
          {t.wellness.contactAction}
        </div>
      </div>
    </div>
  )
}
