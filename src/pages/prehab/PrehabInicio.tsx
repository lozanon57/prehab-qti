import { useNavigate, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, ChevronRight } from 'lucide-react'
import { ContadorCirugia } from '../../components/ContadorCirugia'
import { getPatologia } from '../../data/patologias'
import { useLanguage } from '../../i18n/LanguageContext'

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
  const { t, lang } = useLanguage()

  const nombreCompleto = p
    ? (lang === 'en' ? (p.nombreCompletoEn ?? p.nombreCompleto) : p.nombreCompleto)
    : undefined
  const descripcionP = p
    ? (lang === 'en' ? (p.descripcionEn ?? p.descripcion) : p.descripcion)
    : undefined

  const modulos: ModuloCard[] = [
    {
      icono: <Dumbbell size={22} />,
      titulo: t.prehabInicio.exerciseTitle,
      descripcion: t.prehabInicio.exerciseDesc,
      ruta: 'ejercicio',
      color: 'var(--color-exercise)',
      colorFondo: 'var(--color-exercise-bg)',
    },
    {
      icono: <Apple size={22} />,
      titulo: t.prehabInicio.nutritionTitle,
      descripcion: t.prehabInicio.nutritionDesc,
      ruta: 'nutricion',
      color: 'var(--color-nutrition)',
      colorFondo: 'var(--color-nutrition-bg)',
    },
    {
      icono: <Brain size={22} />,
      titulo: t.prehabInicio.wellnessTitle,
      descripcion: t.prehabInicio.wellnessDesc,
      ruta: 'bienestar',
      color: 'var(--color-mental)',
      colorFondo: 'var(--color-mental-bg)',
    },
    {
      icono: <CheckSquare size={22} />,
      titulo: t.prehabInicio.testsTitle,
      descripcion: t.prehabInicio.testsDesc,
      ruta: 'pruebas',
      color: 'var(--color-checklist)',
      colorFondo: 'var(--color-checklist-bg)',
    },
  ]

  return (
    <div>
      {/* Banner patología */}
      {p && (
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: p.colorClaro,
          }}
        >
          <span style={{ fontSize: '32px', flexShrink: 0 }}>{p.icono}</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: p.color, lineHeight: '1.3' }}>
              {nombreCompleto}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', marginTop: '2px', color: p.color, opacity: 0.75, lineHeight: '1.4' }}>
              {descripcionP}
            </p>
          </div>
        </div>
      )}

      {/* Contador cirugía */}
      <ContadorCirugia />

      {/* Tip card */}
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          marginTop: '12px',
          backgroundColor: 'var(--color-ok-bg)',
          borderLeft: '4px solid var(--color-ok)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>⭐</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-ok)', marginBottom: '4px' }}>
            {t.prehabInicio.tipLabel}
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
            {t.prehabInicio.tipText}
          </p>
        </div>
      </div>

      {/* Módulos */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.prehabInicio.yourProgram}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {modulos.map((m) => (
          <button
            key={m.ruta}
            onClick={() => navigate(m.ruta)}
            className="pressable"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              minHeight: '80px',
              borderLeft: `4px solid ${m.color}`,
            }}
          >
            <div style={{
              width: '44px', height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: m.colorFondo,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: m.color, flexShrink: 0,
            }}>
              {m.icono}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {m.titulo}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                {m.descripcion}
              </p>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {/* Nota institucional */}
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginTop: '24px',
          textAlign: 'center',
          backgroundColor: 'var(--color-surface-2)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
          {t.prehabInicio.institutionalNote}
        </p>
      </div>
    </div>
  )
}
