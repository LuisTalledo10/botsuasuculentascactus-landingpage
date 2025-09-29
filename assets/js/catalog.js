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
        // Solo dos botones: Macetas y Joyeros
        const btnMacetas = document.getElementById('btn-macetas');
        const btnJoyeros = document.getElementById('btn-joyeros');
        const mainCategoryBtns = [btnMacetas, btnJoyeros];

        // Ir al slide 0 (Macetas)
        btnMacetas.addEventListener('click', () => {
            mainCategoryBtns.forEach(b => b.classList.remove('active'));
            btnMacetas.classList.add('active');
            // Mostrar sección (si hay más de una)
            const macetasSection = document.getElementById('macetas-section');
            if (macetasSection) {
                macetasSection.classList.add('active');
            }
            // Ir al slide 0
            if (window.macetasCarousel && typeof window.macetasCarousel.goToSlide === 'function') {
                window.macetasCarousel.goToSlide(0);
            }
        });

        // Ir al slide 15 (Joyeros)
        btnJoyeros.addEventListener('click', () => {
            mainCategoryBtns.forEach(b => b.classList.remove('active'));
            btnJoyeros.classList.add('active');
            // Mostrar sección (si hay más de una)
            const macetasSection = document.getElementById('macetas-section');
            if (macetasSection) {
                macetasSection.classList.add('active');
            }
            // Ir al slide 15
            if (window.macetasCarousel && typeof window.macetasCarousel.goToSlide === 'function') {
                window.macetasCarousel.goToSlide(15);
            }
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

        // Debug: Agregar logs para verificar el producto
        console.log('Producto actual:', this.currentProduct);
        console.log('Tipo de personalización:', this.currentProduct.personalizationType);

        // Configurar el modal según el tipo de personalización
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const personalizationCost = document.getElementById('personalizationCost');
        
        // Actualizar el costo dinámicamente
        console.log('Product personalization type:', this.currentProduct.personalizationType);
        console.log('Product letter price:', this.currentProduct.letterPrice);
        let cost = 0;
        if (this.currentProduct.personalizationType === 'letters') {
            // Para letras, mostrar costo por letra
            cost = this.currentProduct.letterPrice || 4.00;
            personalizationCost.textContent = `S/.${cost.toFixed(2)} por letra`;
            console.log('Showing letter price:', cost);
        } else {
            cost = this.currentProduct.personalizacionCosto || 3.00;
            personalizationCost.textContent = `S/.${cost.toFixed(2)}`;
            console.log('Showing regular price:', cost);
        }
        
        if (this.currentProduct.personalizationType === 'design') {
            modalTitle.textContent = 'Personalizar Mini-Maceta';
            modalDescription.textContent = '¿Deseas personalizar el diseño de tu mini-maceta?';
        } else if (this.currentProduct.personalizationType === 'letters') {
            modalTitle.textContent = 'Personalizar Maceta Estrella';
            modalDescription.textContent = '¿Deseas personalizar tu maceta estrella con letras?';
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
        const lettersInputSection = document.getElementById('lettersInputSection');
        const personalizationText = document.getElementById('personalizationText');
        const designDescription = document.getElementById('designDescription');

        // Resetear botones
        sinPersonalizar.classList.remove('active');
        conPersonalizar.classList.remove('active');
        
        // Ocultar secciones de entrada
        textInputSection.style.display = 'none';
        designInputSection.style.display = 'none';
        if (lettersInputSection) lettersInputSection.style.display = 'none';
        
        // Limpiar campos
        if (personalizationText) personalizationText.value = '';
        if (designDescription) designDescription.value = '';
        
        // Reset contador de caracteres
        const charCount = document.getElementById('designCharCount');
        if (charCount) charCount.textContent = '0';
        
        // Resetear sección de letras
        this.resetLettersSection();
    }

    resetLettersSection() {
        const letterCount = document.getElementById('letterCount');
        const lettersContainer = document.getElementById('lettersContainer');
        const baseSelector = document.getElementById('baseSelector');
        const totalPrice = document.getElementById('totalPrice');
        
        if (letterCount) letterCount.value = '';
        if (lettersContainer) lettersContainer.innerHTML = '';
        if (baseSelector) baseSelector.style.display = 'none';
        if (totalPrice) totalPrice.textContent = '';
        
        // Reset checkboxes
        const baseOption = document.getElementById('baseOption');
        if (baseOption) baseOption.checked = false;
    }

    setupLettersPersonalization() {
        const letterCount = document.getElementById('letterCount');
        const generateButton = document.getElementById('generateLetters');
        const baseOption = document.getElementById('baseOption');
        
        generateButton?.addEventListener('click', () => {
            this.generateLetterInputs();
        });
        
        letterCount?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateLetterInputs();
            }
        });
        
        baseOption?.addEventListener('change', () => {
            this.updateLettersPrice();
        });
    }

    generateLetterInputs() {
        const letterCount = document.getElementById('letterCount');
        const lettersContainer = document.getElementById('lettersContainer');
        const baseSelector = document.getElementById('baseSelector');
        
        if (!letterCount || !lettersContainer) return;
        
        const numLetters = parseInt(letterCount.value);
        if (isNaN(numLetters) || numLetters < 1 || numLetters > 10) {
            alert('Por favor ingresa un número válido entre 1 y 10 letras');
            return;
        }
        
        // Limpiar contenedor
        lettersContainer.innerHTML = '';
        
        // Generar campos para cada letra
        for (let i = 0; i < numLetters; i++) {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter-input-group';
            
            letterDiv.innerHTML = `
                <label>Letra ${i + 1}:</label>
                <input type="text" class="letter-input" maxlength="1" placeholder="${String.fromCharCode(65 + i)}">
            `;
            
            lettersContainer.appendChild(letterDiv);
        }
        
        // Mostrar selector de base y actualizar precio
        baseSelector.style.display = 'block';
        this.updateLettersPrice();
        
        // Focus en el primer input
        const firstInput = lettersContainer.querySelector('.letter-input');
        if (firstInput) firstInput.focus();
        
        // Setup navigation between inputs
        this.setupLetterNavigation();
    }

    setupLetterNavigation() {
        const letterInputs = document.querySelectorAll('.letter-input');
        
        letterInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // Solo permitir letras
                e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
                
                // Mover al siguiente campo
                if (e.target.value && index < letterInputs.length - 1) {
                    letterInputs[index + 1].focus();
                }
                
                this.updateLettersPrice();
            });
            
            input.addEventListener('keydown', (e) => {
                // Backspace: mover al campo anterior si está vacío
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    letterInputs[index - 1].focus();
                }
                // Enter: confirmar si es el último campo
                if (e.key === 'Enter' && index === letterInputs.length - 1) {
                    this.confirmAddToCart();
                }
            });
        });
    }

    updateLettersPrice() {
        if (!this.currentProduct || this.currentProduct.personalizationType !== 'letters') return;
        
        const letterInputs = document.querySelectorAll('.letter-input');
        const baseOption = document.getElementById('baseOption');
        const totalPrice = document.getElementById('totalPrice');
        
        if (!totalPrice) return;
        
        let basePrice = this.currentProduct.price || 0;
        let lettersPrice = letterInputs.length * (this.currentProduct.letterPrice || 4.00);
        let baseExtraPrice = (baseOption && baseOption.checked) ? (this.currentProduct.basePrice || 5.00) : 0;
        
        let total = basePrice + lettersPrice + baseExtraPrice;
        
        totalPrice.innerHTML = `
            <div class="price-breakdown">
                <div>Maceta base: S/.${basePrice.toFixed(2)}</div>
                <div>${letterInputs.length} letras: S/.${lettersPrice.toFixed(2)}</div>
                ${baseExtraPrice > 0 ? `<div>Base madera/melamine: S/.${baseExtraPrice.toFixed(2)}</div>` : ''}
                <hr>
                <div class="total-line"><strong>Total: S/.${total.toFixed(2)}</strong></div>
            </div>
        `;
    }

    setupPersonalizationModal() {
        const modal = document.getElementById('personalizationModal');
        const closeModal = document.querySelector('.close-modal');
        const sinPersonalizar = document.getElementById('sinPersonalizar');
        const conPersonalizar = document.getElementById('conPersonalizar');
        const cancelBtn = document.getElementById('cancelPersonalization');
        const confirmBtn = document.getElementById('confirmAddToCart');
        const textInputSection = document.getElementById('textInputSection');
        const designInputSection = document.getElementById('designInputSection');
        const lettersInputSection = document.getElementById('lettersInputSection');
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
                lettersInputSection.style.display = 'none';
                setTimeout(() => {
                    designDescription?.focus();
                }, 100);
            } else if (this.currentProduct?.personalizationType === 'letters') {
                lettersInputSection.style.display = 'block';
                textInputSection.style.display = 'none';
                designInputSection.style.display = 'none';
                this.setupLettersPersonalization();
                setTimeout(() => {
                    document.getElementById('letterCount')?.focus();
                }, 100);
            } else {
                textInputSection.style.display = 'block';
                designInputSection.style.display = 'none';
                lettersInputSection.style.display = 'none';
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
        let personalizedPrice = 0;

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
                personalizedPrice = this.currentProduct.personalizacionCosto || 0;
            } else if (this.currentProduct.personalizationType === 'letters') {
                const letterInputs = document.querySelectorAll('.letter-input');
                const baseOption = document.getElementById('baseOption');
                
                // Validar que hay letras
                if (letterInputs.length === 0) {
                    alert('Por favor genera primero las casillas para las letras');
                    document.getElementById('letterCount')?.focus();
                    return;
                }
                
                // Obtener todas las letras
                const letters = Array.from(letterInputs).map(input => input.value.trim()).filter(letter => letter);
                
                if (letters.length !== letterInputs.length) {
                    alert('Por favor completa todas las letras');
                    const firstEmpty = Array.from(letterInputs).find(input => !input.value.trim());
                    firstEmpty?.focus();
                    return;
                }
                
                customText = letters.join('');
                
                // Calcular precio personalizado
                personalizedPrice = letters.length * (this.currentProduct.letterPrice || 4.00);
                if (baseOption && baseOption.checked) {
                    personalizedPrice += this.currentProduct.basePrice || 5.00;
                }
                
                // Agregar información de la base al texto personalizado
                if (baseOption && baseOption.checked) {
                    customText += ' + Base madera/melamine';
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
                personalizedPrice = this.currentProduct.personalizacionCosto || 0;
            }
        } else if (!sinPersonalizar?.classList.contains('active')) {
            alert('Por favor selecciona una opción');
            return;
        }

        // Agregar al carrito con precio personalizado
        this.addProductToCart(this.currentProduct, isPersonalized, customText, personalizedPrice);
        this.hidePersonalizationModal();
    }

    addProductToCart(product, isPersonalized = false, customText = '', personalizedPrice = 0) {
        if (!window.cart) {
            console.error('Cart system not available');
            return;
        }

        // Calcular precio final
        let finalPrice = product.price;
        let personalizationCost = 0;
        
        if (isPersonalized) {
            if (product.personalizationType === 'letters') {
                // Para letras, usar el precio personalizado calculado
                personalizationCost = personalizedPrice;
            } else {
                // Para otros tipos, usar personalizacionCosto
                personalizationCost = product.personalizacionCosto || 0;
            }
            finalPrice += personalizationCost;
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
            personalizacionCosto: personalizationCost,
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