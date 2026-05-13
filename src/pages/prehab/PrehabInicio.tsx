import { useNavigate, useParams } from 'react-router-dom'
import { Dumbbell, Apple, Brain, CheckSquare, ChevronRight, Star } from 'lucide-react'
import { ContadorCirugia } from '../../components/ContadorCirugia'
import { getPatologia } from '../../data/patologias'
import { useLanguage } from '../../i18n/LanguageContext'

interface ModuloCard {
  icono: React.ReactNode
  titulo: string
  descripcion: string
  ruta: string
  color: string
  colorFondo: string
}

export function PrehabInicio() {
  const navigate = useNavigate()
  const { patologia } = useParams<{ patologia: string }>()
  const p = patologia ? getPatologia(patologia) : undefined
  const { t, lang } = useLanguage()

  const nombreCompleto = p
    ? (lang === 'en' ? (p.nombreCompletoEn ?? p.nombreCompleto) : p.nombreCompleto)
    : undefined
  const descripcionP = p
    ? (lang === 'en' ? (p.descripcionEn ?? p.descripcion) : p.descripcion)
    : undefined

  const modulos: ModuloCard[] = [
    {
      icono: <Dumbbell size={22} />,
      titulo: t.prehabInicio.exerciseTitle,
      descripcion: t.prehabInicio.exerciseDesc,
      ruta: 'ejercicio',
      color: 'var(--color-secundario)',
      colorFondo: 'var(--color-azul-claro)',
    },
    {
      icono: <Apple size={22} />,
      titulo: t.prehabInicio.nutritionTitle,
      descripcion: t.prehabInicio.nutritionDesc,
      ruta: 'nutricion',
      color: 'var(--color-acento)',
      colorFondo: 'var(--color-verde-claro)',
    },
    {
      icono: <Brain size={22} />,
      titulo: t.prehabInicio.wellnessTitle,
      descripcion: t.prehabInicio.wellnessDesc,
      ruta: 'bienestar',
      color: '#7B5EA7',
      colorFondo: '#F0EBF9',
    },
    {
      icono: <CheckSquare size={22} />,
      titulo: t.prehabInicio.testsTitle,
      descripcion: t.prehabInicio.testsDesc,
      ruta: 'pruebas',
      color: 'var(--color-alerta)',
      colorFondo: 'var(--color-ambar-claro)',
    },
  ]

  return (
    <div>
      {/* Banner patología */}
      {p && (
        <div
          className="rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{ backgroundColor: p.colorClaro }}
        >
          <span className="text-3xl">{p.icono}</span>
          <div>
            <p className="font-bold text-sm" style={{ color: p.color }}>
              {nombreCompleto}
            </p>
            <p className="text-xs mt-0.5" style={{ color: p.color, opacity: 0.7 }}>
              {descripcionP}
            </p>
          </div>
        </div>
      )}

      {/* Contador cirugía */}
      <ContadorCirugia />

      {/* Consejo del día */}
      <div
        className="rounded-2xl p-4 mb-4 flex gap-3"
        style={{ backgroundColor: 'var(--color-verde-claro)' }}
      >
        <Star size={18} style={{ color: 'var(--color-acento)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-acento)' }}>
            {t.prehabInicio.tipLabel}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-texto)' }}>
            {t.prehabInicio.tipText}
          </p>
        </div>
      </div>

      {/* Módulos */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        {t.prehabInicio.yourProgram}
      </h2>
      <div className="flex flex-col gap-3">
        {modulos.map((m) => (
          <button
            key={m.ruta}
            onClick={() => navigate(m.ruta)}
            className="w-full text-left rounded-2xl p-4 border transition-all hover:shadow-md active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-blanco)',
              borderColor: 'var(--color-gris-claro)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: m.colorFondo, color: m.color }}
              >
                {m.icono}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--color-texto)' }}>
                  {m.titulo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-gris-medio)' }}>
                  {m.descripcion}
                </p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-gris-medio)', flexShrink: 0 }} />
            </div>
          </button>
        ))}
      </div>

      {/* Nota institucional */}
      <div
        className="rounded-2xl p-4 mt-6 text-center"
        style={{ backgroundColor: 'var(--color-gris-claro)' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
          {t.prehabInicio.institutionalNote}
        </p>
      </div>
    </div>
  )
}
