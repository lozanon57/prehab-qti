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

// EN versions
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
      <div
        className="rounded-2xl p-4 mb-4 text-sm"
        style={{ backgroundColor: 'var(--color-azul-claro)', color: 'var(--color-principal)' }}
      >
        <p className="font-semibold mb-1">{lang === 'en' ? 'Nutrition after surgery' : 'Alimentación tras la cirugía'}</p>
        <p>{introText}</p>
      </div>

      {fases.map((fase, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 mb-3"
          style={{ backgroundColor: fase.fondo }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: fase.color }}>
            {fase.periodo}
          </p>
          <p className="font-semibold text-sm mb-3" style={{ color: 'var(--color-texto)' }}>
            {fase.titulo}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-acento)' }}>
                {t.postNutrition.canTake}
              </p>
              <ul className="flex flex-col gap-1">
                {fase.alimentos.map((a, j) => (
                  <li key={j} className="text-sm" style={{ color: 'var(--color-texto)' }}>
                    · {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-rojo-alerta)' }}>
                {t.postNutrition.avoid}
              </p>
              <ul className="flex flex-col gap-1">
                {fase.evitar.map((e, j) => (
                  <li key={j} className="text-sm" style={{ color: 'var(--color-texto)' }}>
                    · {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <div
        className="rounded-2xl p-4 mt-2"
        style={{ backgroundColor: 'var(--color-verde-claro)' }}
      >
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-acento)' }}>
          {t.postNutrition.supplementsTitle}
        </p>
        <p className="text-sm" style={{ color: 'var(--color-texto)' }}>
          {t.postNutrition.supplementsDesc}
        </p>
      </div>
    </div>
  )
}
