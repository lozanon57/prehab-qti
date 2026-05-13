import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { TRANSLATIONS, type Lang, type T } from './translations'

const STORAGE_KEY = 'prehab-lang'

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'en' ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((newLang: Lang) => {
    try { localStorage.setItem(STORAGE_KEY, newLang) } catch { /* ignore */ }
    setLangState(newLang)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
