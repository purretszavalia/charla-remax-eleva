// ============================================================
// CONTENIDO DE LA CHARLA
// Acá vive TODO el texto visible de la web. Los componentes solo
// leen este archivo, así que para cambiar un texto editás acá y
// no hace falta tocar ningún componente.
//
// Estructura:
//   charla.hero    -> la portada (#inicio)
//   charla.mapa    -> intro del mapa (#mapa). Las 11 preguntas se
//                     toman de charla.pasos (no se repiten acá).
//   charla.pasos   -> los 11 pasos (#paso-1 ... #paso-11)
//   charla.cierre  -> el cierre (#cierre)
//
// Cada paso tiene: numero, pregunta (el título), respuesta (la
// frase corta destacada) y "bloques" (el detalle, en orden).
// Un bloque es una pieza de contenido con un "tipo". Más abajo
// están todos los tipos disponibles con un ejemplo.
// ============================================================

// ---------- Tipos de bloque (no hace falta tocar esto) ----------

/** Un párrafo de texto corrido. */
export type BloqueParrafo = { tipo: "parrafo"; texto: string };

/** Un subtítulo chico dentro del paso, para separar ideas. */
export type BloqueSubtitulo = { tipo: "subtitulo"; texto: string };

/** Una lista con viñetas. Título opcional. */
export type BloqueLista = {
  tipo: "lista";
  titulo?: string;
  items: string[];
};

/** Una lista donde cada ítem tiene un término en negrita y su detalle. */
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

/** Checklist con tildes. */
export type BloqueChecklist = {
  tipo: "checklist";
  titulo?: string;
  items: string[];
};

/** Dos caminos lado a lado: uno largo (gris) y uno corto (acento). */
export type BloqueComparacion = {
  tipo: "comparacion";
  largo: { titulo: string; pasos: string[] };
  corto: { titulo: string; pasos: string[] };
};

/** Conversación tipo chat. "cliente" va a la izquierda, "asesor" a la derecha. */
export type BloqueChat = {
  tipo: "chat";
  mensajes: { de: "cliente" | "asesor"; texto: string }[];
};

/** Recuadro "Hasta acá" con una lista corta de lo que ya tenemos. */
export type BloqueRecap = {
  tipo: "recap";
  titulo?: string;
  items: string[];
};

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

// ---------- El contenido ----------

export const charla = {
  // ========================= HERO (#inicio) =========================
  hero: {
    antetitulo: "Charla para asesores · RE/MAX Eleva",
    titulo: "Vender una casa, de lo complejo a lo simple",
    bajada: "Menos herramientas, más sistema.",
    texto:
      "Hay mucho contenido, muchos canales y muchas herramientas. Eso abruma. La propuesta de hoy es otra: antes de moverte, entendé el proceso. Vamos a partir de una pregunta simple —“tengo que vender una casa, ¿qué hago?”— y desglosarla paso a paso, como lo pensaría yo si tuviera que hacerlo hoy.",
    boton: { label: "Empezar", href: "#mapa" },
  },

  // ========================= MAPA (#mapa) =========================
  // Las 11 preguntas se generan automáticamente a partir de charla.pasos.
  mapa: {
    titulo: "El proceso en 11 preguntas",
    bajada:
      "Cada paso responde una pregunta y te lleva a la siguiente. No memorices tips: aprendé a hacerte la próxima pregunta.",
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
      respuesta:
        "Antes de pensar en “mucha gente”, entendé quién es el comprador más probable.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Todo lo que viene después se decide en base a esto: qué mostrás, cómo lo decís y dónde.",
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
      respuesta: "Uno a uno no escala. Las redes sí.",
      bloques: [
        {
          tipo: "listaDef",
          items: [
            {
              termino: "Uno a uno",
              detalle:
                "contactos en común, referidos. Suma, pero llegás a pocos.",
            },
            {
              termino: "Volumen",
              detalle:
                "las redes sociales te permiten mostrar fotos y videos a muchísima gente a la vez.",
            },
          ],
        },
        {
          tipo: "callout",
          variante: "clave",
          titulo: "Lo que ya te resuelve RE/MAX",
          texto:
            "Con la casa cargada, ya está visible en todos los portales y en toda la red RE/MAX. Tu esfuerzo acá es poco: una buena foto y una buena descripción. RE/MAX ya tiene la guía de cómo hacerlo.",
        },
      ],
    },

    {
      numero: 4,
      pregunta: "¿Qué canal sumo además de RE/MAX?",
      respuesta: "Uno solo. Yo elegiría Instagram.",
      bloques: [
        { tipo: "subtitulo", texto: "Por qué uno solo" },
        {
          tipo: "parrafo",
          texto:
            "LinkedIn, Facebook, Instagram… cada canal requiere consistencia, estrategia y aprender sobre la marcha. Es como sumar un trabajo nuevo. Si abrís muchos, hacés todo a medias. Elegí uno y especializate.",
        },
        { tipo: "subtitulo", texto: "Por qué Instagram" },
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
            "Elegí un canal extra: Instagram.",
          ],
        },
      ],
    },

    {
      numero: 5,
      pregunta: "¿Qué le muestro a ese comprador?",
      respuesta:
        "Lo que esa persona quiere ver y escuchar, en los formatos que más se difunden.",
      bloques: [
        { tipo: "subtitulo", texto: "Formatos" },
        {
          tipo: "parrafo",
          texto:
            "Según la guía de RE/MAX, los formatos más pensados para viralidad son los reels y los carruseles.",
        },
        { tipo: "subtitulo", texto: "Qué mostrar, según el comprador" },
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
            "Primero pensá qué le interesa a esa persona. Después elegí el formato. Y para saber cómo hacerlo bien, pasá al paso siguiente.",
        },
      ],
    },

    {
      numero: 6,
      pregunta: "¿Cómo lo hago bien sin estudiar meses?",
      respuesta:
        "No reinventes la rueda: fijate a quién ya le funciona y copiá lo que hace.",
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
            "Buscá a alguien a quien le esté yendo bien vendiéndole a la misma gente que vos, y mirá:",
        },
        {
          tipo: "checklist",
          items: [
            "Cómo publica",
            "Cuándo publica",
            "Qué tipo de contenido sube",
            "Cómo muestra la casa",
            "Qué partes de la casa muestra",
            "Cómo filma",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Compará sus videos que mejor y peor funcionaron, y replicá lo mejor posible.",
        },
        {
          tipo: "destacado",
          texto:
            "Si a esa persona le va bárbaro con reels y carruseles, no te quemes la cabeza: probá con eso.",
        },
      ],
    },

    {
      numero: 7,
      pregunta: "¿Cómo hago que me sigan y vuelvan?",
      respuesta: "Consistencia, y lo personal separado de lo profesional.",
      bloques: [
        { tipo: "subtitulo", texto: "Consistencia" },
        {
          tipo: "parrafo",
          texto:
            "Mismo tipo de contenido, mismo formato, mismo “cómo”. Podés probar formatos distintos, pero manteniendo la línea.",
        },
        { tipo: "subtitulo", texto: "Separar lo personal de lo profesional" },
        {
          tipo: "parrafo",
          texto:
            "Si sigo una cuenta porque sube alquileres en Córdoba y me empieza a subir fotos de su perro o del cumpleaños del sobrino, la dejo de seguir. No es lo que fui a buscar.",
        },
        {
          tipo: "parrafo",
          texto:
            "Al revés: si entro a un perfil y todo son casas y terrenos, quizás no compro hoy, pero lo sigo para cuando compre. Sé que me va a seguir mostrando lo que me interesa.",
        },
        {
          tipo: "enConstruccion",
          titulo:
            "Apartado: los componentes de un buen perfil de Instagram (y para qué sirve cada uno)",
        },
      ],
    },

    {
      numero: 8,
      pregunta: "¿Cómo hago que me contacten?",
      respuesta:
        "Reducí la fricción: que lleguen a tu WhatsApp con un solo toque.",
      bloques: [
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
      pregunta: "¿Cómo respondo bien a todos sin escribir lo mismo 200 veces?",
      respuesta:
        "Prepará las respuestas antes, y tené un WhatsApp solo para trabajo.",
      bloques: [
        { tipo: "subtitulo", texto: "Pensá antes" },
        {
          tipo: "parrafo",
          texto:
            "¿Qué te van a preguntar de esta casa? Las preguntas se repiten, del mismo cliente o de otros por la misma casa. Por ejemplo: precio, expensas, metros, si es apta crédito, ubicación, horarios de visita.",
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
      ],
    },

    {
      numero: 10,
      pregunta: "¿Para qué es esta conversación?",
      respuesta:
        "No es para pasar información. Es para conseguir una llamada o una visita.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El objetivo del primer contacto es una conversación más personal, donde el cliente se sienta atendido. Para que sea fácil, usá un llamado a la acción (CTA): una propuesta concreta y simple de qué hacer ahora.",
        },
        {
          tipo: "parrafo",
          texto:
            "Secuencia: primero la info de la casa (respuesta rápida); después, en un mensaje aparte y corto, el CTA.",
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
      ],
    },

    {
      numero: 11,
      pregunta: "¿Por qué se queda conmigo?",
      respuesta: "Porque ya dio un paso, y buscar otro asesor le cuesta.",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando el cliente se engancha, ya tiene un pie adentro. Ponerse a buscar otro asesor es un desgaste. Si vos le simplificás la búsqueda y le acercás servidas las mejores opciones para él, no tiene por qué irse.",
        },
        {
          tipo: "callout",
          variante: "clave",
          texto:
            "Pensá siempre en el objetivo de cada interacción. Y después preguntate: ¿cómo lo hago lo más simple posible?",
        },
        {
          tipo: "destacado",
          texto: "Coordinás la reunión y salís a vender.",
        },
      ],
    },
  ] satisfies Paso[],

  // ========================= CIERRE (#cierre) =========================
  // El recorrido de las 11 preguntas se genera a partir de charla.pasos.
  cierre: {
    titulo: "El sistema completo",
    enConstruccion: { titulo: "Tarea para esta semana (a definir)" },
  },
};

export type Charla = typeof charla;
