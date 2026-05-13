import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, PatologiaCode, Fase, NivelActividad } from '../types'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      patologiaSeleccionada: null,
      fase: null,
      fechaCirugia: null,
      progreso: {},
      nivelActividad: null,

      setPatologia: (p: PatologiaCode) => set({ patologiaSeleccionada: p }),
      setFase: (f: Fase) => set({ fase: f }),
      setFechaCirugia: (fecha: string) => set({ fechaCirugia: fecha }),
      toggleProgreso: (key: string) =>
        set((state) => ({
          progreso: { ...state.progreso, [key]: !state.progreso[key] },
        })),
      setNivelActividad: (nivel: NivelActividad) => set({ nivelActividad: nivel }),
    }),
    { name: 'prehab-iq-store' }
  )
)
