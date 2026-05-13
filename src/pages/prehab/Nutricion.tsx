import { useState } from 'react'
import { EQUIVALENCIAS, CONSEJO_NUTRICIONAL, calcularProteinas } from '../../data/nutricion'
import { useLanguage } from '../../i18n/LanguageContext'

export function Nutricion() {
  const [peso, setPeso] = useState<string>('')
  const { t } = useLanguage()
  const pn = peso ? calcularProteinas(Number(peso)) : null

  return (
    <div>
      {/* HERO CARD — protein calculator */}
      <div style={{
        backgroundColor: 'var(--color-nutrition-bg)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 20px',
        marginBottom: '24px',
      }}>
        <div className="label-caps" style={{ color: 'var(--color-nutrition)', marginBottom: '16px' }}>
          {t.nutrition.calculatorLabel}
        </div>

        {/* Weight input — large, center-aligned */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <input
            type="number"
            inputMode="decimal"
            min={30}
            max={200}
            placeholder="70"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            style={{
              flex: 1,
              fontFamily: 'var(--font-display)',
              fontSize: '56px',
              fontWeight: 600,
              color: 'var(--color-nutrition)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid var(--color-nutrition)',
              outline: 'none',
              textAlign: 'center',
              padding: '8px 0',
              lineHeight: 1.2,
            }}
          />
          <span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>kg</span>
        </div>

        {/* Results: 3 columns */}
        {pn && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: t.nutrition.minimum, value: pn.minimo, sub: '1.2 g/kg', highlight: false },
              { label: t.nutrition.target, value: pn.objetivo, sub: '1.5 g/kg', highlight: true },
              { label: t.nutrition.maximum, value: pn.maximo, sub: '2.0 g/kg', highlight: false },
            ].map(({ label, value, sub, highlight }) => (
              <div key={label} style={{
                backgroundColor: highlight ? 'var(--color-nutrition)' : 'rgba(255,255,255,0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 10px',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 'var(--text-xs)', color: highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: highlight ? 'white' : 'var(--color-nutrition)',
                  lineHeight: 1.1,
                  margin: '4px 0',
                }}>
                  {value}
                </p>
                <p style={{ fontSize: '11px', color: highlight ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)' }}>
                  g/día · {sub}
                </p>
              </div>
            ))}
          </div>
        )}

        {!pn && (
          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', padding: '8px 0' }}>
            {t.nutrition.weightPlaceholder}
          </p>
        )}
      </div>

      {/* Consejos nutricionales */}
      <div style={{
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        marginBottom: '24px',
        backgroundColor: 'var(--color-ok-bg)',
        borderLeft: '4px solid var(--color-ok)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-ok)', marginBottom: '12px' }}>
          {t.nutrition.howToReach}
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {CONSEJO_NUTRICIONAL.map((c, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
              <span style={{ color: 'var(--color-ok)', flexShrink: 0, fontWeight: 700 }}>·</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Equivalencias */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {pn
          ? `${t.nutrition.quantityPre} ${pn.objetivo} ${t.nutrition.quantityOf}?`
          : t.nutrition.quantityDefault}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
        {EQUIVALENCIAS.map((eq) => {
          const porcentaje = pn ? Math.round((eq.proteinas / pn.objetivo) * 100) : 0
          return (
            <div
              key={eq.alimento}
              style={{
                borderRadius: 'var(--radius-md)',
                padding: '16px 14px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
                minHeight: '64px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '24px' }}>{eq.emoji}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-nutrition)' }}>
                  {eq.proteinas}g
                </span>
              </div>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.3' }}>
                {eq.alimento}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{eq.cantidad}</p>
              {pn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: `${Math.min(100, porcentaje)}%`,
                      backgroundColor: 'var(--color-nutrition)',
                      transition: 'width 400ms ease-out',
                    }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-nutrition)', flexShrink: 0 }}>
                    {porcentaje}%
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Ayuno ERAS */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        backgroundColor: 'var(--color-warn-bg)',
        borderLeft: '4px solid var(--color-warn)',
        marginBottom: '8px',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-warn)', marginBottom: '16px' }}>
          {t.nutrition.fastingTitle}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {t.nutrition.fastingItems.map((item) => (
            <div key={item.time} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', minHeight: '48px' }}>
              <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
              <div>
                <p style={{
                  fontWeight: 700,
                  fontSize: 'var(--text-xs)',
                  color: item.ok ? 'var(--color-ok)' : 'var(--color-alert)',
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {item.time}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
