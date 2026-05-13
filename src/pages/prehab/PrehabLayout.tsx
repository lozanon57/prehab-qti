import { Outlet, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import { BottomNav } from '../../components/BottomNav'
import { getPatologia } from '../../data/patologias'
import { useLanguage } from '../../i18n/LanguageContext'

export function PrehabLayout() {
  const { patologia } = useParams<{ patologia: string }>()
  const p = patologia ? getPatologia(patologia) : undefined
  const { t, lang } = useLanguage()

  const nombre = p
    ? (lang === 'en' ? (p.nombreEn ?? p.nombre) : p.nombre)
    : (lang === 'en' ? 'Prehabilitation' : 'Prehabilitación')

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-fondo)' }}>
      <Header
        titulo={nombre}
        subtitulo={t.header.prehabSubtitle}
        mostrarVolver
      />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
