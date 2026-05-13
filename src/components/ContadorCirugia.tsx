import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import { useLanguage } from '../i18n/LanguageContext'

export function ContadorCirugia() {
  const { fechaCirugia, setFechaCirugia } = useAppStore()
  const [editando, setEditando] = useState(!fechaCirugia)
  const [fechaTmp, setFechaTmp] = useState(fechaCirugia ?? '')
  const { t, lang } = useLanguage()

  const diasRestantes = fechaCirugia
    ? Math.max(0, Math.ceil((new Date(fechaCirugia).getTime() - new Date().getTime()) / 86400000))
    : null

  function confirmar() {
    if (fechaTmp) {
      setFechaCirugia(fechaTmp)
      setEditando(false)
    }
  }

  if (editando) {
    return (
      <div
        className="card-lg"
        style={{ padding: '24px 20px', marginBottom: '8px', backgroundColor: 'var(--color-navy-muted)' }}
      >
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '8px' }}>
          📅 {t.contador.when}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          {t.contador.intro}
        </p>
        <input
          type="date"
          value={fechaTmp}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setFechaTmp(e.target.value)}
          style={{
            width: '100%',
            height: '56px',
            padding: '0 16px',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-navy)',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-body)',
            color: fechaTmp ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            backgroundColor: 'var(--color-surface)',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={confirmar}
          disabled={!fechaTmp}
          style={{
            marginTop: '12px',
            width: '100%',
            height: '56px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: fechaTmp ? 'var(--color-navy)' : 'var(--color-surface-2)',
            color: fechaTmp ? 'white' : 'var(--color-text-muted)',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            cursor: fechaTmp ? 'pointer' : 'not-allowed',
            transition: 'background-color 200ms',
          }}
        >
          {lang === 'en' ? 'Confirm date' : 'Confirmar fecha'}
        </button>
        {fechaCirugia && (
          <button
            onClick={() => setEditando(false)}
            style={{
              marginTop: '8px',
              width: '100%',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-surface-2)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
            }}
          >
            {lang === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
        )}
      </div>
    )
  }

  const bgColor = diasRestantes === null ? 'var(--color-navy)'
    : diasRestantes <= 7 ? 'var(--color-alert)'
    : diasRestantes <= 21 ? 'var(--color-warn)'
    : 'var(--color-navy)'

  const locale = lang === 'en' ? 'en-GB' : 'es-ES'
  const fechaDisplay = fechaCirugia
    ? new Date(fechaCirugia + 'T12:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div
      className="pressable"
      onClick={() => { setFechaTmp(fechaCirugia ?? ''); setEditando(true) }}
      role="button"
      aria-label={t.contador.ariaLabel}
      style={{
        borderRadius: 'var(--radius-lg)',
        backgroundColor: bgColor,
        padding: '24px 20px 20px',
        marginBottom: '8px',
        position: 'relative',
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Edit button — 40×40 touch area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
          {t.contador.daysLabel}
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); setFechaTmp(fechaCirugia ?? ''); setEditando(true) }}
          aria-label={t.contador.ariaLabel}
          style={{
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer', color: 'white',
          }}
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Number */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '8px 0' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}>
          {diasRestantes ?? '--'}
        </span>
        <span style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
          {lang === 'en' ? 'days' : 'días'}
        </span>
      </div>

      {/* Date and progress bar */}
      <div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>
          {fechaDisplay}
        </p>
        <div style={{ height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
          {diasRestantes !== null && (
            <div style={{
              height: '100%',
              borderRadius: '2px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              width: `${Math.min(100, Math.max(4, 100 - (diasRestantes / 42) * 100))}%`,
              transition: 'width 600ms ease-out',
            }} />
          )}
        </div>
      </div>
    </div>
  )
}
