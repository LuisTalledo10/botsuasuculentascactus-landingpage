// Nueva funcionalidad para el catálogo reorganizado
class CatalogManager {
    constructor() {
        this.currentProduct = null;
        this.init();
    }

    init() {
        this.setupMainCategoryNavigation();
        this.setupArcillaProducts();
        this.setupPersonalizationModal();
    }

    setupMainCategoryNavigation() {
        const mainCategoryBtns = document.querySelectorAll('.main-category-btn');
        const categorySections = document.querySelectorAll('.category-section');

        mainCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.getAttribute('data-main-category');
                
                // Actualizar botones activos
                mainCategoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Mostrar sección correspondiente
                categorySections.forEach(section => {
                    section.classList.remove('active');
                });
                
                const targetSection = document.getElementById(`${targetCategory}-section`);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.classList.add('active');
                    }, 200);
                }
            });
        });
    }

    setupArcillaProducts() {
        // Productos de Arcilla tradicional
        const arcillaProducts = document.querySelectorAll('.arcilla-product');
        
        arcillaProducts.forEach(product => {
            const addToCartBtn = product.querySelector('.add-to-cart-overlay');
            const productId = parseInt(product.getAttribute('data-product-id'));
            
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleAddToCart(productId);
                });
            }
        });

        // Productos de Arcilla Colgantes
        const colgantesProducts = document.querySelectorAll('.colgantes-product-item');
        
        colgantesProducts.forEach(product => {
            const addToCartBtn = product.querySelector('.add-to-cart-overlay');
            const productId = parseInt(product.getAttribute('data-product-id'));
            
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleAddToCart(productId);
                });
            }
        });

        // Productos de Mini-Macetas
        const miniProducts = document.querySelectorAll('.mini-product');
        
        miniProducts.forEach(product => {
            const addToCartBtn = product.querySelector('.add-to-cart-overlay');
            const productId = parseInt(product.getAttribute('data-product-id'));
            
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleAddToCart(productId);
                });
            }
        });
    }

    handleAddToCart(productId) {
        // Buscar el producto en la base de datos
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Solo productos personalizables (Vaso A y Vaso B)
        if (product.personalizable) {
            this.currentProduct = product;
            this.showPersonalizationModal();
        } else {
            // Agregar directamente al carrito sin personalización
            this.addProductToCart(product, false, '');
        }
    }

    showPersonalizationModal() {
        const modal = document.getElementById('personalizationModal');
        if (!modal || !this.currentProduct) return;

        // Configurar el modal según el tipo de personalización
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (this.currentProduct.personalizationType === 'design') {
            modalTitle.textContent = 'Personalizar Mini-Maceta';
            modalDescription.textContent = '¿Deseas personalizar el diseño de tu mini-maceta?';
        } else {
            // Determinar el tipo de producto para el texto del modal
            let productType = 'producto';
            if (this.currentProduct.subcategory && this.currentProduct.subcategory.includes('vaso')) {
                productType = 'vaso';
            } else if (this.currentProduct.subcategory && this.currentProduct.subcategory.includes('maceta')) {
                productType = 'maceta';
            }
            
            modalTitle.textContent = `Personalizar ${productType.charAt(0).toUpperCase() + productType.slice(1)}`;
            modalDescription.textContent = `¿Deseas personalizar tu ${productType} con un nombre o texto?`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Resetear estado del modal
        this.resetModalState();
    }

    hidePersonalizationModal() {
        const modal = document.getElementById('personalizationModal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentProduct = null;
    }

    resetModalState() {
        const sinPersonalizar = document.getElementById('sinPersonalizar');
        const conPersonalizar = document.getElementById('conPersonalizar');
        const textInputSection = document.getElementById('textInputSection');
        const designInputSection = document.getElementById('designInputSection');
        const personalizationText = document.getElementById('personalizationText');
        const designDescription = document.getElementById('designDescription');

        // Resetear botones
        sinPersonalizar.classList.remove('active');
        conPersonalizar.classList.remove('active');
        
        // Ocultar secciones de entrada
        textInputSection.style.display = 'none';
        designInputSection.style.display = 'none';
        
        // Limpiar campos
        if (personalizationText) personalizationText.value = '';
        if (designDescription) designDescription.value = '';
        
        // Reset contador de caracteres
        const charCount = document.getElementById('designCharCount');
        if (charCount) charCount.textContent = '0';
    }

    setupPersonalizationModal() {
        const modal = document.getElementById('personalizationModal');
        const closeModal = document.querySelector('.close-modal');
        const sinPersonalizar = document.getElementById('sinPersonalizar');
        const conPersonalizar = document.getElementById('conPersonalizar');
        const cancelBtn = document.getElementById('cancelPersonalization');
        const confirmBtn = document.getElementById('confirmAddToCart');
        const textInputSection = document.getElementById('textInputSection');
        const personalizationText = document.getElementById('personalizationText');

        // Cerrar modal
        [closeModal, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    this.hidePersonalizationModal();
                });
            }
        });

        // Cerrar al hacer clic fuera del modal
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hidePersonalizationModal();
            }
        });

        // Opciones de personalización
        sinPersonalizar?.addEventListener('click', () => {
            sinPersonalizar.classList.add('active');
            conPersonalizar.classList.remove('active');
            textInputSection.style.display = 'none';
            designInputSection.style.display = 'none';
        });

        conPersonalizar?.addEventListener('click', () => {
            conPersonalizar.classList.add('active');
            sinPersonalizar.classList.remove('active');
            
            // Mostrar la sección correcta según el tipo de personalización
            if (this.currentProduct?.personalizationType === 'design') {
                designInputSection.style.display = 'block';
                textInputSection.style.display = 'none';
                setTimeout(() => {
                    designDescription?.focus();
                }, 100);
            } else {
                textInputSection.style.display = 'block';
                designInputSection.style.display = 'none';
                setTimeout(() => {
                    personalizationText?.focus();
                }, 100);
            }
        });

        // Confirmar agregar al carrito
        confirmBtn?.addEventListener('click', () => {
            this.confirmAddToCart();
        });

        // Validación de texto
        personalizationText?.addEventListener('input', (e) => {
            let value = e.target.value;
            if (value.length > 15) {
                value = value.substring(0, 15);
                e.target.value = value;
            }
        });

        // Enter para confirmar
        personalizationText?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.confirmAddToCart();
            }
        });

        // Contador de caracteres para descripción de diseño
        const designDescription = document.getElementById('designDescription');
        const designCharCount = document.getElementById('designCharCount');
        
        designDescription?.addEventListener('input', (e) => {
            const length = e.target.value.length;
            if (designCharCount) {
                designCharCount.textContent = length;
            }
            
            // Limitar caracteres
            if (length > 200) {
                e.target.value = e.target.value.substring(0, 200);
                if (designCharCount) {
                    designCharCount.textContent = '200';
                }
            }
        });
    }

    confirmAddToCart() {
        if (!this.currentProduct) return;

        const sinPersonalizar = document.getElementById('sinPersonalizar');
        const conPersonalizar = document.getElementById('conPersonalizar');
        const personalizationText = document.getElementById('personalizationText');
        const designDescription = document.getElementById('designDescription');

        let isPersonalized = false;
        let customText = '';

        if (conPersonalizar?.classList.contains('active')) {
            isPersonalized = true;
            
            // Diferentes tipos de personalización
            if (this.currentProduct.personalizationType === 'design') {
                customText = designDescription?.value.trim() || '';
                if (!customText) {
                    alert('Por favor describe el diseño que deseas para tu mini-maceta');
                    designDescription?.focus();
                    return;
                }
            } else {
                customText = personalizationText?.value.trim() || '';
                if (!customText) {
                    alert('Por favor ingresa el texto para personalizar tu producto');
                    personalizationText?.focus();
                    return;
                }
                
                // Validación de longitud para personalización de texto
                if (customText.length > 15) {
                    alert('El texto personalizado no puede exceder 15 caracteres');
                    personalizationText?.focus();
                    return;
                }
            }
        } else if (!sinPersonalizar?.classList.contains('active')) {
            alert('Por favor selecciona una opción');
            return;
        }

        // Agregar al carrito
        this.addProductToCart(this.currentProduct, isPersonalized, customText);
        this.hidePersonalizationModal();
    }

    addProductToCart(product, isPersonalized = false, customText = '') {
        if (!window.cart) {
            console.error('Cart system not available');
            return;
        }

        // Calcular precio final
        let finalPrice = product.price;
        if (isPersonalized) {
            finalPrice += product.personalizacionCosto || 0;
        }

        // Crear objeto del producto para el carrito
        const cartItem = {
            id: product.id,
            name: product.name,
            price: finalPrice,
            originalPrice: product.price,
            image: product.image,
            quantity: product.quantity || 1, // Para ofertas especiales con múltiples unidades
            isPersonalized: isPersonalized,
            customText: customText,
            personalizacionCosto: isPersonalized ? (product.personalizacionCosto || 0) : 0,
            isSpecialOffer: product.isSpecialOffer || false,
            personalizationType: product.personalizationType || 'text'
        };

        // Agregar al carrito usando el sistema existente
        window.cart.addItem(cartItem);

        // Mostrar notificación
        this.showAddToCartNotification(cartItem);
    }

    showAddToCartNotification(item) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        
        let personalizationInfo = '';
        if (item.isPersonalized) {
            if (item.personalizationType === 'design') {
                personalizationInfo = `<br><small>Diseño personalizado: "${item.customText.substring(0, 30)}${item.customText.length > 30 ? '...' : ''}"</small>`;
            } else {
                personalizationInfo = `<br><small>Personalizado: "${item.customText}"</small>`;
            }
        }
        
        let offerInfo = '';
        if (item.isSpecialOffer) {
            offerInfo = `<br><small>🎉 OFERTA ESPECIAL</small>`;
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div class="notification-text">
                    <strong>${item.name}</strong>
                    ${personalizationInfo}
                    ${offerInfo}
                    <br><span class="price">S/.${item.price.toFixed(2)}</span>
                </div>
            </div>
        `;

        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Estilos adicionales para notificación
const notificationStyles = `
.add-to-cart-notification .notification-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.add-to-cart-notification i {
    font-size: 1.2rem;
    margin-top: 2px;
}

.add-to-cart-notification .price {
    color: #FFD700;
    font-weight: bold;
}
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.catalogManager = new CatalogManager();
});