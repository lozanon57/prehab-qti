import type { Patologia } from '../types'

export const PATOLOGIAS: Patologia[] = [
  {
    code: 'CRC',
    nombre: 'Cáncer colorrectal',
    nombreCompleto: 'Cáncer de colon y recto',
    icono: '🫁',
    descripcion: 'Hemicolectomía · Resección anterior · Amputación abdominoperineal',
    color: '#2E6DA4',
    colorClaro: '#EBF2F9',
  },
  {
    code: 'CP',
    nombre: 'Carcinomatosis peritoneal',
    nombreCompleto: 'Carcinomatosis peritoneal + HIPEC',
    icono: '🩺',
    descripcion: 'CRS + HIPEC · PIPAC',
    color: '#1B3F6B',
    colorClaro: '#E8EDF3',
  },
  {
    code: 'SRP',
    nombre: 'Sarcoma retroperitoneal',
    nombreCompleto: 'Sarcoma retroperitoneal primario',
    icono: '🔬',
    descripcion: 'Resección multivisceral retroperitoneal',
    color: '#6B3DAA',
    colorClaro: '#F0EBF9',
  },
  {
    code: 'CAP',
    nombre: 'Cáncer de páncreas',
    nombreCompleto: 'Cáncer de páncreas',
    icono: '🫀',
    descripcion: 'Duodenopancreatectomía (Whipple) · Pancreatectomía distal',
    color: '#AA6B3D',
    colorClaro: '#F9F0EB',
  },
  {
    code: 'CG',
    nombre: 'Cáncer gástrico',
    nombreCompleto: 'Cáncer gástrico',
    icono: '🫃',
    descripcion: 'Gastrectomía total / subtotal + linfadenectomía D2',
    color: '#3DAA6E',
    colorClaro: '#E8F6EF',
  },
  {
    code: 'MH',
    nombre: 'Metástasis hepáticas',
    nombreCompleto: 'Metástasis hepáticas',
    icono: '🏥',
    descripcion: 'Hepatectomía mayor / menor · Ablación',
    color: '#AA3D6E',
    colorClaro: '#F9EBF1',
  },
]

export const getPatologia = (code: string): Patologia | undefined =>
  PATOLOGIAS.find((p) => p.code === code)
