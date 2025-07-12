// Datos de productos
const PRODUCTS = [
    //Audio//
    {
        
        id: 1,
        title: "Audífonos AUX",
        price: 40,
        //originalPrice: ,
        category: "audio",
        image: "productos/Audifonos/Audifonos  Aux.jpg",
        description: "Incluye microfono Compatibilidad con multiples dispositivos3.5mm audio jack",
        //badge: { text: "20% OFF", type: "discount" },
        stock: 12 
    },
    {
        id: 2,
        title: "Audifonos bluetooth magneticos",
        price: 179.99,
        category: "audio",
        image: "productos/Audifonos/Audifonos con microfono y boton Aux.png",
        description: "Liviano,Cordón evita la formación de nudos y Largo: 1.2 metros ",
       // badge: { text: "NUEVO", type: "new" },
        stock: 12 
    },
    {
        id: 3,
        title: "Audifonos bluetooth XT81PRO",
        price: 499.99,
        category: "audio",
        image: "productos/Audifonos/Audifonos bluetooth XT81PRO.jpg",
        description: "Compatible con Bluetooth 5.1 recientemente actualizado, puede reducir la pérdida de señal y la desconexión causada por interferencias, sin retraso en la sincronización de la pantalla del juego",
        //badge: { text: "TOP", type: "featured" }
    },
    {
        id: 4,
        title: "Audifonos bluetooth redmi play 6 azul",
        price: 499.99,
        category: "audio",
        image: "productos/Audifonos/Audifonos bluetooth redmi play 6 azul.jpg",
        description: "Con hasta 36 horas de reproducción total al usar el estuche de carga, y 7,5 horas con una sola carga",
        
    },
    {
        id: 5,
        title: "Audifonos bluetooth Xiaomi redmi 6",
        price: 89.99,
        category: "audio",
        image: "productos/Audifonos/Audifonos bluetooth Xiaomi redmi 6.jpg",
        description: "Con hasta 36 horas de reproducción total al usar el estuche de carga, y 7,5 horas con una sola carga, estos auriculares son ideales para quienes pasan mucho tiempo fuera y no quieren preocuparse por la batería.",
        //badge: { text: "SALUD", type: "health" }
    },
    {
        id: 6,
        title: "Audifonos bluetooth para moto",
        price: 599.99,
        category: "audio",
        image: "productos/Audifonos/Audifonos bluetooth para moto.jpg",
        description: "Función manos libres, realmente libera tu mano Batería recargable de iones de litio, larga espera y tiempo de trabajo",
        //badge: { text: "OFERTA", type: "offer" }
    },
    {
        id: 7,
        title: "Bocina bluetooth xiaomi sound pocket",
        price: 129.99,
        category: "audio",
        image: "productos/Audifonos/Bocina bluetooth xiaomi sound pocket.png",
        description: "Sonido envolvente con salida de 5W, Diseño de bolsillo portátil, Sonido estéreo verdaderamente inalámbrico y Batería de larga duración de hasta 10 horas. "
    },
   
    {
        id: 8,
        title: "Set de 2 bocinas para pc",
        price: 9.99,
        category: "audio",
        image: "productos/Audifonos/Set de 2 bocinas para pc.jpg",
        description: "Altavoz multimedia de 2.0 canales, Efectos de iluminación RGB, Compatibilidad multiplataforma (portátil, escritorio, móvil)",
        //badge: { text: "Q10 O MENOS", type: "low-price" }
    },

     //Hogar//
    {
        id: 9,
        title: "Afilador de cuchillos",
        price: 8.99,
        category: "hogar",
        image: "productos/Hogar/Afilador de cuchillos.jpg",
        description: "innovador diseño de 3 ranuras que ayuda a restaurar tus cuchillos a nuevos",
        //badge: { text: "Q10 O MENOS", type: "low-price" }
    },
    {
        id: 10,
        title: "Base de metal para 3 tacos x4 ",
        price: 399.99,
        originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Base de metal para 3 tacos x4.jpg",
        description: "Paquete de 4 soportes para tacos de , estantes para tacos, de acero inoxidable",
       // badge: { text: "OFERTA", type: "offer" }
    },
    {
        id: 11,
        title: "Basurero con Tapadera 13lts",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Basurero con Tapadera 13lts.jpg",
        description: "Altua de 42cm x 20cm de Ancho x 24cm de Largo",
       // badge: { text: "OFERTA", type: "offer" }
    },
{
    id: 12,
        title: "Bolsa de lavado de brasier",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Bolsa de lavado de brasier.jpg",
        description: "Bolsa de malla suave, duradera y de doble capa",
       // badge: { text: "OFERTA", type: "offer" }
},
{
    id: 13,
        title: "Bombilla led con ventilador",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Bombilla led con ventilador.jpg",
        description: "Ventilador de techo con luz: luz de ventilador, diseño novedoso, ultraligero y nivel de alta tecnología",
       // badge: { text: "OFERTA", type: "offer" }
},
{
    id: 14,
        title: "Botones para pantalones x3",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Botones para pantalones x3.png",
        description: "Material de alta calidad: el extensor de botón está hecho de excelente material de metal y silicona con bordes lisos",
       // badge: { text: "OFERTA", type: "offer" }
},
{
    id: 15,
        title: "Clips para cerrar bolsas 4 piezas",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Clips para cerrar bolsas 4 piezas.jpg",
        description: "BROCHES CIERRA BOLSAS X4 UNIDADES, COLORES SURTIDOS",
       // badge: { text: "OFERTA", type: "offer" }
},
{
    id: 16,
        title: "Cobertor de silicon para la ducha.jpg",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Cobertor de silicon para la ducha.jpg",
        description: "Se puede utilizar en cocina, baño, garaje, lavabo, sótano e inodoro",
       // badge: { text: "OFERTA", type: "offer" }
},
{
    id: 17,
        title: "Cortador de Piña.jpg",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Cortador de Piña.jpg",
        description: "CORTADOR DE PIÑA",
       // badge: { text: "OFERTA", type: "offer" }
},
    {
        id: 18,
        title: "Dispensador de jabon",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Dispensador de jabon.jpg",
        description: "Diseño innovador: dispensador de jabón y esponja 2 en 1, puede obtener el detergente con una mano",
       // badge: { text: "OFERTA", type: "offer" }
    },
    {
        id: 19,
        title: "Dispensador de metal",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Dispensador de metal.jpg",
        description: "dispensador de papel higiénico está hecho de acero inoxidable 304 real",
       // badge: { text: "OFERTA", type: "offer" }
    },
    {
        id: 20,
        title: "Dispensador de papel jumbo",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Dispensador de papel jumbo.png",
        description: "Dispensador de Papel Rollo Jumbo con Llave, Incluye Tarugos y Tornillos para su instalación.",
       // badge: { text: "OFERTA", type: "offer" }
    },
    {
    id: 21,
    title: "Espátulas de silicona (5 unidades)",
    price: 249.99,
    category: "hogar",
    image: "productos/Hogar/Espatulas de silicon 5 unidades.jpg",
    description: "Set de 5 espátulas de silicona grado alimenticio. Ideal para mezclar, batir huevos, freír carne y aplicar aceite. Material resistente al calor y duradero."
},
{
    id: 22,
    title: "Espumador PRO y batidor recargable",
    price: 349.99,
    category: "hogar",
    image: "productos/Hogar/Espumador PRO y batidor recargable.jpg",
    description: "Espumador profesional con batidor recargable. Dimensiones: 26cm de largo. Ideal para preparar bebidas espumosas."
},
    {
        id: 23,
        title: "Esquineros protectores 4 piezas",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Esquineros protectores 4 piezas.jpg",
        description: ""
    },
    {
        id: 24,
        title: "Exprimidor de pastas y cremas x3",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Exprimidor de pastas y cremas x3.jpg",
        description: ""
    },
    {
        id: 25,
        title: "Funda elastica blanca para mesa",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Funda elastica blanca para mesa.jpg",
        description: "Apta para mesas de 180 (largo) x 75 (ancho) x 75 (alto) centimetros"
    },
    {
        id: 26,
        title: "Funda elastica negra para mesa",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Funda elastica negra para mesa.jpg",
        description: "Apta para mesas de 180 (largo) x 75 (ancho) x 75 (alto) centimetros"
    },
    {
        id: 27,
        title: "Hervidora electrica xiaomi",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Hervidora electrica xiaomi.jpg",
        description: "Hierve agua para tu té o café con el Hervidor Eléctrico Xiaomi 2. Este hervidor tiene una capacidad de 1.7 litros"
    },
    {
        id: 28,
        title: "Humidificador de Aromas.jpg",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Humidificador de Aromas.jpg",
        description: "humidifica el aire de la habitación independientemente del verano o el invierno, refresca la calidad del aire que respiramos y ajusta la temperatura de la habitación"
    },
    {
        id: 29,
        title: "Limpia vidrios",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Limpia vidrios.jpg",
        description: "La hoja flexible y resistente limpia las superficies sin rayas, elimina restos de jabón, cal y otra"
    },
    {
        id: 30,
        title: "Limpiador de hornos y parrillas",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Limpiador de hornos y parrillas.jpg",
        description: "Elimina grasa y alimentos quemados y resistentes.limpieza de manchas"
    },

    {        id: 31,
        title: "Limpiador de paredes OX 24",
        price: 399.99,
      // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Limpiador de paredes OX 24 onzas.png",
        description: "Puedes limpiar las paredes exteriores de contaminación (esmog) y polvo."
    },

    {        
        id: 32,
        title: "Pachon Acero inoxidable 500ml",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Pachon Acero inoxidable 500ml.jpg",
        description: "Termo botella de aluminio doble pared para sublimación, tipo lechero con cerro de silicona en la tapa lo cual hace un cierre que evita derrames"
    },
    {        id: 33,
        title: "Reparador de zippers (3 unidades)",
        price: 399.99,
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Reparador de zippers (3 unidades).jpg",
        description: "Kit universal de reparación instantánea de zippers"
    },

    {        id: 34,
        title: "Set de 6 cuchillos inoxidables para carne",
        price: 399.99,
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Set de 6 cuchillos inoxidables para carne.png",
        description: ""
    },
    {        id: 35,
        title: "Set de esponjas 5 unidades",
        price: 399.99,
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Set de esponjas 5 unidades.jpg",
        description: ""
    },
    {        id: 36,
        title: "Set de esponjas de alambre 4 unidades",
        price: 399.99,
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Set de esponjas de alambre 4 unidades.png",
        description: ""
    },
    {        
        id: 37,
        title: "Spray dispensador de aceite",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Spray dispensador de aceite.jpg",
        description: "El spray dispensador de aceite está hecha de vidrio"
    },
    {        
        id: 38,
        title: "Termometro digital de cocina",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Termometro digital de cocina.jpg",
        description: "Termómetro digital para medir temperatura de bebidas y comidas."
    },
    {        
        id: 39,
        title: "Vaso metalico tumbler 20oz",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Vaso metalico tumbler 20oz.jpg",
        description: "Disfruta de tus bebidas a la temperatura ideal para consumirlas en el hogar, de paseo o al aire libre"
    },
    {        
        id: 40,
        title: "Ventilador recargable de mano",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Ventilador recargable de mano.jpg",
        description: "Un ventilador inalámbrico con batería de larga duración que lleva una brisa fresca a cualquier lugar"
    },
    {        
        id: 41,
        title: "Ventilador recargable Xiaomi",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Ventilador recargable Xiaomi.jpg",
        description: "Un ventilador inalámbrico con batería de larga duración que lleva una brisa fresca a cualquier lugar, Ventilador de escritorio y portátil de doble uso 2 en 1, brisa más suave entregada a través de 7 aspas"
    },
    {        
        id: 42,
        title: "Zapatera de 5 niveles",
        price: 399.99,  
        // originalPrice: 499.99,
        category: "hogar",
        image: "productos/Hogar/Zapatera de 5 niveles.jpg",
        description: "Ya no es necesario apilar los zapatos en el pasillo, porque puedes colocarlos ordenadamente en este zapatero de 5 niveles. Aprovechando al máximo el espacio"
    },
    //herramientas
    // Aceite 3 en 1 Multiusos
{
  id: 43,
  title: "Aceite 3 en 1 Multiusos 236ml",
  price: 129.99,
  category: "herramientas",
  image: "productos/herramientas/Aceite 3 en 1 236ml Multiusos.jpg",
  description: "Aceite multiusos que lubrica, penetra y limpia. Ideal para múltiples aplicaciones en herramientas y mecanismos."
},

// Brocas de madera
{
  id: 44,
  title: "Brocas para madera 5 unidades",
  price: 149.99,
  category: "herramientas",
  image: "productos/herramientas/Brocas de madera 5 unidades.png",
  description: "Set de 5 brocas especializadas para madera de alta durabilidad y precisión."
},

// Brocas de metal
{
  id: 45,
  title: "Brocas para metal 13 piezas",
  price: 299.99,
  category: "herramientas",
  image: "productos/herramientas/Brocas de metal 13 piezas.jpg",
  description: "Juego completo de 13 brocas para metal de diferentes tamaños, ideales para trabajos profesionales."
},

// Cinta métrica
{
  id: 46,
  title: "Cinta métrica 5 metros",
  price: 89.99,
  category: "herramientas",
  image: "productos/herramientas/Cinta metrica 5 metros.jpg",
  description: "Cinta métrica resistente de 5 metros con marcajes claros para mediciones precisas."
},

// Cuchilla de aluminio
{
  id: 47,
  title: "Cuchilla de aluminio de doble cara",
  price: 79.99,
  category: "herramientas",
  image: "productos/herramientas/Cuchilla de aluminio de doble cara.png",
  description: "Cuchilla profesional de aluminio con doble filo para cortes precisos y duraderos."
},

// Cuchillas
{
  id: 48,
  title: "Cuchillas 14 piezas",
  price: 199.99,
  category: "herramientas",
  image: "productos/herramientas/Cuchillas 14 piezas.jpg",
  description: "Set de 14 cuchillas de repuesto de alta calidad para diversas herramientas de corte."
},

// Desarmadores para electrónicos
{
  id: 49,
  title: "Desarmadores para electrónicos x16",
  price: 159.99,
  category: "herramientas",
  image: "productos/herramientas/Desarmadores para electronicos x16.jpg",
  description: "Juego de 16 desarmadores precisos especialmente diseñados para trabajos electrónicos."
},

// Destornilladores
{
  id: 50,
  title: "Destornilladores de precisión 11 piezas",
  price: 179.99,
  category: "herramientas",
  image: "productos/herramientas/Destornilladores 11 piezas.jpg",
  description: "Set profesional de 11 destornilladores de precisión con cabezales variados para trabajos delicados."
},

// Herramienta multifuncional
{
  id: 51,
  title: "Herramienta multifuncional 18 en 1",
  price: 349.99,
  category: "herramientas",
  image: "productos/herramientas/Herramienta multifuncional 18 en 1.jpg",
  description: "Herramienta versátil con 18 funciones diferentes, perfecta para camping, auto y hogar."
},
{
  id: 52,
  title: "Bisagra doble de 2.5\"",
  price: 24.99,
  category: "herramientas",
  image: "productos/Herramientas/Bisagra doble de 2.5.png",
  description: "Bisagra doble de acero inoxidable de 2.5 pulgadas, ideal para puertas y muebles. Incluye tornillos para su fácil instalación."
},
{
  id: 53,
  title: "Cepillo de acero",
  price: 19.99,
  category: "herramientas",
  image: "productos/Herramientas/Cepillo de acero.jpg",
  description: "Cepillo de alambre con mango de madera, perfecto para remover óxido, pintura o residuos en superficies metálicas."
},
{
  id: 54,
  title: "Cerradura redonda para puerta interior",
  price: 89.99,
  category: "herramientas",
  image: "productos/Herramientas/Cerradura redonda para puerta interior.jpg",
  description: "Cerradura redonda con llave para puerta interior. Incluye 3 llaves, tornillos y herrajes para una instalación segura y sencilla."
},// Bloqueador Solar 60spf 120mg.jpg
//Belleza 
{
  id: 1,
  title: "Bloqueador Solar SPF 60",
  price: 249.99,
  category: "belleza",
  image: "productos/Belleza/Bloqueador Solar 60spf 120mg.jpg",
  description: "Bloqueador solar con protección SPF 60, enriquecido con aceite de coco y resistente al agua. Ideal para protección prolongada contra los rayos UV."
},

// Cosmetiquera multiproposito.jpg
{
  id: 2,
  title: "Cosmetiquera Multiusos",
  price: 179.99,
  category: "belleza",
  image: "productos/Belleza/Cosmetiquera multiproposito.jpg",
  description: "Cosmetiquera con múltiples compartimentos para organizar todos tus productos de belleza y cuidado personal."
},

// Crema alisadora keratina colageno.jpg
{
  id: 3,
  title: "Crema Alisadora con Keratina y Colágeno",
  price: 299.99,
  category: "belleza",
  image: "productos/Belleza/Crema alisadora keratina colageno.jpg",
  description: "Crema alisadora profesional con keratina y colágeno para un cabello suave, liso y manejable."
},

// Esponjas para maquillaje 8 unidades.jpg
{
  id: 4,
  title: "Kit de 8 Esponjas para Maquillaje",
  price: 129.99,
  category: "belleza",
  image: "productos/Belleza/Esponjas para maquillaje 8 unidades.jpg",
  description: "Set de 8 esponjas profesionales para aplicación perfecta de base, corrector y otros productos de maquillaje."
},

// Gel fijador brillo y volumen 180 ml.jpg
{
  id: 5,
  title: "Gel Fijador Volumen + Brillos",
  price: 159.99,
  category: "belleza",
  image: "productos/Belleza/Gel fijador brillo y volumen 180 ml.jpg",
  description: "Gel fijador profesional que proporciona volumen y brillo duradero a tu cabello, con acabado natural."
},

// Mini Lampara UV para uñas.jpg
{
  id: 6,
  title: "Mini Lámpara UV para Uñas",
  price: 349.99,
  category: "belleza",
  image: "productos/Belleza/Mini Lampara UV para uñas.jpg",
  description: "Lámpara UV compacta para secado rápido de esmaltes en gel, ideal para manicuras profesionales en casa."
}

    
];