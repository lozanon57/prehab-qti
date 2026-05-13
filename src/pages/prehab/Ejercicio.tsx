import { useState } from 'react'
import { Dumbbell, Wind, Zap, Coffee, ChevronRight, RotateCcw } from 'lucide-react'
import { PLANES_EJERCICIO, ESCALA_BORG, ZONA_OBJETIVO } from '../../data/ejercicios'
import { useAppStore } from '../../store/appStore'
import type { EjercicioDia, NivelActividad } from '../../types'

// ── Configuración visual por tipo de ejercicio ───────────────────────────────
const TIPO_CONFIG = {
  aerobico:    { icono: <Zap size={16} />,     label: 'Aeróbico',     color: '#2E6DA4', fondo: 'var(--color-azul-claro)' },
  fuerza:      { icono: <Dumbbell size={16} />, label: 'Fuerza',       color: '#AA6B3D', fondo: '#F9F0EB' },
  respiratorio:{ icono: <Wind size={16} />,     label: 'Respiratorio', color: '#6B3DAA', fondo: '#F0EBF9' },
  descanso:    { icono: <Coffee size={16} />,   label: 'Descanso',     color: 'var(--color-gris-medio)', fondo: 'var(--color-gris-claro)' },
}

const NIVEL_CONFIG: Record<NivelActividad, { label: string; emoji: string; color: string; fondo: string; descripcion: string }> = {
  baja:     { label: 'Baja', emoji: '🚶', color: '#2E7D32', fondo: '#E8F5E9', descripcion: 'Sesiones cortas y suaves, ideal para empezar desde cero.' },
  moderada: { label: 'Moderada', emoji: '🏃', color: '#1565C0', fondo: '#E3F2FD', descripcion: 'Plan equilibrado: aeróbico, fuerza y respiratorio a ritmo progresivo.' },
  alta:     { label: 'Alta', emoji: '🏋️', color: '#6A1B9A', fondo: '#F3E5F5', descripcion: 'Entrenamiento intenso para mantener tu rendimiento previo a la cirugía.' },
}

// ── Preguntas para evaluar actividad basal ───────────────────────────────────
interface Pregunta {
  id: number
  texto: string
  opciones: { texto: string; puntos: number }[]
}

const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    texto: '¿Cuánto caminas o te mueves normalmente cada día?',
    opciones: [
      { texto: 'Poco — trabajo sentado/a y salgo poco', puntos: 0 },
      { texto: 'Algo — camino 20-40 minutos al día', puntos: 1 },
      { texto: 'Bastante — más de 45 minutos o trabajo de pie', puntos: 2 },
    ],
  },
  {
    id: 2,
    texto: '¿Haces ejercicio o deporte de forma regular?',
    opciones: [
      { texto: 'No, casi nunca', puntos: 0 },
      { texto: 'De vez en cuando (1-2 veces por semana)', puntos: 1 },
      { texto: 'Sí, 3 o más veces por semana', puntos: 2 },
    ],
  },
  {
    id: 3,
    texto: 'Antes de saber de tu enfermedad, ¿cómo describías tu forma física?',
    opciones: [
      { texto: 'No muy buena — me canso fácilmente', puntos: 0 },
      { texto: 'Normal para mi edad', puntos: 1 },
      { texto: 'Buena o muy buena — me mantengo activo/a', puntos: 2 },
    ],
  },
]

function calcularNivel(puntuacion: number): NivelActividad {
  if (puntuacion <= 2) return 'baja'
  if (puntuacion <= 4) return 'moderada'
  return 'alta'
}

// ── Componente evaluación ────────────────────────────────────────────────────
function EvaluacionActividad({ onCompletar }: { onCompletar: (nivel: NivelActividad) => void }) {
  const [paso, setPaso] = useState(0)          // 0 = intro, 1-3 = preguntas, 4 = resultado
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [seleccion, setSeleccion] = useState<number | null>(null)

  const preguntaActual = paso >= 1 && paso <= 3 ? PREGUNTAS[paso - 1] : null
  const total = respuestas.reduce((a, b) => a + b, 0)
  const nivelResultado = calcularNivel(total)

  const avanzar = () => {
    if (paso === 0) { setPaso(1); return }
    if (paso >= 1 && paso <= 3) {
      if (seleccion === null) return
      const nuevas = [...respuestas, seleccion]
      setRespuestas(nuevas)
      setSeleccion(null)
      if (paso === 3) setPaso(4)
      else setPaso(paso + 1)
    }
  }

  // Pantalla de introducción
  if (paso === 0) {
    return (
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
        <div className="text-3xl mb-3 text-center">🏃‍♂️</div>
        <h3 className="font-bold text-base mb-2 text-center" style={{ color: 'var(--color-texto)' }}>
          Adaptar el plan a tu actividad
        </h3>
        <p className="text-sm text-center mb-4" style={{ color: 'var(--color-gris-medio)' }}>
          3 preguntas rápidas para ajustar el programa de ejercicio a cómo eras
          antes del diagnóstico. Lleva menos de un minuto.
        </p>
        <button
          onClick={avanzar}
          className="w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-principal)', color: 'white' }}
        >
          Empezar <ChevronRight size={16} />
        </button>
      </div>
    )
  }

  // Preguntas 1-3
  if (preguntaActual) {
    return (
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
        {/* Barra de progreso */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full" style={{
              backgroundColor: i <= paso ? 'var(--color-principal)' : 'var(--color-gris-claro)',
            }} />
          ))}
        </div>
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-gris-medio)' }}>
          Pregunta {paso} de 3
        </p>
        <p className="font-semibold text-sm mb-4" style={{ color: 'var(--color-texto)' }}>
          {preguntaActual.texto}
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {preguntaActual.opciones.map((op, i) => (
            <button
              key={i}
              onClick={() => setSeleccion(op.puntos)}
              className="w-full text-left rounded-xl px-4 py-3 text-sm border transition-all"
              style={{
                borderColor: seleccion === op.puntos ? 'var(--color-principal)' : 'var(--color-gris-claro)',
                backgroundColor: seleccion === op.puntos ? 'var(--color-azul-claro)' : 'var(--color-blanco)',
                color: seleccion === op.puntos ? 'var(--color-principal)' : 'var(--color-texto)',
                fontWeight: seleccion === op.puntos ? 600 : 400,
              }}
            >
              {op.texto}
            </button>
          ))}
        </div>
        <button
          onClick={avanzar}
          disabled={seleccion === null}
          className="w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 transition-opacity"
          style={{
            backgroundColor: 'var(--color-principal)',
            color: 'white',
            opacity: seleccion === null ? 0.4 : 1,
          }}
        >
          {paso === 3 ? 'Ver mi plan' : 'Siguiente'} <ChevronRight size={16} />
        </button>
      </div>
    )
  }

  // Resultado
  const cfg = NIVEL_CONFIG[nivelResultado]
  return (
    <div className="rounded-2xl p-5 border" style={{ backgroundColor: cfg.fondo, borderColor: cfg.color + '40' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: cfg.color }}>
        Tu nivel de actividad
      </p>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{cfg.emoji}</span>
        <p className="text-2xl font-extrabold" style={{ color: cfg.color }}>{cfg.label}</p>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-texto)' }}>
        {cfg.descripcion}
      </p>
      <button
        onClick={() => onCompletar(nivelResultado)}
        className="w-full rounded-xl py-3 font-semibold text-sm"
        style={{ backgroundColor: cfg.color, color: 'white' }}
      >
        Ver mi plan personalizado
      </button>
    </div>
  )
}

// ── Tarjeta de día ───────────────────────────────────────────────────────────
function TarjetaDia({ ejercicio }: { ejercicio: EjercicioDia }) {
  const { toggleProgreso, progreso } = useAppStore()
  const key = `ejercicio-${ejercicio.dia}`
  const hecho = progreso[key] || false
  const config = TIPO_CONFIG[ejercicio.tipo]

  return (
    <div
      className="rounded-2xl p-4 border transition-all"
      style={{
        backgroundColor: hecho ? 'var(--color-verde-claro)' : 'var(--color-blanco)',
        borderColor: hecho ? 'var(--color-acento)' : 'var(--color-gris-claro)',
        opacity: hecho ? 0.85 : 1,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-bold text-sm" style={{ color: 'var(--color-texto)' }}>
            {ejercicio.dia}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: config.fondo, color: config.color }}>
              {config.icono}
              {config.label}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
              · {ejercicio.duracion}
            </span>
          </div>
        </div>
        <button
          onClick={() => toggleProgreso(key)}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0"
          style={{
            borderColor: hecho ? 'var(--color-acento)' : 'var(--color-gris-claro)',
            backgroundColor: hecho ? 'var(--color-acento)' : 'transparent',
            color: 'white',
          }}
          aria-label={hecho ? 'Desmarcar' : 'Marcar como completado'}
        >
          {hecho && <span className="text-sm">✓</span>}
        </button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gris-medio)' }}>
        {ejercicio.descripcion}
      </p>
    </div>
  )
}

// ── Escala de Borg ───────────────────────────────────────────────────────────
function EscalaBorg({ nivel }: { nivel: NivelActividad }) {
  const [valorSeleccionado, setValorSeleccionado] = useState<number | null>(null)
  const zona = ZONA_OBJETIVO[nivel]

  return (
    <div className="rounded-2xl p-4 border" style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
      <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-texto)' }}>
        Escala de esfuerzo (Borg)
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--color-gris-medio)' }}>
        Tu zona objetivo con el plan <strong>{NIVEL_CONFIG[nivel].label.toLowerCase()}</strong> es{' '}
        <strong style={{ color: 'var(--color-secundario)' }}>{zona.min}–{zona.max}</strong>.
      </p>
      <div className="flex flex-col gap-1">
        {ESCALA_BORG.map(({ valor, descripcion }) => {
          const enZona = valor >= zona.min && valor <= zona.max
          const seleccionado = valorSeleccionado === valor
          return (
            <button
              key={valor}
              onClick={() => setValorSeleccionado(valor === valorSeleccionado ? null : valor)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-all"
              style={{
                backgroundColor: seleccionado ? 'var(--color-secundario)' : enZona ? 'var(--color-azul-claro)' : 'transparent',
              }}
            >
              <span className="font-bold text-sm w-6 text-right flex-shrink-0"
                style={{ color: seleccionado ? 'white' : enZona ? 'var(--color-secundario)' : 'var(--color-gris-medio)' }}>
                {valor}
              </span>
              <span className="text-sm flex-1"
                style={{
                  color: seleccionado ? 'white' : enZona ? 'var(--color-principal)' : 'var(--color-gris-medio)',
                  fontWeight: enZona ? 600 : 400,
                }}>
                {descripcion}
              </span>
              {enZona && (
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seleccionado ? 'white' : 'var(--color-secundario)', color: seleccionado ? 'var(--color-secundario)' : 'white' }}>
                  ★ Objetivo
                </span>
              )}
            </button>
          )
        })}
      </div>
      {valorSeleccionado !== null && (
        <div className="mt-3 rounded-xl p-3 text-sm font-medium"
          style={{ backgroundColor: 'var(--color-azul-claro)', color: 'var(--color-principal)' }}>
          {valorSeleccionado < zona.min
            ? '⬆️ Puedes aumentar un poco la intensidad.'
            : valorSeleccionado > zona.max
            ? '⬇️ Reduce ligeramente el ritmo para mantenerte en zona segura.'
            : '✅ Estás en la zona de entrenamiento ideal. ¡Sigue así!'}
        </div>
      )}
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export function Ejercicio() {
  const { progreso, nivelActividad, setNivelActividad } = useAppStore()
  const plan = nivelActividad ? PLANES_EJERCICIO[nivelActividad] : null
  const diasCompletados = plan ? plan.filter((e) => progreso[`ejercicio-${e.dia}`]).length : 0

  const handleCambiarNivel = () => setNivelActividad(null as unknown as NivelActividad)

  if (!nivelActividad) {
    return (
      <div>
        <div className="rounded-2xl p-4 mb-5 text-sm"
          style={{ backgroundColor: 'var(--color-azul-claro)', color: 'var(--color-principal)' }}>
          <p className="font-semibold mb-1">Programa de ejercicio personalizado</p>
          <p>
            Cada persona tiene un punto de partida diferente. Responde 3 preguntas
            y el programa se adaptará a tu nivel de actividad habitual.
          </p>
        </div>
        <EvaluacionActividad onCompletar={setNivelActividad} />
      </div>
    )
  }

  const cfg = NIVEL_CONFIG[nivelActividad]

  return (
    <div>
      {/* Nivel activo + progreso */}
      <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: 'var(--color-principal)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cfg.emoji}</span>
            <div>
              <p className="text-white/70 text-xs">Nivel de actividad</p>
              <p className="text-white font-bold text-sm">{cfg.label}</p>
            </div>
          </div>
          <button onClick={handleCambiarNivel} className="flex items-center gap-1 text-white/50 text-xs"
            title="Cambiar nivel">
            <RotateCcw size={12} /> Cambiar
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-white text-3xl font-extrabold">{diasCompletados}</span>
            <span className="text-white/60 text-sm mb-1">
              / {plan!.filter(e => e.tipo !== 'descanso').length} días de ejercicio
            </span>
          </div>
          <div className="flex gap-1">
            {plan!.filter(e => e.tipo !== 'descanso').map((e, i) => (
              <div key={i} className="flex-1 h-2 rounded-full transition-colors"
                style={{ backgroundColor: progreso[`ejercicio-${e.dia}`] ? 'var(--color-acento)' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Info plan */}
      <div className="rounded-2xl p-4 mb-4 text-sm" style={{ backgroundColor: cfg.fondo, color: cfg.color }}>
        <p className="font-semibold mb-1">Plan {cfg.label} {cfg.emoji}</p>
        <p className="text-xs" style={{ color: 'var(--color-texto)' }}>{cfg.descripcion}</p>
        <ul className="list-disc pl-4 space-y-1 text-xs mt-2" style={{ color: cfg.color }}>
          <li>Marca cada día cuando termines la sesión.</li>
          <li>Si un día no puedes, retómalo al siguiente sin culpa.</li>
          <li>Usa la escala de esfuerzo para comprobar la intensidad.</li>
          <li>Habla con el fisioterapeuta si sientes dolor o molestias.</li>
        </ul>
      </div>

      {/* Plan semanal */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Plan semanal
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {plan!.map((e) => (
          <TarjetaDia key={e.dia} ejercicio={e} />
        ))}
      </div>

      {/* Escala de Borg */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        ¿A qué intensidad debo entrenar?
      </h2>
      <EscalaBorg nivel={nivelActividad} />
    </div>
  )
}
