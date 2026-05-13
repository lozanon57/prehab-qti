import { useAppStore } from '../../store/appStore'
import { CheckCircle2, Circle, Calendar } from 'lucide-react'

interface Prueba {
  id: string
  categoria: string
  nombre: string
  semana: string
  obligatoria: boolean
}

const PRUEBAS_GENERALES: Prueba[] = [
  { id: 'analitica', categoria: 'Analítica', nombre: 'Analítica preoperatoria completa', semana: 'Semana −5', obligatoria: true },
  { id: 'ecg', categoria: 'Cardiología', nombre: 'ECG (>45 años)', semana: 'Semana −5', obligatoria: false },
  { id: 'rx-torax', categoria: 'Radiología', nombre: 'Radiografía de tórax', semana: 'Semana −4', obligatoria: false },
  { id: 'ecocardio', categoria: 'Cardiología', nombre: 'Ecocardiografía (si indicada)', semana: 'Semana −4', obligatoria: false },
  { id: 'consulta-anestesia', categoria: 'Anestesiología', nombre: 'Consulta preoperatoria de Anestesia', semana: 'Semana −4', obligatoria: true },
  { id: 'consulta-nutricion', categoria: 'Nutrición', nombre: 'Consulta de Dietética (si NRS ≥ 3)', semana: 'Semana −4', obligatoria: false },
  { id: 'consulta-cirugia', categoria: 'Cirugía', nombre: 'Consulta preoperatoria de Cirugía', semana: 'Semana −2', obligatoria: true },
  { id: 'consentimiento', categoria: 'Documentación', nombre: 'Consentimiento informado quirúrgico firmado', semana: 'Semana −2', obligatoria: true },
  { id: 'analitica-control', categoria: 'Analítica', nombre: 'Analítica de control (Hb, albúmina, glucosa)', semana: 'Semana −2', obligatoria: true },
  { id: 'tc-tele', categoria: 'Radiología', nombre: 'TC estadificación actualizada (≤6 semanas)', semana: 'Semana −6', obligatoria: true },
]

const CATEGORIAS_COLOR: Record<string, { color: string; fondo: string }> = {
  'Analítica': { color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  'Cardiología': { color: '#D94F3D', fondo: '#FDE8E8' },
  'Radiología': { color: '#7B5EA7', fondo: '#F0EBF9' },
  'Anestesiología': { color: 'var(--color-principal)', fondo: '#E8EDF3' },
  'Nutrición': { color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
  'Cirugía': { color: '#AA6B3D', fondo: '#F9F0EB' },
  'Documentación': { color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)' },
}

export function Pruebas() {
  const { progreso, toggleProgreso } = useAppStore()
  const completadas = PRUEBAS_GENERALES.filter((p) => progreso[`prueba-${p.id}`]).length
  const obligatoriasCompletadas = PRUEBAS_GENERALES
    .filter((p) => p.obligatoria && progreso[`prueba-${p.id}`]).length
  const totalObligatorias = PRUEBAS_GENERALES.filter((p) => p.obligatoria).length

  return (
    <div>
      {/* Resumen */}
      <div
        className="rounded-2xl p-4 mb-4 flex gap-4"
        style={{ backgroundColor: 'var(--color-principal)' }}
      >
        <div className="text-center flex-1">
          <p className="text-3xl font-extrabold text-white">{completadas}</p>
          <p className="text-white/60 text-xs">/ {PRUEBAS_GENERALES.length} completadas</p>
        </div>
        <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <div className="text-center flex-1">
          <p className="text-3xl font-extrabold text-white">{obligatoriasCompletadas}</p>
          <p className="text-white/60 text-xs">/ {totalObligatorias} obligatorias</p>
        </div>
      </div>

      <p className="text-xs mb-4" style={{ color: 'var(--color-gris-medio)' }}>
        Marca las pruebas conforme las vayas completando. Las marcadas como{' '}
        <strong>imprescindibles</strong> son necesarias antes de la cirugía.
      </p>

      {/* Lista de pruebas agrupadas por semana */}
      {['Semana −6', 'Semana −5', 'Semana −4', 'Semana −2'].map((semana) => {
        const pruebasSemana = PRUEBAS_GENERALES.filter((p) => p.semana === semana)
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
                const cat = CATEGORIAS_COLOR[prueba.categoria] ?? { color: 'var(--color-texto)', fondo: 'var(--color-gris-claro)' }
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
                            Imprescindible
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
