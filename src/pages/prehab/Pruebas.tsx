import { useAppStore } from '../../store/appStore'
import { useLanguage } from '../../i18n/LanguageContext'
import { CheckCircle2, Circle, Calendar } from 'lucide-react'

const CAT_COLOR_BY_ID: Record<string, { color: string; fondo: string }> = {
  analitica:            { color: 'var(--color-exercise)', fondo: 'var(--color-exercise-bg)' },
  ecg:                  { color: 'var(--color-alert)', fondo: 'var(--color-alert-bg)' },
  'rx-torax':           { color: 'var(--color-mental)', fondo: 'var(--color-mental-bg)' },
  ecocardio:            { color: 'var(--color-alert)', fondo: 'var(--color-alert-bg)' },
  'consulta-anestesia': { color: 'var(--color-navy)', fondo: 'var(--color-navy-muted)' },
  'consulta-nutricion': { color: 'var(--color-nutrition)', fondo: 'var(--color-nutrition-bg)' },
  'consulta-cirugia':   { color: '#AA6B3D', fondo: '#F9F0EB' },
  consentimiento:       { color: 'var(--color-checklist)', fondo: 'var(--color-checklist-bg)' },
  'analitica-control':  { color: 'var(--color-exercise)', fondo: 'var(--color-exercise-bg)' },
  'tc-tele':            { color: 'var(--color-mental)', fondo: 'var(--color-mental-bg)' },
}

export function Pruebas() {
  const { progreso, toggleProgreso } = useAppStore()
  const { t } = useLanguage()
  const tests = t.tests.tests

  const completadas = tests.filter((p) => progreso[`prueba-${p.id}`]).length
  const obligatoriasCompletadas = tests.filter((p) => p.obligatoria && progreso[`prueba-${p.id}`]).length
  const totalObligatorias = tests.filter((p) => p.obligatoria).length

  return (
    <div>
      {/* Resumen */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: '16px',
        backgroundColor: 'var(--color-navy)',
        display: 'flex',
        gap: '0',
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1,
            marginBottom: '4px',
          }}>
            {completadas}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>
            / {tests.length} {t.tests.completedOf}
          </p>
        </div>
        <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1,
            marginBottom: '4px',
          }}>
            {obligatoriasCompletadas}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>
            / {totalObligatorias} {t.tests.mandatoryOf}
          </p>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
        {t.tests.note}
      </p>

      {/* Lista agrupada por semana */}
      {t.tests.weeks.map((semana) => {
        const pruebasSemana = tests.filter((p) => p.semana === semana)
        if (!pruebasSemana.length) return null
        return (
          <div key={semana} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span className="label-caps" style={{ color: 'var(--color-text-muted)' }}>
                {semana}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pruebasSemana.map((prueba) => {
                const hecha = !!progreso[`prueba-${prueba.id}`]
                const cat = CAT_COLOR_BY_ID[prueba.id] ?? { color: 'var(--color-text-primary)', fondo: 'var(--color-surface-2)' }
                return (
                  <button
                    key={prueba.id}
                    onClick={() => toggleProgreso(`prueba-${prueba.id}`)}
                    className="pressable"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      borderRadius: 'var(--radius-md)',
                      padding: '0 20px',
                      minHeight: '72px',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      backgroundColor: hecha ? 'var(--color-ok-bg)' : 'var(--color-surface)',
                      border: `1px solid ${hecha ? 'var(--color-ok)' : 'var(--color-border)'}`,
                      borderLeft: `4px solid ${hecha ? 'var(--color-ok)' : cat.color}`,
                      boxShadow: 'var(--shadow-card)',
                      cursor: 'pointer',
                    }}
                  >
                    {hecha ? (
                      <CheckCircle2 size={32} style={{ color: 'var(--color-ok)', flexShrink: 0 }} />
                    ) : (
                      <Circle size={32} style={{ color: 'var(--color-border)', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: 'var(--text-sm)', fontWeight: 600,
                        color: hecha ? 'var(--color-ok)' : 'var(--color-text-primary)',
                        lineHeight: '1.3', marginBottom: '4px',
                      }}>
                        {prueba.nombre}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 'var(--text-xs)', padding: '2px 8px',
                          borderRadius: 'var(--radius-full)', fontWeight: 600,
                          backgroundColor: cat.fondo, color: cat.color,
                        }}>
                          {prueba.categoria}
                        </span>
                        {prueba.obligatoria && (
                          <span style={{
                            fontSize: 'var(--text-xs)', padding: '2px 8px',
                            borderRadius: 'var(--radius-full)', fontWeight: 600,
                            backgroundColor: 'var(--color-checklist-bg)', color: 'var(--color-checklist)',
                          }}>
                            {t.tests.essential}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
