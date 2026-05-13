import { useAppStore } from '../../store/appStore'
import { useLanguage } from '../../i18n/LanguageContext'
import { CheckCircle2, Circle, Calendar } from 'lucide-react'

const CAT_COLOR_BY_ID: Record<string, { color: string; fondo: string }> = {
  analitica: { color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  ecg: { color: '#D94F3D', fondo: '#FDE8E8' },
  'rx-torax': { color: '#7B5EA7', fondo: '#F0EBF9' },
  ecocardio: { color: '#D94F3D', fondo: '#FDE8E8' },
  'consulta-anestesia': { color: 'var(--color-principal)', fondo: '#E8EDF3' },
  'consulta-nutricion': { color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
  'consulta-cirugia': { color: '#AA6B3D', fondo: '#F9F0EB' },
  consentimiento: { color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)' },
  'analitica-control': { color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  'tc-tele': { color: '#7B5EA7', fondo: '#F0EBF9' },
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
      <div
        className="rounded-2xl p-4 mb-4 flex gap-4"
        style={{ backgroundColor: 'var(--color-principal)' }}
      >
        <div className="text-center flex-1">
          <p className="text-3xl font-extrabold text-white">{completadas}</p>
          <p className="text-white/60 text-xs">/ {tests.length} {t.tests.completedOf}</p>
        </div>
        <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <div className="text-center flex-1">
          <p className="text-3xl font-extrabold text-white">{obligatoriasCompletadas}</p>
          <p className="text-white/60 text-xs">/ {totalObligatorias} {t.tests.mandatoryOf}</p>
        </div>
      </div>

      <p className="text-xs mb-4" style={{ color: 'var(--color-gris-medio)' }}>
        {t.tests.note}
      </p>

      {/* Lista de pruebas agrupadas por semana */}
      {t.tests.weeks.map((semana) => {
        const pruebasSemana = tests.filter((p) => p.semana === semana)
        if (!pruebasSemana.length) return null
        return (
          <div key={semana} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} style={{ color: 'var(--color-gris-medio)' }} />
              <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-gris-medio)' }}>
                {semana}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {pruebasSemana.map((prueba) => {
                const hecha = !!progreso[`prueba-${prueba.id}`]
                const cat = CAT_COLOR_BY_ID[prueba.id] ?? { color: 'var(--color-texto)', fondo: 'var(--color-gris-claro)' }
                return (
                  <button
                    key={prueba.id}
                    onClick={() => toggleProgreso(`prueba-${prueba.id}`)}
                    className="w-full text-left rounded-2xl p-3 border flex items-center gap-3 transition-all"
                    style={{
                      backgroundColor: hecha ? 'var(--color-verde-claro)' : 'var(--color-blanco)',
                      borderColor: hecha ? 'var(--color-acento)' : 'var(--color-gris-claro)',
                    }}
                  >
                    {hecha ? (
                      <CheckCircle2 size={20} style={{ color: 'var(--color-acento)', flexShrink: 0 }} />
                    ) : (
                      <Circle size={20} style={{ color: 'var(--color-gris-claro)', flexShrink: 0 }} />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: hecha ? 'var(--color-acento)' : 'var(--color-texto)' }}>
                        {prueba.nombre}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: cat.fondo, color: cat.color }}
                        >
                          {prueba.categoria}
                        </span>
                        {prueba.obligatoria && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: 'var(--color-ambar-claro)', color: 'var(--color-alerta)' }}
                          >
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
