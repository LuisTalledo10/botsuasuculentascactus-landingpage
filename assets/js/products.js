// Base de datos de productos
const products = [
    // Joyeros y Bandejas
    {
        id: 1,
        name: "Joyero Circular Pequeño",
        price: 35.00,
        category: "joyeros",
        image: "assets/images/joyero-circular-pequeno.jpg",
        description: "Elegante joyero circular de cemento, perfecto para anillos y aretes pequeños. Diseño minimalista con acabado suave.",
        dimensions: "8cm x 8cm x 3cm",
        featured: true
    },
    {
        id: 2,
        name: "Bandeja Rectangular Grande",
        price: 55.00,
        category: "joyeros",
        image: "assets/images/bandeja-rectangular-grande.jpg",
        description: "Bandeja espaciosa ideal para organizar joyas y accesorios. Perfecta para cómodas y tocadores.",
        dimensions: "20cm x 15cm x 2cm",
        featured: false
    },
    {
        id: 3,
        name: "Joyero con Compartimentos",
        price: 68.00,
        category: "joyeros",
        image: "assets/images/joyero-compartimentos.jpg",
        description: "Joyero funcional con múltiples compartimentos para organizar diferentes tipos de joyas.",
        dimensions: "15cm x 15cm x 4cm",
        featured: true
    },
    {
        id: 4,
        name: "Bandeja Ovalada",
        price: 42.00,
        category: "joyeros",
        image: "assets/images/bandeja-ovalada.jpg",
        description: "Hermosa bandeja ovalada con bordes suaves, ideal para centros de mesa o como organizador.",
        dimensions: "18cm x 12cm x 2.5cm",
        featured: false
    },

    // Macetas
    {
        id: 5,
        name: "Maceta Cilíndrica Mediana",
        price: 48.00,
        category: "macetas",
        image: "assets/images/maceta-cilindrica-mediana.jpg",
        description: "Maceta cilíndrica perfecta para suculentas y cactus pequeños. Incluye drenaje interno.",
        dimensions: "12cm x 12cm x 14cm",
        featured: true
    },
    {
        id: 6,
        name: "Maceta Cuadrada Grande",
        price: 65.00,
        category: "macetas",
        image: "assets/images/maceta-cuadrada-grande.jpg",
        description: "Maceta cuadrada de gran capacidad, ideal para plantas de mayor tamaño. Diseño robusto y elegante.",
        dimensions: "18cm x 18cm x 18cm",
        featured: false
    },
    {
        id: 7,
        name: "Set 3 Macetas Redondas",
        price: 85.00,
        category: "macetas",
        image: "assets/images/set-3-macetas-redondas.jpg",
        description: "Conjunto de 3 macetas redondas de diferentes tamaños. Perfectas para crear composiciones.",
        dimensions: "Pequeña: 8cm, Mediana: 12cm, Grande: 16cm",
        featured: true
    },
    {
        id: 8,
        name: "Maceta Triangular",
        price: 38.00,
        category: "macetas",
        image: "assets/images/maceta-triangular.jpg",
        description: "Maceta de diseño triangular único, perfecta para espacios modernos y minimalistas.",
        dimensions: "14cm x 14cm x 12cm",
        featured: false
    },
    {
        id: 9,
        name: "Maceta Colgante",
        price: 52.00,
        category: "macetas",
        image: "assets/images/maceta-colgante.jpg",
        description: "Maceta diseñada para colgar, incluye sistema de sujeción resistente. Ideal para plantas colgantes.",
        dimensions: "15cm x 15cm x 12cm + 30cm cadena",
        featured: true
    },

    // Letras Decorativas
    {
        id: 10,
        name: "Letra Personalizada 15cm",
        price: 32.00,
        category: "letras",
        image: "assets/images/letra-personalizada-15cm.jpg",
        description: "Letra decorativa personalizada en cemento. Elige tu letra favorita para decorar cualquier espacio.",
        dimensions: "15cm x 12cm x 3cm",
        featured: false
    },
    {
        id: 11,
        name: "Palabra LOVE",
        price: 95.00,
        category: "letras",
        image: "assets/images/palabra-love.jpg",
        description: "Palabra completa 'LOVE' en letras de cemento. Perfecta para decoración romántica y moderna.",
        dimensions: "40cm x 12cm x 3cm total",
        featured: true
    },
    {
        id: 12,
        name: "Letra Grande 25cm",
        price: 58.00,
        category: "letras",
        image: "assets/images/letra-grande-25cm.jpg",
        description: "Letra de gran tamaño perfecta como elemento decorativo principal en cualquier habitación.",
        dimensions: "25cm x 20cm x 4cm",
        featured: false
    },
    {
        id: 13,
        name: "Set Iniciales Pareja",
        price: 75.00,
        category: "letras",
        image: "assets/images/set-iniciales-pareja.jpg",
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
        image: "assets/images/pack-suculentas-starter.jpg",
        description: "Pack perfecto para iniciar tu jardín de suculentas: 2 macetas + bandeja + plantas incluidas.",
        dimensions: "Varios tamaños incluidos",
        featured: true
    },
    {
        id: 15,
        name: "Pack Organizador Escritorio",
        price: 145.00,
        category: "packs",
        image: "assets/images/pack-organizador-escritorio.jpg",
        description: "Set completo para escritorio: porta lápices + bandeja + maceta pequeña + letra decorativa.",
        dimensions: "Set completo variado",
        featured: true
    },
    {
        id: 16,
        name: "Pack Joyería Completo",
        price: 155.00,
        category: "packs",
        image: "assets/images/pack-joyeria-completo.jpg",
        description: "Pack completo de organización de joyas: 2 joyeros + bandeja grande + espejo decorativo.",
        dimensions: "Set completo variado",
        featured: false
    },
    {
        id: 17,
        name: "Pack Decorativo Hogar",
        price: 185.00,
        category: "packs",
        image: "assets/images/pack-decorativo-hogar.jpg",
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
        image: "assets/images/porta-lapices-circular.jpg",
        description: "Porta lápices circular con compartimentos internos para organizar útiles de escritorio.",
        dimensions: "10cm x 10cm x 12cm",
        featured: false
    },
    {
        id: 19,
        name: "Organizador Multi-Compartimento",
        price: 58.00,
        category: "escritorio",
        image: "assets/images/organizador-multi-compartimento.jpg",
        description: "Organizador completo con múltiples compartimentos para lápices, clips y accesorios pequeños.",
        dimensions: "20cm x 12cm x 8cm",
        featured: true
    },
    {
        id: 20,
        name: "Base para Teléfono",
        price: 28.00,
        category: "escritorio",
        image: "assets/images/base-telefono.jpg",
        description: "Base elegante para teléfono móvil o tablet. Ángulo perfecto para visualización.",
        dimensions: "12cm x 8cm x 6cm",
        featured: false
    },
    {
        id: 21,
        name: "Porta Tarjetas Empresarial",
        price: 32.00,
        category: "escritorio",
        image: "assets/images/porta-tarjetas-empresarial.jpg",
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