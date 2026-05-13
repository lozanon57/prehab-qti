import { Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export function SenalesAlarma() {
  const { t } = useLanguage()

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-gris-medio)' }}>
        {t.alarm.intro}
      </p>

      {(['rojo', 'amarillo', 'verde'] as const).map((nivel) => {
        const cfg = t.alarm.levels[nivel]
        const señales = t.alarm.signals[nivel]
        return (
          <div
            key={nivel}
            className="rounded-2xl p-4 mb-4 border-l-4"
            style={{
              backgroundColor: cfg.fondo,
              borderLeftColor: cfg.borde,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
            }}
          >
            <p className="font-bold text-sm mb-3" style={{ color: cfg.color }}>
              {cfg.emoji} {cfg.titulo}
            </p>
            <ul className="flex flex-col gap-2 mb-3">
              {señales.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span style={{ color: cfg.color, flexShrink: 0 }}>·</span>
                  <span style={{ color: 'var(--color-texto)' }}>{s}</span>
                </li>
              ))}
            </ul>
            {cfg.accion && (
              <div
                className="flex items-center gap-2 font-semibold text-sm"
                style={{ color: cfg.color }}
              >
                <Phone size={14} />
                {cfg.accion}
              </div>
            )}
          </div>
        )
      })}

      <div
        className="rounded-2xl p-4 text-sm text-center"
        style={{ backgroundColor: 'var(--color-gris-claro)', color: 'var(--color-gris-medio)' }}
      >
        {t.alarm.footer}
      </div>
    </div>
  )
}
