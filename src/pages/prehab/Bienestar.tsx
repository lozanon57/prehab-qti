import { useState } from 'react'
import { Brain, Heart, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const MOOD_EMOJIS = ['😔', '😕', '😐', '🙂', '😊']

export function Bienestar() {
  const { t } = useLanguage()
  const [tecnicaAbierta, setTecnicaAbierta] = useState<number | null>(null)
  const [fraseIdx] = useState(() => Math.floor(Math.random() * t.wellness.quotes.length))

  return (
    <div>
      {/* Frase de apoyo */}
      <div
        className="rounded-2xl p-5 mb-4 text-center"
        style={{ backgroundColor: '#F0EBF9' }}
      >
        <Brain size={28} className="mx-auto mb-2" style={{ color: '#7B5EA7' }} />
        <p className="text-sm font-medium italic leading-relaxed" style={{ color: '#4A3570' }}>
          "{t.wellness.quotes[fraseIdx]}"
        </p>
      </div>

      {/* Termómetro de bienestar */}
      <div
        className="rounded-2xl p-4 mb-4 border"
        style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}
      >
        <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-texto)' }}>
          {t.wellness.howAreYou}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-gris-medio)' }}>
          {t.wellness.moodNote}
        </p>
        <div className="flex gap-2 justify-between">
          {t.wellness.moods.map((label, idx) => (
            <button
              key={idx}
              className="flex-1 flex flex-col items-center py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--color-fondo)' }}
            >
              <span className="text-2xl">{MOOD_EMOJIS[idx]}</span>
              <span className="text-xs mt-1" style={{ color: 'var(--color-gris-medio)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Técnicas de relajación */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {t.wellness.relaxTitle}
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {t.wellness.techniques.map((tecnica, i) => (
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
              <span className="text-2xl flex-shrink-0">{tecnica.icono}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                  {tecnica.titulo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-gris-medio)' }}>
                  {tecnica.descripcion.substring(0, 60)}… · {tecnica.duracion}
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
                  {tecnica.descripcion}
                </p>
                <ol className="flex flex-col gap-2">
                  {tecnica.pasos.map((paso, pi) => (
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
          {t.wellness.contactTitle}
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--color-secundario)' }}>
          {t.wellness.contactDesc}
        </p>
        <div className="flex items-center gap-2 text-sm font-semibold"
             style={{ color: 'var(--color-principal)' }}>
          <Phone size={14} />
          {t.wellness.contactAction}
        </div>
      </div>
    </div>
  )
}
