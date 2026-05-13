import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const SECCIONES = [
  {
    titulo: '¿Qué es la prehabilitación?',
    icono: '💪',
    contenido: `La prehabilitación es un programa de preparación antes de la cirugía que incluye ejercicio físico, nutrición optimizada y apoyo psicológico. Su objetivo es llegar a la operación en el mejor estado posible para tolerarla mejor y recuperarte más rápido.

Estudios científicos demuestran que los pacientes que participan en un programa de prehabilitación tienen menos complicaciones, se recuperan antes y vuelven a casa más pronto.`,
  },
  {
    titulo: '¿Qué es el protocolo ERAS?',
    icono: '🏥',
    contenido: `ERAS significa "Recuperación Intensificada tras la Cirugía" (Enhanced Recovery After Surgery). Es un conjunto de medidas antes, durante y después de la cirugía que reducen el estrés del cuerpo y aceleran la recuperación.

Incluye: menos horas de ayuno, beber una bebida de carbohidratos antes de entrar a quirófano, anestesia específica, levantarse pronto de la cama, comer antes, y pocas sondas y sueros. Todo esto hace que te vayas a casa antes y con menos molestias.`,
  },
  {
    titulo: '¿Por qué ejercicio antes de operar?',
    icono: '🏃',
    contenido: `El ejercicio mejora tu capacidad cardiorrespiratoria, fortalece los músculos y reduce la inflamación. Cuando el cuerpo está entrenado, tolera mejor el estrés de la anestesia y la cirugía, y se recupera más rápido.

No se trata de ponerse en forma para competir, sino de "ponerse a punto" para una cirugía importante. Incluso 3-4 semanas de ejercicio moderado marcan una diferencia real.`,
  },
  {
    titulo: '¿Por qué tanta proteína?',
    icono: '🥩',
    contenido: `Las proteínas son el "material de construcción" del cuerpo. Las necesitas para reparar tejidos, mantener los músculos y responder bien a la cirugía. Cuando comemos poco proteína, los músculos se "consumen" para alimentar el proceso de recuperación.

El objetivo es tomar entre 1,2 y 1,5 g de proteína por kilo de peso al día. Esto se puede conseguir con alimentos normales, pero a veces se necesitan suplementos proteicos (batidos).`,
  },
  {
    titulo: 'El Instituto Quénet-Torrent',
    icono: '🏛️',
    contenido: `El Instituto Quénet-Torrent es un centro de referencia en cirugía oncológica y colorrectal. El Servicio de Cirugía Oncológica y Colorrectal está liderado por el Dr. Pablo Lozano Lominchar y cuenta con un equipo multidisciplinar (anestesiología, nutrición, fisioterapia, psicooncología y enfermería especializada) dedicado a ofrecer la mejor atención perioperatoria.

Todos los protocolos de este programa están basados en las guías internacionales ERAS® y en la evidencia científica publicada.`,
  },
]

export function Informacion() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-fondo)' }}>
      <header style={{ backgroundColor: 'var(--color-principal)' }} className="shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-white/80 hover:text-white mb-2 transition-colors text-sm"
          >
            <ChevronLeft size={18} /> Volver
          </button>
          <h1 className="text-white text-xl font-bold">Información</h1>
          <p className="text-white/60 text-sm">ERAS, prehabilitación y más</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5">
        <div className="flex flex-col gap-4">
          {SECCIONES.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: 'var(--color-blanco)',
                borderColor: 'var(--color-gris-claro)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{s.icono}</span>
                <h2 className="font-bold text-base" style={{ color: 'var(--color-principal)' }}>
                  {s.titulo}
                </h2>
              </div>
              {s.contenido.split('\n\n').map((parrafo, j) => (
                <p key={j} className="text-sm leading-relaxed mb-2 last:mb-0" style={{ color: 'var(--color-texto)' }}>
                  {parrafo}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-4 mt-4 text-center"
          style={{ backgroundColor: 'var(--color-gris-claro)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
            Instituto Quénet-Torrent · Servicio de Cirugía Oncológica y Colorrectal
            <br />
            Dr. Pablo Lozano Lominchar · v1.0 · Mayo 2026
          </p>
        </div>
      </main>
    </div>
  )
}
