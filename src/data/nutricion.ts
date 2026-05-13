import type { EquivalenciaAlimentaria } from '../types'

export const EQUIVALENCIAS: EquivalenciaAlimentaria[] = [
  { alimento: 'Pechuga de pollo', cantidad: '100 g', proteinas: 31, emoji: '🍗' },
  { alimento: 'Atún en lata', cantidad: '1 lata (80 g)', proteinas: 22, emoji: '🐟' },
  { alimento: 'Huevos', cantidad: '2 unidades', proteinas: 13, emoji: '🥚' },
  { alimento: 'Yogur griego', cantidad: '200 g', proteinas: 20, emoji: '🥛' },
  { alimento: 'Legumbres cocidas', cantidad: '150 g', proteinas: 15, emoji: '🫘' },
  { alimento: 'Requesón / queso fresco', cantidad: '150 g', proteinas: 18, emoji: '🧀' },
  { alimento: 'Tofu firme', cantidad: '150 g', proteinas: 18, emoji: '🌱' },
  { alimento: 'Salmón', cantidad: '100 g', proteinas: 25, emoji: '🐠' },
  { alimento: 'Ternera magra', cantidad: '100 g', proteinas: 26, emoji: '🥩' },
  { alimento: 'Suplemento proteico', cantidad: '1 batido (30 g polvo)', proteinas: 24, emoji: '🥤' },
]

export const calcularProteinas = (peso: number): { objetivo: number; minimo: number; maximo: number } => ({
  objetivo: Math.round(peso * 1.5),
  minimo: Math.round(peso * 1.2),
  maximo: Math.round(peso * 2.0),
})

export const CONSEJO_NUTRICIONAL = [
  'Distribuye las proteínas en 5-6 comidas a lo largo del día.',
  'Toma un batido o yogur griego después del ejercicio.',
  'Si tienes poco apetito, empieza por los alimentos proteicos antes de los hidratos.',
  'Combina fuentes animales y vegetales para mayor variedad.',
  'Los suplementos de proteína de suero (whey) son una ayuda práctica si no llegas al objetivo.',
]
