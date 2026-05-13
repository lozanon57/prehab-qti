import { Phone } from 'lucide-react'

interface SeñalAlarma {
  sintoma: string
  nivel: 'rojo' | 'amarillo' | 'verde'
}

const SEÑALES: SeñalAlarma[] = [
  { nivel: 'rojo', sintoma: 'Fiebre mayor de 38,5°C que no cede con antitérmicos' },
  { nivel: 'rojo', sintoma: 'Dolor abdominal muy intenso y que va aumentando' },
  { nivel: 'rojo', sintoma: 'La herida se abre y sale líquido con mal olor' },
  { nivel: 'rojo', sintoma: 'Vómitos continuos, no puedes tomar nada en más de 24 horas' },
  { nivel: 'rojo', sintoma: 'Sangrado abundante por la herida o por la ostomía (si la tienes)' },
  { nivel: 'rojo', sintoma: 'Dificultad para respirar o dolor en el pecho' },
  { nivel: 'amarillo', sintoma: 'Fiebre entre 37,5 y 38,5°C que lleva más de 48 horas' },
  { nivel: 'amarillo', sintoma: 'La herida está roja, caliente o sale un poco de líquido' },
  { nivel: 'amarillo', sintoma: 'No has podido hacer de vientre en más de 4 días' },
  { nivel: 'amarillo', sintoma: 'El dolor no se controla con la medicación que te han dado' },
  { nivel: 'amarillo', sintoma: 'Tienes dudas sobre los medicamentos o la dieta' },
  { nivel: 'verde', sintoma: 'Mucho cansancio y necesidad de descansar a menudo' },
  { nivel: 'verde', sintoma: 'Molestias leves en la zona de la herida' },
  { nivel: 'verde', sintoma: 'Poco apetito los primeros días' },
  { nivel: 'verde', sintoma: 'Cambios en el ritmo intestinal (más frecuente o menos)' },
  { nivel: 'verde', sintoma: 'Leve hinchazón en la zona de la cirugía' },
]

const NIVEL_CONFIG = {
  rojo: {
    titulo: 'Llama al 112 o ve a Urgencias si…',
    fondo: '#FDE8E8',
    borde: '#D94F3D',
    color: '#D94F3D',
    emoji: '🔴',
    accion: 'Urgencias — 112',
  },
  amarillo: {
    titulo: 'Llama al hospital si…',
    fondo: 'var(--color-ambar-claro)',
    borde: 'var(--color-alerta)',
    color: '#C47D10',
    emoji: '🟡',
    accion: 'Equipo de cirugía',
  },
  verde: {
    titulo: 'Es normal en los primeros días',
    fondo: 'var(--color-verde-claro)',
    borde: 'var(--color-acento)',
    color: '#2A8A52',
    emoji: '🟢',
    accion: null,
  },
}

export function SenalesAlarma() {
  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-gris-medio)' }}>
        Usa esta guía para saber cuándo necesitas pedir ayuda. No esperes si tienes dudas —
        siempre es mejor llamar.
      </p>

      {(['rojo', 'amarillo', 'verde'] as const).map((nivel) => {
        const cfg = NIVEL_CONFIG[nivel]
        const señalesFiltradas = SEÑALES.filter((s) => s.nivel === nivel)
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
              {señalesFiltradas.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span style={{ color: cfg.color, flexShrink: 0 }}>·</span>
                  <span style={{ color: 'var(--color-texto)' }}>{s.sintoma}</span>
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
        En caso de duda, contacta siempre con el Servicio de Cirugía Oncológica y Colorrectal
        del Instituto Quénet-Torrent. Tu equipo prefiere una llamada de más a una complicación
        tratada tarde.
      </div>
    </div>
  )
}
