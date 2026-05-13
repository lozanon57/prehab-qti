import { NavLink, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, Home } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function BottomNav() {
  const { patologia } = useParams<{ patologia: string }>()
  const { t } = useLanguage()
  const base = patologia ? `/prehab/${patologia}` : '/prehab'

  const items = [
    { to: base, icon: <Home size={24} />, label: t.nav.home },
    { to: `${base}/ejercicio`, icon: <Dumbbell size={24} />, label: t.nav.exercise },
    { to: `${base}/nutricion`, icon: <Apple size={24} />, label: t.nav.nutrition },
    { to: `${base}/bienestar`, icon: <Brain size={24} />, label: t.nav.wellness },
    { to: `${base}/pruebas`, icon: <CheckSquare size={24} />, label: t.nav.tests },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(247,245,242,0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: 'var(--shadow-nav)',
      }}
    >
      <div className="max-w-2xl mx-auto flex" style={{ height: '72px' }}>
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === base}
            className="flex-1 flex flex-col items-center justify-center gap-1"
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-navy)' : 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 150ms',
            })}
          >
            {icon}
            <span style={{ fontSize: '11px', fontWeight: 500, lineHeight: '1.2' }}>{label}</span>
          </NavLink>
        ))}
      </div>
      <div className="safe-bottom" />
    </nav>
  )
}
