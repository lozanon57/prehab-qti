export type PatologiaCode = 'CRC' | 'CP' | 'CAP' | 'CG' | 'MH' | 'SRP'
export type Fase = 'prehab' | 'recuperacion'
export type NivelActividad = 'baja' | 'moderada' | 'alta'

export interface Patologia {
  code: PatologiaCode
  nombre: string
  nombreCompleto: string
  nombreEn?: string
  nombreCompletoEn?: string
  icono: string
  descripcion: string
  descripcionEn?: string
  color: string
  colorClaro: string
}

export interface AppState {
  patologiaSeleccionada: PatologiaCode | null
  fase: Fase | null
  fechaCirugia: string | null
  progreso: Record<string, boolean>
  nivelActividad: NivelActividad | null
  setPatologia: (p: PatologiaCode) => void
  setFase: (f: Fase) => void
  setFechaCirugia: (fecha: string) => void
  toggleProgreso: (key: string) => void
  setNivelActividad: (nivel: NivelActividad) => void
}

export interface EjercicioDia {
  dia: string
  tipo: 'aerobico' | 'fuerza' | 'respiratorio' | 'descanso'
  duracion: string
  descripcion: string
  descripcionEn?: string
  intensidad: number
}

export interface EquivalenciaAlimentaria {
  alimento: string
  cantidad: string
  proteinas: number
  emoji: string
}
