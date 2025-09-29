
const products = [
    // MACETA TOGEPI PINTADA
    {
        id: 55,
        name: "Maceta TOGEPI Pintada",
        price: 35.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta TOGEPI Pintada.",
        dimensions: "variado",
        featured: true,
        personalizable: false,
    },

    // MACETA TOGEPI
    {
        id: 54,
        name: "Maceta TOGEPI",
        price: 30.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta TOGEPI.",
        dimensions: "variado",
        featured: true,
        personalizable: false,
    },

    // MACETA SNORLAX PINTADA
    {
        id: 53,
        name: "Maceta SNORLAX Pintada",
        price: 30.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta SNORLAX Pintada.",
        dimensions: "variado",
        featured: true,
        personalizable: false,
    },

    // MACETA SNORLAX
    {
        id: 52,
        name: "Maceta SNORLAX",
        price: 25.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta SNORLAX.",
        dimensions: "variado",
        featured: true,
        personalizable: false,
    },

    // MACETA ODDRISH
    {
        id: 51,
        name: "Maceta ODDRISH",
        price: 25.00,
        pricePersonalizada: 30.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta pokemon de cemento + planta incluida. Personalizable.",
        dimensions: "8.5 cm de altura – 7.0 cm de ancho",
        featured: true,
        personalizable: true,
        personalizacionCosto: 5.00
    },

    // MACETA BALBASAUR
    {
        id: 50,
        name: "Maceta Balbasaur",
        price: 20.00,
        pricePersonalizada: 25.00,
        category: "macetas",
        subcategory: "pokemon",
        image: "assets/images/pokemon.PNG",
        description: "Maceta pokemon de cemento + planta incluida. Personalizable.",
        dimensions: "6.0 cm de altura – 7.0 cm de ancho",
        featured: true,
        personalizable: true,
        personalizacionCosto: 5.00
    },
    {
        id: 1,
        name: "Joyero Circular Pequeño",
        price: 35.00,
        category: "joyeros",
        image: "assets/images/prueba.PNG",
        description: "Elegante joyero circular de cemento, perfecto para anillos y aretes pequeños. Diseño minimalista con acabado suave.",
        dimensions: "8cm x 8cm x 3cm",
        featured: true
    },
    {
        id: 2,
        name: "Bandeja Rectangular Grande",
        price: 55.00,
        category: "joyeros",
        image: "assets/images/prueba.PNG",
        description: "Bandeja espaciosa ideal para organizar joyas y accesorios. Perfecta para cómodas y tocadores.",
        dimensions: "20cm x 15cm x 2cm",
        featured: false
    },
    {
        id: 3,
        name: "Joyero con Compartimentos",
        price: 68.00,
        category: "joyeros",
        image: "assets/images/prueba.PNG",
        description: "Joyero funcional con múltiples compartimentos para organizar diferentes tipos de joyas.",
        dimensions: "15cm x 15cm x 4cm",
        featured: true
    },
    {
        id: 4,
        name: "Bandeja Ovalada",
        price: 42.00,
        category: "joyeros",
        image: "assets/images/prueba.PNG",
        description: "Hermosa bandeja ovalada con bordes suaves, ideal para centros de mesa o como organizador.",
        dimensions: "18cm x 12cm x 2.5cm",
        featured: false
    },

    // Macetas - Sección Arcilla
    {
        id: 5,
        name: "Vaso de Arcilla Tipo A",
        price: 12.00,
        category: "arcilla",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Vaso de arcilla + planta de elección. Diseño clásico y funcional.",
        dimensions: "6.0cm de altura - 5.5 diámetro",
        featured: true,
        personalizable: true,
        personalizacionCosto: 3.00
    },
    {
        id: 6,
        name: "Vaso de Arcilla Tipo B",
        price: 15.00,
        category: "arcilla",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Vaso de arcilla + planta de elección. Modelo redondo con mayor capacidad.",
        dimensions: "6.0cm de altura - 5.5 diámetro",
        featured: true,
        personalizable: true,
        personalizacionCosto: 3.00
    },
    {
        id: 7,
        name: "Colección Vasos Personalizados",
        price: 0, // Precio variable según personalización
        category: "arcilla",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Vasos de arcilla con nombres personalizados como Angela, Sofia, Jimena y Jimmy.",
        dimensions: "6.0cm de altura - 5.5 diámetro",
        featured: true,
        soloPersonalizado: true,
        personalizacionCosto: 3.00
    },
    {
        id: 8,
        name: "Set Completo Arcilla",
        price: 0, // Precio calculado según selección
        category: "arcilla",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Conjunto completo con diferentes vasos de arcilla y plantas de tu elección.",
        dimensions: "Varios tamaños disponibles",
        featured: false,
        esSet: true
    },

    // Arcilla Colgantes
    {
        id: 9,
        name: "Macetero Arcilla Colgante",
        price: 15.00,
        category: "arcilla-colgantes",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Macetero de arcilla + planta de tu elección + tejido. Sistema colgante con macramé incluido.",
        dimensions: "6.0cm de altura - 5.5 diámetro",
        featured: true,
        personalizable: false
    },

    // Mini-Macetas
    {
        id: 10,
        name: "Mini-Maceta Personalizada",
        price: 12.00,
        category: "mini-macetas",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Macetero personalizado + planta. Diseño único según tu preferencia.",
        dimensions: "4.0 cm de altura - 5.5 diámetro",
        featured: true,
        personalizable: true,
        personalizacionCosto: 3.00,
        personalizationType: "design" // Diferente tipo de personalización
    },
    {
        id: 11,
        name: "Mini-Maceta Oferta Especial",
        price: 30.00, // 3 x S/.10.00 según la imagen
        originalPrice: 36.00, // 3 x S/.12.00
        category: "mini-macetas",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "OFERTA ESPECIAL: 3 mini-macetas pintadas tal cual la imagen. Pack completo con diseños únicos.",
        dimensions: "4.0 cm de altura - 5.5 diámetro cada una",
        featured: true,
        personalizable: false,
        isSpecialOffer: true,
        quantity: 3 // Pack de 3 unidades
    },

    // Mini-Macetas Cuadradas
    {
        id: 12,
        name: "Mini-Maceta Cuadrada Personalizada",
        price: 12.00,
        category: "mini-macetas",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Macetero cuadrado + planta. Diseño único según tu preferencia.",
        dimensions: "4.0 cm de altura - 5.5 diámetro",
        featured: true,
        personalizable: true,
        personalizacionCosto: 3.00,
        personalizationType: "design",
        shape: "cuadrada"
    },
    {
        id: 13,
        name: "Mini-Maceta Cuadrada Oferta Especial",
        price: 30.00, // 3 x S/.10.00
        originalPrice: 36.00, // 3 x S/.12.00
        category: "mini-macetas",
        subcategory: "macetas",
        image: "assets/images/prueba.PNG",
        description: "OFERTA ESPECIAL: 3 mini-macetas cuadradas con símbolos únicos (||, ■, ▷). Pack completo tal cual la imagen.",
        dimensions: "4.0 cm de altura - 5.5 diámetro cada una",
        featured: true,
        personalizable: false,
        isSpecialOffer: true,
        quantity: 3,
        shape: "cuadrada"
    },

    // Letras Decorativas
    {
        id: 10,
        name: "Letra Personalizada 15cm",
        price: 32.00,
        category: "letras",
        image: "assets/images/prueba.PNG",
        description: "Letra decorativa personalizada en cemento. Elige tu letra favorita para decorar cualquier espacio.",
        dimensions: "15cm x 12cm x 3cm",
        featured: false
    },
    {
        id: 11,
        name: "Palabra LOVE",
        price: 95.00,
        category: "letras",
        image: "assets/images/prueba.PNG",
        description: "Palabra completa 'LOVE' en letras de cemento. Perfecta para decoración romántica y moderna.",
        dimensions: "40cm x 12cm x 3cm total",
        featured: true
    },
    {
        id: 12,
        name: "Letra Grande 25cm",
        price: 58.00,
        category: "letras",
        image: "assets/images/prueba.PNG",
        description: "Letra de gran tamaño perfecta como elemento decorativo principal en cualquier habitación.",
        dimensions: "25cm x 20cm x 4cm",
        featured: false
    },
    {
        id: 13,
        name: "Set Iniciales Pareja",
        price: 75.00,
        category: "letras",
        image: "assets/images/prueba.PNG",
        description: "Set de dos letras personalizadas, ideal para parejas. Incluye base decorativa común.",
        dimensions: "2 letras de 18cm x 15cm x 3cm",
        featured: true
    },

    // Packs de Regalo
    {
        id: 14,
        name: "Pack Suculentas Starter",
        price: 125.00,
        category: "packs",
        image: "assets/images/prueba.PNG",
        description: "Pack perfecto para iniciar tu jardín de suculentas: 2 macetas + bandeja + plantas incluidas.",
        dimensions: "Varios tamaños incluidos",
        featured: true
    },
    {
        id: 15,
        name: "Pack Organizador Escritorio",
        price: 145.00,
        category: "packs",
        image: "assets/images/prueba.PNG",
        description: "Set completo para escritorio: porta lápices + bandeja + maceta pequeña + letra decorativa.",
        dimensions: "Set completo variado",
        featured: true
    },
    {
        id: 16,
        name: "Pack Joyería Completo",
        price: 155.00,
        category: "packs",
        image: "assets/images/prueba.PNG",
        description: "Pack completo de organización de joyas: 2 joyeros + bandeja grande + espejo decorativo.",
        dimensions: "Set completo variado",
        featured: false
    },
    {
        id: 17,
        name: "Pack Decorativo Hogar",
        price: 185.00,
        category: "packs",
        image: "assets/images/prueba.PNG",
        description: "Pack decorativo completo: maceta grande + 2 bandejas + palabra decorativa + vela incluida.",
        dimensions: "Set completo variado",
        featured: true
    },

    // Para Escritorio
    {
        id: 18,
        name: "Porta Lápices Circular",
        price: 35.00,
        category: "escritorio",
        image: "assets/images/prueba.PNG",
        description: "Porta lápices circular con compartimentos internos para organizar útiles de escritorio.",
        dimensions: "10cm x 10cm x 12cm",
        featured: false
    },
    {
        id: 19,
        name: "Organizador Multi-Compartimento",
        price: 58.00,
        category: "escritorio",
        image: "assets/images/prueba.PNG",
        description: "Organizador completo con múltiples compartimentos para lápices, clips y accesorios pequeños.",
        dimensions: "20cm x 12cm x 8cm",
        featured: true
    },
    {
        id: 20,
        name: "Base para Teléfono",
        price: 28.00,
        category: "escritorio",
        image: "assets/images/prueba.PNG",
        description: "Base elegante para teléfono móvil o tablet. Ángulo perfecto para visualización.",
        dimensions: "12cm x 8cm x 6cm",
        featured: false
    },
    {
        id: 21,
        name: "Porta Tarjetas Empresarial",
        price: 32.00,
        category: "escritorio",
        image: "assets/images/prueba.PNG",
        description: "Elegante porta tarjetas de presentación, perfecto para oficinas y espacios profesionales.",
        dimensions: "12cm x 6cm x 4cm",
        featured: false
    },
    {
        id: 22,
        name: "Pisapapeles Decorativo",
        price: 42.00,
        category: "escritorio",
        image: "assets/images/pisapapeles-decorativo.jpg",
        description: "Pisapapeles funcional y decorativo con diseño geométrico moderno.",
        dimensions: "8cm x 8cm x 5cm",
        featured: true
    },
    
    // MACETA MEDIANAS - Con personalización de nombre
    {
        id: 23,
        name: "Maceta Mediana Natural",
        price: 12.00,
        personalizationType: "text",
        personalizacionCosto: 3.00,
        subcategory: "maceta-mediana",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta de tamaño mediano perfecta para suculentas y cactus. Personalizable con nombre.",
        dimensions: "6.5cm diámetro x 4.5cm altura",
        featured: true,
        personalizable: true
    },
    
    // MACETA CORAZÓN - Con personalización por diseño
    {
        id: 24,
        name: "Maceta Corazón",
        price: 20.00,
        personalizationType: "design",
        personalizacionCosto: 3.00,
        subcategory: "maceta-corazon",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta en forma de corazón personalizable con diseño único + planta de tu elección.",
        dimensions: "Forma corazón - Tamaño medio",
        featured: true,
        personalizable: true
    },
    
    // MACETA CIRCULAR - Con personalización por diseño
    {
        id: 26,
        name: "Maceta Circular",
        price: 20.00,
        personalizationType: "design",
        personalizacionCosto: 3.00,
        subcategory: "maceta-circular",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta circular de cemento personalizable con diseño único + planta de tu elección.",
        dimensions: "7.0 cm de altura - 11.0 diámetro",
        featured: true,
        personalizable: true
    },
    
    // MACETA TRIANGULAR TRUNCA - Con personalización por diseño
    {
        id: 27,
        name: "Maceta Triangular Trunca",
        price: 20.00,
        personalizationType: "design",
        personalizacionCosto: 3.00,
        subcategory: "maceta-triangular",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta triangular trunca de cemento personalizable con diseño único + planta de tu elección.",
        dimensions: "7.0 cm de altura - 11.0 de ancho",
        featured: true,
        personalizable: true
    },
    
    // MACETA TRIANGULOS - Con personalización por diseño
    {
        id: 28,
        name: "Maceta Triangular",
        price: 20.00,
        personalizationType: "design",
        personalizacionCosto: 3.00,
        subcategory: "maceta-triangulos",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta triangular de cemento personalizable con diseño único + planta de tu elección.",
        dimensions: "7.0 cm de altura - 11.0 de ancho",
        featured: true,
        personalizable: true
    },
    
    // ARREGLOS FLORALES - Sin personalización
    {
        id: 29,
        name: "Arreglo Floral",
        price: 60.00,
        subcategory: "arreglos-florales",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Hermoso arreglo floral con macetero de arcilla y 8 plantas de tu elección.",
        dimensions: "14.0 cm de altura - 16.0 diámetro",
        featured: true,
        personalizable: false
    },
    
    // HEXAGONO - Sin personalización
    {
        id: 30,
        name: "Hexágono Decorativo",
        price: 25.00,
        subcategory: "hexagono",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Hexágono decorativo de palitos con macetero incluido y plantas de tu elección.",
        dimensions: "20.0 cm de altura - 23.0 diámetro",
        featured: true,
        personalizable: false
    },
    
    // MACETA ESTRELLA - Con personalización por diseño (+S/.5.00)
    {
        id: 31,
        name: "Maceta Estrella",
        price: 30.00,
        personalizationType: "design",
        personalizacionCosto: 5.00,
        subcategory: "maceta-estrella",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta estrella de cemento con diseño geométrico único personalizable + planta de tu elección.",
        dimensions: "9.0 cm de altura - 15.5 cm de ancho",
        featured: true,
        personalizable: true
    },
    
    // MACETA ESTRELLA CON LETRAS - Personalización compleja
    {
        id: 32,
        name: "Maceta Estrella con Letras",
        price: 30.00,
        personalizationType: "letters",
        letterPrice: 4.00, // Precio por letra
        basePrice: 5.00, // Precio por base de madera/melamine
        subcategory: "maceta-estrella-letras",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta estrella con letras personalizadas de cemento + planta. Incluye opción de base de madera/melamine.",
        dimensions: "9.0 cm de altura - 15.5 cm de ancho",
        featured: true,
        personalizable: true
    },

    // YIN - YAN - Macetero doble sin personalización
    {
        id: 33,
        name: "Macetero Yin-Yang",
        price: 35.00,
        subcategory: "macetero-yin-yang",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Macetero Yin-Yang de cemento + 2 plantas. Diseño único y elegante.",
        dimensions: "12.0 cm de altura",
        featured: true,
        personalizable: false
    },

    // MACETA ABI - Con personalización de texto
    {
        id: 34,
        name: "Maceta \"Abi\"",
        price: 30.00,
        personalizationType: "text",
        personalizacionCosto: 5.00,
        subcategory: "maceta-abi",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta \"Abi\" de cemento + 3 plantas. Diseño tipo bolsa único y moderno.",
        dimensions: "9.0 cm de altura - 10.0 cm de ancho",
        featured: true,
        personalizable: true
    },

    // MACETA DUO - PORTALAPICERO + MACETA
    {
        id: 35,
        name: "Maceta Duo - Portalapicero + Maceta",
        price: 50.00,
        personalizationType: "text",
        personalizacionCosto: 5.00,
        subcategory: "maceta-duo-portalapicero",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Conjunto Maceta Duo de cemento: Portalápicero + Macetero + planta. Perfecto para escritorio u oficina.",
        dimensions: "Variado",
        featured: true,
        personalizable: true
    },

    // MACETA CASITA - Con personalización de texto
    {
        id: 36,
        name: "Maceta Casita",
        price: 20.00,
        personalizationType: "text",
        personalizacionCosto: 3.00,
        subcategory: "maceta-casita",
        category: "macetas",
        image: "assets/images/prueba.PNG",
        description: "Maceta Casita de cemento con diseño tipo casa + plantas suculentas. Perfecta para decoración.",
        dimensions: "Variado",
        featured: true,
        personalizable: true
    }
];

// Configuración de WhatsApp
const WHATSAPP_CONFIG = {
    // Cambia este número por el número de WhatsApp de Botsua
    phoneNumber: "51987510300", // Formato: código de país + número (sin + ni espacios)
    businessName: "Botsua Suculentas y Cactus"
};

// Función para obtener todos los productos
function getAllProducts() {
    return products;
}

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Función para obtener un producto por ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Función para buscar productos por nombre
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Función para formatear precio
function formatPrice(price) {
    return `S/. ${price.toFixed(2)}`;
}

// Función para generar HTML de producto
function generateProductHTML(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="openProductModal(${product.id})">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i> Agregar al carrito
                </button>
            </div>
        </div>
    `;
}

// Función para renderizar productos en el catálogo
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Grid de productos no encontrado');
        return;
    }

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <p>No se encontraron productos en esta categoría</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToRender.map(generateProductHTML).join('');
    
    // Añadir animación de entrada
    const productCards = productsGrid.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Añadir efecto de flotación sutil
            setTimeout(() => {
                card.classList.add('animate-float');
            }, 600);
        }, index * 150); // Incrementar el delay para un efecto más elegante
    });
}

// Función para filtrar productos por categoría
function filterProducts(category) {
    const filteredProducts = getProductsByCategory(category);
    
    // Actualizar botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Renderizar productos filtrados
    renderProducts(filteredProducts);
}

// Función para abrir modal de producto
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <div class="product-modal-content animate-scaleIn">
            <div class="product-modal-image animate-slideInLeft">
                <img src="${product.image}" alt="${product.name}" style="opacity: 0; transition: opacity 0.5s ease;" onload="this.style.opacity=1">
            </div>
            <div class="product-modal-info animate-slideInRight">
                <p class="product-modal-price">${formatPrice(product.price)}</p>
                <p class="product-modal-description">${product.description}</p>
                <p class="product-modal-dimensions">
                    <strong>Dimensiones:</strong> ${product.dimensions}
                </p>
                <div class="product-modal-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal('productModal')" style="transform: scale(0); transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);" onload="setTimeout(() => this.style.transform = 'scale(1)', 800)">
                        <i class="fas fa-cart-plus"></i> Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Animar botón después de cargar
    setTimeout(() => {
        const button = modalBody.querySelector('.btn');
        if (button) button.style.transform = 'scale(1)';
    }, 800);
    
    showModal('productModal');
}

// Exportar para uso global
window.products = products;
window.WHATSAPP_CONFIG = WHATSAPP_CONFIG;
window.getAllProducts = getAllProducts;
window.getProductsByCategory = getProductsByCategory;
window.getProductById = getProductById;
window.getFeaturedProducts = getFeaturedProducts;
window.searchProducts = searchProducts;
window.formatPrice = formatPrice;
window.renderProducts = renderProducts;
window.filterProducts = filterProducts;
window.openProductModal = openProductModal;