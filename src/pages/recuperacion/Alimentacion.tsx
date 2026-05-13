import { useParams } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

interface FaseAlimentacion {
  titulo: string
  periodo: string
  alimentos: string[]
  evitar: string[]
  color: string
  fondo: string
}

const FASES_CRC: FaseAlimentacion[] = [
  { titulo: 'Líquidos claros', periodo: 'Primeras 4–6 horas', alimentos: ['Agua', 'Infusiones suaves', 'Caldo desgrasado', 'Zumo sin pulpa'], evitar: ['Leche', 'Fibra', 'Grasas'], color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  { titulo: 'Dieta blanda', periodo: 'Días 1–3', alimentos: ['Puré de verduras', 'Yogur natural', 'Arroz cocido', 'Pescado blanco al vapor', 'Pan de molde'], evitar: ['Legumbres', 'Col, brócoli (gases)', 'Fritos', 'Picante'], color: '#7B5EA7', fondo: '#F0EBF9' },
  { titulo: 'Dieta normal progresiva', periodo: 'A partir del día 3–4', alimentos: ['Todo lo que toleres bien', 'Frutas cocidas o sin piel', 'Carnes magras', 'Huevos'], evitar: ['Alimentos muy flatulentos los primeros días', 'Alcohol', 'Bebidas con gas'], color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
]

const FASES_CG: FaseAlimentacion[] = [
  { titulo: 'Líquidos fríos', periodo: 'Primeras 4–6 horas', alimentos: ['Agua fría o templada (no caliente)', 'Infusiones frías', 'Caldo frío'], evitar: ['Bebidas calientes', 'Lácteos', 'Jugos con azúcar'], color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  { titulo: '6 tomas pequeñas al día', periodo: 'Días 1–5 y en adelante', alimentos: ['Puré suave', 'Yogur desnatado', 'Clara de huevo', 'Pescado blanco'], evitar: ['Azúcares simples (riesgo dumping)', 'Bebidas con las comidas', 'Raciones grandes'], color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
]

const FASES_MAP: Record<string, FaseAlimentacion[]> = { CRC: FASES_CRC, CG: FASES_CG, CAP: FASES_CRC, MH: FASES_CRC, SRP: FASES_CRC, CP: FASES_CRC }

const FASES_CRC_EN: FaseAlimentacion[] = [
  { titulo: 'Clear fluids', periodo: 'First 4–6 hours', alimentos: ['Water', 'Mild herbal teas', 'Skimmed broth', 'Pulp-free juice'], evitar: ['Milk', 'Fibre', 'Fats'], color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  { titulo: 'Soft diet', periodo: 'Days 1–3', alimentos: ['Vegetable purée', 'Natural yoghurt', 'Boiled rice', 'Steamed white fish', 'Sliced white bread'], evitar: ['Pulses', 'Cabbage, broccoli (gas)', 'Fried food', 'Spicy food'], color: '#7B5EA7', fondo: '#F0EBF9' },
  { titulo: 'Progressive normal diet', periodo: 'From day 3–4', alimentos: ['Anything you tolerate well', 'Peeled or cooked fruit', 'Lean meats', 'Eggs'], evitar: ['Very flatulent foods in the first days', 'Alcohol', 'Fizzy drinks'], color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
]

const FASES_CG_EN: FaseAlimentacion[] = [
  { titulo: 'Cold fluids', periodo: 'First 4–6 hours', alimentos: ['Cold or lukewarm water (not hot)', 'Cold herbal teas', 'Cold broth'], evitar: ['Hot drinks', 'Dairy', 'Sugary juices'], color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)' },
  { titulo: '6 small meals a day', periodo: 'Days 1–5 onwards', alimentos: ['Smooth purée', 'Low-fat yoghurt', 'Egg white', 'White fish'], evitar: ['Simple sugars (dumping risk)', 'Drinks with meals', 'Large portions'], color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)' },
]

const FASES_MAP_EN: Record<string, FaseAlimentacion[]> = { CRC: FASES_CRC_EN, CG: FASES_CG_EN, CAP: FASES_CRC_EN, MH: FASES_CRC_EN, SRP: FASES_CRC_EN, CP: FASES_CRC_EN }

export function Alimentacion() {
  const { patologia } = useParams<{ patologia: string }>()
  const { lang, t } = useLanguage()
  const esCG = patologia === 'CG'

  const fases = lang === 'en'
    ? (patologia ? FASES_MAP_EN[patologia] ?? FASES_CRC_EN : FASES_CRC_EN)
    : (patologia ? FASES_MAP[patologia] ?? FASES_CRC : FASES_CRC)

  const introText = esCG ? t.postNutrition.introCG : t.postNutrition.introDefault

  return (
    <div>
      {/* Intro banner */}
      <div style={{
        borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '20px',
        backgroundColor: 'var(--color-recovery-bg)',
        borderLeft: '4px solid var(--color-recovery)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-recovery)', marginBottom: '4px' }}>
          {lang === 'en' ? 'Nutrition after surgery' : 'Alimentación tras la cirugía'}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
          {introText}
        </p>
      </div>

      {fases.map((fase, i) => (
        <div key={i} style={{
          borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '12px',
          backgroundColor: fase.fondo,
        }}>
          <div className="label-caps" style={{ color: fase.color, marginBottom: '4px' }}>
            {fase.periodo}
          </div>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            {fase.titulo}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ok)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t.postNutrition.canTake}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {fase.alimentos.map((a, j) => (
                  <li key={j} style={{ display: 'flex', gap: '6px', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', minHeight: '44px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-ok)', flexShrink: 0, fontWeight: 700 }}>·</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-alert)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t.postNutrition.avoid}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {fase.evitar.map((e, j) => (
                  <li key={j} style={{ display: 'flex', gap: '6px', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', minHeight: '44px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-alert)', flexShrink: 0, fontWeight: 700 }}>·</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Suplementos */}
      <div style={{
        borderRadius: 'var(--radius-md)', padding: '20px', marginTop: '8px',
        backgroundColor: 'var(--color-ok-bg)',
        borderLeft: '4px solid var(--color-ok)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-ok)', marginBottom: '8px' }}>
          {t.postNutrition.supplementsTitle}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
          {t.postNutrition.supplementsDesc}
        </p>
      </div>
    </div>
  )
}
