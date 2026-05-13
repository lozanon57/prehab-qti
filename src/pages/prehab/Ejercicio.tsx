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
  aerobico:     <Zap size={16} />,
  fuerza:       <Dumbbell size={16} />,
  respiratorio: <Wind size={16} />,
  descanso:     <Coffee size={16} />,
}

const TIPO_COLORS = {
  aerobico:     { color: 'var(--color-exercise)', fondo: 'var(--color-exercise-bg)' },
  fuerza:       { color: '#AA6B3D', fondo: '#F9F0EB' },
  respiratorio: { color: 'var(--color-mental)', fondo: 'var(--color-mental-bg)' },
  descanso:     { color: 'var(--color-text-muted)', fondo: 'var(--color-surface-2)' },
}

const NIVEL_EMOJIS: Record<NivelActividad, string> = {
  baja: '🚶',
  moderada: '🏃',
  alta: '🏋️',
}

const NIVEL_COLORS: Record<NivelActividad, { color: string; fondo: string }> = {
  baja:     { color: '#2E7D32', fondo: '#E8F5E9' },
  moderada: { color: 'var(--color-exercise)', fondo: 'var(--color-exercise-bg)' },
  alta:     { color: 'var(--color-mental)', fondo: 'var(--color-mental-bg)' },
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

  if (paso === 0) {
    return (
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏃‍♂️</div>
        <h3 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          {t.exercise.assessTitle}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
          {t.exercise.assessDesc}
        </p>
        <button
          onClick={avanzar}
          className="touch-cta pressable"
          style={{
            width: '100%',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-navy)',
            color: 'white',
            fontWeight: 700,
            fontSize: 'var(--text-base)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          {t.common.start} <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  if (preguntaActual) {
    return (
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              flex: 1, height: '4px', borderRadius: '2px',
              backgroundColor: i <= paso ? 'var(--color-navy)' : 'var(--color-border)',
              transition: 'background-color 200ms',
            }} />
          ))}
        </div>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {t.exercise.question} {paso} {t.exercise.questionOf} 3
        </p>
        <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '20px', lineHeight: '1.4' }}>
          {preguntaActual.text}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {preguntaActual.options.map((opcion, i) => (
            <button
              key={i}
              onClick={() => setSeleccion(i)}
              style={{
                width: '100%',
                textAlign: 'left',
                borderRadius: 'var(--radius-md)',
                padding: '0 16px',
                minHeight: '56px',
                fontSize: 'var(--text-sm)',
                border: `2px solid ${seleccion === i ? 'var(--color-navy)' : 'var(--color-border)'}`,
                backgroundColor: seleccion === i ? 'var(--color-navy-muted)' : 'var(--color-surface)',
                color: seleccion === i ? 'var(--color-navy)' : 'var(--color-text-primary)',
                fontWeight: seleccion === i ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 150ms',
                display: 'flex', alignItems: 'center',
              }}
            >
              {opcion}
            </button>
          ))}
        </div>
        <button
          onClick={avanzar}
          disabled={seleccion === null}
          className="touch-cta pressable"
          style={{
            width: '100%',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-navy)',
            color: 'white',
            fontWeight: 700,
            fontSize: 'var(--text-base)',
            border: 'none',
            cursor: seleccion === null ? 'not-allowed' : 'pointer',
            opacity: seleccion === null ? 0.4 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          {paso === 3 ? t.common.seePlan : t.common.next} <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  // Resultado
  const cfg = { ...NIVEL_COLORS[nivelResultado], emoji: NIVEL_EMOJIS[nivelResultado] }
  const nivelInfo = t.exercise.nivelesConfig[nivelResultado]
  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      padding: '24px 20px',
      backgroundColor: cfg.fondo,
      border: `2px solid ${cfg.color}40`,
    }}>
      <p className="label-caps" style={{ color: cfg.color, marginBottom: '8px' }}>
        {t.exercise.yourLevel}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '36px' }}>{cfg.emoji}</span>
        <p style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', fontWeight: 700, color: cfg.color }}>
          {nivelInfo.label}
        </p>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: '20px', lineHeight: '1.5' }}>
        {nivelInfo.descripcion}
      </p>
      <button
        onClick={() => onCompletar(nivelResultado)}
        className="touch-cta pressable"
        style={{
          width: '100%',
          borderRadius: 'var(--radius-md)',
          backgroundColor: cfg.color,
          color: 'white',
          fontWeight: 700,
          fontSize: 'var(--text-base)',
          border: 'none',
          cursor: 'pointer',
        }}
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
      style={{
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        backgroundColor: hecho ? 'var(--color-ok-bg)' : 'var(--color-surface)',
        border: `1px solid ${hecho ? 'var(--color-ok)' : 'var(--color-border)'}`,
        borderLeft: `4px solid ${hecho ? 'var(--color-ok)' : config.color}`,
        boxShadow: 'var(--shadow-card)',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      {/* Check button: 40×40px */}
      <button
        onClick={() => toggleProgreso(key)}
        aria-label={hecho ? t.exercise.unmark : t.exercise.markDone}
        style={{
          width: '40px', height: '40px', flexShrink: 0,
          borderRadius: 'var(--radius-full)',
          border: `2px solid ${hecho ? 'var(--color-ok)' : 'var(--color-border)'}`,
          backgroundColor: hecho ? 'var(--color-ok)' : 'transparent',
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          transition: 'all 150ms',
          marginTop: '4px',
        }}
      >
        {hecho && '✓'}
      </button>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
            {diaDisplay}
          </p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: 'var(--text-xs)', fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: config.fondo,
            color: config.color,
            flexShrink: 0,
          }}>
            {icon} {tipoLabel} · {ejercicio.duracion}
          </span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.5', color: 'var(--color-text-secondary)' }}>
          {descripcion}
        </p>
      </div>
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
    <div style={{
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-card)',
    }}>
      <h3 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
        {t.exercise.borgTitle}
      </h3>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
        {t.exercise.borgTargetPre}{' '}
        <strong>{nivelLabel.toLowerCase()}</strong>{' '}
        {t.exercise.borgTargetPost}{' '}
        <strong style={{ color: 'var(--color-exercise)' }}>{zona.min}–{zona.max}</strong>.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {ESCALA_BORG.map(({ valor }, idx) => {
          const enZona = valor >= zona.min && valor <= zona.max
          const seleccionado = valorSeleccionado === valor
          const borgDesc = t.exercise.borgDescriptions[idx]
          return (
            <button
              key={valor}
              onClick={() => setValorSeleccionado(valor === valorSeleccionado ? null : valor)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                borderRadius: 'var(--radius-sm)',
                padding: '0 12px',
                minHeight: '48px',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: seleccionado ? 'var(--color-exercise)' : enZona ? 'var(--color-exercise-bg)' : 'transparent',
                transition: 'background-color 150ms',
              }}
            >
              <span style={{
                fontWeight: 700, fontSize: 'var(--text-sm)', width: '24px', textAlign: 'right', flexShrink: 0,
                color: seleccionado ? 'white' : enZona ? 'var(--color-exercise)' : 'var(--color-text-muted)',
              }}>
                {valor}
              </span>
              <span style={{
                fontSize: 'var(--text-sm)', flex: 1,
                color: seleccionado ? 'white' : enZona ? 'var(--color-navy)' : 'var(--color-text-muted)',
                fontWeight: enZona ? 600 : 400,
              }}>
                {borgDesc}
              </span>
              {enZona && (
                <span style={{
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  padding: '2px 8px', borderRadius: 'var(--radius-full)', flexShrink: 0,
                  backgroundColor: seleccionado ? 'white' : 'var(--color-exercise)',
                  color: seleccionado ? 'var(--color-exercise)' : 'white',
                }}>
                  {t.exercise.borgObjective}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {valorSeleccionado !== null && (
        <div style={{
          marginTop: '12px', borderRadius: 'var(--radius-md)', padding: '14px 16px',
          fontSize: 'var(--text-sm)', fontWeight: 500,
          backgroundColor: 'var(--color-exercise-bg)', color: 'var(--color-navy)',
        }}>
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
        <div style={{
          borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '20px',
          backgroundColor: 'var(--color-exercise-bg)', color: 'var(--color-exercise)',
          borderLeft: '4px solid var(--color-exercise)',
        }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '4px' }}>{t.exercise.introTitle}</p>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: '1.5', color: 'var(--color-text-secondary)' }}>{t.exercise.introDesc}</p>
        </div>
        <EvaluacionActividad onCompletar={setNivelActividad} />
      </div>
    )
  }

  const cfg = { ...NIVEL_COLORS[nivelActividad], emoji: NIVEL_EMOJIS[nivelActividad] }
  const nivelInfo = t.exercise.nivelesConfig[nivelActividad]

  return (
    <div>
      {/* Nivel activo hero card */}
      <div style={{
        borderRadius: 'var(--radius-lg)', padding: '20px 20px 16px',
        marginBottom: '20px',
        backgroundColor: 'var(--color-navy)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>{cfg.emoji}</span>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>{t.exercise.activityLevel}</p>
              <p style={{ color: 'white', fontWeight: 700, fontSize: 'var(--text-base)' }}>{nivelInfo.label}</p>
            </div>
          </div>
          <button
            onClick={handleCambiarNivel}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px',
            }}
          >
            <RotateCcw size={14} /> {t.common.change}
          </button>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '40px', fontWeight: 700, lineHeight: 1 }}>
              {diasCompletados}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>
              / {plan!.filter(e => e.tipo !== 'descanso').length} {t.exercise.exerciseDays}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {plan!.filter(e => e.tipo !== 'descanso').map((e, i) => (
              <div key={i} style={{
                flex: 1, height: '6px', borderRadius: '3px',
                backgroundColor: progreso[`ejercicio-${e.dia}`] ? 'var(--color-ok)' : 'rgba(255,255,255,0.2)',
                transition: 'background-color 300ms',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Info plan */}
      <div style={{
        borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '24px',
        backgroundColor: cfg.fondo,
        borderLeft: `4px solid ${cfg.color}`,
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: cfg.color, marginBottom: '4px' }}>
          {cfg.emoji} {nivelInfo.label}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5', marginBottom: '8px' }}>
          {nivelInfo.descripcion}
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {t.exercise.planTips.map((tip, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-xs)', color: cfg.color }}>
              <span style={{ flexShrink: 0 }}>·</span> {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Plan semanal */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.exercise.weeklyPlan}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        {plan!.map((e) => (
          <TarjetaDia key={e.dia} ejercicio={e} />
        ))}
      </div>

      {/* Escala de Borg */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.exercise.intensityQ}
      </div>
      <EscalaBorg nivel={nivelActividad} />
    </div>
  )
}
