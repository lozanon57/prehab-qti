import { CalendarCheck, Phone, FileText } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export function Seguimiento() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Citas de seguimiento */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {t.followup.appointmentsTitle}
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {t.followup.appointments.map((cita, i) => (
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
        {t.followup.faqTitle}
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {t.followup.faq.map((faq, i) => (
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
          {t.followup.contactTitle}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Phone size={14} />
            {t.header.defaultSubtitle}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <CalendarCheck size={14} />
            {t.landing.institution}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <FileText size={14} />
            Dr. Pablo Lozano Lominchar
          </div>
        </div>
      </div>
    </div>
  )
}
