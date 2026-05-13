import { useState } from 'react'
import { Info } from 'lucide-react'
import { EQUIVALENCIAS, CONSEJO_NUTRICIONAL, calcularProteinas } from '../../data/nutricion'
import { useLanguage } from '../../i18n/LanguageContext'

export function Nutricion() {
  const [peso, setPeso] = useState<string>('')
  const { t } = useLanguage()
  const pn = peso ? calcularProteinas(Number(peso)) : null

  const proteinLabels = [
    { label: t.nutrition.minimum, valor: pn?.minimo, subtxt: '1.2 g/kg' },
    { label: t.nutrition.target, valor: pn?.objetivo, subtxt: '1.5 g/kg' },
    { label: t.nutrition.maximum, valor: pn?.maximo, subtxt: '2.0 g/kg' },
  ]

  return (
    <div>
      {/* Calculadora */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{ backgroundColor: 'var(--color-principal)' }}
      >
        <p className="text-white/70 text-xs mb-1 font-medium uppercase tracking-wide">
          {t.nutrition.calculatorLabel}
        </p>
        <h2 className="text-white text-lg font-bold mb-3">
          {t.nutrition.calculatorTitle}
        </h2>
        <div className="flex gap-3 items-center mb-4">
          <input
            type="number"
            min={30}
            max={200}
            placeholder={t.nutrition.weightPlaceholder}
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
          />
          <span className="text-white/60 text-sm">kg</span>
        </div>

        {pn && (
          <div className="grid grid-cols-3 gap-2">
            {proteinLabels.map(({ label, valor, subtxt }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor:
                    label === t.nutrition.target ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                }}
              >
                <p className="text-white/60 text-xs">{label}</p>
                <p className="text-white text-2xl font-extrabold leading-none my-1">{valor}</p>
                <p className="text-white/50 text-xs">g/día · {subtxt}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consejos nutricionales */}
      <div
        className="rounded-2xl p-4 mb-4 flex gap-3"
        style={{ backgroundColor: 'var(--color-verde-claro)' }}
      >
        <Info size={18} style={{ color: 'var(--color-acento)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-acento)' }}>
            {t.nutrition.howToReach}
          </p>
          <ul className="flex flex-col gap-1.5">
            {CONSEJO_NUTRICIONAL.map((c, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--color-texto)' }}>
                <span style={{ color: 'var(--color-acento)' }}>·</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Equivalencias */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {pn
          ? `${t.nutrition.quantityPre} ${pn.objetivo} ${t.nutrition.quantityOf}?`
          : t.nutrition.quantityDefault}
      </h2>
      <div className="flex flex-col gap-2 mb-6">
        {EQUIVALENCIAS.map((eq) => {
          const porcentaje = pn ? Math.round((eq.proteinas / pn.objetivo) * 100) : 0
          return (
            <div
              key={eq.alimento}
              className="rounded-2xl p-4 border flex items-center gap-3"
              style={{
                backgroundColor: 'var(--color-blanco)',
                borderColor: 'var(--color-gris-claro)',
              }}
            >
              <span className="text-2xl flex-shrink-0">{eq.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                    {eq.alimento}
                  </p>
                  <p className="font-bold text-sm" style={{ color: 'var(--color-secundario)' }}>
                    {eq.proteinas} g
                  </p>
                </div>
                <p className="text-xs mb-1.5" style={{ color: 'var(--color-gris-medio)' }}>
                  {eq.cantidad}
                </p>
                {pn && (
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-gris-claro)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, porcentaje)}%`,
                          backgroundColor: 'var(--color-acento)',
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-acento)' }}>
                      {porcentaje}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Ayuno ERAS */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: 'var(--color-ambar-claro)', borderColor: 'var(--color-alerta)' }}
      >
        <p className="font-bold text-sm mb-3" style={{ color: 'var(--color-alerta)' }}>
          {t.nutrition.fastingTitle}
        </p>
        <div className="flex flex-col gap-2">
          {t.nutrition.fastingItems.map((item) => (
            <div key={item.time} className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-semibold text-xs" style={{ color: item.ok ? 'var(--color-acento)' : 'var(--color-rojo-alerta)' }}>
                  {item.time}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-texto)' }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
