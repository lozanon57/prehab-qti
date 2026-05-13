import { CalendarCheck, Phone, FileText } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export function Seguimiento() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Citas de seguimiento */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.followup.appointmentsTitle}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
        {t.followup.appointments.map((cita, i) => (
          <div
            key={i}
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '0 20px',
              minHeight: '88px',
              display: 'flex', alignItems: 'center', gap: '16px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span style={{ fontSize: '28px', flexShrink: 0 }}>{cita.icono}</span>
            <div style={{ flex: 1 }}>
              <div className="label-caps" style={{ color: 'var(--color-ok)', marginBottom: '2px' }}>
                {cita.momento}
              </div>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                {cita.tipo}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                {cita.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Preguntas frecuentes */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        {t.followup.faqTitle}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
        {t.followup.faq.map((faq, i) => (
          <div
            key={i}
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              minHeight: '80px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy)', marginBottom: '6px', lineHeight: '1.3' }}>
              {faq.p}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
              {faq.r}
            </p>
          </div>
        ))}
      </div>

      {/* Contacto */}
      <div style={{
        borderRadius: 'var(--radius-lg)', padding: '20px',
        backgroundColor: 'var(--color-navy)',
      }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: '16px' }}>
          {t.followup.contactTitle}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)', minHeight: '48px' }}>
            <Phone size={18} style={{ flexShrink: 0 }} />
            {t.header.defaultSubtitle}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)', minHeight: '48px' }}>
            <CalendarCheck size={18} style={{ flexShrink: 0 }} />
            {t.landing.institution}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)', minHeight: '48px' }}>
            <FileText size={18} style={{ flexShrink: 0 }} />
            Dr. Pablo Lozano Lominchar
          </div>
        </div>
      </div>
    </div>
  )
}
