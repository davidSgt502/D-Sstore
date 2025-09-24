// Datos de productos organizados por categoría con rangos específicos de IDs
const PRODUCTS = [
    // CATEGORÍA: audio (IDs 1-500)
    {
        id: 1,
        title: "Audífonos AUX",
        price: 45,
        category: "audio",
        image: "img/Audifonos  Aux.jpg",
        description: "Incluye microfono Compatibilidad con multiples dispositivos3.5mm audio jack",
        stock: 12 
    },
    {
        id: 2,
        title: "Audifonos bluetooth magneticos",
        price: 65,
        category: "audio",
        image: "img/Audifonos bluetooth magneticos.jpg",
        description: "Liviano,Cordón evita la formación de nudos y Largo: 1.2 metros",
        stock: 1
    },
    {
        id: 3,
        title: "Audifonos bluetooth XT81PRO",
        price: 396,
        originalPrice: 495,
        category: "audio",
        image: "img/Audifonos bluetooth XT81PRO.jpg",
        description: "Compatible con Bluetooth 5.1 recientemente actualizado, puede reducir la pérdida de señal y la desconexión causada por interferencias, sin retraso en la sincronización de la pantalla del juego",
        badge: { text: "20% OFF", type: "discount" },
        stock: 12 
    },
    {
        id: 4,
        title: "Audifonos bluetooth redmi play 6 azul",
        price: 350,
        category: "audio",
        image: "img/Audifonos bluetooth redmi play 6 azul.jpg",
        description: "Con hasta 36 horas de reproducción total al usar el estuche de carga, y 7,5 horas con una sola carga",
        stock: 12 
    },
    {
        id: 5,
        title: "Audifonos bluetooth Xiaomi redmi 6",
        price: 350,
        category: "audio",
        image: "img/Audifonos bluetooth Xiaomi redmi 6.jpg",
        description: "Con hasta 36 horas de reproducción total al usar el estuche de carga, y 7,5 horas con una sola carga, estos auriculares son ideales para quienes pasan mucho tiempo fuera y no quieren preocuparse por la batería.",
        stock: 12 
    },
    {
        id: 6,
        title: "Audifonos bluetooth para moto",
        price: 224,
        category: "audio",
        image: "img/Audifonos bluetooth para moto.jpg",
        description: "Función manos libres, realmente libera tu mano Batería recargable de iones de litio, larga espera y tiempo de trabajo",
        stock: 12 
    },
    {
        id: 7,
        title: "Bocina bluetooth xiaomi sound pocket",
        price: 350,
        category: "audio",
        image: "img/Bocina bluetooth xiaomi sound pocket.png",
        stock: 12,
        description: "Sonido envolvente con salida de 5W, Diseño de bolsillo portátil, Sonido estéreo verdaderamente inalámbrico y Batería de larga duración de hasta 10 horas."
    },
    {
        id: 8,
        title: "Set de 2 bocinas para pc",
        price: 150,
        category: "audio",
        image: "img/Set de 2 bocinas para pc.jpg",
        description: "Altavoz multimedia de 2.0 canales, Efectos de iluminación RGB, Compatibilidad multiplataforma (portátil, escritorio, móvil)",
        stock: 12 
    },

    // CATEGORÍA: hogar (IDs 501-999)
    {
        id: 501,
        title: "Afilador de cuchillos",
        price: 40,
        category: "hogar",
        image: "img/Afilador de cuchillos.jpg",
        description: "innovador diseño de 3 ranuras que ayuda a restaurar tus cuchillos a nuevos",
        stock: 12 
    },
    {
        id: 502,
        title: "Base de metal para 3 tacos x4",
        price: 150,
        originalPrice: 175,
        category: "hogar",
        image: "img/Base de metal para 3 tacos x4.jpg",
        description: "Paquete de 4 soportes para tacos de , estantes para tacos, de acero inoxidable",
        stock: 12 
    },
    {
        id: 503,
        title: "Basurero con Tapadera 13lts",
        price: 90,
        category: "hogar",
        image: "img/Basurero con Tapadera 13lts.jpg",
        description: "Altua de 42cm x 20cm de Ancho x 24cm de Largo",
        stock: 12 
    },
    {
        id: 504,
        title: "Bolsa de lavado de brasier",
        price: 30,
        category: "hogar",
        image: "img/Bolsa de lavado de brasier.jpg",
        description: "Bolsa de malla suave, duradera y de doble capa",
        stock: 12 
    },
    {
        id: 505,
        title: "Bombilla led con ventilador",
        price: 283,
        originalPrice: 339,
        category: "hogar",
        image: "img/Bombilla led con ventilador.jpg",
        description: "Ventilador de techo con luz: luz de ventilador, diseño novedoso, ultraligero y nivel de alta tecnología",
        badge: { text: "OFERTA", type: "offer" },
        stock: 12 
    },
    {
        id: 506,
        title: "Botones para pantalones x3",
        price: 36,
        category: "hogar",
        image: "img/Botones para pantalones x3.png",
        description: "Material de alta calidad: el extensor de botón está hecho de excelente material de metal y silicona con bordes lisos",
        stock: 12 
    },
    {
        id: 507,
        title: "Clips para cerrar bolsas 4 piezas",
        price: 28,
        category: "hogar",
        image: "img/Clips para cerrar bolsas 4 piezas.jpg",
        description: "BROCHES CIERRA BOLSAS X4 UNIDADES, COLORES SURTIDOS",
        stock: 12 
    },
    {
        id: 508,
        title: "Cobertor de silicon para la ducha",
        price: 25,
        category: "hogar",
        image: "img/Cobertor de silicon para la ducha.jpg",
        description: "Se puede utilizar en cocina, baño, garaje, lavabo, sótano e inodoro",
        stock: 12 
    },
    {
        id: 509,
        title: "Cortador de Piña",
        price: 45,
        category: "hogar",
        image: "img/Cortador de Piña.jpg",
        description: "CORTADOR DE PIÑA",
        stock: 12 
    },
    {
        id: 510,
        title: "Dispensador de jabon",
        price: 35,
        category: "hogar",
        image: "img/Dispensador de jabon.jpg",
        description: "Diseño innovador: dispensador de jabón y esponja 2 en 1, puede obtener el detergente con una mano",
        stock: 12 
    },
    {
        id: 511,
        title: "Dispensador de metal",
        price: 150,
        category: "hogar",
        image: "img/Dispensador de metal.jpg",
        description: "dispensador de papel higiénico está hecho de acero inoxidable 304 real",
        stock: 12 
    },
    {
        id: 512,
        title: "Dispensador de papel jumbo",
        price: 120,
        category: "hogar",
        image: "img/Dispensador de papel jumbo.png",
        description: "Dispensador de Papel Rollo Jumbo con Llave, Incluye Tarugos y Tornillos para su instalación.",
        stock: 12 
    },
    {
        id: 513,
        title: "Espátulas de silicona (5 unidades)",
        price: 78,
        category: "hogar",
        image: "img/Espatulas de silicon 5 unidades.jpg",
        description: "Set de 5 espátulas de silicona grado alimenticio. Ideal para mezclar, batir huevos, freír carne y aplicar aceite. Material resistente al calor y duradero.",
        stock: 12 
    },
    {
        id: 514,
        title: "Espumador PRO y batidor recargable",
        price: 100,
        category: "hogar",
        image: "img/Espumador PRO y batidor recargable.jpg",
        description: "Espumador profesional con batidor recargable. Dimensiones: 26cm de largo. Ideal para preparar bebidas espumosas.",
        stock: 12
    },
    {
        id: 515,
        title: "Esquineros protectores 4 piezas",
        price: 40,
        category: "hogar",
        image: "img/Esquineros protectores 4 piezas.jpg",
        description: "",
        stock: 12 
    },
    {
        id: 516,
        title: "Exprimidor de pastas y cremas x3",
        price: 35,
        category: "hogar",
        image: "img/Exprimidor de pastas y cremas x3.jpg",
        description: "",
        stock: 12 
    },
    {
        id: 517,
        title: "Funda elastica blanca para mesa",
        price: 120,
        category: "hogar",
        image: "img/Funda elastica blanca para mesa.jpg",
        description: "Apta para mesas de 180 (largo) x 75 (ancho) x 75 (alto) centimetros",
        stock: 12
    },
    {
        id: 518,
        title: "Funda elastica negra para mesa",
        price: 136,
        category: "hogar",
        image: "img/Funda elastica negra para mesa.jpg",
        description: "Apta para mesas de 180 (largo) x 75 (ancho) x 75 (alto) centimetros",
        stock: 12
    },
    {
        id: 519,
        title: "Hervidora electrica xiaomi",
        price: 330,
        category: "hogar",
        image: "img/Hervidora electrica xiaomi.jpg",
        description: "Hierve agua para tu té o café con el Hervidor Eléctrico Xiaomi 2. Este hervidor tiene una capacidad de 1.7 litros",
        stock: 12 
    },
    {
        id: 520,
        title: "Humidificador de Aromas",
        price: 150,
        category: "hogar",
        image: "img/Humidificador de Aromas.jpg",
        description: "humidifica el aire de la habitación independientemente del verano o el invierno, refresca la calidad del aire que respiramos y ajusta la temperatura de la habitación",
        stock: 12 
    },
    {
        id: 521,
        title: "Limpia vidrios",
        price: 25,
        category: "hogar",
        image: "img/Limpia vidrios.jpg",
        description: "La hoja flexible y resistente limpia las superficies sin rayas, elimina restos de jabón, cal y otra",
        stock: 12 
    },
    {
        id: 522,
        title: "Limpiador de hornos y parrillas",
        price: 56,
        category: "hogar",
        image: "img/Limpiador de hornos y parrillas.jpg",
        description: "Elimina grasa y alimentos quemados y resistentes.limpieza de manchas",
        stock: 12 
    },
    {
        id: 523,
        title: "Limpiador de paredes OX 24",
        price: 56,
        category: "hogar",
        image: "img/Limpiador de paredes OX 24 onzas.png",
        description: "Puedes limpiar las paredes exteriores de contaminación (esmog) và polvo.",
        stock: 12
    },
    {
        id: 524,
        title: "Pachon Acero inoxidable 500ml",
        price: 95,
        category: "hogar",
        image: "img/Pachon Acero inoxidable 500ml.jpg",
        description: "Termo botella de aluminio doble pared para sublimación, tipo lechero con cerro de silicona en la tapa lo cual hace un cierre que evita derrames",
        stock: 12
    },
    {
        id: 525,
        title: "Reparador de zippers (3 unidades)",
        price: 15,
        category: "hogar",
        image: "img/Reparador de zippers (3 unidades).jpg",
        description: "Kit universal de reparación instantánea de zippers",
        stock: 12
    },
    {
        id: 526,
        title: "Set de 6 cuchillos inoxidables para carne",
        price: 85,
        category: "hogar",
        image: "img/Set de 6 cuchillos inoxidables para carne.png",
        description: "",
        stock: 12
    },
    {
        id: 527,
        title: "Set de esponjas 5 unidades",
        price: 27,
        category: "hogar",
        image: "img/Set de esponjas 5 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 528,
        title: "Set de esponjas de alambre 4 unidades",
        price: 35,
        category: "hogar",
        image: "img/Set de esponjas de alambre 4 unidades.png",
        description: "",
        stock: 12
    },
    {
        id: 529,
        title: "Spray dispensador de aceite",
        price: 40,
        category: "hogar",
        image: "img/Spray dispensador de aceite.jpg",
        description: "El spray dispensador de aceite está hecha de vidrio",
        stock: 12
    },
    {
        id: 530,
        title: "Termometro digital de cocina",
        price: 84,
        category: "hogar",
        image: "img/Termometro digital de cocina.jpg",
        description: "Termómetro digital para medir temperatura de bebidas y comidas.",
        stock: 12
    },
    {
        id: 531,
        title: "Vaso metalico tumbler 20oz",
        price: 85,
        category: "hogar",
        image: "img/Vaso metalico tumbler 20oz.jpg",
        description: "Disfruta de tus bebidas a la temperatura ideal para consumirlas en el hogar, de paseo o al aire libre",
        stock: 12
    },
    {
        id: 532,
        title: "Ventilador recargable de mano",
        price: 88,
        category: "hogar",
        image: "img/Ventilador recargable de mano.jpg",
        description: "Un ventilador inalámbrico con batería de larga duración que lleva una brisa fresca a cualquier lugar",
        stock: 12
    },
    {
        id: 533,
        title: "Ventilador recargable Xiaomi",
        price: 258,
        category: "hogar",
        image: "img/Ventilador recargable Xiaomi.jpg",
        description: "Un ventilador inalámbrico con batería de larga duración que lleva una brisa fresca a cualquier lugar, Ventilador de escritorio y portátil de doble uso 2 en 1, brisa más suave entregada a través de 7 aspas",
        stock: 12
    },
    {
        id: 534,
        title: "Zapatera de 5 niveles",
        price: 140,
        category: "hogar",
        image: "img/Zapatera de 5 niveles.jpg",
        description: "Ya no es necesario apilar los zapatos en el pasillo, porque puedes colocarlos ordenadamente en este zapatero de 5 niveles. Aprovechando al máximo el espacio",
        stock: 12
    },

    // CATEGORÍA: herramientas (IDs 1001-1499)
    {
        id: 1001,
        title: "Aceite 3 en 1 Multiusos 236ml",
        price: 60,
        category: "herramientas",
        image: "img/Aceite 3 en 1 236ml Multiusos.jpg",
        description: "Aceite multiusos que lubrica, penetra y limpia. Ideal para múltiples aplicaciones en herramientas y mecanismos.",
        stock: 12
    },
    {
        id: 1002,
        title: "Brocas para madera 5 unidades",
        price: 50,
        category: "herramientas",
        image: "img/Brocas de madera 5 unidades.png",
        description: "Set de 5 brocas especializadas para madera de alta durabilidad y precisión.",
        stock: 12
    },
    {
        id: 1003,
        title: "Brocas para metal 13 piezas",
        price: 95,
        category: "herramientas",
        image: "img/Brocas de metal 13 piezas.jpg",
        description: "Juego completo de 13 brocas para metal de diferentes tamaños, ideales para trabajos profesionales.",
        stock: 12
    },
    {
        id: 1004,
        title: "Cinta métrica 5 metros",
        price: 50,
        category: "herramientas",
        image: "img/Cinta metrica 5 metros.jpg",
        description: "Cinta métrica resistente de 5 metros con marcajes claros para mediciones precisas.",
        stock: 12
    },
    {
        id: 1005,
        title: "Cuchilla de aluminio de doble cara",
        price: 45,
        category: "herramientas",
        image: "img/Cuchilla de aluminio de doble cara.png",
        description: "Cuchilla profesional de aluminio con doble filo para cortes precisos y duraderos.",
        stock: 12
    },
    {
        id: 1006,
        title: "Cuchillas 14 piezas",
        price: 85,
        category: "herramientas",
        image: "img/Cuchillas 14 piezas.jpg",
        description: "Set de 14 cuchillas de repuesto de alta calidad para diversas herramientas de corte.",
        stock: 12
    },
    {
        id: 1007,
        title: "Desarmadores para electrónicos x16",
        price: 90,
        category: "herramientas",
        image: "img/Desarmadores para electronicos x16.jpg",
        description: "Juego de 16 desarmadores precisos especialmente diseñados para trabajos electrónicos.",
        stock: 12
    },
    {
        id: 1008,
        title: "Destornilladores de precisión 11 piezas",
        price: 35,
        category: "herramientas",
        image: "img/Destornilladores 11 piezas.jpg",
        description: "Set profesional de 11 destornilladores de precisión con cabezales variados para trabajos delicados.",
        stock: 12
    },
    {
        id: 1009,
        title: "Herramienta multifuncional 18 en 1",
        price: 255,
        category: "herramientas",
        image: "img/Herramienta multifuncional 18 en 1.jpg",
        description: "Herramienta versátil con 18 funciones diferentes, perfecta para camping, auto y hogar.",
        stock: 12
    },
    {
        id: 1010,
        title: "Bisagra doble de 2.5\"",
        price: 35,
        category: "herramientas",
        image: "img/Bisagra doble de 2.5.png",
        description: "Bisagra doble de acero inoxidable de 2.5 pulgadas, ideal para puertas y muebles. Incluye tornillos para su fácil instalación.",
        stock: 12
    },
    {
        id: 1011,
        title: "Cepillo de acero",
        price: 40,
        category: "herramientas",
        image: "img/Cepillo de acero.jpg",
        description: "Cepillo de alambre con mango de wood, perfecto para remover óxido, pintura o residuos en superficies metálicas.",
        stock: 12
    },
    {
        id: 1012,
        title: "Cerradura redonda para puerta interior",
        price: 120,
        category: "herramientas",
        image: "img/Cerradura redonda para puerta interior.jpg",
        description: "Cerradura redonda con llave para puerta interior. Incluye 3 llaves, tornillos y herrajes para una instalación segura y sencilla.",
        stock: 12
    },
    {
        id: 1013,
        title: "Chaleco para emergencias M y L",
        price: 24,
        category: "herramientas",
        image: "img/Chaleco para emergencias M y L.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1014,
        title: "Cortador de cinturones y vidrio de ventanas",
        price: 60,
        category: "herramientas",
        image: "img/Cortador de cinturones y vidrio de ventanas.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1015,
        title: "Desarmador phillips 10cms",
        price: 10,
        category: "herramientas",
        image: "img/Desarmador phillips 10cms.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1016,
        title: "Espatula para silicone 3 en 1",
        price: 50,
        category: "herramientas",
        image: "img/Espatula para silicone 3 en 1.png",
        description: "",
        stock: 12
    },
    {
        id: 1017,
        title: "Juego de herramientas de jardin",
        price: 95,
        category: "herramientas",
        image: "img/Juego de herramientas de jardin (3 piezas).jpg",
        description: "",
        stock: 12
    },
    {
        id: 1018,
        title: "Kid destornillador rojo 6 piezas",
        price: 125,
        category: "herramientas",
        image: "img/Kid destornillador rojo 6 piezas.jpg",
        description: "Incluye:1 destornillador de estrella 1x80mm, 1 destornillador de estrella 0x75mm, 1 destornillador plano 3.0x75mm, 1 destornillador plano 4.0x100mm, 1 destornillador plano 5.5x125mm,1 Tester plano",
        stock: 12
    },
    {
        id: 1019,
        title: "Kit para limpiar celular 10 piezas",
        price: 30,
        category: "herramientas",
        image: "img/Kit para limpiar celular 10 piezas.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1020,
        title: "Llave multifuncion",
        price: 65,
        category: "herramientas",
        image: "img/Llave multifuncion.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1021,
        title: "Mini alicate de punta curva",
        price: 63,
        category: "herramientas",
        image: "img/Mini alicate de punta curva.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1022,
        title: "Mini nivel magnetico",
        price: 50,
        category: "herramientas",
        image: "img/Mini nivel magnetico.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1023,
        title: "Navaja multiusos con estuche",
        price: 105,
        category: "herramientas",
        image: "img/Navaja multiusos con estuche.png",
        description: "",
        stock: 12
    },
    {
        id: 1024,
        title: "Pasador corredizo de 3plg",
        price: 40,
        category: "herramientas",
        image: "img/Pasador corredizo de 3.png",
        description: "",
        stock: 12
    },
    {
        id: 1025,
        title: "Set de espatulas 3 unidades",
        price: 36,
        category: "herramientas",
        image: "img/Set de espatulas 3 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1026,
        title: "Set de brochas 3 unidades",
        price: 55,
        category: "herramientas",
        image: "img/Set de brochas 3 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1027,
        title: "Tornillo para madera X20",
        price: 35,
        category: "herramientas",
        image: "img/Tornillo para madera con tarugo 20 piezas.png",
        description: "",
        stock: 12
    },
    {
        id: 1028,
        title: "Set de pala con estuche",
        price: 135,
        category: "herramientas",
        image: "img/Set de pala con estuche.jpg",
        description: "",
        stock: 12
    },

    // CATEGORÍA: belleza (IDs 1501-1999)
    {
        id: 1501,
        title: "Bloqueador Solar SPF 60 120mg",
        price: 62,
        category: "belleza",
        image: "img/Bloqueador Solar 60spf 120mg.jpg",
        description: "Bloqueador solar con protección SPF 60, enriquecido con aceite de coco y resistente al agua. Ideal para protección prolongada contra los rayos UV.",
        stock: 12
    },
    {
        id: 1502,
        title: "Cosmetiquera Multiusos",
        price: 45,
        category: "belleza",
        image: "img/Cosmetiquera multiproposito.jpg",
        description: "Cosmetiquera con múltiples compartimentos para organizar todos tus productos de belleza y cuidado personal.",
        stock: 12
    },
    {
        id: 1503,
        title: "Crema Alisadora con Keratina y Colágeno",
        price: 37,
        category: "belleza",
        image: "img/Crema alisadora keratina colageno.jpg",
        description: "Crema alisadora profesional con keratina y colágeno para un cabello suave, liso y manejable.",
        stock: 12
    },
    {
        id: 1504,
        title: "Kit de 8 Esponjas para Maquillaje",
        price: 14,
        category: "belleza",
        image: "img/Esponjas para maquillaje 8 unidades.jpg",
        description: "Set de 8 esponjas profesionales para aplicación perfecta de base, corrector y otros productos de maquillaje.",
        stock: 12
    },
    {
        id: 1505,
        title: "Gel Fijador Volumen + Brillos",
        price: 39,
        category: "belleza",
        image: "img/Gel fijador brillo y volumen 180 ml.jpg",
        description: "Gel fijador profesional que proporciona volumen y brillo duradero a tu cabello, con acabado natural.",
        stock: 12
    },
    {
        id: 1506,
        title: "Mini Lámpara UV para Uñas",
        price: 50,
        category: "belleza",
        image: "img/Mini Lampara UV para uñas.jpg",
        description: "Lámpara UV compacta para secado rápido de esmaltes en gel, ideal para manicuras profesionales en casa.",
        stock: 12
    },
    {
        id: 1507,
        title: "Cepillo de limpieza facial",
        price: 15,
        category: "belleza",
        image: "img/Cepillo facial de silicon.png",
        description: "",
        stock: 12
    },
    {
        id: 1508,
        title: "Cepillos para pestañas x5",
        price: 13.50,
        category: "belleza",
        image: "img/Cepillos para pestañas x50.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1509,
        title: "Colitas de colores x10",
        price: 13.50,
        category: "belleza",
        image: "img/Colitas de colores x100.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1510,
        title: "Colitas 10 unidades",
        price: 13.50,
        category: "belleza",
        image: "img/Colitas 100 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1511,
        title: "Depiladora ecologica de cristal",
        price: 45,
        category: "belleza",
        image: "img/Depiladora ecologica de cristal.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1512,
        title: "Kit de extensiones de pestanas x150",
        price: 120,
        category: "belleza",
        image: "img/Kit de extensiones de pestanas x150.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1513,
        title: "Levantador de uñas",
        price: 13.50,
        category: "belleza",
        image: "img/Levantador de uñas.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1514,
        title: "Pinceles para uñas 15 piezas",
        price: 25,
        category: "belleza",
        image: "img/Pinceles para uñas 15 piezas.jpg",
        description: "Set completo de pinceles profesionales para diseño de uñas. Incluye variedad de grosores para diferentes técnicas.",
        stock: 8
    },
    {
        id: 1515,
        title: "Set de barreno para uñas profesional",
        price: 67.50,
        category: "belleza",
        image: "img/Set de barreno para uñas.png",
        description: "Taladro profesional para uñas con potencia ajustable 100-240V 50-60Hz. Ideal para manicura y pedicura.",
        stock: 5
    },
    {
        id: 1516,
        title: "Peine para planchar pelo",
        price: 19.99,
        category: "belleza",
        image: "img/Peine para planchar pelo.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1517,
        title: "Perfilador de cejas 3 unidades",
        price: 20,
        category: "belleza",
        image: "img/Perfilador de cejas 3 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1518,
        title: "Pinza para cejas",
        price: 10.50,
        category: "belleza",
        image: "img/Pinza para cejas.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1519,
        title: "Pinzas para poner pestañas",
        price: 10.50,
        category: "belleza",
        image: "img/Pinzas para poner pestañas.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1520,
        title: "Plancha para pelo 3 en 1",
        price: 210,
        category: "belleza",
        image: "img/Plancha para pelo 3 en 1.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1521,
        title: "Rizador de cabello sin calor",
        price: 65,
        category: "belleza",
        image: "img/Rizador de cabello sin calor.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1522,
        title: "Set de cojin cervical rosado 4 unidades",
        price: 60,
        category: "belleza",
        image: "img/Set de cojin cervical rosado 4 unidades.png",
        description: "",
        stock: 12
    },
    {
        id: 1523,
        title: "Set de manicure 5 en 1",
        price: 84,
        category: "belleza",
        image: "img/Set de manicure 5 en 1.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1524,
        title: "Set de manicure de metal x8",
        price: 25.50,
        category: "belleza",
        image: "img/Set de manicure de metal x8.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1525,
        title: "Set de manicure PRO x16",
        price: 75,
        category: "belleza",
        image: "img/Set de manicure PRO x16.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1526,
        title: "Set de Rasuradora de acero inoxidable",
        price: 35,
        category: "belleza",
        image: "img/Set de Rasuradora de acero inoxidable.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1527,
        title: "Set para acne 5 unidades",
        price: 25,
        category: "belleza",
        image: "img/Set para acne 5 unidades.jpg",
        description: "",
        stock: 12
    },
    {
        id: 1528,
        title: "Tijeras para cejas",
        price: 20,
        category: "belleza",
        image: "img/Tijeras para cejas.jpg",
        description: "",
        stock: 12
    },

    // CATEGORÍA: tecnologia (IDs 2001-2499)
    {
        id: 2001,
        title: "Micrófono recargable MCX-11 con UHF",
        price: 382.50,
        category: "tecnologia",
        image: "img/Microfono recargable MCX-11 con UHF.png",
        description: "Micrófono profesional con tecnología UHF para una transmisión de audio estable y sin interferencias. Recargable para mayor comodidad.",
        stock: 15
    },
    {
        id: 2002,
        title: "Micrófono Tipo C PRO 2 en 1 inalámbrico",
        price: 240,
        category: "tecnologia",
        image: "img/Microfono Tipo C PRO 2 en 1 inalambrico.png",
        description: "Micrófono inalámbrico versátil con conexión Tipo C, ideal para grabaciones profesionales y streaming. Diseño compacto y fácil de usar.",
        stock: 20
    },
    {
        id: 2003,
        title: "Estuche multipropósito negro",
        price: 15,
        category: "tecnologia",
        image: "img/Estuche multiproposito negro.jpg",
        description: "Estuche organizador con múltiples compartimentos para Bluetooth Adapter, USB Drive, Card Reader, Earphones, Data cable y MP3. Perfecto para mantener tus dispositivos ordenados.",
        stock: 30
    },
    {
        id: 2004,
        title: "Cámara Tapo C200",
        price: 322.50,
        category: "tecnologia",
        image: "img/Camara Tapo C200.png",
        description: "Cámara Pan Tilt con vista horizontal de 360° y vertical de 114°. Ideal para monitorear cualquier espacio en tu hogar con imágenes completas y claras.",
        stock: 10
    },
    {
        id: 2005,
        title: "Memoria USB 256GB Kingston",
        price: 157,
        category: "tecnologia",
        image: "img/Memoria USB 256GB.jpg",
        description: "Memoria USB Kingston DataTraveler Exodia de 256GB con USB 3.2 para transferencias rápidas y almacenamiento confiable.",
        stock: 25
    },
    {
        id: 2006,
        title: "Organizadores de cables 6 piezas",
        price: 10.50,
        category: "tecnologia",
        image: "img/Organizadores de cables 6 piezas.jpg",
        description: "Set de 6 organizadores de cables para mantener tus cables ordenados y libres de enredos. Diseño práctico y compacto.",
        stock: 40
    },
    {
        id: 2007,
        title: "Caja de luz LED",
        price: 73.50,
        category: "tecnologia",
        image: "img/Caja de luz LED.jpg",
        description: "Caja de luz LED para iluminación profesional, ideal para fotografía, videos o decoración. Incluye todos los accesorios necesarios.",
        stock: 18
    },
    {
        id: 2008,
        title: "Monitor inteligente Wi-Fi para bebé",
        price: 360,
        category: "tecnologia",
        image: "img/Monitor inteligente Wi-Fi para bebé.jpg",
        description: "Monitor para bebé con conexión Wi-Fi, compatible con App Store và Google Play. Permite monitorear a tu bebé desde cualquier lugar con tu smartphone.",
        stock: 8
    },
    {
        id: 2009,
        title: "Power bank 20000 mAh Tipo C + USB",
        price: 184,
        category: "tecnologia",
        image: "img/Power bank 20000 mah Tipo C + USB.png",
        description: "Power bank de alta capacidad con pantalla LED y capacidad para cargar 2 dispositivos simultáneamente. Ideal para viajes y uso diario.",
        stock: 22
    },
    {
        id: 2010,
        title: "Micrófono inalámbrico profesional MPH-10",
        price: 180,
        category: "tecnologia",
        image: "img/Microfono inalambrico profesional mph-10.png",
        description: "Micrófono inalámbrico profesional con sonido de alta calidad, perfecto para presentaciones, grabaciones y transmisiones en vivo.",
        stock: 14
    },
    {
        id: 2011,
        title: "Cargador doble para PS5",
        price: 180,
        category: "tecnologia",
        image: "img/Cargador doble para PS5.jpg",
        description: "Cargador doble diseñado específicamente para PS5. Permite cargar dos controles al mismo tiempo con un diseño compacto y seguro.",
        stock: 12
    },
    {
        id: 2012,
        title: "Cargador de baterías + 4 baterías AAA",
        price: 97.50,
        category: "tecnologia",
        image: "img/Cargador de baterias + 4 baterias AAA.jpg",
        description: "Cargador digital con 4 baterías AAA recargables incluidas. Ideal para dispositivos electrónicos que requieren energía duradera.",
        stock: 20
    },
    {
        id: 2013,
        title: "Adaptador OTG USB tipo C carga rápida",
        price: 30,
        category: "tecnologia",
        image: "img/Adaptador OTG USB tipo c carga rapida.jpg",
        description: "Adaptador OTG con USB Tipo C que permite carga rápida y conexión de periféricos.",
        stock: 30
    },
    {
        id: 2014,
        title: "Amplificador de pantalla 3D",
        price: 45,
        category: "tecnologia",
        image: "img/Amplificador de pantalla 3D.jpg",
        description: "Dispositivo que amplía la pantalla de tu smartphone con efecto 3D sin necesidad de energía.",
        stock: 18
    },
    {
        id: 2015,
        title: "Aspiradora recargable multifunciones",
        price: 135,
        category: "tecnologia",
        image: "img/Aspiradora recargable multifunciones.png",
        description: "Aspiradora portátil recargable con múltiples accesorios para limpieza en cualquier espacio.",
        stock: 15
    },
    {
        id: 2016,
        title: "Banda de brazo para celular",
        price: 36,
        category: "tecnologia",
        image: "img/Banda de brazo para celular.jpg",
        description: "Banda ajustable para brazo que permite llevar tu smartphone de forma segura durante actividades físicas.",
        stock: 40
    },
    {
        id: 2017,
        title: "Base celular para retrovisor",
        price: 85,
        category: "tecnologia",
        image: "img/Base celular para retrovisor.jpg",
        description: "Soporte ajustable para smartphone que se fija al retrovisor del auto.",
        stock: 22
    },
    {
        id: 2018,
        title: "Cable HDMI 5 metros",
        price: 70,
        category: "tecnologia",
        image: "img/Cable HDMI 5 metros.jpg",
        description: "Cable HDMI de alta velocidad de 5 metros para conexión de dispositivos multimedia.",
        stock: 35
    },
    {
        id: 2019,
        title: "Cable USB a Tipo C OTG",
        price: 27,
        category: "tecnologia",
        image: "img/Cable USB a Tipo C OTG.jpg",
        description: "Cable convertidor de USB a Tipo C con función OTG para conectar periféricos.",
        stock: 50
    },
    {
        id: 2020,
        title: "Cámara HD wifi",
        price: 90,
        category: "tecnologia",
        image: "img/Camara HD wifi.jpg",
        description: "Cámara de seguridad con conexión wifi y visión HD para monitoreo remoto.",
        stock: 12
    },
    {
        id: 2021,
        title: "Cámara wifi Hero B1",
        price: 385,
        category: "tecnologia",
        image: "img/Cámara wifi Hero B1.png",
        description: "Cámara de seguridad wifi con visión nocturna y detección de movimiento.",
        stock: 10
    },
    {
        id: 2022,
        title: "Cámara wifi Xiaomi C300",
        price: 325,
        category: "tecnologia",
        image: "img/Camara wifi Xiaomi C300.png",
        description: "Cámara inteligente Xiaomi con visión 360° y conexión wifi para monitoreo completo.",
        stock: 8
    },
    {
        id: 2023,
        title: "Cargador magnético 15W carga rápida",
        price: 120,
        category: "tecnologia",
        image: "img/Cargador magnetico 15W carga rapida.png",
        description: "Cargador magnético de 15W con tecnología de carga rápida para dispositivos compatibles.",
        stock: 18
    },
    {
        id: 2024,
        title: "Cubo conector AC USB",
        price: 30,
        category: "tecnologia",
        image: "img/Cubo conector ac usb.jpg",
        description: "Cubo multiplicador de enchufes con puertos USB integrados para carga múltiple.",
        stock: 25
    },
    {
        id: 2025,
        title: "Micrófono recargable MCX-10 con UHF",
        price: 276,
        category: "tecnologia",
        image: "img/Microfono recargable mcx-10 con uhf.jpg",
        description: "Micrófono profesional recargable con tecnología UHF para transmisión estable de audio.",
        stock: 15
    },
    {
        id: 2026,
        title: "Organizador de cables",
        price: 12.50,
        category: "tecnologia",
        image: "img/Organizador de cables.jpg",
        description: "Set de organizadores de cables para mantener tu espacio ordenado y libre de enredos.",
        stock: 60
    },
    {
        id: 2027,
        title: "PS4 Cargador para 2 controles",
        price: 150,
        category: "tecnologia",
        image: "img/PS4 Cargador para 2 controles.jpg",
        description: "Base de carga doble para mandos PS4 con indicadores LED de carga.",
        stock: 20
    },
    {
        id: 2028,
        title: "Repuesto para control PS4",
        price: 50,
        category: "tecnologia",
        image: "img/Repuesto para control Ps4.jpg",
        description: "Kit de repuestos para mandos PS4 incluye gatillos, botones y cruceta.",
        stock: 15
    },
    {
        id: 2029,
        title: "Adaptador de corriente tipo C",
        price: 32,
        category: "tecnologia",
        image: "img/Adaptador de corriente tipo C.jpg",
        description: "Adaptador de pared con puerto USB Tipo C para carga rápida de dispositivos móviles.",
        stock: 25
    },
    {
        id: 2030,
        title: "Cable tipo C a 3.5mm 1.2 metros",
        price: 12.99,
        category: "tecnologia",
        image: "img/Cable tipo C a 3.5mm 1.2 metros.png",
        description: "Cable convertidor de USB Tipo C a conector de audio 3.5mm para dispositivos sin jack de auriculares.",
        stock: 35
    },
    {
        id: 2031,
        title: "Router y repetidor inalámbrico de 4 antenas",
        price: 175,
        category: "tecnologia",
        image: "img/Router y repetidor inalambrico de 4 antenas.jpg",
        description: "Dispositivo dual que funciona como router y repetidor wifi con 4 antenas externas para máxima cobertura.",
        stock: 12
    },
    {
        id: 2032,
        title: "Silla gaming Stich Disney",
        price: 1500,
        category: "tecnologia",
        image: "img/Silla gaming stich disney.png",
        description: "Silla gamer temática de Stich con soporte lumbar, reposacabezas y diseño ergonómico.",
        stock: 8
    },
    {
        id: 2033,
        title: "Smart Home Hub 2 Xiaomi",
        price: 294,
        category: "tecnologia",
        image: "img/Smart Home Hub 2 Xiaomi.jpg",
        description: "Central de control para dispositivos smart home con compatibilidad Zigbee 3.0 y Bluetooth Mesh.",
        stock: 10
    },
    {
        id: 2034,
        title: "Soporte móvil para TV de 14 a 55 pulgadas",
        price: 210,
        category: "tecnologia",
        image: "img/Soporte movil para TV de 14 a 55 pgd.jpg",
        description: "Soporte articulado para TV con brazo móvil que permite ajustar ángulo y posición.",
        stock: 15
    },
    {
        id: 2035,
        title: "Soporte para TV de 26 a 63 pulgadas",
        price: 95,
        category: "tecnologia",
        image: "img/Soporte para TV de 26 a 63.jpg",
        description: "Soporte fijo universal para televisores con capacidad de hasta 40kg de peso.",
        stock: 20
    },
    {
        id: 2036,
        title: "Soporte para TV de 55 a 90 pulgadas",
        price: 183,
        category: "tecnologia",
        image: "img/Soporte para TV de 55 a 90.jpg",
        description: "Soporte reforzado para televisores grandes con sistema anti-caídas y diseño ultradelgado.",
        stock: 12
    },
    {
        id: 2037,
        title: "Tira LED RGB de 5 metros",
        price: 100,
        category: "tecnologia",
        image: "img/Tira LED RGB de 5 metros.jpg",
        description: "Tira de luces LED con control remoto, 16 millones de colores y función de memoria.",
        stock: 30
    },
    {
        id: 2038,
        title: "Transmisor bluetooth carga rápida 4 en 1",
        price: 60,
        category: "tecnologia",
        image: "img/Transmisor bluetooth carga rapida 4 en 1.jpg",
        description: "Dispositivo que convierte tu auto en un centro multimedia con Bluetooth, carga rápida y transmisión FM.",
        stock: 18
    },
    {
        id: 2039,
        title: "Tripode de 2 metros",
        price: 75.60,
        category: "tecnologia",
        image: "img/Tripode de 2 metros.png",
        description: "Trípode profesional extensible hasta 2 metros con rótula 360° y nivel de burbuja.",
        stock: 15
    },
    {
        id: 2040,
        title: "Ventilador 20 de 3 velocidades",
        price: 375,
        category: "tecnologia",
        image: "img/Ventilador 20 de 3 velocidades.jpg",
        description: "Ventilador de pedestal de 20 pulgadas con 3 velocidades y oscilación automática.",
        stock: 25
    },
    {
        id: 2041,
        title: "Ventilador Artic Air Ultra",
        price: 90,
        category: "tecnologia",
        image: "img/Ventilador Artic Air Ultra.jpg",
        description: "Ventilador personal con tecnología de enfriamiento por agua, portátil y recargable.",
        stock: 15
    },
    {
        id: 2042,
        title: "Ventilador para el cuello",
        price: 64,
        category: "tecnologia",
        image: "img/Ventilador para el cuello.jpg",
        description: "Ventilador portátil para cuello con 3 velocidades y diseño ergonómico.",
        stock: 30
    },
    {
        id: 2043,
        title: "Wifi Extensor de rango de 2 antenas",
        price: 155,
        category: "tecnologia",
        image: "img/Wifi Extensor de rango de 2 antenas.png",
        description: "Extensor de señal wifi con 2 antenas externas que amplía la cobertura hasta 150m².",
        stock: 20
    },

    // CATEGORÍA: utiles (IDs 2501-2999)
    {
        id: 2501,
        title: "Borrador con marcador para pizarra blanca",
        price: 45,
        category: "utiles",
        image: "img/Marcadores +borrador 4 piezas.jpg",
        description: "Kit de borrador y marcador para pizarra blanca, incluye 4 piezas.",
        stock: 20
    },
    {
        id: 2502,
        title: "Marcador textil negro",
        price: 15,
        category: "utiles",
        image: "img/Marcador textil negro.jpg",
        description: "Marcador permanente textil, color negro, punta resistente.",
        stock: 20
    },
    {
        id: 2503,
        title: "Inflador eléctrico de globos",
        price: 190,
        category: "utiles",
        image: "img/Inflador electrico de globos.jpg",
        description: "Inflador eléctrico para globos, 600W, bajo nivel de ruido (<85dB).",
        stock: 20
    },
    {
        id: 2504,
        title: "Notas adhesivas transparentes",
        price: 15,
        category: "utiles",
        image: "img/Post it transparentes cuadrado 50 piezas.jpg",
        description: "Notas adhesivas cuadradas transparentes (76x76mm), 50 hojas de material PET reutilizable.",
        stock: 20
    },
    {
        id: 2505,
        title: "Etiquetas autoadhesivas",
        price: 10,
        category: "utiles",
        image: "img/Etiquetas autoadhesivas x105.jpg",
        description: "Paquete con 105 etiquetas autoadhesivas (11.5x17cm), aptas para impresión láser.",
        stock: 20
    },
    {
        id: 2506,
        title: "Notas adhesivas de colores",
        price: 15,
        category: "utiles",
        image: "img/Post-it de colores x125.jpg",
        description: "Bloc de notas adhesivas multicolor, 125 hojas.",
        stock: 20
    },
    {
        id: 2507,
        title: "Grapas metálicas",
        price: 35,
        category: "utiles",
        image: "img/Grapas 5000 piezas.jpg",
        description: "Caja con 5000 grapas metálicas (6mm), para uso en engrapadoras.",
        stock: 20
    },
    {
        id: 2508,
        title: "Marcador de pintura plateado",
        price: 20,
        category: "utiles",
        image: "img/Marcador de pintura plata.jpg",
        description: "Marcador de pintura metálica, color plateado, punta de 0.7mm.",
        stock: 20
    },
    {
        id: 2509,
        title: "Bolígrafos de gel negros",
        price: 15,
        category: "utiles",
        image: "img/Lapicero negro 3 unidades.jpg",
        description: "Pack de 3 bolígrafos de gel (0.7mm), tinta negra.",
        stock: 20
    },
    {
        id: 2510,
        title: "Marcadores de doble punta",
        price: 65,
        category: "utiles",
        image: "img/Marcadores doble punta x24.jpg",
        description: "Set de 24 marcadores con punta doble (fina/gruesa), varios colores.",
        stock: 20
    },
    {
        id: 2511,
        title: "Marcadores para metal",
        price: 25,
        category: "utiles",
        image: "img/Marcador de metal 3 unidades.jpg",
        description: "Pack de 3 marcadores permanentes para superficies metálicas (dorado, plateado, bronce).",
        stock: 20
    },
    {
        id: 2512,
        title: "Porta tarjetas de identificación",
        price: 12.50,
        category: "utiles",
        image: "img/Identificador 2 piezas.png",
        description: "Set de 2 porta tarjetas plásticos (54x85mm) para credenciales.",
        stock: 20
    },
    {
        id: 2513,
        title: "Lápiz mecánico con minas",
        price: 15,
        category: "utiles",
        image: "img/Portaminas +minas.png",
        description: "Lápiz mecánico profesional (0.5mm) con minas de repuesto incluidas.",
        stock: 20
    },
    {
        id: 2514,
        title: "Regla de aluminio",
        price: 20,
        category: "utiles",
        image: "img/Regla de aluminio 30cm.jpg",
        description: "Regla de aluminio de 30cm, resistente y precisa.",
        stock: 20
    },

    // CATEGORÍA: ropa-mujer (IDs 3001-3499)
    {
    id: 3001,
    title: "Moldeador de cuerpo short ",
    price: 70,
    category: "ropa-mujer",
    image: "img/Moldeador de cuerpo short S,M.jpg",
    description: "",
    variants: {
        ///colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: [ "S", "M"]
    },
    stock: 12
},
     {
        id: 3002,
        title: "Macaquinho de mezclilla",
        price: 110,
        category: "ropa-mujer",
        image: "img/macaquinho de mezclilla.jpg",
        description: "",
        variants: {
        //Colors: ["Gris","" ],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
    {
        id: 3003,
        title: "Vestido camisero de mezclilla sin mangas",
        price: 100,
        category: "ropa-mujer",
        image: "img/vestido camisero de mezclilla sin mangas.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro","color null"],
        sizes: ["S", "M", "L"]
    },
        stock: 12
    },
     {
        id: 3004,
        title: "Falda acampanada color marron",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda acampanada color marron.jpg",
        description: "",
        variants: {
        //colors: ["Mosta", ""],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
    {
        id: 3005,
        title: "Falda con botones frontales",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda con botones frontales.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
     {
        id: 3006,
        title: "Falda de volantes morada",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda de volantes morada.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
     {
        id: 3007,
        title: "Falda midi abotonada",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda midi abotonada.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
     {
        id: 3008,
        title: "Falda midi de mezclilla con diseño de sirena",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda midi de mezclilla con diseño de sirena.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
     {
        id: 3009,
        title: "Falda midi estampado de lunares",
        price: 100,
        category: "ropa-mujer",
        image: "img/falda midi estampado de lunares.jpg",
        description: "",
        variants: {
        //colors: ["Azul claro", "Azul oscuro", "Blanco"],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },
    {
        id: 30010,
        title: "vestido tipo camisa con cinturón",
        price: 100,
        category: "ropa-mujer",
        image: "img/vestido tipo camisa con cinturón.jpeg",
        description: "",
        variants: {
        colors: ["Rojo", "Amarillo", "Negro","azul claro","rosado oscuro","beige","morado claro",
            "blanco","verde","rosa claro","morado oscuro"
        ],
        sizes: ["XS", "S", "M", "L"]
    },
        stock: 12
    },



    // CATEGORÍA: ropa-hombre (IDs 3501-3999)
    {
        id: 3501,
        title: "Goorin Bros - fierce yellow",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de tigre.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3502,
        title: "Goorin Bros - Panther red",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de puma.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3503,
        title: "Goorin Bros - Tiger red",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de gallo rojo.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3504,
        title: "Goorin Bros - Cock black",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de gallo.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3505,
        title: "Goorin Bros - colorful rooster",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de gallo rojo.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3506,
        title: "Goorin Bros - Wildking red",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de mono.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3507,
        title: "Goorin Bros - Cock Cofe",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de gallo cafe.jpeg",
        description: "",
        stock: 1
    },
    {
        id: 3508,
        title: "Goorin Bros - Cock Grey",
        price: 85,
        category: "ropa-hombre",
        image: "img/Gorra de gallo gris.jpeg",
        description: "",
        stock: 1
    },

    // CATEGORÍA: exterior (IDs 4001-4499)
    {
        id: 4001,
        title: "Carpa impermeable de 2 personas",
        price: 190,
        category: "exterior",
        image: "img/Carpa impermeable 2 personas.jpg",
        description: "Carpa ligera e impermeable para 2 personas con protección anti-mosquitos, doble cremallera y fácil transporte",
        stock: 12,
        features: ["Anti-mosquitoes", "Light Rainproof", "Double Zippers", "Lightweight"]
    },
    {
        id: 4002,
        title: "Carpa impermeable de 5 personas",
        price: 380,
        category: "exterior",
        image: "img/Carpa impermeable 5 personas.jpg",
        description: "Carpa espaciosa para 5 personas con malla ventilada, tejido impermeable y accesorios incluidos",
        stock: 8,
    },
    {
        id: 4003,
        title: "Hielera de 50 litros (70 latas) gris",
        price: 395,
        category: "exterior",
        image: "img/Hielera de 50 litros 70 latas gris.jpg",
        description: "Hielera con capacidad para 70 latas, ideal para excursiones y días de campo",
        stock: 15,
    },
    {
        id: 4004,
        title: "Hielera termo de 3 litros",
        price: 175,
        category: "exterior",
        image: "img/Hielera Termo de 3 litros.jpg",
        description: "Hielera térmica portátil de 3 litros con aislamiento eficiente",
        stock: 20,
    },
    {
        id: 4005,
        title: "Lámpara solar recargable 200W",
        price: 185,
        category: "exterior",
        image: "img/Lampara solar recargable 200W.jpg",
        description: "Lámpara solar potente con panel de 200W, ideal para camping y exteriores",
        stock: 10,
    },
    {
        id: 4006,
        title: "Lámpara solar recargable 400W",
        price: 295,
        category: "exterior",
        image: "img/Lampara solar recargable 400W.png",
        description: "Lámpara solar de alta potencia con 192 LEDs, perfecta para iluminación exterior",
        stock: 7,
    },
    {
        id: 4007,
        title: "Lámpara solar recargable 500W",
        price: 375,
        category: "exterior",
        image: "img/Lampara solar recargable 500W.jpg",
        description: "Lámpara solar profesional de 500W para iluminación intensiva en exteriores",
        stock: 5,
    },
    {
        id: 4008,
        title: "Linterna LED de metal con zoom",
        price: 65,
        category: "exterior",
        image: "img/Linterna LED de metal con zoom.png",
        description: "Linterna profesional de metal con función zoom ajustable",
        stock: 18,
    },
    {
        id: 4009,
        title: "Linterna recargable 11 LED",
        price: 75,
        category: "exterior",
        image: "img/Linterna recargable 11 LED.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4010,
        title: "Hamaca doble azul",
        price: 250,
        category: "exterior",
        image: "img/Hamaca doble + ganchos y lazos azul.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4011,
        title: "Hamaca doble naranja",
        price: 250,
        category: "exterior",
        image: "img/Hamaca doble + ganchos y lazos naranja.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4012,
        title: "Hamaca doble negra",
        price: 250,
        category: "exterior",
        image: "img/Hamaca doble + ganchos y lazos negra.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4013,
        title: "Hamaca doble verde",
        price: 250,
        category: "exterior",
        image: "img/Hamaca doble + ganchos y lazos verde.jpg",
        description: "",
        stock: 12,
    },

    // CATEGORÍA: navidad (IDs 4501-4999)
    {
        id: 4501,
        title: "Adorno grande de baston",
        price: 40,
        category: "navidad",
        image: "img/Adorno grande de baston.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4502,
        title: "Luces LED 50 metros amarillas",
        price: 130,
        category: "navidad",
        image: "img/Luces LED 50 metros amarillas.jpg",
        description: "",
        stock: 12,
    },
    {
        id: 4503,
        title: "Luces LED 50 metros blancas",
        price: 130,
        category: "navidad",
        image: "img/Luces LED 50 metros blancas.jpg",
        description: "",
        stock: 12,
    },
    {
      id:4504,
      title:"Luces LED 50 metros de colores",
      price:130,
      category:"navidad",
      image: "img/Luces LED 50 metros de colores.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4505,
      title:"Luces LED 100 metros de colores",
      price:225,
      category:"navidad",
      image: "img/Luces LED 100 metros de colores.png",
      description: "",
      stock: 12,
    },
     {
      id:4505,
      title:"Luces LED de cortina 1.5 mts amarillas",
      price:39,
      category:"navidad",
      image: "img/Luces LED de cortina 1.5 mts amarillas.jpg",
      description: "",
      stock: 12,
    },
      {
      id:4506,
      title:"Luces LED de cortina 1.5 mts blancas",
      price:39,
      category:"navidad",
      image: "img/Luces LED de cortina 1.5 mts blancas.jpg",
      description: "",
      stock: 12,
    },
     {
      id:4507,
      title:"Luces LED de cortina 1.5 mts colores",
      price:40,
      category:"navidad",
      image: "img/Luces LED de cortina 1.5 mts de colores.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4508,
      title:"Luces LED solares manguera 10mts blanca",
      price:115,
      category:"navidad",
      image: "img/Luces LED solares manguera 10mts blanca.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4509,
      title:"Luces LED solares manguera 10mts colores",
      price:115,
      category:"navidad",
      image: "img/Luces LED solares manguera 10mts colores.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4510,
      title:"Luces LED solares manguera 10mts amarillo",
      price:115,
      category:"navidad",
      image: "img/Luces LED solares manguera 10ts amarillo.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4511,
      title:"Luces navideñas amarillas 5 metros",
      price:40,
      category:"navidad",
      image: "img/Luces navideñas amarillas 5 metros.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4512,
      title:"Luces navideñas amarillas 11 metros",
      price:55,
      category:"navidad",
      image: "img/Luces navideñas amarillas 11 metros.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4513,
      title:"Luces navideñas blancos 11 metros",
      price:55,
      category:"navidad",
      image: "img/Luces navideñas blancas 11 metros.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4514,
      title:"Luces navideñas colores 11 metros",
      price:55,
      category:"navidad",
      image: "img/Luces navideñas colores 11 metros.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4515,
      title:"Luces navideñas colores 5 metros",
      price:45,
      category:"navidad",
      image: "img/Luces navideñas colores 5 metros.jpg",
      description: "",
      stock: 12,
    },
    {
      id:4515,
      title:"Luces navideñas colores 9 metros musical",
      price:45,
      category:"navidad",
      image: "img/Luces navideñas colores 9 metros musical.jpg",
      description: "",
      stock: 30,
    },
    


];