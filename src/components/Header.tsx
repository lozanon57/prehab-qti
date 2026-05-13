import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, House } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface HeaderProps {
  titulo?: string
  subtitulo?: string
  mostrarVolver?: boolean
}

export function Header({ titulo, subtitulo, mostrarVolver = false }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useLanguage()
  const esInicio = location.pathname === '/'

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        minHeight: '56px',
      }}
    >
      <div
        className="max-w-2xl mx-auto flex items-center"
        style={{ minHeight: '56px', padding: '0 4px 0 8px' }}
      >
        {/* Left zone — 48×48 touch target */}
        <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '2px' }}>
          {!esInicio && (
            <>
              {/* Back one step */}
              {mostrarVolver && (
                <button
                  onClick={() => navigate(-1)}
                  aria-label={t.common.back}
                  style={{
                    width: '32px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-navy)',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
              )}
              {/* Home — always visible when not on landing */}
              <button
                onClick={() => navigate('/')}
                aria-label={lang === 'en' ? 'Go to home' : 'Ir al inicio'}
                title={lang === 'en' ? 'Home' : 'Inicio'}
                style={{
                  width: mostrarVolver ? '24px' : '48px',
                  height: '48px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-navy)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  opacity: 0.7,
                }}
              >
                <House size={18} strokeWidth={2} />
              </button>
            </>
          )}
          {esInicio && <div style={{ width: '48px' }} />}
        </div>

        {/* Centre */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 8px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {titulo ?? t.header.defaultTitle}
          </h1>
          {subtitulo && (
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.3', marginTop: '1px' }}>
              {subtitulo}
            </p>
          )}
        </div>

        {/* Right: language toggle — 48×48 touch area */}
        <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px' }}>
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Switch language"
            style={{
              height: '32px',
              padding: '0 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-navy-muted)',
              color: 'var(--color-navy)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
    </header>
  )
}
