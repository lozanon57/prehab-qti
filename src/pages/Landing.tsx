import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { PATOLOGIAS } from '../data/patologias'
import { useAppStore } from '../store/appStore'
import { useLanguage } from '../i18n/LanguageContext'
import type { PatologiaCode } from '../types'

export function Landing() {
  const navigate = useNavigate()
  const { setPatologia, setFase } = useAppStore()
  const { t, lang, setLang } = useLanguage()

  const handleSeleccion = (code: PatologiaCode, fase: 'prehab' | 'recuperacion') => {
    setPatologia(code)
    setFase(fase)
    navigate(`/${fase}/${code}`)
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '20px' }}>

      {/* TOP BAR */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 20px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '2px' }}>
              {t.landing.service}
            </div>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
              {t.landing.institution}
            </div>
          </div>
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Switch language"
            style={{
              height: '36px',
              padding: '0 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-navy-muted)',
              color: 'var(--color-navy)',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 20px 0' }}>

        {/* PREHAB SECTION */}
        <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💪</span> {t.landing.prehabTitle}
        </div>

        {/* Grid 2 cols for pathology cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '32px' }}>
          {PATOLOGIAS.map((p) => {
            const nombre = lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre
            const descripcion = lang === 'en' ? (p.descripcionEn ?? p.descripcion) : p.descripcion
            return (
              <button
                key={p.code}
                onClick={() => handleSeleccion(p.code, 'prehab')}
                className="pressable"
                style={{
                  textAlign: 'left',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 16px',
                  backgroundColor: 'var(--color-surface)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: p.colorClaro,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>
                  {p.icono}
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '1.3' }}>
                    {nombre}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px', lineHeight: '1.4' }}>
                    {descripcion}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* RECOVERY SECTION */}
        <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🌱</span> {t.landing.recoveryTitle}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '32px' }}>
          {PATOLOGIAS.map((p) => {
            const nombre = lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre
            return (
              <button
                key={p.code}
                onClick={() => handleSeleccion(p.code, 'recuperacion')}
                className="pressable"
                style={{
                  padding: '14px 10px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: p.colorClaro,
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '20px' }}>{p.icono}</span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: p.color, lineHeight: '1.2' }}>{nombre}</p>
              </button>
            )
          })}
        </div>

        {/* INFO button */}
        <button
          onClick={() => navigate('/informacion')}
          className="pressable"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 20px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
            marginBottom: '32px',
          }}
        >
          <div style={{
            width: '44px', height: '44px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-navy-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '20px' }}>ℹ️</span>
          </div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {t.landing.infoTitle}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {t.landing.infoDesc}
            </p>
          </div>
          <ChevronRight size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        </button>

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)' }}>
            {t.landing.creator}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {t.landing.creatorRole}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            v1.0 · Mayo 2026
          </p>
        </div>
      </div>
    </div>
  )
}
