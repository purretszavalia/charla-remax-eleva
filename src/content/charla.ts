// ============================================================
// CONTENIDO DE LA PRESENTACIÓN (DECK DE SLIDES)
// Acá vive TODO el contenido: es un array de slides en orden.
// El número de slide = su posición en el array (la 1ª es la slide 1).
//
// Cada slide tiene:
//   id       -> identificador estable (no cambia aunque reordenes)
//   seccion  -> lo que muestra el indicador arriba a la izquierda (ej. "Paso 7")
//   layout   -> qué plantilla usa (ver más abajo los layouts disponibles)
//   notas    -> texto para el presentador (el texto completo de esa idea)
//   ...      -> el contenido VISIBLE, según el layout
//
// Regla: una idea por slide. Lo visible es corto (se lee en 5 segundos
// desde el fondo de una sala). El texto completo va en "notas".
// Para pedir un cambio: "en la slide 23 cambiá X".
// ============================================================

export type Layout =
  | "portada"
  | "divisor-paso"
  | "lista"
  | "dos-columnas"
  | "tabla"
  | "stats"
  | "comparacion"
  | "chat"
  | "destacado"
  | "tarjetas"
  | "grilla-preguntas"
  | "proceso"
  | "foto-texto";

/** Una columna del layout "dos-columnas". */
export type Columna = { titulo?: string; texto?: string; items?: string[] };

/** Un camino del layout "comparacion". */
export type Camino = { titulo: string; pasos: string[] };

export type Slide = {
  id: string;
  seccion: string;
  layout: Layout;
  notas?: string;

  // --- Campos visibles (se usan según el layout) ---
  antetitulo?: string;
  titulo?: string;
  bajada?: string;

  // divisor-paso
  numero?: number;
  pregunta?: string;
  respuesta?: string;

  // destacado
  texto?: string;
  sub?: string;
  variante?: "prompt"; // destacado con estilo de "texto para copiar/leer"

  // lista
  items?: string[];
  pie?: string;
  remate?: string; // frase destacada al final de una lista

  // dos-columnas
  izquierda?: Columna;
  derecha?: Columna;

  // tabla
  columnas?: string[];
  filas?: string[][];

  // stats
  stats?: { valor: string; etiqueta: string }[];
  fuente?: string;

  // tarjetas
  tarjetas?: { titulo: string; texto?: string }[];

  // grilla-preguntas
  preguntas?: { numero: number; pregunta: string; respuesta?: string }[];

  // proceso
  pasos?: { titulo: string }[];

  // comparacion
  comparacion?: { largo: Camino; corto: Camino };

  // chat
  chat?: { de: "cliente" | "asesor"; texto: string }[];

  // foto-texto
  foto?: string;
  nombre?: string;
  rol?: string;
};

// Las 11 preguntas con su respuesta corta (se usan en las grillas del cierre).
const LAS_11 = [
  { numero: 1, pregunta: "¿Qué tengo que hacer?", respuesta: "Vender una casa." },
  { numero: 2, pregunta: "¿A quién se la quiero vender?", respuesta: "Definí tu audiencia." },
  {
    numero: 3,
    pregunta: "¿Dónde está esa gente y cómo llego a la mayor cantidad?",
    respuesta: "RE/MAX + tu marketing personal.",
  },
  {
    numero: 4,
    pregunta: "¿Qué canal sumo además de RE/MAX?",
    respuesta: "El que, con menos esfuerzo y tus recursos, te lleve a más gente.",
  },
  {
    numero: 5,
    pregunta: "¿Qué necesito para abrir ese canal?",
    respuesta: "Un perfil bien armado y separado del personal.",
  },
  { numero: 6, pregunta: "¿Tengo que inventar todo desde cero?", respuesta: "No: benchmark." },
  {
    numero: 7,
    pregunta: "¿Qué le muestro a ese comprador?",
    respuesta: "La info que quiere ver, en reels y carruseles.",
  },
  { numero: 8, pregunta: "¿Cómo hago que me contacten?", respuesta: "Un toque hasta tu WhatsApp." },
  {
    numero: 9,
    pregunta: "¿Qué información va a necesitar?",
    respuesta: "Preparada en plantillas y catálogo.",
  },
  {
    numero: 10,
    pregunta: "¿Para qué es esta conversación?",
    respuesta: "Una reunión para asesorarlo.",
  },
  { numero: 11, pregunta: "¿Y después del primer contacto?", respuesta: "Orden y seguimiento." },
];

export const slides: Slide[] = [
  // ============================= INTRO =============================
  {
    id: "portada",
    seccion: "Intro",
    layout: "portada",
    antetitulo: "Charla para asesores · RE/MAX Eleva",
    titulo: "Marketing y proceso de ventas: de lo complejo a lo simple",
    bajada: "Menos herramientas, más sistema.",
    notas:
      "En marketing hay mil cosas para hacer (o dejar de hacer). No hace falta hacerlas todas. La clave es saber qué preguntas hacerte, buscar las respuestas sin complicarte la vida y armar algo consistente, con lo que te sientas cómodo. Vamos a partir de una pregunta simple —“tengo que vender una casa, ¿qué hago?”— y desglosarla paso a paso.",
  },
  {
    id: "intro-abruma",
    seccion: "Intro",
    layout: "destacado",
    texto: "En marketing hay mil cosas para hacer (o dejar de hacer).",
    sub: "No hace falta hacerlas todas.",
    notas:
      "Hay mucho contenido, muchos canales y muchas herramientas. Eso abruma. La propuesta de hoy es otra: antes de moverte, entendé el proceso.",
  },
  {
    id: "intro-propuesta",
    seccion: "Intro",
    layout: "lista",
    titulo: "La propuesta de hoy",
    items: [
      "Saber qué preguntas hacerte",
      "Buscar las respuestas sin complicarte",
      "Armar algo consistente, con lo que te sientas cómodo",
    ],
    pie: "“Tengo que vender una casa, ¿qué hago?”",
    notas:
      "Vamos a partir de una pregunta simple y desglosarla paso a paso, como lo pensaría yo si tuviera que hacerlo hoy.",
  },
  {
    id: "quien-soy",
    seccion: "Intro",
    layout: "foto-texto",
    foto: "/pedro.jpg",
    nombre: "Pedro Urrets",
    rol: "Marketing & Growth",
    titulo: "Quién soy",
    bajada:
      "No soy experto en vender casas. Soy experto en marketing: en armar procesos que llevan a una persona desde “no te conozco” hasta “quiero hablar con vos”.",
    notas:
      "Fui la primera persona de marketing en Humand (Y Combinator W22). Cuando llegué, marketing no existía: había una web y un flujo de contactos a ventas que perdía gente en casi todos los pasos. En tres años y medio armamos todo desde cero.",
  },
  {
    id: "humand-stats",
    seccion: "Intro",
    layout: "stats",
    titulo: "Humand, en números",
    stats: [
      { valor: "1 → ~60", etiqueta: "personas en marketing" },
      { valor: "#1", etiqueta: "canal de adquisición" },
      { valor: "~60 → 1.500+", etiqueta: "clientes" },
      { valor: "6 → 51", etiqueta: "países" },
      { valor: "USD 66M", etiqueta: "Serie A más grande de LATAM" },
    ],
    notas:
      "Fui la primera persona de marketing en Humand (Y Combinator W22). En tres años y medio armamos todo desde cero. El canal #1 de adquisición eran los clientes que llegaban solos gracias al marketing. La Serie A de USD 66M (feb. 2026) fue la más grande de la historia de LATAM.",
  },
  {
    id: "antes-humand",
    seccion: "Intro",
    layout: "lista",
    titulo: "Antes de Humand",
    items: [
      "A los 22, Sales Manager en Vilahouse: lideré un equipo de 10 que en dos meses fue el de mejor rendimiento de la empresa.",
    ],
    remate:
      "Primero lo básico bien hecho, después probar y mejorar. El objetivo nunca son los contactos: son las ventas.",
    notas:
      "Antes de Humand, a los 22 fui Sales Manager en Vilahouse, vendiendo casas prefabricadas. También hice growth en una startup de surf en EE.UU. y fundé mi propia productora de eventos. Lo que aprendí y aplica acá: primero lo básico bien hecho, después probar y mejorar. Y el objetivo nunca son los contactos: son las ventas.",
  },

  // ============================= MAPA =============================
  {
    id: "mapa-proceso",
    seccion: "Mapa",
    layout: "proceso",
    titulo: "Hacete las preguntas correctas",
    pasos: [
      { titulo: "Entendé qué tiene que pasar en cada etapa" },
      { titulo: "Anotalo: armá el proceso completo" },
      { titulo: "Pulí, optimizá y mejorá cada etapa" },
    ],
    notas:
      "Lo importante no es cuántas preguntas son, sino hacerte las correctas, de forma simple. No memorices tips: aprendé a hacerte la próxima pregunta.",
  },
  {
    id: "mapa-preguntas",
    seccion: "Mapa",
    layout: "grilla-preguntas",
    titulo: "El proceso, en 11 preguntas",
    preguntas: LAS_11.map((p) => ({ numero: p.numero, pregunta: p.pregunta })),
    notas:
      "Cada paso responde una pregunta y te lleva a la siguiente. No memorices tips: aprendé a hacerte la próxima pregunta.",
  },

  // ============================= PASO 1 =============================
  {
    id: "paso-1",
    seccion: "Paso 1",
    layout: "divisor-paso",
    numero: 1,
    pregunta: "¿Qué tengo que hacer?",
    respuesta: "Vender una casa.",
    notas:
      "Partimos de una casa ya captada y con todo lo legal listo. La captación es otro tema, aunque el razonamiento es parecido. Para vender, lo primero que necesito es que esa casa la vea mucha gente.",
  },

  // ============================= PASO 2 =============================
  {
    id: "paso-2",
    seccion: "Paso 2",
    layout: "divisor-paso",
    numero: 2,
    pregunta: "¿A quién se la quiero vender?",
    respuesta: "Definí tu audiencia.",
    notas:
      "Antes de pensar en “mucha gente”, entendé quién es el comprador más probable. Todo lo que viene después se decide en base a esto: qué mostrás, cómo lo decís y dónde.",
  },
  {
    id: "paso-2-tabla",
    seccion: "Paso 2",
    layout: "tabla",
    titulo: "¿Quién es el comprador probable?",
    columnas: ["Propiedad", "Comprador probable", "Qué le importa"],
    filas: [
      [
        "Depto en Nueva Córdoba",
        "Estudiante (o su padre)",
        "Cerca de las facultades, transporte, zona segura, servicios",
      ],
      [
        "Casa en un country",
        "Familias",
        "Espacios grandes, para compartir, una buena cocina",
      ],
    ],
    notas:
      "No es lo mismo hablarle a un estudiante (o a su padre) que a una familia. Si no sabés a quién le hablás, no le hablás a nadie.",
  },

  // ============================= PASO 3 =============================
  {
    id: "paso-3",
    seccion: "Paso 3",
    layout: "divisor-paso",
    numero: 3,
    pregunta: "¿Dónde está esa gente y cómo llego a la mayor cantidad?",
    respuesta: "RE/MAX + tu marketing personal.",
    notas:
      "Uno a uno (contactos en común, referidos) suma, pero llegás a pocos. Las redes sociales te permiten mostrar fotos y videos a muchísima gente a la vez.",
  },
  {
    id: "paso-3-columnas",
    seccion: "Paso 3",
    layout: "dos-columnas",
    izquierda: { titulo: "Uno a uno", texto: "Suma, pero llegás a pocos." },
    derecha: {
      titulo: "Redes sociales",
      texto: "Fotos y videos a muchísima gente a la vez.",
    },
    notas:
      "Uno a uno: contactos en común, referidos. Suma, pero llegás a pocos. Volumen: las redes sociales te permiten mostrar fotos y videos a muchísima gente a la vez.",
  },
  {
    id: "paso-3-remax",
    seccion: "Paso 3",
    layout: "lista",
    titulo: "Lo que ya te resuelve RE/MAX",
    items: [
      "Con la casa cargada, ya está visible en todos los portales y en la red RE/MAX.",
      "Tu esfuerzo ahí es poco: una buena foto y una buena descripción, siguiendo la guía.",
      "Tu marketing personal es lo que sumás encima para llegar a más gente.",
    ],
    notas:
      "Con la casa cargada, ya está visible en todos los portales y en toda la red RE/MAX. Tu esfuerzo acá es poco: una buena foto y una buena descripción. RE/MAX ya tiene la guía de cómo hacerlo. Tu marketing personal es lo que sumás encima para llegar a más gente.",
  },

  // ============================= PASO 4 =============================
  {
    id: "paso-4",
    seccion: "Paso 4",
    layout: "divisor-paso",
    numero: 4,
    pregunta: "¿Qué canal sumo además de RE/MAX?",
    respuesta: "El que, con menos esfuerzo y tus recursos, te lleve a más gente de tu audiencia.",
    notas:
      "El que, con menos esfuerzo y con los recursos que tenés, te lleve a la mayor cantidad de tu audiencia.",
  },
  {
    id: "paso-4-uno-solo",
    seccion: "Paso 4",
    layout: "destacado",
    texto: "Cada canal es como sumar un trabajo nuevo.",
    sub: "Elegí uno y especializate.",
    notas:
      "LinkedIn, Facebook, Instagram… cada canal requiere consistencia, estrategia y aprender sobre la marcha. Si abrís muchos, hacés todo a medias. Elegí uno y especializate.",
  },
  {
    id: "paso-4-instagram",
    seccion: "Paso 4",
    layout: "lista",
    titulo: "Mi ejemplo: Instagram",
    items: [
      "Mucho alcance con reels y publicaciones",
      "El contenido se viraliza fácil",
      "No es complicado de manejar",
      "Tu perfil se arma como un catálogo",
    ],
    notas:
      "Instagram: mucho alcance con reels y publicaciones, el contenido se viraliza fácil, no es complicado de manejar y tu perfil se arma como un catálogo fácil de consumir para el cliente.",
  },
  {
    id: "paso-4-recap",
    seccion: "Paso 4",
    layout: "lista",
    titulo: "Hasta acá",
    items: [
      "Tengo la casa",
      "Sé a quién le hablo",
      "Ya está visible en RE/MAX",
      "Elegí un canal extra",
    ],
    notas: "Repaso de lo que ya tenemos antes de seguir.",
  },

  // ============================= PASO 5 =============================
  {
    id: "paso-5",
    seccion: "Paso 5",
    layout: "divisor-paso",
    numero: 5,
    pregunta: "¿Qué necesito para abrir ese canal?",
    respuesta: "Un perfil bien armado, separado del personal.",
    notas:
      "Separá lo personal de lo profesional. La gente te sigue por lo que prometés mostrar.",
  },
  {
    id: "paso-5-separar",
    seccion: "Paso 5",
    layout: "dos-columnas",
    izquierda: {
      titulo: "Lo dejo de seguir",
      texto: "Perro, sobrino, cumpleaños. No es lo que fui a buscar.",
    },
    derecha: {
      titulo: "Lo sigo para cuando compre",
      texto: "Casas y terrenos, siempre.",
    },
    notas:
      "Si sigo una cuenta porque sube alquileres en Córdoba y me empieza a subir fotos de su perro o del cumpleaños del sobrino, la dejo de seguir. No es lo que fui a buscar. Al revés: si entro a un perfil y todo son casas y terrenos, quizás no compro hoy, pero lo sigo para cuando compre.",
  },
  {
    id: "paso-5-partes",
    seccion: "Paso 5",
    layout: "lista",
    titulo: "Las partes del perfil",
    items: [
      "Cuenta profesional",
      "Foto de calidad",
      "Nombre",
      "Bio",
      "Link",
      "Historias destacadas",
      "Hashtags",
    ],
    notas:
      "Cuenta profesional: te da estadísticas y botones de contacto, incluido el de WhatsApp. Foto de calidad: podés mejorar una foto tuya gratis con ChatGPT; que siga pareciéndose a vos. Nombre: tu nombre + qué hacés + dónde (“Ana Pérez | Casas en Córdoba”). Bio: qué hacés, en qué zona y para quién, cerrando con una acción (“Escribime por WhatsApp 👇”). Link: que lleve directo a tu WhatsApp; probalo desde otro celular. Historias destacadas: tu vidriera fija (Disponibles, Vendidas, Sobre mí, Zonas, Testimonios). Hashtags: hasta 5 por publicación, específicos (barrio, ciudad, tipo de propiedad).",
  },
  {
    id: "paso-5-prompt",
    seccion: "Paso 5",
    layout: "destacado",
    variante: "prompt",
    titulo: "Prompt para tu foto de perfil",
    texto:
      "“Mejorá esta foto para usarla como foto de perfil profesional: fondo neutro, buena luz, encuadre de hombros para arriba. Mantené mi cara exactamente igual, sin cambiar mis rasgos.”",
    notas:
      "Podés mejorar tu foto gratis con ChatGPT usando este prompt. RE/MAX tiene una guía de perfil: usala. Y para el resto, mirá el paso siguiente.",
  },

  // ============================= PASO 6 =============================
  {
    id: "paso-6",
    seccion: "Paso 6",
    layout: "divisor-paso",
    numero: 6,
    pregunta: "¿Tengo que inventar todo desde cero?",
    respuesta: "No: copiá a quien ya le funciona.",
    notas:
      "Estudiar suma, pero no es requisito para arrancar. Alguien ya probó, testeó y sabe qué funciona.",
  },
  {
    id: "paso-6-ejercicio",
    seccion: "Paso 6",
    layout: "dos-columnas",
    titulo: "El ejercicio: 5 referentes, ¿qué tienen en común?",
    izquierda: {
      titulo: "Para tu perfil",
      items: ["Foto", "Nombre", "Bio", "Link", "Historias destacadas"],
    },
    derecha: {
      titulo: "Para tu contenido",
      items: [
        "Qué tipo de contenido suben",
        "Cómo lo muestran",
        "Cada cuánto publican",
        "Qué partes de la casa muestran",
        "Cómo filman",
      ],
    },
    notas:
      "Elegí 5 referentes que le vendan a tu misma audiencia y anotá qué tienen en común. Compará sus videos que mejor y peor funcionaron, y replicá lo mejor posible.",
  },
  {
    id: "paso-6-reels",
    seccion: "Paso 6",
    layout: "destacado",
    texto:
      "Si a alguien le va bárbaro con reels y carruseles, no te quemes la cabeza: probá con eso.",
    notas:
      "No reinventes la rueda: fijate a quién ya le funciona y copiá lo que hace.",
  },

  // ============================= PASO 7 =============================
  {
    id: "paso-7",
    seccion: "Paso 7",
    layout: "divisor-paso",
    numero: 7,
    pregunta: "¿Qué le muestro a ese comprador para vender la casa?",
    respuesta: "La información que quiere ver, en reels y carruseles.",
    notas:
      "La información que esa persona quiere ver, en los formatos que más se difunden. Según la guía de RE/MAX, los más pensados para viralidad son los reels y los carruseles. Primero pensá qué le interesa a esa persona, después elegí el formato, y publicá.",
  },
  {
    id: "paso-7-que-mostrar",
    seccion: "Paso 7",
    layout: "dos-columnas",
    titulo: "Qué mostrar, según tu audiencia",
    izquierda: {
      titulo: "Depto en Nueva Córdoba",
      texto: "Cercanía a las facultades, transporte, seguridad, lo que tiene cerca.",
    },
    derecha: {
      titulo: "Casa en un country",
      texto: "Espacios amplios, lugares para compartir, la cocina.",
    },
    notas:
      "Primero pensá qué le interesa a esa persona. Después elegí el formato. Y publicá.",
  },

  // ============================= VIDEOS (Paso 7 · Extra) =============================
  {
    id: "videos-importante",
    seccion: "Paso 7 · Extra",
    layout: "tarjetas",
    titulo: "Lo más importante al grabar",
    tarjetas: [{ titulo: "Luz" }, { titulo: "Audio" }, { titulo: "Calidad de imagen" }],
    notas:
      "Además de mostrar lo que le importa a tu audiencia, lo más importante es: la luz, el audio y la calidad de la imagen.",
  },
  {
    id: "videos-kit",
    seccion: "Paso 7 · Extra",
    layout: "tarjetas",
    titulo: "El kit",
    tarjetas: [
      { titulo: "Micrófono inalámbrico", texto: "tipo DJI Mic" },
      { titulo: "Un buen celular" },
      { titulo: "Edición en CapCut" },
    ],
    pie: "Con eso alcanza.",
    notas: "No hace falta un estudio de grabación profesional. Con eso alcanza.",
  },
  {
    id: "videos-plan",
    seccion: "Paso 7 · Extra",
    layout: "lista",
    titulo: "Grabá sin estudio",
    items: [
      "Andá con un plan: qué vas a mostrar y qué vas a decir",
      "¿Sin micrófono? Grabá las tomas y poné voz en off después",
      "La edición no es difícil: CapCut es simple",
    ],
    notas:
      "Andá con un plan: antes de grabar, definí qué vas a mostrar y qué vas a decir. ¿No tenés micrófono? Grabá las tomas y poné la voz en off después. La edición no es difícil: CapCut es simple y muchos jóvenes ya lo usan.",
  },

  // ============================= TERCERIZAR (Paso 7 · Extra) =============================
  {
    id: "tercerizar",
    seccion: "Paso 7 · Extra",
    layout: "lista",
    titulo: "Tercerizá lo que te exceda",
    items: [
      "No tiene por qué ser caro",
      "Un creador de contenido conocido para los primeros videos",
      "No hace falta un estudio profesional",
      "La edición también se puede delegar",
    ],
    notas:
      "Si algo te consume mucho tiempo o no te sale, delegalo. Podés contratar a un creador de contenido que conozcas (hay muchísimos) para que te ayude con los primeros videos. Además de grabar, vas entendiendo cómo se hace. La edición también se puede delegar, por ejemplo a alguien joven que ya maneje CapCut.",
  },

  // ============================= PASO 8 =============================
  {
    id: "paso-8",
    seccion: "Paso 8",
    layout: "divisor-paso",
    numero: 8,
    pregunta: "¿Cómo hago que me contacten?",
    respuesta: "Un solo toque hasta tu WhatsApp.",
    notas:
      "Hacéselo fácil: que lleguen a tu WhatsApp con un solo toque. Pensá en los pasos que tiene que seguir la persona para escribirte, y simplificalos al máximo.",
  },
  {
    id: "paso-8-friccion",
    seccion: "Paso 8",
    layout: "comparacion",
    titulo: "Menos fricción, más consultas",
    comparacion: {
      largo: {
        titulo: "Teléfono escrito en la foto",
        pasos: [
          "Sacar captura de pantalla",
          "Anotar el número",
          "Agendarlo",
          "Abrir el chat y escribir",
        ],
      },
      corto: { titulo: "Link o botón a WhatsApp", pasos: ["Tocar", "Chat abierto"] },
    },
    notas:
      "Fricción es cada paso extra que el cliente tiene que hacer para contactarte. Con la cantidad de información que recibe la gente hoy, cada paso extra te hace perder consultas.",
  },
  {
    id: "paso-8-como",
    seccion: "Paso 8",
    layout: "lista",
    titulo: "Cómo hacerlo",
    items: [
      "Botón de WhatsApp en el perfil",
      "Link en la bio con mensaje precargado",
      "Link en las historias que lleve a tu WhatsApp",
    ],
    notas:
      "Botón de WhatsApp en el perfil: con cuenta profesional de Instagram y WhatsApp Business, desde Editar perfil → Opciones de contacto. Link en la bio con mensaje precargado: abre el chat con un texto ya escrito (“Hola, vi una propiedad en tu Instagram”), así sabés de dónde viene la consulta. Link en las historias que lleve directo a tu WhatsApp.",
  },
  {
    id: "paso-8-reels",
    seccion: "Paso 8",
    layout: "destacado",
    texto:
      "En los reels, el link del texto no se puede tocar. Decí: “Escribime desde el botón de WhatsApp de mi perfil”.",
    notas:
      "En los reels, el link del texto no se puede tocar. Por eso decilo explícito.",
  },

  // ============================= PASO 9 =============================
  {
    id: "paso-9",
    seccion: "Paso 9",
    layout: "divisor-paso",
    numero: 9,
    pregunta: "¿Qué información va a necesitar cuando me escriba?",
    respuesta: "Tenela preparada, para mandarla una y otra vez.",
    notas:
      "Las preguntas se repiten, del mismo cliente o de otros por la misma casa. Escribilas una vez y convertilas en plantillas.",
  },
  {
    id: "paso-9-preguntas",
    seccion: "Paso 9",
    layout: "lista",
    titulo: "Lo que se repite",
    items: ["Precio", "Expensas", "Metros", "Apta crédito", "Ubicación", "Horarios de visita"],
    notas:
      "¿Qué te van a preguntar de esta casa? Las preguntas se repiten: precio, expensas, metros, si es apta crédito, ubicación, horarios de visita.",
  },
  {
    id: "paso-9-rapidas",
    seccion: "Paso 9",
    layout: "dos-columnas",
    izquierda: {
      titulo: "Respuestas rápidas",
      texto: "Escribís la info una vez y la mandás con “/”.",
    },
    derecha: {
      titulo: "WhatsApp laboral",
      texto: "Separado del personal, con dos chips. No se mezcla nada.",
    },
    notas:
      "Respuestas rápidas de WhatsApp Business: escribís la información una vez y la mandás con un atajo (escribiendo “/” en el chat). Así atendés bien a todos, no solo a los primeros. Separá el WhatsApp personal del laboral: son dos aplicaciones distintas y pueden convivir en el mismo celular, con dos chips.",
  },
  {
    id: "paso-9-rapido",
    seccion: "Paso 9",
    layout: "stats",
    titulo: "Responder rápido cambia todo",
    stats: [
      { valor: "7×", etiqueta: "más chances si respondés en la 1ª hora (vs. una hora después)" },
      { valor: "60×", etiqueta: "más que si respondés un día después" },
    ],
    fuente: "Harvard Business Review, “The Short Life of Online Sales Leads” (2011).",
    notas:
      "Las empresas que contactaron a un interesado dentro de la primera hora tuvieron casi 7 veces más probabilidades de lograr una conversación real que las que esperaron una hora más, y más de 60 veces más que las que esperaron un día. Fuente: Harvard Business Review, “The Short Life of Online Sales Leads” (2011).",
  },
  {
    id: "paso-9-catalogo",
    seccion: "Paso 9",
    layout: "lista",
    titulo: "Tu catálogo en WhatsApp Business",
    items: [
      "Cargá cada propiedad como un producto: fotos, precio y descripción",
      "Cuando te preguntan, la mandás en un toque, sin buscar fotos en la galería",
    ],
    notas:
      "Cargá cada propiedad como si fuera un producto, con fotos, precio y descripción. Cuando te preguntan, la mandás en un toque, sin buscar fotos en la galería.",
  },

  // ============================= PASO 10 =============================
  {
    id: "paso-10",
    seccion: "Paso 10",
    layout: "divisor-paso",
    numero: 10,
    pregunta: "¿Para qué es esta conversación?",
    respuesta: "Una reunión para asesorarlo y encontrar su mejor opción.",
    notas:
      "No es para pasar información. El objetivo del primer contacto es una conversación más personal (una llamada, una visita o una reunión) donde el cliente se sienta asesorado. Para que sea fácil, usá un llamado a la acción: una propuesta concreta y simple de qué hacer ahora. Secuencia: primero la info de la casa (plantilla); después, en un mensaje aparte y corto, la propuesta.",
  },
  {
    id: "paso-10-chat",
    seccion: "Paso 10",
    layout: "chat",
    chat: [
      { de: "cliente", texto: "Hola, vi la casa en tu Instagram. ¿Me pasás info?" },
      { de: "asesor", texto: "[Info de la casa — respuesta rápida]" },
      {
        de: "asesor",
        texto:
          "Te dejo la info. Si querés, coordinamos una llamada o una visita, lo que te quede más cómodo, y vemos si esta es la mejor opción para vos o si tengo otras que se ajusten mejor.",
      },
    ],
    notas:
      "Primero la info de la casa (respuesta rápida); después, en un mensaje aparte y corto, el CTA: una propuesta concreta y simple de qué hacer ahora.",
  },
  {
    id: "paso-10-pie-adentro",
    seccion: "Paso 10",
    layout: "destacado",
    texto: "Un pie adentro: buscar otro asesor es un desgaste. Simplificale la búsqueda.",
    notas:
      "Cuando el cliente ya dedicó tiempo y habló con vos, ponerse a buscar otro asesor es un desgaste. Si le simplificás la búsqueda y le acercás las mejores opciones para él, no tiene por qué irse.",
  },

  // ============================= PASO 11 =============================
  {
    id: "paso-11",
    seccion: "Paso 11",
    layout: "divisor-paso",
    numero: 11,
    pregunta: "¿Y después del primer contacto?",
    respuesta: "Es el punto de partida, no la meta.",
    notas:
      "Muchas oportunidades se mueren en la primera interacción. Para que no pase, necesitás orden y seguimiento.",
  },
  {
    id: "paso-11-orden",
    seccion: "Paso 11",
    layout: "lista",
    titulo: "Orden",
    items: [
      "Registrá a cada contacto en un sistema (CRM de RE/MAX, etiquetas de WhatsApp o una planilla)",
      "Usá etiquetas por etapa: Nuevo · Respondido · Visita · En seguimiento · Cerrado",
      "Anotá qué propiedad le interesó y qué busca",
    ],
    notas:
      "Registrá a cada contacto en un sistema (el CRM de RE/MAX, las etiquetas de WhatsApp Business o una planilla): un lugar donde ves quién es, por qué te contactó y en qué etapa está. Usá etiquetas por etapa. Anotá qué propiedad le interesó y qué busca.",
  },
  {
    id: "paso-11-seguimiento",
    seccion: "Paso 11",
    layout: "lista",
    titulo: "Seguimiento",
    items: [
      "Poné recordatorios para volver a escribir",
      "Reservá un horario fijo en tu semana solo para seguimiento",
    ],
    notas:
      "Poné recordatorios para volver a escribir. Reservá un horario fijo en tu semana solo para hacer seguimiento.",
  },
  {
    id: "paso-11-crm",
    seccion: "Paso 11",
    layout: "destacado",
    texto:
      "En Humand, el CRM era nuestra fuente de verdad. Los buenos contactos se perdían por responder lento o no hacer seguimiento, no por falta de interés.",
    notas:
      "En Humand, el CRM era nuestra fuente de verdad: ahí veíamos qué pasaba con cada contacto. Y muchas veces, los buenos contactos se perdían por responder lento o no hacer seguimiento, no por falta de interés.",
  },
  {
    id: "paso-11-cierre",
    seccion: "Paso 11",
    layout: "destacado",
    texto: "Coordinás la reunión y salís a vender.",
    notas: "El objetivo de todo el proceso.",
  },

  // ============================= CONSISTENCIA (Extra) =============================
  {
    id: "consistencia",
    seccion: "Extra",
    layout: "lista",
    titulo: "Todo esto funciona si sos consistente",
    items: [
      "En tu perfil: siempre el mismo tema y una línea de formato",
      "En tu contenido: un ritmo que puedas sostener",
      "En tus contactos: responder y hacer seguimiento siempre",
    ],
    remate: "Mejor poco y sostenido que mucho una semana y después nada.",
    notas:
      "Mejor poco y sostenido que mucho una semana y después nada. En tu perfil: siempre el mismo tema y una línea de formato; la gente te sigue por lo que prometés mostrar. En tu contenido: un ritmo de publicación que puedas sostener, con el que te sientas cómodo. En tus contactos: responder y hacer seguimiento siempre, no solo cuando tenés tiempo.",
  },

  // ============================= CIERRE =============================
  {
    id: "cierre-proceso-1",
    seccion: "Cierre",
    layout: "grilla-preguntas",
    titulo: "Tu proceso, completo",
    bajada: "Ahora que lo tenés armado, el trabajo es pulir cada etapa.",
    preguntas: LAS_11.slice(0, 6),
    notas: "Las preguntas 1 a 6, con su respuesta corta.",
  },
  {
    id: "cierre-proceso-2",
    seccion: "Cierre",
    layout: "grilla-preguntas",
    titulo: "Tu proceso, completo",
    preguntas: LAS_11.slice(6),
    notas: "Las preguntas 7 a 11, con su respuesta corta.",
  },
  {
    id: "cierre-tarea",
    seccion: "Cierre",
    layout: "destacado",
    texto: "[A COMPLETAR: tarea para esta semana]",
    notas: "Definir la tarea concreta que se llevan los asesores.",
  },
  {
    id: "cierre-gracias",
    seccion: "Cierre",
    layout: "portada",
    titulo: "Gracias",
    bajada: "[A COMPLETAR: contacto]",
    notas: "Cierre de la charla. Completar con el contacto de Pedro.",
  },
];

export type { Slide as SlideType };
