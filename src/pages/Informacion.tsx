import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Informacion() {
  const navigate = useNavigate()
  const { t, lang, setLang } = useLanguage()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky', top: 0, zIndex: 50,
        minHeight: '56px',
      }}>
        <div style={{
          maxWidth: '640px', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          minHeight: '56px', padding: '0 4px 0 8px',
        }}>
          {/* Back button — 48×48 touch area */}
          <button
            onClick={() => navigate(-1)}
            aria-label={t.common.back}
            style={{
              width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-navy)',
              background: 'none', border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>

          {/* Centre */}
          <div style={{ flex: 1, textAlign: 'center', padding: '0 8px' }}>
            <h1 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px', fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: '1.3',
            }}>
              {t.info.title}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.3', marginTop: '1px' }}>
              {t.info.subtitle}
            </p>
          </div>

          {/* Language toggle */}
          <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px' }}>
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              aria-label="Switch language"
              style={{
                height: '32px', padding: '0 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-navy-muted)',
                color: 'var(--color-navy)',
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.05em',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center',
              }}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 20px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {t.info.sections.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{s.icon}</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  lineHeight: '1.2',
                }}>
                  {s.title}
                </h2>
              </div>
              {s.content.split('\n\n').map((parrafo, j) => (
                <p key={j} style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.6',
                  color: 'var(--color-text-primary)',
                  marginBottom: j < s.content.split('\n\n').length - 1 ? '12px' : 0,
                }}>
                  {parrafo}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderRadius: 'var(--radius-md)', padding: '16px 20px',
          marginTop: '16px', textAlign: 'center',
          backgroundColor: 'var(--color-surface-2)',
        }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
            Instituto Quénet-Torrent · Servicio de Cirugía Oncológica y Colorrectal
            <br />
            Dr. Pablo Lozano Lominchar · v1.0 · Mayo 2026
          </p>
        </div>
      </main>
    </div>
  )
}
