import type { EjercicioDia, NivelActividad } from '../types'

// ── Plan BAJA actividad (sedentario) ────────────────────────────────────────
const PLAN_BAJA: EjercicioDia[] = [
  {
    dia: 'Lunes',
    tipo: 'aerobico',
    duracion: '15 min',
    descripcion: 'Camina despacio por casa o por la calle. Paso cómodo, sin agitarte. Borg 9–11 ("muy ligero").',
    descripcionEn: 'Walk slowly indoors or outside at a comfortable pace. No breathlessness. Borg 9–11 ("very light").',
    intensidad: 3,
  },
  {
    dia: 'Martes',
    tipo: 'fuerza',
    duracion: '15 min',
    descripcion: 'Ejercicios en silla: elevar talones y puntas, levantar los brazos por encima de la cabeza, abrir y cerrar manos. 10 repeticiones de cada.',
    descripcionEn: 'Chair exercises: raise heels and toes, lift arms overhead, open and close hands. 10 repetitions each.',
    intensidad: 2,
  },
  {
    dia: 'Miércoles',
    tipo: 'respiratorio',
    duracion: '10 min',
    descripcion: 'Respiraciones lentas y profundas: inspira 4 segundos, aguanta 2, espira 6. 20 repeticiones. Puedes hacerlo sentado.',
    descripcionEn: 'Slow deep breathing: inhale 4 s, hold 2 s, exhale 6 s. 20 repetitions. Can be done seated.',
    intensidad: 1,
  },
  {
    dia: 'Jueves',
    tipo: 'aerobico',
    duracion: '20 min',
    descripcion: 'Camina un poco más que el lunes. Si el lunes fue bien, intenta mantener el ritmo 20 minutos seguidos. Borg 10–12.',
    descripcionEn: 'Walk slightly more than Monday. If Monday went well, try to keep the pace for 20 minutes straight. Borg 10–12.',
    intensidad: 3,
  },
  {
    dia: 'Viernes',
    tipo: 'fuerza',
    duracion: '15 min',
    descripcion: 'De pie, apoyado en una silla: elevar una pierna lentamente y bajarla. Alternar. Ponerse de puntillas 10 veces. Subir y bajar un escalón si tienes.',
    descripcionEn: 'Standing with chair support: slowly raise one leg and lower. Alternate. Rise onto tiptoes 10 times. Step up and down a stair if available.',
    intensidad: 2,
  },
  {
    dia: 'Sábado',
    tipo: 'aerobico',
    duracion: '25 min',
    descripcion: 'Paseo tranquilo a tu ritmo. Puedes ir acompañado. Lo importante es no pararte. Si necesitas descansar, siéntate 2 min y continúa.',
    descripcionEn: 'Gentle stroll at your own pace. Company welcome. The key is to keep going. Sit for 2 min if needed, then continue.',
    intensidad: 2,
  },
  {
    dia: 'Domingo',
    tipo: 'descanso',
    duracion: 'Descanso',
    descripcion: 'Descansa. Si quieres moverte, unos estiramientos suaves de 10 min son perfectos. Escucha a tu cuerpo.',
    descripcionEn: 'Rest. If you want to move, 10 min of gentle stretching is perfect. Listen to your body.',
    intensidad: 1,
  },
]

// ── Plan MODERADA actividad (activo ocasional) ──────────────────────────────
const PLAN_MODERADA: EjercicioDia[] = [
  {
    dia: 'Lunes',
    tipo: 'aerobico',
    duracion: '30 min',
    descripcion: 'Caminar a paso rápido o bicicleta estática. Mantén un ritmo en el que puedas hablar pero notes el esfuerzo. Borg 12–14.',
    descripcionEn: 'Brisk walking or stationary bike. Maintain a pace where you can talk but feel the effort. Borg 12–14.',
    intensidad: 5,
  },
  {
    dia: 'Martes',
    tipo: 'fuerza',
    duracion: '25 min',
    descripcion: 'Ejercicios de fuerza con bandas elásticas o pesas ligeras: sentadillas, curl de bíceps, prensa de hombros. 3 series × 12 repeticiones.',
    descripcionEn: 'Strength exercises with elastic bands or light weights: squats, bicep curl, shoulder press. 3 sets × 12 reps.',
    intensidad: 5,
  },
  {
    dia: 'Miércoles',
    tipo: 'respiratorio',
    duracion: '15 min',
    descripcion: 'Entrenamiento muscular inspiratorio (IMT): 30 respiraciones profundas con el Threshold IMT. Ejercicios de expansión torácica.',
    descripcionEn: 'Inspiratory muscle training (IMT): 30 deep breaths with Threshold IMT. Chest expansion exercises.',
    intensidad: 3,
  },
  {
    dia: 'Jueves',
    tipo: 'aerobico',
    duracion: '30 min',
    descripcion: 'Natación, bicicleta o caminar. Si te sientes cansado, reduce a 20 min pero no te saltes el día. Borg 12–14.',
    descripcionEn: 'Swimming, cycling or walking. If tired, reduce to 20 min but do not skip the day. Borg 12–14.',
    intensidad: 5,
  },
  {
    dia: 'Viernes',
    tipo: 'fuerza',
    duracion: '25 min',
    descripcion: 'Piernas y core: puentes de glúteos, elevación de piernas, peso muerto con banda elástica. 3 series × 12 repeticiones.',
    descripcionEn: 'Legs and core: glute bridges, leg raises, banded deadlift. 3 sets × 12 reps.',
    intensidad: 5,
  },
  {
    dia: 'Sábado',
    tipo: 'aerobico',
    duracion: '45 min',
    descripcion: 'Paseo largo, senderismo suave o actividad que disfrutes. Día de actividad prolongada a intensidad baja-moderada. Borg 11–13.',
    descripcionEn: 'Long walk, easy hike, or activity you enjoy. Extended low-moderate intensity session. Borg 11–13.',
    intensidad: 3,
  },
  {
    dia: 'Domingo',
    tipo: 'descanso',
    duracion: 'Descanso activo',
    descripcion: 'Estiramiento suave 10–15 min. Paseo tranquilo si apetece. Tu cuerpo necesita recuperarse para progresar.',
    descripcionEn: 'Active rest: 10–15 min gentle stretching. A short walk if you feel like it. Your body needs to recover to progress.',
    intensidad: 1,
  },
]

// ── Plan ALTA actividad (deportista habitual) ───────────────────────────────
const PLAN_ALTA: EjercicioDia[] = [
  {
    dia: 'Lunes',
    tipo: 'aerobico',
    duracion: '40 min',
    descripcion: 'Carrera suave, bicicleta o elíptica. Mantén Borg 13–15 durante al menos 25 min. Calienta 5 min y enfría 5 min.',
    descripcionEn: 'Easy run, cycling or elliptical. Maintain Borg 13–15 for at least 25 min. Warm up 5 min, cool down 5 min.',
    intensidad: 7,
  },
  {
    dia: 'Martes',
    tipo: 'fuerza',
    duracion: '35 min',
    descripcion: 'Circuito funcional: sentadillas con peso, press de banca o flexiones, remo con mancuerna, peso muerto. 4 series × 10–12 repeticiones.',
    descripcionEn: 'Functional circuit: weighted squats, bench press or push-ups, dumbbell row, deadlift. 4 sets × 10–12 reps.',
    intensidad: 7,
  },
  {
    dia: 'Miércoles',
    tipo: 'respiratorio',
    duracion: '20 min',
    descripcion: 'IMT (30 rep al 40–50% PImax) + 3 bloques de 3 minutos de cardio moderado-alto (Borg 14–15) con 2 min de descanso entre bloques.',
    descripcionEn: 'IMT (30 reps at 40–50% PImax) + 3 blocks of 3 min moderate-high cardio (Borg 14–15) with 2 min rest between blocks.',
    intensidad: 5,
  },
  {
    dia: 'Jueves',
    tipo: 'aerobico',
    duracion: '40 min',
    descripcion: 'Varía el ejercicio aeróbico respecto al lunes: natación, remo, carrera por terreno variado. Borg 13–15 sostenido.',
    descripcionEn: 'Vary from Monday: swimming, rowing, running on varied terrain. Sustained Borg 13–15.',
    intensidad: 7,
  },
  {
    dia: 'Viernes',
    tipo: 'fuerza',
    duracion: '35 min',
    descripcion: 'Énfasis en core y tren inferior: plancha 3×45s, sentadillas búlgaras, estocadas con peso, hip thrust. Mantén técnica cuidada.',
    descripcionEn: 'Core and lower body: plank 3×45s, Bulgarian split squats, weighted lunges, hip thrust. Maintain careful technique.',
    intensidad: 7,
  },
  {
    dia: 'Sábado',
    tipo: 'aerobico',
    duracion: '60 min',
    descripcion: 'Actividad larga a intensidad baja-moderada: senderismo, ciclismo, natación continuada. Borg 11–13. Hidratación cada 20 min.',
    descripcionEn: 'Long low-moderate activity: hiking, cycling, continuous swimming. Borg 11–13. Hydrate every 20 min.',
    intensidad: 5,
  },
  {
    dia: 'Domingo',
    tipo: 'descanso',
    duracion: 'Descanso activo',
    descripcion: 'Yoga, movilidad articular o estiramientos 20 min. Sin carga. Preparación mental para la semana. Aprovecha para meditar o respirar.',
    descripcionEn: 'Yoga, joint mobility or stretching 20 min. No load. Mental prep for the week. Take time to meditate or breathe.',
    intensidad: 1,
  },
]

export const PLANES_EJERCICIO: Record<NivelActividad, EjercicioDia[]> = {
  baja:     PLAN_BAJA,
  moderada: PLAN_MODERADA,
  alta:     PLAN_ALTA,
}

// Mantener compatibilidad con código que use PLAN_EJERCICIO_BASE
export const PLAN_EJERCICIO_BASE = PLAN_MODERADA

export const ESCALA_BORG = [
  { valor: 6,  descripcion: 'Nada de esfuerzo' },
  { valor: 7,  descripcion: 'Muy, muy ligero' },
  { valor: 8,  descripcion: 'Muy, muy ligero' },
  { valor: 9,  descripcion: 'Muy ligero' },
  { valor: 10, descripcion: 'Muy ligero' },
  { valor: 11, descripcion: 'Bastante ligero' },
  { valor: 12, descripcion: 'Bastante ligero' },
  { valor: 13, descripcion: 'Un poco duro' },
  { valor: 14, descripcion: 'Un poco duro' },
  { valor: 15, descripcion: 'Duro' },
  { valor: 16, descripcion: 'Duro' },
  { valor: 17, descripcion: 'Muy duro' },
  { valor: 18, descripcion: 'Muy duro' },
  { valor: 19, descripcion: 'Muy, muy duro' },
  { valor: 20, descripcion: 'Esfuerzo máximo' },
]

export const ZONA_OBJETIVO: Record<NivelActividad, { min: number; max: number }> = {
  baja:     { min: 10, max: 12 },
  moderada: { min: 12, max: 14 },
  alta:     { min: 13, max: 15 },
}
