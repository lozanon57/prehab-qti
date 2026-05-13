import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Heart } from 'lucide-react'

interface HeaderProps {
  titulo?: string
  subtitulo?: string
  mostrarVolver?: boolean
}

export function Header({ titulo, subtitulo, mostrarVolver = false }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const esInicio = location.pathname === '/'

  return (
    <header
      style={{ backgroundColor: 'var(--color-principal)' }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* Marca institucional */}
        <div className="flex items-center gap-2 mb-1">
          {mostrarVolver && !esInicio && (
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white transition-colors mr-1"
              aria-label="Volver"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <Heart size={16} className="text-white/60" />
          <span className="text-white/70 text-xs font-medium tracking-wide uppercase">
            Instituto Quénet-Torrent
          </span>
        </div>

        {titulo ? (
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">{titulo}</h1>
            {subtitulo && (
              <p className="text-white/70 text-sm mt-0.5">{subtitulo}</p>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-white text-lg font-bold leading-tight">
              Tu programa de preparación
            </h1>
            <p className="text-white/70 text-xs mt-0.5">
              Servicio de Cirugía Oncológica y Colorrectal
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
