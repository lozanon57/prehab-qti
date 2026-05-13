import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface HeaderProps {
  titulo?: string
  subtitulo?: string
  mostrarVolver?: boolean
}

export function Header({ titulo, subtitulo, mostrarVolver = false }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useLanguage()
  const esInicio = location.pathname === '/'

  return (
    <header
      style={{ backgroundColor: 'var(--color-principal)', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Left zone */}
          <div className="w-16 flex items-center">
            {mostrarVolver && !esInicio ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-0.5 text-white/90 hover:text-white transition-colors text-[15px] font-medium"
                aria-label={t.common.back}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
            ) : null}
          </div>

          {/* Centre title */}
          <div className="flex-1 text-center">
            <h1 className="text-white font-semibold text-[16px] leading-tight truncate">
              {titulo ?? t.header.defaultTitle}
            </h1>
            {subtitulo && (
              <p className="text-white/55 text-[11px] leading-none mt-0.5 truncate">{subtitulo}</p>
            )}
          </div>

          {/* Right: language toggle */}
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
  )
}
