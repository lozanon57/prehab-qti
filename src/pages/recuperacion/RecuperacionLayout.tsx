import { Outlet, useParams, NavLink } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Activity, Utensils, AlertTriangle, CalendarCheck } from 'lucide-react'
import { getPatologia } from '../../data/patologias'

export function RecuperacionLayout() {
  const { patologia } = useParams<{ patologia: string }>()
  const p = patologia ? getPatologia(patologia) : undefined
  const base = `/recuperacion/${patologia}`

  const items = [
    { to: base, label: 'Mi recuperación', icon: <Activity size={18} /> },
    { to: `${base}/alimentacion`, label: 'Alimentación', icon: <Utensils size={18} /> },
    { to: `${base}/alarma`, label: 'Señales de alarma', icon: <AlertTriangle size={18} /> },
    { to: `${base}/seguimiento`, label: 'Seguimiento', icon: <CalendarCheck size={18} /> },
  ]

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-fondo)' }}>
      <Header
        titulo={p ? `${p.nombre}` : 'Recuperación'}
        subtitulo="Guía de recuperación postoperatoria ERAS"
        mostrarVolver
      />

      {/* Nav de tabs */}
      <nav
        className="sticky top-[72px] z-40 shadow-sm overflow-x-auto"
        style={{ backgroundColor: 'var(--color-blanco)', borderBottom: '1px solid var(--color-gris-claro)' }}
      >
        <div className="flex min-w-max px-2">
          {items.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === base}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-[var(--color-acento)] text-[var(--color-acento)]'
                    : 'border-transparent text-[var(--color-gris-medio)]'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4">
        <Outlet />
      </main>
    </div>
  )
}
