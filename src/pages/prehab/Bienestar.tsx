import { useState } from 'react'
import { Brain, Heart, Phone } from 'lucide-react'

interface Tecnica {
  titulo: string
  descripcion: string
  pasos: string[]
  duracion: string
  icono: string
}

const TECNICAS: Tecnica[] = [
  {
    titulo: 'Respiración 4-7-8',
    descripcion: 'Técnica de relajación rápida para calmar el sistema nervioso en momentos de ansiedad.',
    duracion: '5 min',
    icono: '🌬️',
    pasos: [
      'Siéntate cómodamente y cierra los ojos.',
      'Inhala lentamente durante 4 segundos.',
      'Mantén el aire durante 7 segundos.',
      'Exhala completamente durante 8 segundos.',
      'Repite 4 veces. Con práctica, nota cómo se ralentiza tu ritmo cardíaco.',
    ],
  },
  {
    titulo: 'Técnica 5-4-3-2-1 (Grounding)',
    descripcion: 'Ancla tu mente al presente cuando los pensamientos negativos aparecen.',
    duracion: '3 min',
    icono: '🧘',
    pasos: [
      'Nombra en voz alta (o mentalmente) 5 cosas que ves a tu alrededor.',
      'Nombra 4 cosas que puedes tocar.',
      'Nombra 3 cosas que escuchas ahora mismo.',
      'Nombra 2 cosas que hueles.',
      'Nombra 1 cosa que saboreas. Tu mente vuelve al presente.',
    ],
  },
  {
    titulo: 'Relajación muscular progresiva',
    descripcion: 'Tensiona y suelta grupos musculares para liberar tensión física y mental.',
    duracion: '15 min',
    icono: '💆',
    pasos: [
      'Túmbate cómodamente. Cierra los ojos.',
      'Tensa los pies con fuerza durante 5 segundos. Suelta y nota la diferencia.',
      'Sube por piernas, abdomen, manos, brazos, hombros y cara.',
      'Con cada zona, mantén 5 segundos la tensión y luego 10 de relajación.',
      'Al terminar, permanece quieto 2 minutos respirando suave.',
    ],
  },
]

const FRASES_APOYO = [
  'La prehabilitación es la mejor inversión que puedes hacer en tu salud antes de la cirugía.',
  'Sentir miedo es normal. No significa que no puedas hacerlo.',
  'Cada pequeño paso que das hoy mejora tus posibilidades de recuperación.',
  'Tu equipo médico está contigo en cada etapa de este camino.',
]

export function Bienestar() {
  const [tecnicaAbierta, setTecnicaAbierta] = useState<number | null>(null)
  const [fraseIdx] = useState(() => Math.floor(Math.random() * FRASES_APOYO.length))

  return (
    <div>
      {/* Frase de apoyo */}
      <div
        className="rounded-2xl p-5 mb-4 text-center"
        style={{ backgroundColor: '#F0EBF9' }}
      >
        <Brain size={28} className="mx-auto mb-2" style={{ color: '#7B5EA7' }} />
        <p className="text-sm font-medium italic leading-relaxed" style={{ color: '#4A3570' }}>
          "{FRASES_APOYO[fraseIdx]}"
        </p>
      </div>

      {/* Termómetro de bienestar */}
      <div
        className="rounded-2xl p-4 mb-4 border"
        style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}
      >
        <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-texto)' }}>
          ¿Cómo me siento hoy?
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-gris-medio)' }}>
          Es normal que varíe. Si llevas varios días con puntuación baja, habla con tu equipo.
        </p>
        <div className="flex gap-2 justify-between">
          {[
            { valor: 1, emoji: '😔', label: 'Mal' },
            { valor: 2, emoji: '😕', label: 'Regular' },
            { valor: 3, emoji: '😐', label: 'Neutro' },
            { valor: 4, emoji: '🙂', label: 'Bien' },
            { valor: 5, emoji: '😊', label: 'Muy bien' },
          ].map(({ valor, emoji, label }) => (
            <button
              key={valor}
              className="flex-1 flex flex-col items-center py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--color-fondo)' }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs mt-1" style={{ color: 'var(--color-gris-medio)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Técnicas de relajación */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Técnicas de relajación
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {TECNICAS.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: 'var(--color-blanco)',
              borderColor: tecnicaAbierta === i ? '#7B5EA7' : 'var(--color-gris-claro)',
            }}
          >
            <button
              className="w-full p-4 text-left flex items-center gap-3"
              onClick={() => setTecnicaAbierta(tecnicaAbierta === i ? null : i)}
            >
              <span className="text-2xl flex-shrink-0">{t.icono}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                  {t.titulo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-gris-medio)' }}>
                  {t.descripcion.substring(0, 60)}… · {t.duracion}
                </p>
              </div>
              <span style={{ color: 'var(--color-gris-medio)' }}>
                {tecnicaAbierta === i ? '▲' : '▼'}
              </span>
            </button>

            {tecnicaAbierta === i && (
              <div
                className="px-4 pb-4 border-t"
                style={{ borderColor: 'var(--color-gris-claro)' }}
              >
                <p className="text-sm my-3" style={{ color: 'var(--color-texto)' }}>
                  {t.descripcion}
                </p>
                <ol className="flex flex-col gap-2">
                  {t.pasos.map((paso, pi) => (
                    <li key={pi} className="flex gap-3 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#F0EBF9', color: '#7B5EA7' }}
                      >
                        {pi + 1}
                      </span>
                      <span style={{ color: 'var(--color-texto)' }}>{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contacto de apoyo */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--color-azul-claro)' }}
      >
        <p className="font-bold text-sm mb-2 flex items-center gap-2"
           style={{ color: 'var(--color-principal)' }}>
          <Heart size={16} />
          ¿Necesitas hablar con alguien?
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--color-secundario)' }}>
          Si el miedo o la ansiedad te superan, el Servicio de Psicooncología del Instituto está
          disponible para apoyarte.
        </p>
        <div className="flex items-center gap-2 text-sm font-semibold"
             style={{ color: 'var(--color-principal)' }}>
          <Phone size={14} />
          Solicita cita a través de tu equipo médico
        </div>
      </div>
    </div>
  )
}
