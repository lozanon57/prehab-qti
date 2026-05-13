import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { Landing } from './pages/Landing'
import { PrehabLayout } from './pages/prehab/PrehabLayout'
import { PrehabInicio } from './pages/prehab/PrehabInicio'
import { Ejercicio } from './pages/prehab/Ejercicio'
import { Nutricion } from './pages/prehab/Nutricion'
import { Bienestar } from './pages/prehab/Bienestar'
import { Pruebas } from './pages/prehab/Pruebas'
import { RecuperacionLayout } from './pages/recuperacion/RecuperacionLayout'
import { MiRecuperacion } from './pages/recuperacion/MiRecuperacion'
import { Alimentacion } from './pages/recuperacion/Alimentacion'
import { SenalesAlarma } from './pages/recuperacion/SenalesAlarma'
import { Seguimiento } from './pages/recuperacion/Seguimiento'
import { Informacion } from './pages/Informacion'

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* Prehabilitación */}
          <Route path="/prehab/:patologia" element={<PrehabLayout />}>
            <Route index element={<PrehabInicio />} />
            <Route path="ejercicio" element={<Ejercicio />} />
            <Route path="nutricion" element={<Nutricion />} />
            <Route path="bienestar" element={<Bienestar />} />
            <Route path="pruebas" element={<Pruebas />} />
          </Route>

          {/* Recuperación */}
          <Route path="/recuperacion/:patologia" element={<RecuperacionLayout />}>
            <Route index element={<MiRecuperacion />} />
            <Route path="alimentacion" element={<Alimentacion />} />
            <Route path="alarma" element={<SenalesAlarma />} />
            <Route path="seguimiento" element={<Seguimiento />} />
          </Route>

          {/* Información */}
          <Route path="/informacion" element={<Informacion />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  )
}
