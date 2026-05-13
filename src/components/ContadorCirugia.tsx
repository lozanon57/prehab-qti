import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import { useLanguage } from '../i18n/LanguageContext'

export function ContadorCirugia() {
  const { fechaCirugia, setFechaCirugia } = useAppStore()
  const { lang, t } = useLanguage()
  const [editando, setEditando] = useState(!fechaCirugia)

  const diasRestantes = fechaCirugia
    ? Math.max(
        0,
        Math.ceil(
          (new Date(fechaCirugia).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        )
      )
    : null

  const colorFondo =
    diasRestantes === null
      ? 'var(--color-gris-claro)'
      : diasRestantes > 21
      ? 'var(--color-azul-claro)'
      : diasRestantes > 7
      ? 'var(--color-ambar-claro)'
      : '#FDE8E8'

  const colorTexto =
    diasRestantes === null
      ? 'var(--color-gris-medio)'
      : diasRestantes > 21
      ? 'var(--color-secundario)'
      : diasRestantes > 7
      ? 'var(--color-alerta)'
      : 'var(--color-rojo-alerta)'

  const locale = lang === 'en' ? 'en-GB' : 'es-ES'

  if (editando) {
    return (
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ backgroundColor: 'var(--color-azul-claro)' }}
      >
        <p className="text-sm font-semibold mb-2 flex items-center gap-2"
           style={{ color: 'var(--color-principal)' }}>
          <Calendar size={16} />
          {t.contador.when}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--color-gris-medio)' }}>
          {t.contador.intro}
        </p>
        <input
          type="date"
          className="w-full rounded-xl border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-gris-claro)',
            color: 'var(--color-texto)',
            backgroundColor: 'var(--color-blanco)',
          }}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            if (e.target.value) {
              setFechaCirugia(e.target.value)
              setEditando(false)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-4 mb-4 flex items-center justify-between cursor-pointer"
      style={{ backgroundColor: colorFondo }}
      onClick={() => setEditando(true)}
      role="button"
      aria-label={t.contador.ariaLabel}
    >
      <div>
        <p className="text-xs font-medium mb-0.5" style={{ color: colorTexto }}>
          {t.contador.daysLabel}
        </p>
        <p className="text-3xl font-extrabold leading-none" style={{ color: colorTexto }}>
          {diasRestantes}
        </p>
        <p className="text-xs mt-1" style={{ color: colorTexto, opacity: 0.7 }}>
          {fechaCirugia
            ? new Date(fechaCirugia).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : ''}
        </p>
      </div>
      <Clock size={40} style={{ color: colorTexto, opacity: 0.3 }} />
    </div>
  )
}
