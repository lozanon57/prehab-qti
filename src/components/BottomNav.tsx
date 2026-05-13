import { NavLink, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, Home } from 'lucide-react'

interface NavItem {
  to: string
  icon: React.ReactNode
  label: string
}

export function BottomNav() {
  const { patologia } = useParams<{ patologia: string }>()
  const base = patologia ? `/prehab/${patologia}` : '/prehab'

  const items: NavItem[] = [
    { to: `${base}`, icon: <Home size={20} />, label: 'Inicio' },
    { to: `${base}/ejercicio`, icon: <Dumbbell size={20} />, label: 'Ejercicio' },
    { to: `${base}/nutricion`, icon: <Apple size={20} />, label: 'Nutrición' },
    { to: `${base}/bienestar`, icon: <Brain size={20} />, label: 'Bienestar' },
    { to: `${base}/pruebas`, icon: <CheckSquare size={20} />, label: 'Pruebas' },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 shadow-lg border-t"
      style={{
        backgroundColor: 'var(--color-blanco)',
        borderColor: 'var(--color-gris-claro)',
      }}
    >
      <div className="max-w-2xl mx-auto flex">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === base}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors text-xs font-medium ${
                isActive
                  ? 'text-[var(--color-secundario)]'
                  : 'text-[var(--color-gris-medio)]'
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
