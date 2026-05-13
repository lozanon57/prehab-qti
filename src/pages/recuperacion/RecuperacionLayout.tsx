import { Outlet, useParams, NavLink } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Activity, Utensils, AlertTriangle, CalendarCheck } from 'lucide-react'
import { getPatologia } from '../../data/patologias'
import { useLanguage } from '../../i18n/LanguageContext'

export function RecuperacionLayout() {
  const { patologia } = useParams<{ patologia: string }>()
  const p = patologia ? getPatologia(patologia) : undefined
  const { t, lang } = useLanguage()
  const base = `/recuperacion/${patologia}`

  const nombre = p
    ? (lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre)
    : (lang === 'en' ? 'Recovery' : 'Recuperación')

  const items = [
    { to: base, label: t.recoveryTabs.recovery, icon: <Activity size={18} /> },
    { to: `${base}/alimentacion`, label: t.recoveryTabs.nutrition, icon: <Utensils size={18} /> },
    { to: `${base}/alarma`, label: t.recoveryTabs.alarm, icon: <AlertTriangle size={18} /> },
    { to: `${base}/seguimiento`, label: t.recoveryTabs.followup, icon: <CalendarCheck size={18} /> },
  ]

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header
        titulo={nombre}
        subtitulo={t.header.recoverySubtitle}
        mostrarVolver
      />

      {/* Tab bar */}
      <nav
        className="sticky z-40 overflow-x-auto"
        style={{
          top: '56px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', minWidth: 'max-content', padding: '0 8px' }}>
          {items.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === base}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '14px 12px',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                color: isActive ? 'var(--color-recovery)' : 'var(--color-text-muted)',
                borderBottom: isActive ? '2px solid var(--color-recovery)' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
                minHeight: '48px',
              })}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main style={{
        flex: 1,
        maxWidth: '640px',
        margin: '0 auto',
        width: '100%',
        padding: '20px 20px 96px',
      }}>
        <Outlet />
      </main>
    </div>
  )
}
