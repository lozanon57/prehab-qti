import { NavLink, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, Home } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function BottomNav() {
  const { patologia } = useParams<{ patologia: string }>()
  const { t } = useLanguage()
  const base = patologia ? `/prehab/${patologia}` : '/prehab'

  const items = [
    { to: base, icon: <Home size={22} />, label: t.nav.home },
    { to: `${base}/ejercicio`, icon: <Dumbbell size={22} />, label: t.nav.exercise },
    { to: `${base}/nutricion`, icon: <Apple size={22} />, label: t.nav.nutrition },
    { to: `${base}/bienestar`, icon: <Brain size={22} />, label: t.nav.wellness },
    { to: `${base}/pruebas`, icon: <CheckSquare size={22} />, label: t.nav.tests },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
      }}
    >
      <div className="max-w-2xl mx-auto flex">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === base}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5"
            style={({ isActive }) => ({ color: isActive ? 'var(--color-secundario)' : 'var(--color-gris-medio)' })}
          >
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
      <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </nav>
  )
}
