import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Informacion() {
  const navigate = useNavigate()
  const { t, lang, setLang } = useLanguage()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-fondo)' }}>
      <header
        style={{ backgroundColor: 'var(--color-principal)', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center">
            <div className="w-16 flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-0.5 text-white/90 hover:text-white transition-colors text-[15px] font-medium"
                aria-label={t.common.back}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-white font-semibold text-[16px] leading-tight">{t.info.title}</h1>
              <p className="text-white/55 text-[11px] leading-none mt-0.5">{t.info.subtitle}</p>
            </div>
            <div className="w-16 flex justify-end">
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', letterSpacing: '0.05em' }}
                aria-label="Switch language"
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5">
        <div className="flex flex-col gap-4">
          {t.info.sections.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: 'var(--color-blanco)',
                borderColor: 'var(--color-gris-claro)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{s.icon}</span>
                <h2 className="font-bold text-base" style={{ color: 'var(--color-principal)' }}>
                  {s.title}
                </h2>
              </div>
              {s.content.split('\n\n').map((parrafo, j) => (
                <p key={j} className="text-sm leading-relaxed mb-2 last:mb-0" style={{ color: 'var(--color-texto)' }}>
                  {parrafo}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-4 mt-4 text-center"
          style={{ backgroundColor: 'var(--color-gris-claro)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
            Instituto Quénet-Torrent · Servicio de Cirugía Oncológica y Colorrectal
            <br />
            Dr. Pablo Lozano Lominchar · v1.0 · Mayo 2026
          </p>
        </div>
      </main>
    </div>
  )
}
