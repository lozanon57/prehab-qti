import { useParams } from 'react-router-dom'

interface Hito {
  periodo: string
  titulo: string
  items: string[]
  color: string
  fondo: string
}

// ── CRC — Colorrectal (laparoscopia / abierta) ───────────────────────────────
const TIMELINE_CRC: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'El día de la operación',
    items: [
      'Despiertas en la sala de recuperación.',
      'Tendrás una vía intravenosa y posiblemente un catéter urinario.',
      'El equipo de anestesia controla tu dolor con medicación oral e intravenosa.',
      'Podrás tomar pequeños sorbos de agua desde las primeras horas.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Día 1',
    titulo: 'Primeros movimientos',
    items: [
      'Te levantarás de la cama con ayuda y caminarás por la habitación.',
      'Podrás tomar líquidos (agua, infusión, caldo).',
      'Se retirará el catéter urinario.',
      'Fisioterapia respiratoria: respiraciones profundas cada hora.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 2–3',
    titulo: 'Recuperación activa',
    items: [
      'Caminarás por el pasillo 2-3 veces al día.',
      'Dieta blanda: puré, yogur, arroz cocido. Nada de fibra alta todavía.',
      'Si has pasado gas o deposición: buena señal de que el intestino funciona.',
      'Se retirará el gotero cuando bebas suficiente.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 4–5',
    titulo: 'Alta a domicilio',
    items: [
      'Alta si caminas solo/a, dolor controlado con pastillas y tránsito activo.',
      'Recibirás instrucciones escritas y las citas de revisión.',
      'Vendas / grapas en la herida: el cirujano indicará cuándo retirarlas.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 2–4',
    titulo: 'En casa',
    items: [
      'Camina 20-30 min diarios, aumentando cada día.',
      'Dieta normal adaptada. No levantar peso > 5 kg durante 4-6 semanas.',
      'Puedes ducharte y llevar vida casi normal. Evita conducir si tomas opioides.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 4–6',
    titulo: 'Revisión en consulta',
    items: [
      'Consulta con el cirujano: revisión de herida y resultado de anatomía patológica.',
      'Planificación de quimioterapia adyuvante si está indicada.',
      'Vuelta progresiva al trabajo y actividad normal.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
]

// ── CAP — Páncreas (Whipple / DPC) ──────────────────────────────────────────
const TIMELINE_CAP: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'Cirugía de Whipple',
    items: [
      'Cirugía de 4-7 horas. Despiertas en URPA o UCI según plan quirúrgico.',
      'Tendrás drenaje abdominal, vía intravenosa y posiblemente sonda urinaria.',
      'Control de glucemia cada 4 horas: la resección pancreática puede alterar el azúcar.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Días 1–3',
    titulo: 'Primeros días: control estrecho',
    items: [
      'Tolerancia oral muy progresiva: líquidos a partir de las 6-12 horas.',
      'Inicio de enzimas pancreáticas (Kreon®) con cada comida o suplemento oral.',
      'Control glucemia: objetivo 140-180 mg/dL. Pueden ajustarse insulinas.',
      'Retirada del catéter urinario en día 1-2.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 3–5',
    titulo: 'Progresión',
    items: [
      'Dieta blanda fraccionada: 6 comidas pequeñas al día.',
      'Movilización activa: caminar por el pasillo varias veces al día.',
      'Análisis de amilasa en el drenaje abdominal: si es normal, se retira.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 8–12',
    titulo: 'Alta hospitalaria',
    items: [
      'Alta media 8-12 días si la evolución es favorable y no hay fístula pancreática.',
      'Saldrás con enzimas pancreáticas, insulina si precisa, y analgesia oral.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 3–4',
    titulo: 'Revisión y nutrición',
    items: [
      'Consulta cirugía: revisión herida y resultado de patología.',
      'Consulta nutrición: ajuste de enzimas, dieta y suplementos.',
      'No levantar peso > 5 kg durante 6-8 semanas.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
  {
    periodo: 'Semanas 6–8',
    titulo: 'Oncología médica',
    items: [
      'Inicio de quimioterapia adyuvante (mFOLFIRINOX o Gemcitabina + Capecitabina) si está indicada.',
      'Revisión hepática y marcadores (CA 19-9, CEA).',
    ],
    color: '#AA3D6E',
    fondo: '#F9EBF3',
  },
]

// ── MH — Cirugía hepática (hepatectomía) ─────────────────────────────────────
const TIMELINE_MH: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'Cirugía hepática',
    items: [
      'Cirugía de 3-6 horas. Paso a URPA; UCI si resección mayor (≥ 3 segmentos).',
      'Control de función hepática: bilirrubina, transaminasas y tiempo de protrombina desde DPO1.',
      'Tendrás uno o dos drenajes abdominales perihepáticos.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Días 1–2',
    titulo: 'Activación precoz',
    items: [
      'Te levantarás y caminarás con ayuda desde el día 1.',
      'Tolerancia oral: líquidos el día 0, dieta blanda el día 1.',
      'Ecografía abdominal si el cirujano lo considera para descartar biloma.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 3–5',
    titulo: 'Progresión',
    items: [
      'Dieta normal progresiva. Retirada del drenaje si gasto < 50 mL/24 h seroso.',
      'Movilización activa: objetivo caminar > 200 m al día.',
      'Analítica control: descenso esperado de transaminasas y bilirrubina.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 5–7',
    titulo: 'Alta hospitalaria',
    items: [
      'Alta si analítica estable, tolerancia oral completa y sin fiebre.',
      'No levantar peso > 5 kg ni conducir durante 3-4 semanas.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 2–3',
    titulo: 'Control hepático',
    items: [
      'Analítica: AST/ALT/bilirrubina. Control de coagulación si hepática mayor.',
      'Reiniciar actividad suave: caminar 30-45 min diarios.',
      'Dieta normal; evitar alcohol al menos 3 meses.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 4–6',
    titulo: 'Revisión oncológica',
    items: [
      'TC de control y marcadores (CEA, CA 19-9 si metástasis colorrectales).',
      'Valorar quimioterapia adyuvante (CAPOX o FOLFOX) si indicada.',
      'Retorno a actividad normal y trabajo.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
]

// ── CP — Carcinomatosis peritoneal / CRS+HIPEC ──────────────────────────────
const TIMELINE_CP: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'CRS + HIPEC',
    items: [
      'Cirugía de 6-12 horas. Siempre ingresas en UCI/Reanimación las primeras 24-48 horas.',
      'Monitorización intensiva: presión arterial, diuresis, temperatura, sodio/potasio.',
      'Catéter epidural torácico para control del dolor: normal que notes entumecimiento de cintura para abajo.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Días 1–2 (UCI)',
    titulo: 'Estabilización',
    items: [
      'El equipo controla de cerca tus riñones: la quimioterapia caliente puede afectarlos temporalmente.',
      'Si todo va bien, paso a planta de oncología en día 2.',
      'Pequeños sorbos de agua cuando estés despierto/a.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 3–5',
    titulo: 'Inicio de recuperación',
    items: [
      'Primera deambulación asistida por el pasillo.',
      'Líquidos y progresión a dieta blanda fraccionada.',
      'Analítica diaria: PCR, hemograma, función renal y hepática.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 5–8',
    titulo: 'Progresión',
    items: [
      'Retirada progresiva de drenajes si gasto seroso y sin signos de fístula.',
      'Alimentación oral completa si la tolerancia es buena.',
      'Fisioterapia activa: objetivo 2 horas fuera de cama al día.',
    ],
    color: '#2E7D32',
    fondo: '#E8F5E9',
  },
  {
    periodo: 'Días 10–14',
    titulo: 'Alta hospitalaria',
    items: [
      'Alta media 10-14 días. Inyecciones de HBPM (anticoagulante) durante 28 días en casa.',
      'Herida abdominal: normal que esté indurada y con pequeñas molestias hasta 4-6 semanas.',
      'Revisión en consulta a los 10-14 días del alta.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 6–12',
    titulo: 'Seguimiento oncológico',
    items: [
      'TC de reevaluación y marcadores tumorales.',
      'Valoración de quimioterapia adyuvante sistémica si está indicada.',
      'Recuperación progresiva: actividad física suave, nutrición reforzada.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
]

// ── CG — Cáncer gástrico (gastrectomía total / subtotal) ─────────────────────
const TIMELINE_CG: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'Gastrectomía',
    items: [
      'Cirugía de 3-5 horas. Despertar en URPA con analgesia controlada.',
      'Control de glucemia cada 4 horas (normal que suba por el estrés quirúrgico).',
      'Pequeños sorbos de agua a partir de las 4-6 horas si está autorizado.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Días 1–2',
    titulo: 'Tolerancia oral fraccionada',
    items: [
      'Empieza la alimentación fraccionada: 6-8 tomas pequeñas al día, 150-200 mL cada vez.',
      'Te levantarás y caminarás con ayuda desde el día 1.',
      'Se retirará la sonda urinaria en el día 1.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 3–5',
    titulo: 'Adaptación al nuevo estómago',
    items: [
      'Dieta semilíquida avanzando a blanda. Siempre: comidas pequeñas, masticar bien, comer despacio.',
      'Retirada del drenaje si los valores son correctos.',
      'Atención al síndrome de dumping: mareo, sudoración o diarrea después de comer → normal las primeras semanas.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 5–8',
    titulo: 'Alta hospitalaria',
    items: [
      'Alta cuando toleres ≥ 1000 kcal/día en comidas fraccionadas, camines solo/a y el dolor sea leve.',
      'Antes del alta: inyección de vitamina B12 (de por vida tras gastrectomía total).',
      'Instrucciones sobre dumping, dieta y signos de alarma.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 2–6',
    titulo: 'Adaptación en casa',
    items: [
      'Vitamina B12: inyección mensual o sublingual diaria — de por vida.',
      'Comidas pequeñas y frecuentes (6-8/día). Evitar azúcares simples.',
      'Seguimiento con nutricionista para ajustar la dieta postgastrectomía.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 4–6',
    titulo: 'Inicio quimioterapia adyuvante',
    items: [
      'Si el oncólogo lo indica: inicio de FLOT adyuvante (4 ciclos cada 14 días).',
      'TC de control y marcadores (CEA, CA 19-9).',
      'Revisión cirugía + oncología médica + nutrición.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
]

// ── SRP — Sarcoma retroperitoneal ────────────────────────────────────────────
const TIMELINE_SRP: Hito[] = [
  {
    periodo: 'Día 0 — Cirugía',
    titulo: 'Resección del sarcoma',
    items: [
      'Cirugía compleja de 4-7 horas. Paso a Reanimación/URPA las primeras horas.',
      'Catéter epidural torácico para el dolor: control excelente que permite moverte antes.',
      'Puede que se hayan extirpado órganos adyacentes al sarcoma (riñón, parte del colon): lo sabrás al alta.',
    ],
    color: 'var(--color-principal)',
    fondo: '#E8EDF3',
  },
  {
    periodo: 'Días 1–2',
    titulo: 'Primeros pasos',
    items: [
      'Primera deambulación asistida con el fisioterapeuta desde el día 1.',
      'Tolerancia oral: líquidos el día 0, dieta blanda a partir del día 1.',
      'Analítica de control: hemoglobina, función renal, PCR.',
    ],
    color: 'var(--color-secundario)',
    fondo: 'var(--color-azul-claro)',
  },
  {
    periodo: 'Días 3–5',
    titulo: 'Recuperación activa',
    items: [
      'Dieta blanda. Retirada de drenajes si gasto < 50 mL/24 h.',
      'Objetivo movilización: 2 horas fuera de cama al día.',
      'Retirada del catéter epidural e inicio de analgesia oral.',
    ],
    color: '#7B5EA7',
    fondo: '#F0EBF9',
  },
  {
    periodo: 'Días 5–7',
    titulo: 'Transición al alta',
    items: [
      'Progresión de la movilización: caminar de forma autónoma por el pasillo.',
      'Analgesia completamente oral: paracetamol + antiinflamatorio suave.',
      'Suplementos nutricionales proteicos (2/día) para ayudar a cicatrizar.',
    ],
    color: '#2E7D32',
    fondo: '#E8F5E9',
  },
  {
    periodo: 'Días 7–10',
    titulo: 'Alta hospitalaria',
    items: [
      'Alta media 7-10 días. Inyecciones anticoagulantes (HBPM) durante 28 días — muy importante en sarcoma.',
      'Continuar suplementos proteicos en casa 2-4 semanas más.',
      'Revisión en consulta de cirugía a los 7-10 días.',
    ],
    color: 'var(--color-acento)',
    fondo: 'var(--color-verde-claro)',
  },
  {
    periodo: 'Semanas 3–8',
    titulo: 'Seguimiento y decisión adyuvante',
    items: [
      'Comité de Sarcomas: decisión sobre radioterapia o quimioterapia adyuvante según el resultado final.',
      'TC de control a las 6-8 semanas.',
      'Rehabilitación física: programa progresivo para recuperar la fuerza y resistencia.',
    ],
    color: 'var(--color-alerta)',
    fondo: 'var(--color-ambar-claro)',
  },
]

// ── Mapa de timelines ────────────────────────────────────────────────────────
const TIMELINES: Record<string, Hito[]> = {
  CRC: TIMELINE_CRC,
  CAP: TIMELINE_CAP,
  MH:  TIMELINE_MH,
  CP:  TIMELINE_CP,
  CG:  TIMELINE_CG,
  SRP: TIMELINE_SRP,
}

const INFO_PATOLOGIA: Record<string, { estancia: string; nota: string }> = {
  CRC: { estancia: '4–5 días (laparoscopia)', nota: 'Protocolo ERAS colorrectal — alta de las más tempranas en cirugía oncológica mayor.' },
  CAP: { estancia: '8–12 días', nota: 'La cirugía de Whipple es compleja; el alta requiere control de la función pancreática.' },
  MH:  { estancia: '5–7 días', nota: 'El hígado se regenera rápidamente; la analítica guía el alta.' },
  CP:  { estancia: '10–14 días', nota: 'La HIPEC exige ingreso más prolongado por la intensidad de la cirugía y la quimioterapia intraabdominal.' },
  CG:  { estancia: '5–8 días', nota: 'La gastrectomía requiere aprender a comer de forma diferente. La nutricionista es clave.' },
  SRP: { estancia: '7–10 días', nota: 'La cirugía retroperitoneal es extensa; la anticoagulación 28 días es obligatoria.' },
}

// ── Componente ───────────────────────────────────────────────────────────────
export function MiRecuperacion() {
  const { patologia } = useParams<{ patologia: string }>()
  const timeline = (patologia && TIMELINES[patologia]) ? TIMELINES[patologia] : TIMELINE_CRC
  const info = (patologia && INFO_PATOLOGIA[patologia]) ? INFO_PATOLOGIA[patologia] : INFO_PATOLOGIA['CRC']

  return (
    <div>
      {/* Banner ERAS */}
      <div className="rounded-2xl p-4 mb-4 text-sm"
        style={{ backgroundColor: 'var(--color-azul-claro)', color: 'var(--color-principal)' }}>
        <p className="font-semibold mb-1">Protocolo ERAS — Recuperación intensificada</p>
        <p>
          Tu equipo aplica un programa de recuperación acelerada diseñado específicamente
          para tu tipo de cirugía. Cada paso está pensado para que vuelvas a casa antes
          y con menos complicaciones.
        </p>
      </div>

      {/* Estancia media + nota */}
      <div className="rounded-2xl p-3 mb-5 flex gap-3 border"
        style={{ backgroundColor: 'var(--color-blanco)', borderColor: 'var(--color-gris-claro)' }}>
        <div className="text-center flex-shrink-0" style={{ minWidth: '64px' }}>
          <p className="text-2xl font-extrabold leading-none" style={{ color: 'var(--color-principal)' }}>
            {info.estancia.split(' ')[0]}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>días aprox.</p>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-texto)' }}>
            Estancia media: {info.estancia}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-gris-medio)' }}>
            {info.nota}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-texto)' }}>
        Línea de tiempo de tu recuperación
      </h2>

      <div className="relative">
        <div className="absolute left-5 top-5 bottom-5 w-0.5"
          style={{ backgroundColor: 'var(--color-gris-claro)' }} />

        <div className="flex flex-col gap-4">
          {timeline.map((hito, i) => (
            <div key={i} className="flex gap-4 relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10 border-2"
                style={{ backgroundColor: hito.fondo, borderColor: hito.color, color: hito.color }}
              >
                {i + 1}
              </div>
              <div className="flex-1 rounded-2xl p-4 mb-1" style={{ backgroundColor: hito.fondo }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: hito.color }}>
                  {hito.periodo}
                </p>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--color-texto)' }}>
                  {hito.titulo}
                </p>
                <ul className="flex flex-col gap-1">
                  {hito.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span style={{ color: hito.color }}>·</span>
                      <span style={{ color: 'var(--color-texto)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
