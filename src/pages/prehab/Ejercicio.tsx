import { useState } from 'react'
import { Dumbbell, Wind, Zap, Coffee, ChevronRight, RotateCcw } from 'lucide-react'
import { PLANES_EJERCICIO, ESCALA_BORG, ZONA_OBJETIVO } from '../../data/ejercicios'
import { useAppStore } from '../../store/appStore'
import { useLanguage } from '../../i18n/LanguageContext'
import type { EjercicioDia, NivelActividad } from '../../types'

const DAY_EN: Record<string, string> = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
}

const TIPO_ICONS = {
  aerobico:    <Zap size={16} />,
  fuerza:      <Dumbbell size={16} />,
  respiratorio:<Wind size={16} />,
  descanso:    <Coffee size={16} />,
}

const TIPO_COLORS = {
  aerobico:    { color: '#2E6DA4', fondo: 'var(--color-azul-claro)' },
  fuerza:      { color: '#AA6B3D', fondo: '#F9F0EB' },
  respiratorio:{ color: '#6B3DAA', fondo: '#F0EBF9' },
  descanso:    { color: 'var(--color-gris-medio)', fondo: 'var(--color-gris-claro)' },
}

const NIVEL_EMOJIS: Record<NivelActividad, string> = {
  baja: '🚶',
  moderada: '🏃',
  alta: '🏋️',
}

const NIVEL_COLORS: Record<NivelActividad, { color: string; fondo: string }> = {
  baja:     { color: '#2E7D32', fondo: '#E8F5E9' },
  moderada: { color: '#1565C0', fondo: '#E3F2FD' },
  alta:     { color: '#6A1B9A', fondo: '#F3E5F5' },
}

function calcularNivel(puntuacion: number): NivelActividad {
  if (puntuacion <= 2) return 'baja'
  if (puntuacion <= 4) return 'moderada'
  return 'alta'
}

// ── Componente evaluación ────────────────────────────────────────────────────
function EvaluacionActividad({ onCompletar }: { onCompletar: (nivel: NivelActividad) => void }) {
  const { t } = useLanguage()
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [seleccion, setSeleccion] = useState<number | null>(null)

  const preguntaActual = paso >= 1 && paso <= 3 ? t.exercise.questions[paso - 1] : null
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
          {t.exercise.assessTitle}
        </h3>
        <p className="text-sm text-center mb-4" style={{ color: 'var(--color-gris-medio)' }}>
          {t.exercise.assessDesc}
        </p>
        <button
          onClick={avanzar}
          className="w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-principal)', color: 'white' }}
        >
          {t.common.start} <ChevronRight size={16} />
        </button>
      </div>
    )
  }

  // Preguntas 1-3
  if (preguntaActual) {
    return (
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full" style={{
              backgroundColor: i <= paso ? 'var(--color-principal)' : 'var(--color-gris-claro)',
            }} />
          ))}
        </div>
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-gris-medio)' }}>
          {t.exercise.question} {paso} {t.exercise.questionOf} 3
        </p>
        <p className="font-semibold text-sm mb-4" style={{ color: 'var(--color-texto)' }}>
          {preguntaActual.text}
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {preguntaActual.options.map((opcion, i) => (
            <button
              key={i}
              onClick={() => setSeleccion(i)}
              className="w-full text-left rounded-xl px-4 py-3 text-sm border transition-all"
              style={{
                borderColor: seleccion === i ? 'var(--color-principal)' : 'var(--color-gris-claro)',
                backgroundColor: seleccion === i ? 'var(--color-azul-claro)' : 'var(--color-blanco)',
                color: seleccion === i ? 'var(--color-principal)' : 'var(--color-texto)',
                fontWeight: seleccion === i ? 600 : 400,
              }}
            >
              {opcion}
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
          {paso === 3 ? t.common.seePlan : t.common.next} <ChevronRight size={16} />
        </button>
      </div>
    )
  }

  // Resultado
  const cfg = { ...NIVEL_COLORS[nivelResultado], emoji: NIVEL_EMOJIS[nivelResultado] }
  const nivelInfo = t.exercise.nivelesConfig[nivelResultado]
  return (
    <div className="rounded-2xl p-5 border" style={{ backgroundColor: cfg.fondo, borderColor: cfg.color + '40' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: cfg.color }}>
        {t.exercise.yourLevel}
      </p>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{cfg.emoji}</span>
        <p className="text-2xl font-extrabold" style={{ color: cfg.color }}>{nivelInfo.label}</p>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-texto)' }}>
        {nivelInfo.descripcion}
      </p>
      <button
        onClick={() => onCompletar(nivelResultado)}
        className="w-full rounded-xl py-3 font-semibold text-sm"
        style={{ backgroundColor: cfg.color, color: 'white' }}
      >
        {t.common.seePersonalized}
      </button>
    </div>
  )
}

// ── Tarjeta de día ───────────────────────────────────────────────────────────
function TarjetaDia({ ejercicio }: { ejercicio: EjercicioDia }) {
  const { toggleProgreso, progreso } = useAppStore()
  const { t, lang } = useLanguage()
  const key = `ejercicio-${ejercicio.dia}`
  const hecho = progreso[key] || false
  const config = TIPO_COLORS[ejercicio.tipo]
  const icon = TIPO_ICONS[ejercicio.tipo]
  const tipoLabel = t.exercise.tipoLabels[ejercicio.tipo]
  const diaDisplay = lang === 'en' ? (DAY_EN[ejercicio.dia] ?? ejercicio.dia) : ejercicio.dia
  const descripcion = lang === 'en' ? (ejercicio.descripcionEn ?? ejercicio.descripcion) : ejercicio.descripcion

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
            {diaDisplay}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: config.fondo, color: config.color }}>
              {icon}
              {tipoLabel}
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
          aria-label={hecho ? t.exercise.unmark : t.exercise.markDone}
        >
          {hecho && <span className="text-sm">✓</span>}
        </button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gris-medio)' }}>
        {descripcion}
      </p>
    </div>
  )
}

// ── Escala de Borg ───────────────────────────────────────────────────────────
function EscalaBorg({ nivel }: { nivel: NivelActividad }) {
  const { t } = useLanguage()
  const [valorSeleccionado, setValorSeleccionado] = useState<number | null>(null)
  const zona = ZONA_OBJETIVO[nivel]
  const nivelLabel = t.exercise.nivelesConfig[nivel].label

  return (
    <div className="rounded-2xl p-4 border" style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
      <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-texto)' }}>
        {t.exercise.borgTitle}
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--color-gris-medio)' }}>
        {t.exercise.borgTargetPre}{' '}
        <strong>{nivelLabel.toLowerCase()}</strong>{' '}
        {t.exercise.borgTargetPost}{' '}
        <strong style={{ color: 'var(--color-secundario)' }}>{zona.min}–{zona.max}</strong>.
      </p>
      <div className="flex flex-col gap-1">
        {ESCALA_BORG.map(({ valor }, idx) => {
          const enZona = valor >= zona.min && valor <= zona.max
          const seleccionado = valorSeleccionado === valor
          const borgDesc = t.exercise.borgDescriptions[idx]
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
                {borgDesc}
              </span>
              {enZona && (
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seleccionado ? 'white' : 'var(--color-secundario)', color: seleccionado ? 'var(--color-secundario)' : 'white' }}>
                  {t.exercise.borgObjective}
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
            ? t.exercise.borgTooLow
            : valorSeleccionado > zona.max
            ? t.exercise.borgTooHigh
            : t.exercise.borgOk}
        </div>
      )}
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export function Ejercicio() {
  const { progreso, nivelActividad, setNivelActividad } = useAppStore()
  const { t } = useLanguage()
  const plan = nivelActividad ? PLANES_EJERCICIO[nivelActividad] : null
  const diasCompletados = plan ? plan.filter((e) => progreso[`ejercicio-${e.dia}`]).length : 0

  const handleCambiarNivel = () => setNivelActividad(null as unknown as NivelActividad)

  if (!nivelActividad) {
    return (
      <div>
        <div className="rounded-2xl p-4 mb-5 text-sm"
          style={{ backgroundColor: 'var(--color-azul-claro)', color: 'var(--color-principal)' }}>
          <p className="font-semibold mb-1">{t.exercise.introTitle}</p>
          <p>{t.exercise.introDesc}</p>
        </div>
        <EvaluacionActividad onCompletar={setNivelActividad} />
      </div>
    )
  }

  const cfg = { ...NIVEL_COLORS[nivelActividad], emoji: NIVEL_EMOJIS[nivelActividad] }
  const nivelInfo = t.exercise.nivelesConfig[nivelActividad]

  return (
    <div>
      {/* Nivel activo + progreso */}
      <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: 'var(--color-principal)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cfg.emoji}</span>
            <div>
              <p className="text-white/70 text-xs">{t.exercise.activityLevel}</p>
              <p className="text-white font-bold text-sm">{nivelInfo.label}</p>
            </div>
          </div>
          <button onClick={handleCambiarNivel} className="flex items-center gap-1 text-white/50 text-xs"
            title={t.common.change}>
            <RotateCcw size={12} /> {t.common.change}
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-white text-3xl font-extrabold">{diasCompletados}</span>
            <span className="text-white/60 text-sm mb-1">
              / {plan!.filter(e => e.tipo !== 'descanso').length} {t.exercise.exerciseDays}
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
        <p className="font-semibold mb-1">{nivelInfo.label} {cfg.emoji}</p>
        <p className="text-xs" style={{ color: 'var(--color-texto)' }}>{nivelInfo.descripcion}</p>
        <ul className="list-disc pl-4 space-y-1 text-xs mt-2" style={{ color: cfg.color }}>
          {t.exercise.planTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Plan semanal */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {t.exercise.weeklyPlan}
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {plan!.map((e) => (
          <TarjetaDia key={e.dia} ejercicio={e} />
        ))}
      </div>

      {/* Escala de Borg */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {t.exercise.intensityQ}
      </h2>
      <EscalaBorg nivel={nivelActividad} />
    </div>
  )
}
