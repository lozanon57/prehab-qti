import { useNavigate, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, ChevronRight, Star } from 'lucide-react'
import { ContadorCirugia } from '../../components/ContadorCirugia'
import { getPatologia } from '../../data/patologias'

interface ModuloCard {
  icono: React.ReactNode
  titulo: string
  descripcion: string
  ruta: string
  color: string
  colorFondo: string
}

export function PrehabInicio() {
  const navigate = useNavigate()
  const { patologia } = useParams<{ patologia: string }>()
  const p = patologia ? getPatologia(patologia) : undefined

  const modulos: ModuloCard[] = [
    {
      icono: <Dumbbell size={22} />,
      titulo: 'Ejercicio',
      descripcion: 'Plan semanal de ejercicio aeróbico, fuerza y entrenamiento respiratorio',
      ruta: 'ejercicio',
      color: 'var(--color-secundario)',
      colorFondo: 'var(--color-azul-claro)',
    },
    {
      icono: <Apple size={22} />,
      titulo: 'Nutrición',
      descripcion: 'Calculadora de proteínas y guía de alimentación preoperatoria',
      ruta: 'nutricion',
      color: 'var(--color-acento)',
      colorFondo: 'var(--color-verde-claro)',
    },
    {
      icono: <Brain size={22} />,
      titulo: 'Bienestar',
      descripcion: 'Técnicas de relajación, manejo de la ansiedad y recursos de apoyo',
      ruta: 'bienestar',
      color: '#7B5EA7',
      colorFondo: '#F0EBF9',
    },
    {
      icono: <CheckSquare size={22} />,
      titulo: 'Mis pruebas',
      descripcion: 'Checklist de citas y pruebas preoperatorias pendientes',
      ruta: 'pruebas',
      color: 'var(--color-alerta)',
      colorFondo: 'var(--color-ambar-claro)',
    },
  ]

  return (
    <div>
      {/* Banner patología */}
      {p && (
        <div
          className="rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{ backgroundColor: p.colorClaro }}
        >
          <span className="text-3xl">{p.icono}</span>
          <div>
            <p className="font-bold text-sm" style={{ color: p.color }}>
              {p.nombreCompleto}
            </p>
            <p className="text-xs mt-0.5" style={{ color: p.color, opacity: 0.7 }}>
              {p.descripcion}
            </p>
          </div>
        </div>
      )}

      {/* Contador cirugía */}
      <ContadorCirugia />

      {/* Consejo del día */}
      <div
        className="rounded-2xl p-4 mb-4 flex gap-3"
        style={{ backgroundColor: 'var(--color-verde-claro)' }}
      >
        <Star size={18} style={{ color: 'var(--color-acento)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-acento)' }}>
            Consejo del día
          </p>
          <p className="text-sm" style={{ color: 'var(--color-texto)' }}>
            Cada sesión de ejercicio que completas mejora tu tolerancia a la cirugía y acelera tu recuperación.
            El objetivo es llegar a la operación en el mejor estado posible.
          </p>
        </div>
      </div>

      {/* Módulos */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Tu programa
      </h2>
      <div className="flex flex-col gap-3">
        {modulos.map((m) => (
          <button
            key={m.ruta}
            onClick={() => navigate(m.ruta)}
            className="w-full text-left rounded-2xl p-4 border transition-all hover:shadow-md active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-blanco)',
              borderColor: 'var(--color-gris-claro)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: m.colorFondo, color: m.color }}
              >
                {m.icono}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                  {m.titulo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-gris-medio)' }}>
                  {m.descripcion}
                </p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-gris-medio)', flexShrink: 0 }} />
            </div>
          </button>
        ))}
      </div>

      {/* Nota institucional */}
      <div
        className="rounded-2xl p-4 mt-6 text-center"
        style={{ backgroundColor: 'var(--color-gris-claro)' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
          Programa supervisado por el{' '}
          <strong>Servicio de Cirugía Oncológica y Colorrectal</strong> del Instituto Quénet-Torrent.
          Ante cualquier duda, contacta con tu equipo.
        </p>
      </div>
    </div>
  )
}
