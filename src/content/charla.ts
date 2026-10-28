// ============================================================
// CONTENIDO DE LA CHARLA
// Acá vive TODO el texto visible de la web. Los componentes solo
// leen este archivo, así que para cambiar un texto editás acá y
// no hace falta tocar ningún componente.
//
// Estructura:
//   charla.hero            -> portada (#inicio)
//   charla.quienSoy        -> quién soy (#quien-soy)
//   charla.mapa            -> intro del mapa + mini proceso (#mapa)
//   charla.pasos           -> los 11 pasos (#paso-1 ... #paso-11)
//   charla.complementarias -> secciones extra (#videos, #tercerizar, #consistencia)
//   charla.cierre          -> el cierre con el proceso completo (#cierre)
//
// El ORDEN en que se muestran las secciones (y el indicador de
// progreso) está en src/lib/secciones.ts.
//
// Cada paso tiene: numero, pregunta (el título), respuesta (la
// frase corta destacada) y "bloques" (el detalle, en orden).
// Los tipos de bloque están documentados abajo.
// ============================================================

// ---------- Tipos de bloque ----------

/** Un párrafo de texto corrido. */
export type BloqueParrafo = { tipo: "parrafo"; texto: string };

/** Un subtítulo chico dentro de la sección, para separar ideas. */
export type BloqueSubtitulo = { tipo: "subtitulo"; texto: string };

/** Una lista con viñetas. Título opcional. */
export type BloqueLista = { tipo: "lista"; titulo?: string; items: string[] };

/** Lista donde cada ítem tiene un término en negrita y su detalle. */
export type BloqueListaDef = {
  tipo: "listaDef";
  titulo?: string;
  items: { termino: string; detalle: string }[];
};

/** Recuadro destacado. Variantes: por qué importa / dato / clave. */
export type BloqueCallout = {
  tipo: "callout";
  variante: "porQueImporta" | "dato" | "clave";
  titulo?: string;
  texto: string;
  fuente?: string; // solo se muestra en la variante "dato"
};

/** Tabla simple: encabezados + filas. */
export type BloqueTabla = {
  tipo: "tabla";
  columnas: string[];
  filas: string[][];
};

/** Checklist con tildes (ítems simples). */
export type BloqueChecklist = {
  tipo: "checklist";
  titulo?: string;
  items: string[];
};

/** Checklist con tilde donde cada ítem tiene título + una línea de explicación. */
export type BloqueChecklistDetalle = {
  tipo: "checklistDetalle";
  titulo?: string;
  items: { titulo: string; detalle: string }[];
};

/** Bloque de texto para copiar (por ejemplo, un prompt). */
export type BloquePrompt = { tipo: "prompt"; titulo: string; texto: string };

/** Grilla de tarjetas (título + texto opcional) con un pie opcional. */
export type BloqueTarjetas = {
  tipo: "tarjetas";
  items: { titulo: string; texto?: string }[];
  pie?: string;
};

/** Subsección destacada (una tarjeta con etiqueta opcional + título + texto). */
export type BloqueSubseccion = {
  tipo: "subseccion";
  etiqueta?: string;
  titulo: string;
  texto: string;
};

/** Dos caminos lado a lado: uno largo (gris) y uno corto (acento). */
export type BloqueComparacion = {
  tipo: "comparacion";
  largo: { titulo: string; pasos: string[] };
  corto: { titulo: string; pasos: string[] };
};

/** Conversación tipo chat. "cliente" a la izquierda, "asesor" a la derecha. */
export type BloqueChat = {
  tipo: "chat";
  mensajes: { de: "cliente" | "asesor"; texto: string }[];
};

/** Recuadro "Hasta acá" con una lista corta. */
export type BloqueRecap = { tipo: "recap"; titulo?: string; items: string[] };

/** Bloque "en construcción": borde punteado, para desarrollar después. */
export type BloqueEnConstruccion = { tipo: "enConstruccion"; titulo: string };

/** Una frase grande y destacada (por ejemplo, el cierre de un paso). */
export type BloqueDestacado = { tipo: "destacado"; texto: string };

export type Bloque =
  | BloqueParrafo
  | BloqueSubtitulo
  | BloqueLista
  | BloqueListaDef
  | BloqueCallout
  | BloqueTabla
  | BloqueChecklist
  | BloqueChecklistDetalle
  | BloquePrompt
  | BloqueTarjetas
  | BloqueSubseccion
  | BloqueComparacion
  | BloqueChat
  | BloqueRecap
  | BloqueEnConstruccion
  | BloqueDestacado;

export type Paso = {
  numero: number;
  pregunta: string;
  respuesta: string;
  bloques: Bloque[];
};

export type Complementaria = {
  id: string;
  antetitulo: string;
  titulo: string;
  respuesta?: string;
  bloques: Bloque[];
};

// ---------- El contenido ----------

export const charla = {
  // ========================= HERO (#inicio) =========================
  hero: {
    antetitulo: "Charla para asesores · RE/MAX Eleva",
    titulo: "Marketing y proceso de ventas: de lo complejo a lo simple",
    bajada: "Menos herramientas, más sistema.",
    texto:
      "En marketing hay mil cosas para hacer (o dejar de hacer). No hace falta hacerlas todas. La clave es saber qué preguntas hacerte, buscar las respuestas sin complicarte la vida y armar algo consistente, con lo que te sientas cómodo. Vamos a partir de una pregunta simple —“tengo que vender una casa, ¿qué hago?”— y desglosarla paso a paso.",
    boton: { label: "Empezar", href: "#quien-soy" },
  },

  // ========================= QUIÉN SOY (#quien-soy) =========================
  quienSoy: {
    titulo: "Quién soy y por qué hablo de esto",
    bajada:
      "No soy experto en vender casas. Soy experto en marketing: en armar procesos que llevan a una persona desde “no te conozco” hasta “quiero hablar con vos”.",
    foto: "/pedro.jpg",
    nombre: "Pedro Urrets",
    rol: "Marketing & Growth",
    textoHumand:
      "Fui la primera persona de marketing en Humand (Y Combinator W22). Cuando llegué, marketing no existía: había una web y un flujo de contactos a ventas que perdía gente en casi todos los pasos. En tres años y medio armamos todo desde cero.",
    stats: [
      { valor: "1 → ~60", etiqueta: "personas en el equipo de marketing" },
      {
        valor: "#1",
        etiqueta:
          "canal de adquisición: clientes que llegaban solos gracias al marketing",
      },
      { valor: "~60 → 1.500+", etiqueta: "clientes" },
      { valor: "6 → 51", etiqueta: "países" },
      {
        valor: "USD 66M",
        etiqueta: "la Serie A más grande de la historia de LATAM (feb. 2026)",
      },
    ],
    textoAntes:
      "Antes de Humand: a los 22 fui Sales Manager en Vilahouse, vendiendo casas prefabricadas: lideré un equipo de 10 vendedores que en dos meses fue el de mejor rendimiento de la empresa. También hice growth en una startup de surf en EE.UU. y fundé mi propia productora de eventos.",
    callout: {
      titulo: "Lo que aprendí y aplica acá",
      texto:
        "Primero lo básico bien hecho, después probar y mejorar. Y el objetivo nunca son los contactos: son las ventas.",
    },
  },

  // ========================= MAPA (#mapa) =========================
  mapa: {
    titulo: "Hacete las preguntas correctas",
    bajada:
      "Lo importante no es cuántas preguntas son, sino hacerte las correctas, de forma simple.",
    proceso: [
      { titulo: "Entendé qué tiene que pasar en cada etapa" },
      { titulo: "Anotalo: armá el proceso completo" },
      { titulo: "Pulí, optimizá y mejorá cada etapa" },
    ],
  },

  // ========================= PASOS (#paso-1 ... #paso-11) =========================
  pasos: [
    {
      numero: 1,
      pregunta: "¿Qué tengo que hacer?",
      respuesta: "Vender una casa.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Partimos de una casa ya captada y con todo lo legal listo. La captación es otro tema, aunque el razonamiento es parecido. Para vender, lo primero que necesito es que esa casa la vea mucha gente.",
        },
      ],
    },

    {
      numero: 2,
      pregunta: "¿A quién se la quiero vender?",
      respuesta: "Definí tu audiencia.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de pensar en “mucha gente”, entendé quién es el comprador más probable. Todo lo que viene después se decide en base a esto: qué mostrás, cómo lo decís y dónde.",
        },
        {
          tipo: "tabla",
          columnas: ["Propiedad", "Comprador probable", "Qué le importa"],
          filas: [
            [
              "Depto en Nueva Córdoba",
              "Un estudiante, o el padre del estudiante",
              "Cerca de las facultades, acceso al transporte, zona segura, cerca de servicios",
            ],
            [
              "Casa en un country",
              "Familias",
              "Espacios grandes, espacios para compartir, una buena cocina",
            ],
          ],
        },
        {
          tipo: "callout",
          variante: "porQueImporta",
          texto:
            "No es lo mismo hablarle a un estudiante (o a su padre) que a una familia. Si no sabés a quién le hablás, no le hablás a nadie.",
        },
      ],
    },

    {
      numero: 3,
      pregunta: "¿Dónde está esa gente y cómo llego a la mayor cantidad?",
      respuesta: "RE/MAX + tu marketing personal.",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Uno a uno (contactos en común, referidos) suma, pero llegás a pocos.",
            "Las redes sociales te permiten mostrar fotos y videos a muchísima gente a la vez.",
          ],
        },
        {
          tipo: "callout",
          variante: "clave",
          titulo: "Lo que ya te resuelve RE/MAX",
          texto:
            "Con la casa cargada, ya está visible en todos los portales y en toda la red RE/MAX. Tu esfuerzo ahí es poco: una buena foto y una buena descripción, siguiendo la guía de RE/MAX. Tu marketing personal es lo que sumás encima para llegar a más gente.",
        },
      ],
    },

    {
      numero: 4,
      pregunta: "¿Qué canal sumo además de RE/MAX?",
      respuesta:
        "El que, con menos esfuerzo y con los recursos que tenés, te lleve a la mayor cantidad de tu audiencia.",
      bloques: [
        { tipo: "subtitulo", texto: "Por qué uno solo" },
        {
          tipo: "parrafo",
          texto:
            "LinkedIn, Facebook, Instagram… cada canal requiere consistencia, estrategia y aprender sobre la marcha. Es como sumar un trabajo nuevo. Si abrís muchos, hacés todo a medias. Elegí uno y especializate.",
        },
        { tipo: "subtitulo", texto: "Mi ejemplo, Instagram" },
        {
          tipo: "lista",
          items: [
            "Mucho alcance con reels y publicaciones.",
            "El contenido se viraliza fácil.",
            "No es complicado de manejar.",
            "Tu perfil se arma como un catálogo fácil de consumir para el cliente.",
          ],
        },
        {
          tipo: "recap",
          titulo: "Hasta acá",
          items: [
            "Tengo la casa.",
            "Sé a quién le hablo.",
            "Ya está visible en RE/MAX.",
            "Elegí un canal extra.",
          ],
        },
      ],
    },

    {
      numero: 5,
      pregunta: "¿Qué necesito para abrir ese canal?",
      respuesta: "Un perfil bien armado, separado de tu perfil personal.",
      bloques: [
        { tipo: "subtitulo", texto: "Separá lo personal de lo profesional" },
        {
          tipo: "parrafo",
          texto:
            "Si sigo una cuenta porque sube alquileres en Córdoba y me empieza a subir fotos de su perro o del cumpleaños del sobrino, la dejo de seguir. No es lo que fui a buscar.",
        },
        {
          tipo: "parrafo",
          texto:
            "Al revés: si entro a un perfil y todo son casas y terrenos, quizás no compro hoy, pero lo sigo para cuando compre.",
        },
        {
          tipo: "checklistDetalle",
          titulo: "Las partes del perfil",
          items: [
            {
              titulo: "Cuenta profesional",
              detalle:
                "te da estadísticas y botones de contacto, incluido el botón de WhatsApp.",
            },
            {
              titulo: "Foto de calidad",
              detalle:
                "podés mejorar una foto tuya gratis con ChatGPT. Que siga pareciéndose a vos: el cliente te va a conocer en persona.",
            },
            {
              titulo: "Nombre",
              detalle:
                "tu nombre + qué hacés + dónde (ej.: “Ana Pérez | Casas en Córdoba”). Es lo que aparece cuando alguien busca.",
            },
            {
              titulo: "Bio",
              detalle:
                "qué hacés, en qué zona y para quién, cerrando con una acción concreta (ej.: “Escribime por WhatsApp 👇”).",
            },
            {
              titulo: "Link",
              detalle:
                "que lleve directo a tu WhatsApp. Probalo desde otro celular antes de publicar.",
            },
            {
              titulo: "Historias destacadas",
              detalle:
                "tu vidriera fija. Por ejemplo: Disponibles, Vendidas, Sobre mí, Zonas, Testimonios.",
            },
            {
              titulo: "Hashtags",
              detalle:
                "hasta 5 por publicación, y específicos (barrio, ciudad, tipo de propiedad).",
            },
          ],
        },
        {
          tipo: "prompt",
          titulo: "Prompt para tu foto de perfil",
          texto:
            "Mejorá esta foto para usarla como foto de perfil profesional: fondo neutro, buena luz, encuadre de hombros para arriba. Mantené mi cara exactamente igual, sin cambiar mis rasgos.",
        },
        {
          tipo: "parrafo",
          texto:
            "RE/MAX tiene una guía de perfil: usala. Y para el resto, mirá el paso siguiente.",
        },
      ],
    },

    {
      numero: 6,
      pregunta: "¿Tengo que inventar todo desde cero?",
      respuesta:
        "No. No reinventes la rueda: fijate a quién ya le funciona y copiá lo que hace.",
      bloques: [
        {
          tipo: "callout",
          variante: "clave",
          texto:
            "Estudiar suma, pero no es requisito para arrancar. Alguien ya probó, testeó y sabe qué funciona.",
        },
        {
          tipo: "parrafo",
          texto:
            "El ejercicio: elegí 5 referentes que le vendan a tu misma audiencia y anotá qué tienen en común. Te sirve para dos cosas:",
        },
        {
          tipo: "checklist",
          titulo: "Para armar tu perfil",
          items: ["Foto", "Nombre", "Bio", "Link", "Historias destacadas"],
        },
        {
          tipo: "checklist",
          titulo: "Para tu contenido",
          items: [
            "Qué tipo de contenido suben",
            "Cómo lo muestran",
            "Cada cuánto publican",
            "Qué partes de la casa muestran",
            "Cómo filman",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Compará sus videos que mejor y peor funcionaron, y replicá lo mejor posible. Si a alguien le va bárbaro con reels y carruseles, no te quemes la cabeza: probá con eso.",
        },
      ],
    },

    {
      numero: 7,
      pregunta: "¿Qué le muestro a ese comprador para vender la casa?",
      respuesta:
        "La información que esa persona quiere ver, en los formatos que más se difunden.",
      bloques: [
        { tipo: "subtitulo", texto: "Formatos" },
        {
          tipo: "parrafo",
          texto:
            "Según la guía de RE/MAX, los más pensados para viralidad son los reels y los carruseles.",
        },
        { tipo: "subtitulo", texto: "Qué mostrar, según tu audiencia" },
        {
          tipo: "listaDef",
          items: [
            {
              termino: "Depto en Nueva Córdoba",
              detalle:
                "cercanía a las facultades, transporte, seguridad de la zona, lo que tiene cerca.",
            },
            {
              termino: "Casa en un country",
              detalle: "espacios amplios, lugares para compartir, la cocina.",
            },
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Primero pensá qué le interesa a esa persona. Después elegí el formato. Y publicá.",
        },
      ],
    },

    {
      numero: 8,
      pregunta: "¿Cómo hago que me contacten?",
      respuesta: "Hacéselo fácil: que lleguen a tu WhatsApp con un solo toque.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Pensá en los pasos que tiene que seguir la persona para escribirte, y simplificalos al máximo.",
        },
        {
          tipo: "callout",
          variante: "porQueImporta",
          texto:
            "Fricción es cada paso extra que el cliente tiene que hacer para contactarte. Con la cantidad de información que recibe la gente hoy, cada paso extra te hace perder consultas.",
        },
        {
          tipo: "comparacion",
          largo: {
            titulo: "Teléfono escrito en la foto",
            pasos: [
              "Sacar captura de pantalla",
              "Anotar el número",
              "Agendarlo",
              "Abrir el chat y escribir",
            ],
          },
          corto: {
            titulo: "Link o botón a WhatsApp",
            pasos: ["Tocar", "Chat abierto"],
          },
        },
        { tipo: "subtitulo", texto: "Cómo hacerlo" },
        {
          tipo: "listaDef",
          items: [
            {
              termino: "Botón de WhatsApp en el perfil",
              detalle:
                "con cuenta profesional de Instagram y WhatsApp Business, desde Editar perfil → Opciones de contacto.",
            },
            {
              termino: "Link en la bio con mensaje precargado",
              detalle:
                "abre el chat con un texto ya escrito (por ejemplo, “Hola, vi una propiedad en tu Instagram”), así sabés de dónde viene la consulta.",
            },
            {
              termino: "Link en las historias",
              detalle: "que lleve directo a tu WhatsApp.",
            },
          ],
        },
        {
          tipo: "callout",
          variante: "clave",
          texto:
            "En los reels, el link del texto no se puede tocar. Decilo explícito: “Escribime desde el botón de WhatsApp de mi perfil”.",
        },
      ],
    },

    {
      numero: 9,
      pregunta: "¿Qué información va a necesitar cuando me escriba?",
      respuesta: "Tenela preparada, para mandarla una y otra vez.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Las preguntas se repiten, del mismo cliente o de otros por la misma casa: precio, expensas, metros, si es apta crédito, ubicación, horarios de visita. Escribilas una vez y convertilas en plantillas.",
        },
        { tipo: "subtitulo", texto: "Respuestas rápidas de WhatsApp Business" },
        {
          tipo: "parrafo",
          texto:
            "Escribís la información una vez y la mandás con un atajo (escribiendo “/” en el chat). Así atendés bien a todos, no solo a los primeros.",
        },
        { tipo: "subtitulo", texto: "Separá el WhatsApp personal del laboral" },
        {
          tipo: "parrafo",
          texto:
            "Son dos aplicaciones distintas y pueden convivir en el mismo celular, con dos chips. No se te mezcla nada y podés responder rápido.",
        },
        {
          tipo: "callout",
          variante: "dato",
          titulo: "Responder rápido cambia todo",
          texto:
            "Las empresas que contactaron a un interesado dentro de la primera hora tuvieron casi 7 veces más probabilidades de lograr una conversación real que las que esperaron una hora más, y más de 60 veces más que las que esperaron un día.",
          fuente:
            "Harvard Business Review, “The Short Life of Online Sales Leads” (2011).",
        },
        {
          tipo: "subseccion",
          etiqueta: "9b",
          titulo: "Tu catálogo en WhatsApp Business",
          texto:
            "Cargá cada propiedad como si fuera un producto, con fotos, precio y descripción. Cuando te preguntan, la mandás en un toque, sin buscar fotos en la galería.",
        },
      ],
    },

    {
      numero: 10,
      pregunta: "¿Para qué es esta conversación?",
      respuesta:
        "Tené un objetivo: una reunión para asesorarlo y encontrar su mejor opción.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No es para pasar información. El objetivo del primer contacto es una conversación más personal (una llamada, una visita o una reunión) donde el cliente se sienta asesorado. Para que sea fácil, usá un llamado a la acción: una propuesta concreta y simple de qué hacer ahora.",
        },
        {
          tipo: "parrafo",
          texto:
            "Secuencia: primero la info de la casa (plantilla); después, en un mensaje aparte y corto, la propuesta.",
        },
        {
          tipo: "chat",
          mensajes: [
            {
              de: "cliente",
              texto: "Hola, vi la casa en tu Instagram. ¿Me pasás info?",
            },
            { de: "asesor", texto: "[Info de la casa — respuesta rápida]" },
            {
              de: "asesor",
              texto:
                "Te dejo la info de la casa. Si querés, coordinamos una llamada o una visita, lo que te quede más cómodo, y vemos si esta es la mejor opción para vos o si tengo otras que se ajusten mejor a lo que buscás.",
            },
          ],
        },
        {
          tipo: "callout",
          variante: "clave",
          titulo: "Un pie adentro",
          texto:
            "Cuando el cliente ya dedicó tiempo y habló con vos, ponerse a buscar otro asesor es un desgaste. Si le simplificás la búsqueda y le acercás las mejores opciones para él, no tiene por qué irse.",
        },
      ],
    },

    {
      numero: 11,
      pregunta: "¿Y después del primer contacto?",
      respuesta: "El primer contacto es el punto de partida, no la meta.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Muchas oportunidades se mueren en la primera interacción. Para que no pase, necesitás orden y seguimiento.",
        },
        {
          tipo: "checklist",
          titulo: "Orden",
          items: [
            "Registrá a cada contacto en un sistema (el CRM de RE/MAX, las etiquetas de WhatsApp Business o una planilla): un lugar donde ves quién es, por qué te contactó y en qué etapa está.",
            "Usá etiquetas por etapa. Por ejemplo: Nuevo · Respondido · Visita agendada · En seguimiento · Cerrado.",
            "Anotá qué propiedad le interesó y qué busca.",
          ],
        },
        {
          tipo: "checklist",
          titulo: "Seguimiento",
          items: [
            "Poné recordatorios para volver a escribir.",
            "Reservá un horario fijo en tu semana solo para hacer seguimiento.",
          ],
        },
        {
          tipo: "callout",
          variante: "clave",
          texto:
            "En Humand, el CRM era nuestra fuente de verdad: ahí veíamos qué pasaba con cada contacto. Y muchas veces, los buenos contactos se perdían por responder lento o no hacer seguimiento, no por falta de interés.",
        },
        {
          tipo: "destacado",
          texto: "Coordinás la reunión y salís a vender.",
        },
      ],
    },
  ] satisfies Paso[],

  // ========================= COMPLEMENTARIAS =========================
  complementarias: {
    videos: {
      id: "videos",
      antetitulo: "Paso 7 · Extra",
      titulo: "Grabá videos que funcionen, sin estudio de grabación",
      bloques: [
        {
          tipo: "callout",
          variante: "clave",
          texto:
            "Además de mostrar lo que le importa a tu audiencia, lo más importante es: la luz, el audio y la calidad de la imagen.",
        },
        {
          tipo: "tarjetas",
          items: [
            { titulo: "Un micrófono inalámbrico", texto: "tipo DJI Mic" },
            { titulo: "Un buen celular" },
            { titulo: "Edición en CapCut" },
          ],
          pie: "Con eso alcanza.",
        },
        {
          tipo: "checklist",
          items: [
            "Andá con un plan: antes de grabar, definí qué vas a mostrar y qué vas a decir.",
            "¿No tenés micrófono? Grabá las tomas y poné la voz en off después.",
            "La edición no es difícil: CapCut es simple y muchos jóvenes ya lo usan.",
          ],
        },
      ],
    } satisfies Complementaria,

    tercerizar: {
      id: "tercerizar",
      antetitulo: "Paso 7 · Extra",
      titulo: "Tercerizá lo que te exceda",
      respuesta:
        "Si algo te consume mucho tiempo o no te sale, delegalo. No tiene por qué ser caro.",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Podés contratar a un creador de contenido que conozcas (hay muchísimos) para que te ayude con los primeros videos. Además de grabar, vas entendiendo cómo se hace.",
            "No hace falta un estudio de grabación profesional.",
            "La edición también se puede delegar, por ejemplo, a alguien joven que ya maneje CapCut.",
          ],
        },
      ],
    } satisfies Complementaria,

    consistencia: {
      id: "consistencia",
      antetitulo: "Extra",
      titulo: "Todo esto funciona si sos consistente",
      respuesta:
        "Mejor poco y sostenido que mucho una semana y después nada.",
      bloques: [
        {
          tipo: "listaDef",
          items: [
            {
              termino: "En tu perfil",
              detalle:
                "siempre el mismo tema y una línea de formato. La gente te sigue por lo que prometés mostrar.",
            },
            {
              termino: "En tu contenido",
              detalle:
                "un ritmo de publicación que puedas sostener, con el que te sientas cómodo.",
            },
            {
              termino: "En tus contactos",
              detalle:
                "responder y hacer seguimiento siempre, no solo cuando tenés tiempo.",
            },
          ],
        },
      ],
    } satisfies Complementaria,
  },

  // ========================= CIERRE (#cierre) =========================
  cierre: {
    titulo: "Tu proceso, completo",
    bajada: "Ahora que lo tenés armado, el trabajo es pulir cada etapa.",
    resumen: [
      { numero: 1, pregunta: "¿Qué tengo que hacer?", respuesta: "Vender una casa." },
      {
        numero: 2,
        pregunta: "¿A quién se la quiero vender?",
        respuesta: "Definí tu audiencia.",
      },
      {
        numero: 3,
        pregunta: "¿Dónde está esa gente y cómo llego a la mayor cantidad?",
        respuesta: "RE/MAX + tu marketing personal.",
      },
      {
        numero: 4,
        pregunta: "¿Qué canal sumo además de RE/MAX?",
        respuesta:
          "El que, con menos esfuerzo y tus recursos, te lleve a más gente de tu audiencia.",
      },
      {
        numero: 5,
        pregunta: "¿Qué necesito para abrir ese canal?",
        respuesta: "Un perfil bien armado y separado del personal.",
      },
      {
        numero: 6,
        pregunta: "¿Tengo que inventar todo desde cero?",
        respuesta: "No: benchmark.",
      },
      {
        numero: 7,
        pregunta: "¿Qué le muestro a ese comprador?",
        respuesta: "La info que quiere ver, en reels y carruseles.",
      },
      {
        numero: 8,
        pregunta: "¿Cómo hago que me contacten?",
        respuesta: "Un toque hasta tu WhatsApp.",
      },
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
      {
        numero: 11,
        pregunta: "¿Y después del primer contacto?",
        respuesta: "Orden y seguimiento.",
      },
    ],
    enConstruccion: { titulo: "Tarea para esta semana (a definir)" },
  },
};

export type Charla = typeof charla;
