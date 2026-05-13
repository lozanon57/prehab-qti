import { useParams } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

interface Hito {
  periodo: string
  titulo: string
  items: string[]
  color: string
  fondo: string
}

// ── CRC — Colorrectal ───────────────────────────────────────────────────────
const TIMELINE_CRC: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'El día de la operación', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Despiertas en la sala de recuperación.','Tendrás una vía intravenosa y posiblemente un catéter urinario.','El equipo de anestesia controla tu dolor con medicación oral e intravenosa.','Podrás tomar pequeños sorbos de agua desde las primeras horas.'] },
  { periodo: 'Día 1', titulo: 'Primeros movimientos', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Te levantarás de la cama con ayuda y caminarás por la habitación.','Podrás tomar líquidos (agua, infusión, caldo).','Se retirará el catéter urinario.','Fisioterapia respiratoria: respiraciones profundas cada hora.'] },
  { periodo: 'Días 2–3', titulo: 'Recuperación activa', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Caminarás por el pasillo 2-3 veces al día.','Dieta blanda: puré, yogur, arroz cocido. Nada de fibra alta todavía.','Si has pasado gas o deposición: buena señal de que el intestino funciona.','Se retirará el gotero cuando bebas suficiente.'] },
  { periodo: 'Días 4–5', titulo: 'Alta a domicilio', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta si caminas solo/a, dolor controlado con pastillas y tránsito activo.','Recibirás instrucciones escritas y las citas de revisión.','Vendas / grapas en la herida: el cirujano indicará cuándo retirarlas.'] },
  { periodo: 'Semanas 2–4', titulo: 'En casa', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Camina 20-30 min diarios, aumentando cada día.','Dieta normal adaptada. No levantar peso > 5 kg durante 4-6 semanas.','Puedes ducharte y llevar vida casi normal. Evita conducir si tomas opioides.'] },
  { periodo: 'Semanas 4–6', titulo: 'Revisión en consulta', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Consulta con el cirujano: revisión de herida y resultado de anatomía patológica.','Planificación de quimioterapia adyuvante si está indicada.','Vuelta progresiva al trabajo y actividad normal.'] },
]

const TIMELINE_CAP: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'Cirugía de Whipple', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Cirugía de 4-7 horas. Despiertas en URPA o UCI según plan quirúrgico.','Tendrás drenaje abdominal, vía intravenosa y posiblemente sonda urinaria.','Control de glucemia cada 4 horas: la resección pancreática puede alterar el azúcar.'] },
  { periodo: 'Días 1–3', titulo: 'Primeros días: control estrecho', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Tolerancia oral muy progresiva: líquidos a partir de las 6-12 horas.','Inicio de enzimas pancreáticas (Kreon®) con cada comida o suplemento oral.','Control glucemia: objetivo 140-180 mg/dL. Pueden ajustarse insulinas.','Retirada del catéter urinario en día 1-2.'] },
  { periodo: 'Días 3–5', titulo: 'Progresión', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Dieta blanda fraccionada: 6 comidas pequeñas al día.','Movilización activa: caminar por el pasillo varias veces al día.','Análisis de amilasa en el drenaje abdominal: si es normal, se retira.'] },
  { periodo: 'Días 8–12', titulo: 'Alta hospitalaria', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta media 8-12 días si la evolución es favorable y no hay fístula pancreática.','Saldrás con enzimas pancreáticas, insulina si precisa, y analgesia oral.'] },
  { periodo: 'Semanas 3–4', titulo: 'Revisión y nutrición', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Consulta cirugía: revisión herida y resultado de patología.','Consulta nutrición: ajuste de enzimas, dieta y suplementos.','No levantar peso > 5 kg durante 6-8 semanas.'] },
  { periodo: 'Semanas 6–8', titulo: 'Oncología médica', color: '#AA3D6E', fondo: '#F9EBF3', items: ['Inicio de quimioterapia adyuvante (mFOLFIRINOX o Gemcitabina + Capecitabina) si está indicada.','Revisión hepática y marcadores (CA 19-9, CEA).'] },
]

const TIMELINE_MH: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'Cirugía hepática', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Cirugía de 3-6 horas. Paso a URPA; UCI si resección mayor (≥ 3 segmentos).','Control de función hepática: bilirrubina, transaminasas y tiempo de protrombina desde DPO1.','Tendrás uno o dos drenajes abdominales perihepáticos.'] },
  { periodo: 'Días 1–2', titulo: 'Activación precoz', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Te levantarás y caminarás con ayuda desde el día 1.','Tolerancia oral: líquidos el día 0, dieta blanda el día 1.','Ecografía abdominal si el cirujano lo considera para descartar biloma.'] },
  { periodo: 'Días 3–5', titulo: 'Progresión', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Dieta normal progresiva. Retirada del drenaje si gasto < 50 mL/24 h seroso.','Movilización activa: objetivo caminar > 200 m al día.','Analítica control: descenso esperado de transaminasas y bilirrubina.'] },
  { periodo: 'Días 5–7', titulo: 'Alta hospitalaria', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta si analítica estable, tolerancia oral completa y sin fiebre.','No levantar peso > 5 kg ni conducir durante 3-4 semanas.'] },
  { periodo: 'Semanas 2–3', titulo: 'Control hepático', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Analítica: AST/ALT/bilirrubina. Control de coagulación si hepática mayor.','Reiniciar actividad suave: caminar 30-45 min diarios.','Dieta normal; evitar alcohol al menos 3 meses.'] },
  { periodo: 'Semanas 4–6', titulo: 'Revisión oncológica', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['TC de control y marcadores (CEA, CA 19-9 si metástasis colorrectales).','Valorar quimioterapia adyuvante (CAPOX o FOLFOX) si indicada.','Retorno a actividad normal y trabajo.'] },
]

const TIMELINE_CP: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'CRS + HIPEC', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Cirugía de 6-12 horas. Siempre ingresas en UCI/Reanimación las primeras 24-48 horas.','Monitorización intensiva: presión arterial, diuresis, temperatura, sodio/potasio.','Catéter epidural torácico para control del dolor: normal que notes entumecimiento de cintura para abajo.'] },
  { periodo: 'Días 1–2 (UCI)', titulo: 'Estabilización', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['El equipo controla de cerca tus riñones: la quimioterapia caliente puede afectarlos temporalmente.','Si todo va bien, paso a planta de oncología en día 2.','Pequeños sorbos de agua cuando estés despierto/a.'] },
  { periodo: 'Días 3–5', titulo: 'Inicio de recuperación', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Primera deambulación asistida por el pasillo.','Líquidos y progresión a dieta blanda fraccionada.','Analítica diaria: PCR, hemograma, función renal y hepática.'] },
  { periodo: 'Días 5–8', titulo: 'Progresión', color: '#2E7D32', fondo: '#E8F5E9', items: ['Retirada progresiva de drenajes si gasto seroso y sin signos de fístula.','Alimentación oral completa si la tolerancia es buena.','Fisioterapia activa: objetivo 2 horas fuera de cama al día.'] },
  { periodo: 'Días 10–14', titulo: 'Alta hospitalaria', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta media 10-14 días. Inyecciones de HBPM (anticoagulante) durante 28 días en casa.','Herida abdominal: normal que esté indurada y con pequeñas molestias hasta 4-6 semanas.','Revisión en consulta a los 10-14 días del alta.'] },
  { periodo: 'Semanas 6–12', titulo: 'Seguimiento oncológico', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['TC de reevaluación y marcadores tumorales.','Valoración de quimioterapia adyuvante sistémica si está indicada.','Recuperación progresiva: actividad física suave, nutrición reforzada.'] },
]

const TIMELINE_CG: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'Gastrectomía', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Cirugía de 3-5 horas. Despertar en URPA con analgesia controlada.','Control de glucemia cada 4 horas (normal que suba por el estrés quirúrgico).','Pequeños sorbos de agua a partir de las 4-6 horas si está autorizado.'] },
  { periodo: 'Días 1–2', titulo: 'Tolerancia oral fraccionada', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Empieza la alimentación fraccionada: 6-8 tomas pequeñas al día, 150-200 mL cada vez.','Te levantarás y caminarás con ayuda desde el día 1.','Se retirará la sonda urinaria en el día 1.'] },
  { periodo: 'Días 3–5', titulo: 'Adaptación al nuevo estómago', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Dieta semilíquida avanzando a blanda. Siempre: comidas pequeñas, masticar bien, comer despacio.','Retirada del drenaje si los valores son correctos.','Atención al síndrome de dumping: mareo, sudoración o diarrea después de comer → normal las primeras semanas.'] },
  { periodo: 'Días 5–8', titulo: 'Alta hospitalaria', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta cuando toleres ≥ 1000 kcal/día en comidas fraccionadas, camines solo/a y el dolor sea leve.','Antes del alta: inyección de vitamina B12 (de por vida tras gastrectomía total).','Instrucciones sobre dumping, dieta y signos de alarma.'] },
  { periodo: 'Semanas 2–6', titulo: 'Adaptación en casa', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Vitamina B12: inyección mensual o sublingual diaria — de por vida.','Comidas pequeñas y frecuentes (6-8/día). Evitar azúcares simples.','Seguimiento con nutricionista para ajustar la dieta postgastrectomía.'] },
  { periodo: 'Semanas 4–6', titulo: 'Inicio quimioterapia adyuvante', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Si el oncólogo lo indica: inicio de FLOT adyuvante (4 ciclos cada 14 días).','TC de control y marcadores (CEA, CA 19-9).','Revisión cirugía + oncología médica + nutrición.'] },
]

const TIMELINE_SRP: Hito[] = [
  { periodo: 'Día 0 — Cirugía', titulo: 'Resección del sarcoma', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Cirugía compleja de 4-7 horas. Paso a Reanimación/URPA las primeras horas.','Catéter epidural torácico para el dolor: control excelente que permite moverte antes.','Puede que se hayan extirpado órganos adyacentes al sarcoma (riñón, parte del colon): lo sabrás al alta.'] },
  { periodo: 'Días 1–2', titulo: 'Primeros pasos', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Primera deambulación asistida con el fisioterapeuta desde el día 1.','Tolerancia oral: líquidos el día 0, dieta blanda a partir del día 1.','Analítica de control: hemoglobina, función renal, PCR.'] },
  { periodo: 'Días 3–5', titulo: 'Recuperación activa', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Dieta blanda. Retirada de drenajes si gasto < 50 mL/24 h.','Objetivo movilización: 2 horas fuera de cama al día.','Retirada del catéter epidural e inicio de analgesia oral.'] },
  { periodo: 'Días 5–7', titulo: 'Transición al alta', color: '#2E7D32', fondo: '#E8F5E9', items: ['Progresión de la movilización: caminar de forma autónoma por el pasillo.','Analgesia completamente oral: paracetamol + antiinflamatorio suave.','Suplementos nutricionales proteicos (2/día) para ayudar a cicatrizar.'] },
  { periodo: 'Días 7–10', titulo: 'Alta hospitalaria', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Alta media 7-10 días. Inyecciones anticoagulantes (HBPM) durante 28 días — muy importante en sarcoma.','Continuar suplementos proteicos en casa 2-4 semanas más.','Revisión en consulta de cirugía a los 7-10 días.'] },
  { periodo: 'Semanas 3–8', titulo: 'Seguimiento y decisión adyuvante', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Comité de Sarcomas: decisión sobre radioterapia o quimioterapia adyuvante según el resultado final.','TC de control a las 6-8 semanas.','Rehabilitación física: programa progresivo para recuperar la fuerza y resistencia.'] },
]

const TIMELINES: Record<string, Hito[]> = { CRC: TIMELINE_CRC, CAP: TIMELINE_CAP, MH: TIMELINE_MH, CP: TIMELINE_CP, CG: TIMELINE_CG, SRP: TIMELINE_SRP }

// ── EN timelines ─────────────────────────────────────────────────────────────
const TIMELINE_CRC_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'Surgery day', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['You wake up in the recovery room.','You will have an IV drip and possibly a urinary catheter.','The anaesthetics team controls your pain with oral and IV medication.','You can take small sips of water from the first few hours.'] },
  { periodo: 'Day 1', titulo: 'First movements', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['You will get out of bed with help and walk around the room.','You can drink fluids (water, herbal tea, broth).','The urinary catheter will be removed.','Respiratory physiotherapy: deep breaths every hour.'] },
  { periodo: 'Days 2–3', titulo: 'Active recovery', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Walk the corridor 2–3 times a day.','Soft diet: purée, yoghurt, boiled rice. No high-fibre foods yet.','Passing wind or having a bowel movement is a good sign that the bowel is working.','The drip will be removed when you are drinking enough.'] },
  { periodo: 'Days 4–5', titulo: 'Discharge home', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Discharge if you walk independently, pain is controlled with oral tablets, and bowel function is active.','You will receive written instructions and follow-up appointments.','Wound staples/dressings: the surgeon will advise when to remove them.'] },
  { periodo: 'Weeks 2–4', titulo: 'At home', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Walk 20–30 min daily, increasing each day.','Normal adapted diet. Do not lift >5 kg for 4–6 weeks.','You can shower and lead an almost normal life. Avoid driving while taking opioids.'] },
  { periodo: 'Weeks 4–6', titulo: 'Outpatient review', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Surgeon appointment: wound check and pathology result.','Planning for adjuvant chemotherapy if indicated.','Progressive return to work and normal activity.'] },
]

const TIMELINE_CAP_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'Whipple surgery', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['4–7 hour surgery. You wake up in recovery or ITU according to the surgical plan.','You will have an abdominal drain, IV drip, and possibly a urinary catheter.','Blood glucose checks every 4 hours: pancreatic resection can alter sugar levels.'] },
  { periodo: 'Days 1–3', titulo: 'First days: close monitoring', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Very gradual oral intake: fluids from 6–12 hours.','Start pancreatic enzymes (Creon®) with every meal or oral supplement.','Glucose target 140–180 mg/dL. Insulin may be adjusted.','Urinary catheter removed day 1–2.'] },
  { periodo: 'Days 3–5', titulo: 'Progression', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Soft fractioned diet: 6 small meals a day.','Active mobilisation: walk the corridor several times a day.','Amylase tested in the abdominal drain: if normal, the drain is removed.'] },
  { periodo: 'Days 8–12', titulo: 'Hospital discharge', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Average discharge 8–12 days if evolution is favourable and no pancreatic fistula.','You will leave with pancreatic enzymes, insulin if required, and oral analgesia.'] },
  { periodo: 'Weeks 3–4', titulo: 'Review and nutrition', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Surgery clinic: wound check and pathology result.','Nutrition clinic: enzyme adjustment, diet and supplements.','No lifting >5 kg for 6–8 weeks.'] },
  { periodo: 'Weeks 6–8', titulo: 'Medical oncology', color: '#AA3D6E', fondo: '#F9EBF3', items: ['Start of adjuvant chemotherapy (mFOLFIRINOX or Gemcitabine + Capecitabine) if indicated.','Liver review and markers (CA 19-9, CEA).'] },
]

const TIMELINE_MH_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'Liver surgery', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['3–6 hour surgery. Transfer to recovery; ITU if major resection (≥3 segments).','Liver function monitoring: bilirubin, transaminases and prothrombin time from POD1.','You will have one or two perihepatic abdominal drains.'] },
  { periodo: 'Days 1–2', titulo: 'Early activation', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['You will stand and walk with help from day 1.','Oral intake: fluids on day 0, soft diet on day 1.','Abdominal ultrasound if the surgeon considers it to rule out biloma.'] },
  { periodo: 'Days 3–5', titulo: 'Progression', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Normal progressive diet. Drain removed if output <50 mL/24 h serous.','Active mobilisation: target >200 m walking per day.','Control blood tests: expected fall in transaminases and bilirubin.'] },
  { periodo: 'Days 5–7', titulo: 'Hospital discharge', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Discharge if blood tests stable, full oral intake, and no fever.','No lifting >5 kg or driving for 3–4 weeks.'] },
  { periodo: 'Weeks 2–3', titulo: 'Liver check', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Blood tests: AST/ALT/bilirubin. Coagulation if major hepatectomy.','Resume gentle activity: 30–45 min walking daily.','Normal diet; avoid alcohol for at least 3 months.'] },
  { periodo: 'Weeks 4–6', titulo: 'Oncological review', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['CT scan and markers (CEA, CA 19-9 if colorectal metastases).','Consider adjuvant chemotherapy (CAPOX or FOLFOX) if indicated.','Return to normal activity and work.'] },
]

const TIMELINE_CP_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'CRS + HIPEC', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['6–12 hour surgery. You always go to ICU/Resuscitation for the first 24–48 hours.','Intensive monitoring: blood pressure, urine output, temperature, sodium/potassium.','Thoracic epidural catheter for pain control: normal to feel numbness from the waist down.'] },
  { periodo: 'Days 1–2 (ICU)', titulo: 'Stabilisation', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['The team closely monitors your kidneys: heated chemotherapy can temporarily affect them.','If all goes well, transfer to the oncology ward on day 2.','Small sips of water when awake.'] },
  { periodo: 'Days 3–5', titulo: 'Start of recovery', color: '#7B5EA7', fondo: '#F0EBF9', items: ['First assisted walk along the corridor.','Fluids then progression to soft fractioned diet.','Daily blood tests: CRP, full blood count, renal and liver function.'] },
  { periodo: 'Days 5–8', titulo: 'Progression', color: '#2E7D32', fondo: '#E8F5E9', items: ['Gradual drain removal if output is serous with no signs of fistula.','Full oral diet if tolerance is good.','Active physiotherapy: target 2 hours out of bed per day.'] },
  { periodo: 'Days 10–14', titulo: 'Hospital discharge', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Average discharge 10–14 days. LMWH anticoagulant injections for 28 days at home.','Abdominal wound: normal for it to feel firm with mild discomfort for 4–6 weeks.','Outpatient review 10–14 days after discharge.'] },
  { periodo: 'Weeks 6–12', titulo: 'Oncological follow-up', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['CT reassessment and tumour markers.','Consideration of adjuvant systemic chemotherapy if indicated.','Progressive recovery: gentle physical activity, reinforced nutrition.'] },
]

const TIMELINE_CG_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'Gastrectomy', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['3–5 hour surgery. Waking in recovery with managed analgesia.','Blood glucose monitoring every 4 hours (normal to rise due to surgical stress).','Small sips of water from 4–6 hours if authorised.'] },
  { periodo: 'Days 1–2', titulo: 'Fractioned oral intake', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['Begin fractioned feeding: 6–8 small meals a day, 150–200 mL each time.','You will stand and walk with help from day 1.','Urinary catheter removed on day 1.'] },
  { periodo: 'Days 3–5', titulo: 'Adapting to the new stomach', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Semi-liquid diet advancing to soft. Always: small portions, chew well, eat slowly.','Drain removed if values are correct.','Watch for dumping syndrome: dizziness, sweating or diarrhoea after eating → normal in the first weeks.'] },
  { periodo: 'Days 5–8', titulo: 'Hospital discharge', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Discharge when tolerating ≥1000 kcal/day in fractioned meals, walking independently, and mild pain.','Before discharge: vitamin B12 injection (lifelong after total gastrectomy).','Instructions on dumping, diet, and warning signs.'] },
  { periodo: 'Weeks 2–6', titulo: 'Adapting at home', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Vitamin B12: monthly injection or daily sublingual — for life.','Small, frequent meals (6–8/day). Avoid simple sugars.','Dietitian follow-up to adjust post-gastrectomy diet.'] },
  { periodo: 'Weeks 4–6', titulo: 'Start of adjuvant chemotherapy', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['If the oncologist recommends it: start adjuvant FLOT (4 cycles every 14 days).','CT scan and markers (CEA, CA 19-9).','Surgery + medical oncology + nutrition review.'] },
]

const TIMELINE_SRP_EN: Hito[] = [
  { periodo: 'Day 0 — Surgery', titulo: 'Sarcoma resection', color: 'var(--color-principal)', fondo: '#E8EDF3', items: ['Complex 4–7 hour surgery. Transfer to resuscitation/recovery for the first hours.','Thoracic epidural catheter for pain: excellent control allowing earlier movement.','Adjacent organs may have been removed with the sarcoma (kidney, part of colon): you will be told at discharge.'] },
  { periodo: 'Days 1–2', titulo: 'First steps', color: 'var(--color-secundario)', fondo: 'var(--color-azul-claro)', items: ['First assisted walk with the physiotherapist from day 1.','Oral intake: fluids on day 0, soft diet from day 1.','Control blood tests: haemoglobin, renal function, CRP.'] },
  { periodo: 'Days 3–5', titulo: 'Active recovery', color: '#7B5EA7', fondo: '#F0EBF9', items: ['Soft diet. Drains removed if output <50 mL/24 h.','Mobilisation target: 2 hours out of bed per day.','Epidural catheter removed and oral analgesia started.'] },
  { periodo: 'Days 5–7', titulo: 'Transition to discharge', color: '#2E7D32', fondo: '#E8F5E9', items: ['Progressive mobilisation: walking independently along the corridor.','Fully oral analgesia: paracetamol + mild anti-inflammatory.','Protein supplements (2/day) to support healing.'] },
  { periodo: 'Days 7–10', titulo: 'Hospital discharge', color: 'var(--color-acento)', fondo: 'var(--color-verde-claro)', items: ['Average discharge 7–10 days. LMWH anticoagulant injections for 28 days — very important in sarcoma.','Continue protein supplements at home for a further 2–4 weeks.','Surgery clinic review 7–10 days after discharge.'] },
  { periodo: 'Weeks 3–8', titulo: 'Follow-up and adjuvant decision', color: 'var(--color-alerta)', fondo: 'var(--color-ambar-claro)', items: ['Sarcoma Committee: decision on adjuvant radiotherapy or chemotherapy based on the final result.','CT scan at 6–8 weeks.','Physical rehabilitation: progressive programme to recover strength and endurance.'] },
]

const TIMELINES_EN: Record<string, Hito[]> = { CRC: TIMELINE_CRC_EN, CAP: TIMELINE_CAP_EN, MH: TIMELINE_MH_EN, CP: TIMELINE_CP_EN, CG: TIMELINE_CG_EN, SRP: TIMELINE_SRP_EN }

// ── Componente ───────────────────────────────────────────────────────────────
export function MiRecuperacion() {
  const { patologia } = useParams<{ patologia: string }>()
  const { lang, t } = useLanguage()

  const timeline = lang === 'en'
    ? (patologia && TIMELINES_EN[patologia] ? TIMELINES_EN[patologia] : TIMELINE_CRC_EN)
    : (patologia && TIMELINES[patologia] ? TIMELINES[patologia] : TIMELINE_CRC)

  const info = t.recoveryPage.infoPatologia[patologia as keyof typeof t.recoveryPage.infoPatologia]
    ?? t.recoveryPage.infoPatologia['CRC']

  // ERAS only applies to CRC, SRP, MH — not CP, CAP, CG
  const isEras = ['CRC', 'SRP', 'MH'].includes(patologia ?? '')

  return (
    <div>
      {/* Recovery protocol banner — ERAS or conventional */}
      <div style={{
        borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '16px',
        backgroundColor: isEras ? 'var(--color-recovery-bg)' : 'var(--color-surface-2)',
        borderLeft: `4px solid ${isEras ? 'var(--color-recovery)' : 'var(--color-text-muted)'}`,
      }}>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: isEras ? 'var(--color-recovery)' : 'var(--color-text-secondary)', marginBottom: '4px' }}>
          {isEras ? t.recoveryPage.erasBanner : t.recoveryPage.convBanner}
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>
          {isEras ? t.recoveryPage.erasDesc : t.recoveryPage.convDesc}
        </p>
      </div>

      {/* Estancia media */}
      <div style={{
        padding: '16px 20px', marginBottom: '24px',
        display: 'flex', gap: '16px', alignItems: 'center',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ textAlign: 'center', flexShrink: 0, minWidth: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: 'var(--color-navy)',
            lineHeight: 1,
          }}>
            {info.estancia.split(' ')[0]}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.recoveryPage.daysApprox}</p>
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
            {t.recoveryPage.avgStay} {info.estancia}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            {info.nota}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
        {t.recoveryPage.timelineTitle}
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: '21px', top: '22px', bottom: '22px', width: '2px',
          backgroundColor: 'var(--color-border)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {timeline.map((hito, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
              <div style={{
                width: '44px', height: '44px',
                borderRadius: 'var(--radius-full)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)', fontWeight: 700,
                flexShrink: 0, zIndex: 10,
                backgroundColor: hito.fondo,
                border: `2px solid ${hito.color}`,
                color: hito.color,
              }}>
                {i + 1}
              </div>
              <div style={{
                flex: 1, borderRadius: 'var(--radius-md)', padding: '20px',
                backgroundColor: hito.fondo,
                marginBottom: '4px',
              }}>
                <p className="label-caps" style={{ color: hito.color, marginBottom: '4px' }}>
                  {hito.periodo}
                </p>
                <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '10px', lineHeight: '1.3' }}>
                  {hito.titulo}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {hito.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', minHeight: '40px', alignItems: 'flex-start' }}>
                      <span style={{ color: hito.color, fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>·</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: '1.5' }}>{item}</span>
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
