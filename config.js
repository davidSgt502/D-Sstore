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
        accountNumber: "7174454251",
        accountHolder: "Evert Lennin David Revolorio Trujillo", 
        accountType: "Monetaria"
    },
    
],
    // Precios de envío basados en Guatex para paquetes de 1kg
    shippingZones: {
        "Ciudad de Guatemala": {
            "Zona 1": 30,
            "Zona 2": 30,
            "Zona 3": 30,
            "Zona 4": 30,
            "Zona 5": 30,
            "Zona 6": 30,
            "Zona 7": 30,
        },
        "Departamentos": {
            "Alta Verapaz": 52,
            "Baja Verapaz": 52,
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
