import { useLanguage } from '../../i18n/LanguageContext'

export function SenalesAlarma() {
  const { t } = useLanguage()

  return (
    <div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
        {t.alarm.intro}
      </p>

      {(['rojo', 'amarillo', 'verde'] as const).map((nivel) => {
        const cfg = t.alarm.levels[nivel]
        const signals = t.alarm.signals[nivel]
        return (
          <div
            key={nivel}
            style={{
              backgroundColor: cfg.fondo,
              borderRadius: 'var(--radius-lg)',
              borderLeft: `6px solid ${cfg.borde}`,
              padding: '20px',
              marginBottom: '16px',
            }}
          >
            {/* Header */}
            <p style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: cfg.color,
              marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span>{cfg.emoji}</span> {cfg.titulo}
            </p>

            {/* Signals list — each item min 48px */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: cfg.accion ? '16px' : 0 }}>
              {signals.map((s, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '12px',
                  fontSize: 'var(--text-base)', color: 'var(--color-text-primary)',
                  minHeight: '48px', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < signals.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}>
                  <span style={{ color: cfg.color, fontSize: '18px', flexShrink: 0, fontWeight: 700 }}>·</span>
                  {s}
                </li>
              ))}
            </ul>

            {/* CTA button for red and amber */}
            {cfg.accion && (
              <a
                href={nivel === 'rojo' ? 'tel:112' : 'tel:+34660659276'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', height: '64px',
                  backgroundColor: cfg.color, color: 'white',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)', fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                📞 {cfg.accion}
              </a>
            )}
          </div>
        )
      })}

      <div style={{
        borderRadius: 'var(--radius-md)', padding: '16px 20px',
        textAlign: 'center',
        backgroundColor: 'var(--color-surface-2)',
      }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
          {t.alarm.footer}
        </p>
      </div>
    </div>
  )
}
