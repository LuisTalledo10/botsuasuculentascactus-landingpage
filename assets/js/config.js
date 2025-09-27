// Configuración general de la aplicación Botsua
const BOTSUA_CONFIG = {
    // === CONFIGURACIÓN DE WHATSAPP ===
    whatsapp: {
        // Número de WhatsApp (formato: código país + número sin espacios ni símbolos)
        phoneNumber: "51987510300", // CAMBIAR POR TU NÚMERO REAL
        businessName: "Botsua Suculentas y Cactus",
        
        // Mensajes predeterminados
        welcomeMessage: "¡Hola! 👋 Bienvenido a Botsua Suculentas y Cactus 🌱",
        orderPrefix: "¡Hola Botsua! 🌱\n\nQuiero realizar la siguiente compra:\n\n",
        orderSuffix: "\n¡Gracias! 😊"
    },

    // === CONFIGURACIÓN DE LA EMPRESA ===
    company: {
        name: "Botsua Suculentas y Cactus",
        tagline: "Diseños artesanales en cemento que transforman tus espacios",
        description: "Especialistas en productos artesanales hechos de cemento: macetas, joyeros, bandejas, letras decorativas, packs de regalo y artículos para escritorio.",
        
        // Información de contacto
        contact: {
            email: "info@botsua.com",
            phone: "+51 987 510 300",
            address: "Lima, Perú", // Agregar dirección real si se desea
        },

        // Enlaces de redes sociales
        social: {
            instagram: "https://instagram.com/botsuasuculentas",
            whatsapp: "https://wa.me/51987510300",
            facebook: "https://facebook.com/botsuasuculentas", // Opcional
            tiktok: "" // Opcional
        }
    },

    // === CONFIGURACIÓN DE LA PÁGINA ===
    page: {
        // Meta información
        title: "Botsua Suculentas y Cactus - Diseños Artesanales en Cemento",
        description: "Descubre nuestra colección única de productos artesanales hechos de cemento: macetas, joyeros, bandejas, letras decorativas y más.",
        keywords: "macetas cemento, joyeros artesanales, productos cemento, decoración hogar, suculentas, cactus, artesanía",
        
        // Configuración del hero
        hero: {
            title: "Diseños artesanales en cemento que transforman tus espacios",
            subtitle: "Descubre nuestra colección única de productos hechos a mano con cemento de alta calidad. Cada pieza es una obra de arte funcional para tu hogar.",
            ctaText: "Explorar catálogo"
        },

        // Textos de secciones
        sections: {
            catalog: {
                title: "Nuestro Catálogo",
                subtitle: "Productos únicos hechos con amor y dedicación"
            },
            about: {
                title: "Sobre Botsua",
                content: [
                    "En Botsua creamos piezas únicas y funcionales utilizando cemento como materia prima principal. Cada producto es cuidadosamente elaborado a mano, combinando técnicas artesanales con diseños contemporáneos que se adaptan a cualquier espacio.",
                    "Nuestro compromiso es ofrecer productos de calidad que no solo sean hermosos, sino también duraderos y funcionales. Cada pieza cuenta una historia de dedicación, creatividad y amor por el arte del cemento."
                ],
                features: [
                    { icon: "fas fa-hand-holding-heart", text: "Hecho a mano" },
                    { icon: "fas fa-leaf", text: "Materiales sostenibles" },
                    { icon: "fas fa-award", text: "Calidad garantizada" }
                ]
            },
            contact: {
                title: "Contáctanos",
                subtitle: "¿Tienes alguna pregunta? Nos encantaría escucharte"
            }
        }
    },

    // === CONFIGURACIÓN DE PRODUCTOS ===
    products: {
        // Categorías disponibles
        categories: [
            { id: "all", name: "Todos", icon: "fas fa-th" },
            { id: "joyeros", name: "Joyeros y Bandejas", icon: "fas fa-gem" },
            { id: "macetas", name: "Macetas", icon: "fas fa-seedling" },
            { id: "letras", name: "Letras", icon: "fas fa-font" },
            { id: "packs", name: "Packs de Regalo", icon: "fas fa-gift" },
            { id: "escritorio", name: "Para Escritorio", icon: "fas fa-desktop" }
        ],

        // Configuración de precios
        currency: "S/.", // Moneda (Soles peruanos)
        currencyPosition: "before", // "before" o "after"
        
        // Configuración de imágenes
        imagePath: "assets/images/",
        placeholderImage: "https://via.placeholder.com/400x400/3B755F/FFFFFF?text=Producto",
        
        // Configuración de características destacadas
        featuredBadge: "Destacado",
        newBadge: "Nuevo",
        saleBadge: "Oferta"
    },

    // === CONFIGURACIÓN VISUAL ===
    theme: {
        // Colores principales (deben coincidir con CSS)
        colors: {
            primary: "#3B755F",
            primaryLight: "#4a8f72",
            primaryDark: "#2d5a47",
            white: "#ffffff",
            lightGray: "#f8f9fa",
            gray: "#6c757d",
            darkGray: "#343a40"
        },

        // Tipografía
        fonts: {
            primary: "'Poppins', sans-serif",
            weights: {
                light: 300,
                regular: 400,
                medium: 500,
                semibold: 600,
                bold: 700
            }
        },

        // Configuración de animaciones
        animations: {
            enabled: true,
            duration: "0.3s",
            easing: "ease"
        }
    },

    // === CONFIGURACIÓN DE FUNCIONALIDADES ===
    features: {
        // Carrito de compras
        cart: {
            enabled: true,
            persistData: true, // Guardar en localStorage
            maxQuantity: 99,
            showNotifications: true
        },

        // Búsqueda de productos
        search: {
            enabled: true,
            minChars: 2,
            placeholder: "Buscar productos...",
            debounceTime: 300
        },

        // Formulario de contacto
        contactForm: {
            enabled: true,
            showWhatsAppOption: true,
            requiredFields: ["name", "email", "message"],
            validation: true
        },

        // Funcionalidades adicionales
        productModal: true,
        lazyLoading: true,
        smoothScroll: true,
        mobileMenu: true
    },

    // === CONFIGURACIÓN DE DESARROLLO ===
    dev: {
        debug: false,
        logErrors: true,
        showPerformance: false
    }
};

// === FUNCIONES DE CONFIGURACIÓN ===

// Obtener configuración de WhatsApp
function getWhatsAppConfig() {
    return BOTSUA_CONFIG.whatsapp;
}

// Obtener información de la empresa
function getCompanyInfo() {
    return BOTSUA_CONFIG.company;
}

// Obtener configuración de tema
function getThemeConfig() {
    return BOTSUA_CONFIG.theme;
}

// Obtener configuración de productos
function getProductsConfig() {
    return BOTSUA_CONFIG.products;
}

// Verificar si una funcionalidad está habilitada
function isFeatureEnabled(featureName) {
    return BOTSUA_CONFIG.features[featureName] === true;
}

// Actualizar número de WhatsApp
function updateWhatsAppNumber(newNumber) {
    BOTSUA_CONFIG.whatsapp.phoneNumber = newNumber;
    console.log(`Número de WhatsApp actualizado a: ${newNumber}`);
}

// Exportar configuración para uso global
window.BOTSUA_CONFIG = BOTSUA_CONFIG;
window.getWhatsAppConfig = getWhatsAppConfig;
window.getCompanyInfo = getCompanyInfo;
window.getThemeConfig = getThemeConfig;
window.getProductsConfig = getProductsConfig;
window.isFeatureEnabled = isFeatureEnabled;
window.updateWhatsAppNumber = updateWhatsAppNumber;

// === NOTAS PARA PERSONALIZACIÓN ===
/*
INSTRUCCIONES PARA PERSONALIZAR:

1. CAMBIAR NÚMERO DE WHATSAPP:
   - Edita whatsapp.phoneNumber con tu número real
   - Formato: código país + número (ejemplo: "51987654321")

2. ACTUALIZAR INFORMACIÓN DE EMPRESA:
   - Edita company.contact con tus datos reales
   - Actualiza company.social con tus enlaces reales

3. PERSONALIZAR TEXTOS:
   - Modifica page.hero para cambiar textos del hero
   - Edita page.sections para personalizar contenido

4. AJUSTAR COLORES:
   - Modifica theme.colors (también actualiza CSS)
   - Cambia theme.fonts para usar otra tipografía

5. HABILITAR/DESHABILITAR FUNCIONES:
   - Edita features para activar/desactivar funcionalidades
   - Cambia dev.debug a true para modo desarrollo

6. CONFIGURAR PRODUCTOS:
   - Ajusta products.currency para tu moneda
   - Modifica products.categories según tus necesidades
*/