import { DaySchedule, TargetAudience, FaqItem } from "@/types";

export const EVENT_CONFIG = {
  nombreEvento: "El Bootcamp del Club",
  subtituloEvento: "3 Días de Clases de Trading en Vivo por Zoom",
  promesaPrincipal: "Aprende trading real en sesiones en vivo sin que te vendan un curso de $1,000.",
  modalidad: "100% Gratuito en Vivo por Zoom",
  horario: "En las noches (Hora Ecuador · GMT-5)",
  duracion: "3 Clases en Vivo",
  
  // Enlaces de conversión
  whatsappGroupUrl: "https://chat.whatsapp.com/invite/clubtraders-bootcamp", // Enlace de invitación al grupo
  whatsappDirect: "593999421378", // WhatsApp de contacto / soporte
  
  mentor: {
    nombre: "Richard Veintimilla",
    cargo: "Trader Profesional & Fundador de Club de Traders",
    experiencia: "+7 años de experiencia en mercado real",
    alumnos: "+500 alumnos formados",
    filosofia: "El trading real se basa en lectura institucional de liquidez, estrategia probada y disciplina matemática. Cero fórmulas mágicas.",
    foto: "/richard-veintimilla-live.png",
    flyerHorario: "/richard-gotrader-schedule.png",
  },
  
  academia: {
    nombre: "Club de Traders",
    lema: "Traders en Evolución",
    logo: "/clubtraders-logo.png",
    email: "Clubtraders@outlook.com",
    webOficial: "https://www.clubtraderec.com",
  },
  
  mercados: [
    { nombre: "Oro (XAU/USD)", desc: "Lectura de liquidez institucional y zonas de alta reacción" },
    { nombre: "Forex (EUR/USD)", desc: "Estructura de precio y horarios clave de volatilidad" },
    { nombre: "Índices (US30 / US100)", desc: "Aperturas de New York y continuidad tendencial" }
  ],
  
  cronograma: [
    {
      dia: "DÍA 1",
      fase: "ENTIENDE & ANALIZA",
      titulo: "Fundamentos, Lógica de Mercado & Estructura Real",
      desc: "Cómo funciona el mercado real de Oro y Forex sin indicadores rezagados. Derribamos los mitos del trading y aprendemos a leer la estructura que mueve el precio institucional.",
      entregable: "Checklist del Trader: Mapa de Estructura Institucional (PDF)"
    },
    {
      dia: "DÍA 2",
      fase: "CONSTRUYE TU MÉTODO",
      titulo: "Estrategia Operativa & Gestión Matemática de Riesgo",
      desc: "Zonas de alta probabilidad, puntos de entrada con ratio riesgo/beneficio favorable y las reglas inquebrantables de preservación de capital para no quemar cuentas.",
      entregable: "Plantilla de Plan de Trading & Calculadora de Lotaje (PDF)"
    },
    {
      dia: "DÍA 3",
      fase: "OPERA EN VIVO + COMUNIDAD",
      titulo: "Sesión Operativa en Tiempo Real & Acceso VIP",
      desc: "Análisis en directo con Richard Veintimilla. Presentación del Grupo VIP de Clases Semanales en Broker XM y dinámica del Sorteo de $100 extra para 3 alumnos.",
      entregable: "Bitácora Profesional de Registro de Operaciones (PDF)"
    }
  ] as DaySchedule[],
  
  audiencia: [
    {
      tipo: "Principiante",
      frase: "\"No sé por dónde empezar\"",
      desc: "Buscas claridad y bases sólidas sin el riesgo de caer en infoproductos costosos de $1,000. Deseas entender la lógica del mercado desde cero con honestidad."
    },
    {
      tipo: "En Inconsistencia",
      frase: "\"Sé teoría, pero no tengo método\"",
      desc: "Tienes conceptos dispersos de YouTube pero te falta una estructura disciplinada. Valoras ver cómo un trader real analiza y aplica su método en vivo."
    },
    {
      tipo: "Trader Activo",
      frase: "\"Quiero validar mis escenarios\"",
      desc: "Buscas acompañamiento, una comunidad activa e ideas de mercado para no operar en soledad. Te interesa acceder al seguimiento continuo del Club."
    }
  ] as TargetAudience[],
  
  faq: [
    {
      q: "¿Realmente es 100% gratuito?",
      a: "Sí. Las 3 clases en vivo por Zoom son completamente gratuitas. No te venderemos ningún curso de $1,000 antes, durante ni después del evento."
    },
    {
      q: "¿Dónde se enviarán los enlaces de Zoom?",
      a: "Exclusivamente en el Grupo Oficial de WhatsApp. Una vez que completes tu registro, serás redirigido directamente para unirte al grupo."
    },
    {
      q: "¿Necesito experiencia previa para asistir?",
      a: "No. El Bootcamp está diseñado tanto para personas que parten desde cero absoluto como para quienes ya operan pero buscan consistencia y metodología."
    },
    {
      q: "¿A qué hora son las sesiones en vivo?",
      a: "Las clases se impartirán por las noches en horario de Ecuador (GMT-5). El enlace de acceso y recordatorios se enviarán al grupo con antelación."
    },
    {
      q: "¿Qué es el Checklist del Trader descargable?",
      a: "Es un material complementario en PDF que Richard compartirá en el grupo de WhatsApp al finalizar cada sesión, para que puedas aplicar lo aprendido en tus gráficos."
    }
  ] as FaqItem[]
};
