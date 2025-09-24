/// Configuración de la aplicación
const APP_CONFIG = {
    storeName: "D&S Store",
    storeSlogan: "Productos de calidad a tu alcance",
    whatsappNumber: "56393305",
    storeEmail: "gtdavidsara@gmail.com",

    // Modificar shippingBancks para incluir información de logos
    shippingBancks: [
    {
        name: "Banco Bantrab",
        accountNumber: "2100136130",
        accountHolder: "Evert Lennin David Revolorio Trujillo", 
        accountType: "Ahorros"
    },
    {
        name: "Banco Bi",
        accountNumber: "modificar",
        accountHolder: "Evert Lennin David Revolorio Trujillo", 
        accountType: "Monetaria"
    },
    {
        name: "Banco Zigui",
        accountNumber: "modificar",
        accountHolder: "Evert Lennin David Revolorio Trujillo", 
        accountType: "Ahorros"
    },
    {
        name: "Banco Nexa",
        accountNumber: "modificar",
        accountHolder: "Evert Lennin David Revolorio Trujillo", 
        accountType: "Ahorros"
    }
],
    // Precios de envío basados en Guatex para paquetes de 1kg
    shippingZones: {
        "Ciudad de Guatemala": {
            "Zona 1": 25,
            "Zona 2": 25,
            "Zona 3": 25,
            "Zona 4": 25,
            "Zona 5": 25,
            "Zona 6": 30,
            "Zona 7": 30,
            "Zona 8": 30,
            "Zona 9": 30,
            "Zona 10": 30,
            "Zona 11": 35,
            "Zona 12": 35,
            "Zona 13": 35,
            "Zona 14": 35,
            "Zona 15": 35,
            "Zona 16": 40,
            "Zona 17": 40,
            "Zona 18": 40,
            "Zona 19": 45,
            "Zona 20": 45,
            "Zona 21": 45
        },
        /*"Área Metropolitana": {
            "Mixco": 50,
            "Villa Nueva": 50,
            "San Miguel Petapa": 50,
            "Santa Catarina Pinula": 55,
            "San José Pinula": 55,
            "Fraijanes": 60,
            "Amatitlán": 60,
            "Villa Canales": 65,
            "San Juan Sacatepéquez": 70
        },*/
        "Departamentos": {
            "Chiquimula": 150,
            "Zacapa": 155,
            "Alta Verapaz": 160
        }
    },
    
    shippingMethods: {
        standard: { 
            name: "Envío a domicilio", 
            days: "2-3 días",
            description: "Envío con Guatex (entrega en 2-3 días hábiles)" 
        }
    }
};