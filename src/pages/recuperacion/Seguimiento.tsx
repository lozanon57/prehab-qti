import { CalendarCheck, Phone, FileText } from 'lucide-react'

const CITAS = [
  { momento: '48 horas tras el alta', tipo: 'Control telefónico', descripcion: 'Enfermería quirúrgica te llamará para saber cómo estás.', icono: '📞' },
  { momento: 'Semana 4–6', tipo: 'Consulta en Cirugía', descripcion: 'Revisión de la herida, resultado de anatomía patológica y planificación del seguimiento oncológico.', icono: '🏥' },
  { momento: 'Según indicación', tipo: 'Oncología médica', descripcion: 'Si se requiere quimioterapia u otro tratamiento complementario, te derivaremos.', icono: '💊' },
]

const FAQ = [
  { p: '¿Cuándo puedo ducharme?', r: 'Al día siguiente del alta, con agua templada. Seca bien la herida después.' },
  { p: '¿Puedo conducir?', r: 'No durante las primeras 2-4 semanas o mientras tomes medicación con opioides.' },
  { p: '¿Cuándo puedo volver al trabajo?', r: 'Depende del tipo de trabajo y de tu evolución. Habla con tu médico. En trabajos sedentarios, a veces en 3-4 semanas.' },
  { p: '¿Puedo hacer deporte?', r: 'Caminar desde el día 1. Evita esfuerzos abdominales intensos las primeras 6 semanas.' },
  { p: '¿Qué hago si tengo fiebre?', r: 'Si supera 38°C, llama al hospital. Si es muy alta o con dolor abdominal intenso, ve a Urgencias.' },
]

export function Seguimiento() {
  return (
    <div>
      {/* Citas de seguimiento */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Tus próximas citas
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {CITAS.map((cita, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border flex gap-3"
            style={{
              backgroundColor: 'var(--color-blanco)',
              borderColor: 'var(--color-gris-claro)',
            }}
          >
            <span className="text-2xl flex-shrink-0">{cita.icono}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-0.5"
                 style={{ color: 'var(--color-acento)' }}>
                {cita.momento}
              </p>
              <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                {cita.tipo}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-gris-medio)' }}>
                {cita.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Preguntas frecuentes */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Preguntas frecuentes al alta
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {FAQ.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ backgroundColor: 'var(--color-fondo)', border: '1px solid var(--color-gris-claro)' }}
          >
            <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--color-principal)' }}>
              {faq.p}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-texto)' }}>
              {faq.r}
            </p>
          </div>
        ))}
      </div>

      {/* Contacto */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--color-principal)' }}
      >
        <p className="text-white font-bold text-sm mb-3">
          Contacto — Instituto Quénet-Torrent
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Phone size={14} />
            Servicio de Cirugía Oncológica y Colorrectal
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <CalendarCheck size={14} />
            Consultas y citas de seguimiento
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <FileText size={14} />
            Dr. Pablo Lozano Lominchar (responsable clínico)
          </div>
        </div>
      </div>
    </div>
  )
}
