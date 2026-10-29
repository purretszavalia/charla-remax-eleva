// ============================================================
// CONTENIDO DE LA PRESENTACIÓN
// Acá vive TODO el texto: es un array de slides en orden.
// El número de slide = su posición en el array (la 1ª es la slide 1).
//
// Cada slide tiene:
//   id      -> identificador estable (no cambia aunque reordenes)
//   etapa   -> para la barra de etapas de arriba (Mostrar/Contactar/
//              Acompañar/Cerrar). Las slides 1 y 2 no llevan barra.
//   layout  -> qué plantilla usa (ver los layouts más abajo)
//   notas   -> texto para el presentador (por ahora no se muestra)
//   ...     -> el contenido VISIBLE, según el layout
//
// Regla: una idea por slide. Máx ~6 ítems y ~45 palabras visibles.
// Para pedir un cambio: "en la slide 7 cambiá X".
// ============================================================

export type Etapa = "Mostrar" | "Contactar" | "Acompañar" | "Cerrar";

// El orden de las etapas (para la barra de arriba).
export const ETAPAS: Etapa[] = ["Mostrar", "Contactar", "Acompañar", "Cerrar"];

export type Layout =
  | "portada"
  | "proceso"
  | "dos-columnas"
  | "lista-conclusion"
  | "dos-tarjetas"
  | "destacado-lista"
  | "perfil-mockup"
  | "lista-tips"
  | "comparacion"
  | "chat"
  | "lista-dato"
  | "imagen"
  | "imagenes";

/** Una columna (layout dos-columnas). */
export type Columna = {
  titulo?: string;
  items?: string[];
  etiqueta?: string; // etiqueta destacada al pie de la columna
  // Fila de íconos de redes (solo se usa en la slide 3).
  // Son claves, no logos: "instagram" | "facebook" | "tiktok" | "email" | "whatsapp".
  redes?: string[];
};

export type Slide = {
  id: string;
  etapa?: Etapa; // sin etapa = sin barra (slides 1 y 2)
  layout: Layout;
  notas?: string;

  // --- Campos visibles (según el layout) ---
  antetitulo?: string;
  titulo?: string;
  subtitulo?: string;

  // proceso (slide 2)
  pregunta?: string;
  intro?: string;
  etapasDetalle?: { nombre: string; detalle: string }[];

  // listas
  items?: string[];
  pie?: string;

  // destacado-lista
  frase?: string;
  introResaltar?: string; // substring de `intro` a pintar en color de acento
  cierre?: string; // conclusión corta, separada de la lista (ej.: "Copialo.")

  // imagen (slide a pantalla con una sola imagen)
  imagen?: { src: string; alt: string };

  // imagenes (varias imágenes en fila, a pantalla)
  imagenes?: { src: string; alt: string }[];

  // dos-columnas
  col1?: Columna;
  col2?: Columna;

  // lista-conclusion
  conclusion?: { titulo: string; items: string[] };

  // dos-tarjetas
  tarjetas?: { numero: number; texto: string }[];

  // perfil-mockup
  mockup?: { numero: number; titulo: string; detalle: string }[];

  // lista-tips
  tips?: { titulo: string; items: string[] };

  // comparacion
  destacado?: string;
  comparacion?: {
    largo: { titulo: string; pasos: string[] };
    corto: { titulo: string; pasos: string[] };
  };

  // chat
  chat?: { de: "cliente" | "asesor"; texto: string }[];

  // lista-dato
  dato?: { valor: string; texto: string; fuente?: string };
};

export const slides: Slide[] = [
  // ------------------------------------------------- 1 · Portada
  {
    id: "portada",
    layout: "portada",
    antetitulo: "RE/MAX Eleva",
    titulo: "Simplificando el Marketing y Proceso de ventas",
  },

  // ------------------------------------------------- 2 · El proceso, simple
  {
    id: "proceso",
    layout: "proceso",
    pregunta: "¿Qué tengo que hacer? Vender la casa.",
    intro: "Para eso, tengo que:",
    etapasDetalle: [
      { nombre: "Mostrar", detalle: "a gente interesada y calificada" },
      { nombre: "Contactar", detalle: "entablar contacto con ellos" },
      { nombre: "Acompañar", detalle: "despejar sus dudas y asesorarlos" },
      { nombre: "Cerrar", detalle: "la venta" },
    ],
    notas:
      "Esta es la guía de toda la charla. Cada slide que sigue vive en una de estas etapas.",
  },

  // ------------------------------------------------- 3 · ¿Dónde encuentro a esa gente?
  {
    id: "donde-encuentro",
    etapa: "Mostrar",
    layout: "dos-columnas",
    titulo: "¿Dónde encuentro gente interesada y calificada para mostrar la casa?",
    col1: {
      titulo: "1. La red RE/MAX",
      items: [
        "La más obvia: tiene un interés e intención evidente.",
        "Asegurate de que esté lo mejor posible: buenas fotos, buena descripción, siguiendo la guía de RE/MAX.",
      ],
      etiqueta: "Poco esfuerzo · Alto impacto",
    },
    col2: {
      titulo: "2. Otros canales",
      redes: ["instagram", "facebook", "tiktok", "email", "whatsapp"],
      items: [
        "Hay muchas opciones, y cada una cuesta tiempo y foco.",
        "Elegí 1 canal y hacete fuerte ahí.",
        "Probá otros como experimento, pero profesionalizá uno.",
      ],
    },
    notas:
      "No hace falta estar en todos lados. Cada canal es como sumar un trabajo nuevo.",
  },

  // ------------------------------------------------- 4 · ¿Cómo elijo ese canal?
  {
    id: "elegir-canal",
    etapa: "Mostrar",
    layout: "lista-conclusion",
    titulo: "¿Cómo elijo ese canal?",
    items: [
      "Preguntale a otros vendedores a los que les vaya bien cuál usan.",
      "¿Cuál tiene menor barrera de entrada para vos?",
      "¿Cuál te da más alcance con menos esfuerzo?",
    ],
    conclusion: {
      titulo: "Mi elección: Instagram",
      items: [
        "Mucho alcance",
        "No es difícil de usar",
        "Lo usa la mayoría de la gente, o su círculo cercano",
      ],
    },
  },

  // ------------------------------------------------- 5 · ¿Qué necesito para mostrar la casa ahí?
  {
    id: "que-necesito",
    etapa: "Mostrar",
    layout: "dos-tarjetas",
    titulo: "¿Qué necesito para mostrar la casa en ese canal?",
    tarjetas: [
      { numero: 1, texto: "Un perfil" },
      { numero: 2, texto: "Contenido" },
    ],
    notas:
      "Dos cosas. Para las dos, antes de arrancar, mirá a quién ya le funciona (slide siguiente).",
  },

  // ------------------------------------------------- 6 · No hay que reinventar la rueda
  {
    id: "reinventar-rueda",
    etapa: "Mostrar",
    layout: "destacado-lista",
    frase: "No hay que reinventar la rueda.",
    intro: "Buscá gente a la que le esté yendo bien y analizala:",
    introResaltar: "yendo bien",
    items: [
      "¿Cómo tienen configurado su perfil?",
      "¿Qué contenido suben más seguido?",
      "¿Qué repiten?",
    ],
    cierre: "Copialo.",
    pie: "Ellos ya aprendieron qué funciona y qué no. Ahorrate ese camino.",
    notas:
      "Elegí unos 5 referentes. Mirá cómo armaron el perfil (foto, nombre, bio, link, destacadas), sus publicaciones con más vistas, cómo muestran las casas y cada cuánto publican.",
  },

  // ------------------------------------------------- 7 · Un perfil bien hecho
  {
    id: "perfil",
    etapa: "Mostrar",
    layout: "perfil-mockup",
    titulo: "¿Qué tiene que tener el perfil?",
    col1: {
      titulo: "Lo básico",
      items: [
        "Separá lo personal de lo laboral",
        "Consistencia: misma frecuencia y mismo tipo de contenido",
        "Una buena foto (con ChatGPT podés mejorarla)",
      ],
    },
    mockup: [
      { numero: 1, titulo: "Foto", detalle: "profesional, que se parezca a vos" },
      {
        numero: 2,
        titulo: "Nombre",
        detalle: "tu nombre + qué hacés + zona (ej.: “Ana Pérez | Casas en Córdoba”)",
      },
      {
        numero: 3,
        titulo: "Bio",
        detalle: "qué hacés, dónde y para quién + “Escribime por WhatsApp 👇”",
      },
      { numero: 4, titulo: "Link o botón", detalle: "directo a tu WhatsApp" },
      {
        numero: 5,
        titulo: "Historias destacadas",
        detalle: "Disponibles · Vendidas · Sobre mí · Zonas",
      },
      { numero: 6, titulo: "Publicaciones", detalle: "solo propiedades" },
    ],
    notas:
      "Cuenta profesional: te da estadísticas y botones de contacto, incluido el de WhatsApp. El nombre es lo que aparece cuando alguien busca, por eso lleva qué hacés y dónde. Prompt para la foto: “Mejorá esta foto para usarla como foto de perfil profesional: fondo neutro, buena luz, encuadre de hombros para arriba. Mantené mi cara exactamente igual, sin cambiar mis rasgos.” Si sigo una cuenta de casas y me sube el cumpleaños del sobrino, la dejo de seguir.",
  },

  // ------------------------------------------------- 8 · Ejemplo de perfil (imagen)
  {
    id: "perfil-ejemplo",
    etapa: "Mostrar",
    layout: "imagen",
    imagen: {
      src: "/perfil-ejemplo.webp",
      alt: "Ejemplo de un perfil de asesor inmobiliario en Instagram",
    },
    notas:
      "Un ejemplo armado de cómo quedaría el perfil aplicando todo lo anterior: foto, nombre con qué hacés y zona, bio con llamado a WhatsApp, link, destacadas y publicaciones de propiedades.",
  },

  // ------------------------------------------------- 9 · Contenido: ¿cómo lo subo?
  {
    id: "contenido",
    etapa: "Mostrar",
    layout: "lista-tips",
    titulo: "Contenido: ¿cómo lo subo?",
    items: [
      "Seguí la guía de RE/MAX",
      "Formatos: carruseles y reels",
      "Mirá cómo lo suben los que les va bien",
      "Mostrá lo que le importa a tu comprador",
    ],
    tips: {
      titulo: "Para grabar",
      items: ["Buena luz", "Buen audio", "Andá con un plan"],
    },
    notas:
      "No es lo mismo un depto en Nueva Córdoba (cerca de facultades, transporte, seguridad) que una casa en un country (espacios grandes, lugares para compartir, cocina). Con un buen celular, un micrófono inalámbrico y CapCut alcanza.",
  },

  // ------------------------------------------------- 10 · Contactar: reducí fricciones
  {
    id: "contactar",
    etapa: "Contactar",
    layout: "comparacion",
    titulo: "Ya llegaste a mucha gente. ¿Cómo hacés que te contacten?",
    destacado: "REDUCÍ FRICCIONES",
    comparacion: {
      largo: {
        titulo: "Teléfono escrito en la foto",
        pasos: [
          "Captura de pantalla",
          "Anotar el número",
          "Agendarlo",
          "Abrir el chat y escribir",
        ],
      },
      corto: {
        titulo: "Link en la bio a WhatsApp Business",
        pasos: ["Tocar", "Chat abierto"],
      },
    },
    notas:
      "Fricción es cada paso extra que tiene que hacer el cliente. Cada paso te hace perder consultas. También podés sumar el botón de WhatsApp en el perfil (cuenta profesional + WhatsApp Business, desde Editar perfil → Opciones de contacto). En los reels el link del texto no se puede tocar: decí “escribime desde el botón de WhatsApp de mi perfil”.",
  },

  // ------------------------------------------------- 11 · Acompañar: preparate para las dudas
  {
    id: "acompanar",
    etapa: "Acompañar",
    layout: "dos-columnas",
    titulo: "Te van a preguntar lo mismo 10 veces",
    col1: {
      titulo: "Prepará",
      items: [
        "Plantillas con la info de la casa",
        "Respuestas rápidas en WhatsApp Business (se mandan escribiendo “/”)",
        "Una imagen-ficha con los datos de la casa",
      ],
    },
    col2: {
      titulo: "Catálogo de WhatsApp Business",
      items: [
        "Cada propiedad cargada con fotos, precio y descripción",
        "La mandás en un toque",
      ],
    },
    notas:
      "Las preguntas típicas son precio, expensas, metros, si es apta crédito, ubicación y horarios de visita. Escribilas una vez.",
  },

  // ------------------------------------------------- 12 · Ejemplo: WhatsApp Business (imágenes)
  {
    id: "whatsapp-ejemplo",
    etapa: "Acompañar",
    layout: "imagenes",
    imagenes: [
      {
        src: "/whatsapp-info.webp",
        alt: "Perfil de empresa en WhatsApp Business de una inmobiliaria",
      },
      {
        src: "/whatsapp-catalogo.webp",
        alt: "Catálogo de propiedades en WhatsApp Business",
      },
      {
        src: "/whatsapp-ficha.webp",
        alt: "Ficha de una propiedad del catálogo de WhatsApp Business",
      },
    ],
    notas:
      "Ejemplo real: perfil de empresa, catálogo de propiedades y la ficha de una propiedad lista para mandar en un toque.",
  },

  // ------------------------------------------------- 13 · El objetivo de la interacción
  {
    id: "objetivo",
    etapa: "Acompañar",
    layout: "chat",
    titulo: "Mandar la info no alcanza",
    subtitulo:
      "El objetivo es una llamada o reunión, para conocer de verdad qué busca el cliente.",
    chat: [
      { de: "cliente", texto: "Hola, vi la casa en tu Instagram. ¿Me pasás info?" },
      { de: "asesor", texto: "[Ficha de la casa]" },
      {
        de: "asesor",
        texto:
          "Te dejo la info. Si querés, coordinamos una llamada o una visita y vemos si esta es la mejor opción para vos, o si tengo otras que se ajusten mejor a lo que buscás.",
      },
    ],
    notas:
      "En esa reunión conocés al cliente y sus intenciones. Puede que esa casa sea la mejor para él, o que puedas asesorarlo con otra. Primero la info, después la propuesta en un mensaje aparte.",
  },

  // ------------------------------------------------- 14 · Seguimiento
  {
    id: "seguimiento",
    etapa: "Cerrar",
    layout: "lista-dato",
    titulo: "Seguimiento: que no se muera en el primer mensaje",
    items: [
      "Contactos bien separados: WhatsApp laboral aparte del personal, y etiquetas por etapa (Nuevo · Respondido · Reunión agendada · En seguimiento)",
      "Tiempo diario fijo para responder y hacer seguimiento",
      "Mensajes lo más personalizados posible",
    ],
    dato: {
      valor: "7×",
      texto:
        "más chances de lograr una conversación respondiendo en la primera hora vs. una hora después",
      fuente: "Harvard Business Review, 2011.",
    },
  },
];
