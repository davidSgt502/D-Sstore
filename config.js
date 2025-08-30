// Configuración de la aplicación
const APP_CONFIG = {
    storeName: "D&S Store",
    storeSlogan: "Productos de calidad a tu alcance",
    whatsappNumber: "56393305",
    storeEmail: "gtdavidsara@gmail.com",
    bankName: "Banco Bantrab",
    accountNumber: "2100136130",
    accountHolder: "Evert Lennin David Revolorio Trujillo ",
    accountType: "Ahorros",
   
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
        "Área Metropolitana": {
            "Mixco": 50,
            "Villa Nueva": 50,
            "San Miguel Petapa": 50,
            "Santa Catarina Pinula": 55,
            "San José Pinula": 55,
            "Fraijanes": 60,
            "Amatitlán": 60,
            "Villa Canales": 65,
            "San Juan Sacatepéquez": 70
        },
        "Departamentos": {
            "Sacatepéquez (Antigua)": 80,
            "Escuintla": 90,
            "Chimaltenango": 85,
            "Quetzaltenango": 120,
            "Retalhuleu": 130,
            "Suchitepéquez": 140,
            "Totonicapán": 125,
            "Sololá": 110,
            "Chiquimula": 150,
            "Jalapa": 145,
            "Zacapa": 155,
            "El Progreso": 140,
            "Baja Verapaz": 130,
            "Alta Verapaz": 160,
            "Petén": 200,
            "Izabal": 180,
            "Huehuetenango": 170,
            "Quiché": 160,
            "San Marcos": 150,
            "Santa Rosa": 120,
            "Jutiapa": 140
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