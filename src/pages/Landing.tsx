import { useNavigate } from 'react-router-dom'
import { ChevronRight, Info } from 'lucide-react'
import { PATOLOGIAS } from '../data/patologias'
import { useAppStore } from '../store/appStore'
import { useLanguage } from '../i18n/LanguageContext'
import type { PatologiaCode } from '../types'

export function Landing() {
  const navigate = useNavigate()
  const { setPatologia, setFase } = useAppStore()
  const { t, lang, setLang } = useLanguage()

  const handleSeleccion = (code: PatologiaCode, fase: 'prehab' | 'recuperacion') => {
    setPatologia(code)
    setFase(fase)
    navigate(`/${fase}/${code}`)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-fondo)' }}>
      {/* Header institucional */}
      <header
        style={{ backgroundColor: 'var(--color-principal)', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏥</span>
              <div>
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  {t.landing.service}
                </p>
                <h1 className="text-white text-xl font-bold leading-tight">
                  {t.landing.institution}
                </h1>
              </div>
            </div>
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-opacity hover:opacity-80 mt-1 flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', letterSpacing: '0.05em' }}
              aria-label="Switch language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
          <p className="text-white/75 text-sm leading-relaxed mt-2">
            {t.landing.tagline}
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Sección prehabilitación */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💪</span>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-principal)' }}>
              {t.landing.prehabTitle}
            </h2>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--color-gris-medio)' }}>
            {t.landing.prehabDesc}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {PATOLOGIAS.map((p) => {
              const nombre = lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre
              const descripcion = lang === 'en' ? (p.descripcionEn ?? p.descripcion) : p.descripcion
              return (
                <button
                  key={p.code}
                  onClick={() => handleSeleccion(p.code, 'prehab')}
                  className="w-full text-left rounded-2xl p-4 border transition-all hover:shadow-md active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--color-blanco)',
                    borderColor: 'var(--color-gris-claro)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: p.colorClaro }}
                      >
                        {p.icono}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                          {nombre}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-gris-medio)' }}>
                          {descripcion}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      style={{ color: p.color, flexShrink: 0 }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Sección recuperación */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🌱</span>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-acento)' }}>
              {t.landing.recoveryTitle}
            </h2>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--color-gris-medio)' }}>
            {t.landing.recoveryDesc}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {PATOLOGIAS.map((p) => {
              const nombre = lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre
              return (
                <button
                  key={p.code}
                  onClick={() => handleSeleccion(p.code, 'recuperacion')}
                  className="w-full text-left rounded-2xl p-3 border transition-all hover:shadow-md active:scale-[0.98]"
                  style={{
                    backgroundColor: p.colorClaro,
                    borderColor: 'transparent',
                  }}
                >
                  <p className="text-xl mb-1">{p.icono}</p>
                  <p className="font-semibold text-xs" style={{ color: p.color }}>
                    {nombre}
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Info */}
        <button
          onClick={() => navigate('/informacion')}
          className="w-full rounded-2xl p-4 flex items-center gap-3 border transition-all hover:shadow-md"
          style={{
            backgroundColor: 'var(--color-blanco)',
            borderColor: 'var(--color-gris-claro)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-azul-claro)' }}
          >
            <Info size={20} style={{ color: 'var(--color-secundario)' }} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
              {t.landing.infoTitle}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
              {t.landing.infoDesc}
            </p>
          </div>
          <ChevronRight size={18} className="ml-auto" style={{ color: 'var(--color-gris-medio)' }} />
        </button>

        {/* Footer */}
        <div className="text-center mt-8 pb-6 space-y-1">
          <p className="text-xs font-semibold" style={{ color: 'var(--color-principal)' }}>
            {t.landing.creator}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
            {t.landing.creatorRole}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
            v1.0 · Mayo 2026
          </p>
        </div>
      </main>
    </div>
  )
}
