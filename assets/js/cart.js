// Carrito de compras
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.loadFromLocalStorage();
        this.updateCartCount();
    }

    // Agregar producto al carrito
    addItem(productData, quantity = 1) {
        // Si es un objeto con datos completos (nuevo sistema)
        if (typeof productData === 'object' && productData.id) {
            const existingItemIndex = this.items.findIndex(item => 
                item.id === productData.id && 
                item.isPersonalized === productData.isPersonalized &&
                item.customText === productData.customText
            );
            
            if (existingItemIndex > -1) {
                this.items[existingItemIndex].quantity += quantity;
            } else {
                this.items.push({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    originalPrice: productData.originalPrice || productData.price,
                    image: productData.image,
                    quantity: quantity,
                    isPersonalized: productData.isPersonalized || false,
                    customText: productData.customText || '',
                    personalizacionCosto: productData.personalizacionCosto || 0
                });
            }
        } 
        // Sistema legacy (ID del producto)
        else {
            const product = getProductById(productData);
            if (!product) {
                console.error('Producto no encontrado:', productData);
                return false;
            }

            const existingItem = this.items.find(item => item.id === productData);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    id: productData,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.price,
                    image: product.image,
                    quantity: quantity,
                    isPersonalized: false,
                    customText: '',
                    personalizacionCosto: 0
                });
            }
        }

        this.saveToLocalStorage();
        this.updateCartCount();
        this.showAddToCartAnimation();
        
        const productName = typeof productData === 'object' ? productData.name : getProductById(productData)?.name;
        this.showNotification(`${productName} agregado al carrito`, 'success');
        
        return true;
    }

    // Remover producto del carrito
    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveToLocalStorage();
            this.updateCartCount();
            this.updateCartDisplay();
            this.showNotification(`${removedItem.name} removido del carrito`, 'info');
        }
    }

    // Remover producto del carrito por ID único (incluye personalización)
    removeItemByUniqueId(uniqueId) {
        const [id, customText, isPersonalized] = uniqueId.split('_');
        const itemIndex = this.items.findIndex(item => {
            const itemUniqueId = item.isPersonalized 
                ? `${item.id}_${item.customText}_${item.isPersonalized}`
                : item.id.toString();
            return itemUniqueId === uniqueId;
        });
        
        if (itemIndex > -1) {
            const removedItem = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveToLocalStorage();
            this.updateCartCount();
            this.updateCartDisplay();
            this.showNotification(`${removedItem.name} removido del carrito`, 'info');
        }
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveToLocalStorage();
            this.updateCartCount();
            this.updateCartDisplay();
        } else if (item && quantity <= 0) {
            this.removeItem(productId);
        }
    }

    // Actualizar cantidad por ID único
    updateQuantityByUniqueId(uniqueId, quantity) {
        const [id, customText, isPersonalized] = uniqueId.split('_');
        const item = this.items.find(item => {
            const itemUniqueId = item.isPersonalized 
                ? `${item.id}_${item.customText}_${item.isPersonalized}`
                : item.id.toString();
            return itemUniqueId === uniqueId;
        });
        
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveToLocalStorage();
            this.updateCartCount();
            this.updateCartDisplay();
        } else if (item && quantity <= 0) {
            this.removeItemByUniqueId(uniqueId);
        }
    }

    // Obtener cantidad de un producto específico
    getItemQuantity(productId) {
        const item = this.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }

    // Calcular subtotal de un item
    getItemSubtotal(productId) {
        const item = this.items.find(item => item.id === productId);
        return item ? item.price * item.quantity : 0;
    }

    // Calcular total del carrito
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtener cantidad total de productos
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Vaciar carrito
    clear() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification('Carrito vaciado', 'info');
    }

    // Verificar si el carrito está vacío
    isEmpty() {
        return this.items.length === 0;
    }

    // Guardar en localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('botsuaCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error guardando carrito:', error);
        }
    }

    // Cargar desde localStorage
    loadFromLocalStorage() {
        try {
            const savedCart = localStorage.getItem('botsuaCart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error cargando carrito:', error);
            this.items = [];
        }
    }

    // Abrir modal del carrito
    openModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
            this.updateCartDisplay();
        }
    }

    // Cerrar modal del carrito
    closeModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.isOpen = false;
        }
    }

    // Actualizar contador del carrito en el header
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.getTotalItems();
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            if (totalItems > 0) {
                cartCount.classList.add('show');
            } else {
                cartCount.classList.remove('show');
            }
        }
    }

    // Mostrar animación al agregar al carrito
    showAddToCartAnimation() {
        const cartBtn = document.getElementById('cartBtn');
        const cartCount = document.getElementById('cartCount');
        
        if (cartBtn) {
            // Animación sutil del botón
            cartBtn.style.transform = 'scale(1.1)';
            cartBtn.style.transition = 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Breve cambio de color
            const originalColor = cartBtn.style.color;
            cartBtn.style.color = 'var(--primary-color)';
            setTimeout(() => {
                cartBtn.style.color = originalColor;
            }, 300);
        }
        
        if (cartCount && cartCount.classList.contains('show')) {
            // Animación simple del contador
            cartCount.style.animation = 'bounceInSimple 0.4s ease';
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        // Crear el elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('#notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 20px 25px;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    z-index: 2001;
                    transform: translateX(120%) scale(0.8);
                    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    max-width: 350px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .notification-success { 
                    border-left: 4px solid #28a745;
                    background: linear-gradient(135deg, #ffffff, #f8fff9);
                }
                .notification-error { 
                    border-left: 4px solid #dc3545;
                    background: linear-gradient(135deg, #ffffff, #fff8f8);
                }
                .notification-info { 
                    border-left: 4px solid #17a2b8;
                    background: linear-gradient(135deg, #ffffff, #f0fbff);
                }
                .notification.show { 
                    transform: translateX(0) scale(1);
                }
                .notification i { 
                    color: inherit;
                    font-size: 1.4em;
                    animation: pulse 2s infinite;
                }
                .notification-success i { color: #28a745; }
                .notification-error i { color: #dc3545; }
                .notification-info i { color: #17a2b8; }
                .notification span {
                    font-weight: 500;
                    color: #333;
                }
            `;
            document.head.appendChild(styles);
        }

        // Agregar al DOM
        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);

        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(120%) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    // Abrir modal del carrito
    openModal() {
        this.updateCartDisplay();
        showModal('cartModal');
        this.isOpen = true;
    }

    // Cerrar modal del carrito
    closeModal() {
        hideModal('cartModal');
        this.isOpen = false;
    }

    // Actualizar display del carrito en el modal
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItems || !cartTotal) return;

        if (this.isEmpty()) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <p>¡Explora nuestro catálogo y encuentra productos únicos!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.items.map(item => {
                const displayName = item.isPersonalized && item.customText 
                    ? `${item.name} - "${item.customText}"`
                    : item.name;
                
                const personalizationInfo = item.isPersonalized 
                    ? `<div class="personalization-info">
                         <small><i class="fas fa-pen"></i> Personalizado</small>
                         ${item.customText ? `<small class="custom-text">"${item.customText}"</small>` : ''}
                         ${item.personalizacionCosto > 0 ? `<small class="personalization-cost">+S/.${item.personalizacionCosto.toFixed(2)}</small>` : ''}
                       </div>`
                    : '';

                // ID único para items personalizados
                const uniqueId = item.isPersonalized 
                    ? `${item.id}_${item.customText}_${item.isPersonalized}`
                    : item.id;

                return `
                    <div class="cart-item" data-unique-id="${uniqueId}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${displayName}</div>
                            ${personalizationInfo}
                            <div class="cart-item-price">${formatPrice(item.price)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="cart.updateQuantityByUniqueId('${uniqueId}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantityByUniqueId('${uniqueId}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-item" onclick="cart.removeItemByUniqueId('${uniqueId}')" title="Eliminar producto">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        cartTotal.textContent = this.getTotal().toFixed(2);
    }

    // Generar mensaje para WhatsApp
    generateWhatsAppMessage() {
        if (this.isEmpty()) {
            return '';
        }

        let message = `🌿 ¡Hola ${WHATSAPP_CONFIG.businessName}! �\n\n`;
        message += `✨ Me interesan estos hermosos productos artesanales ✨\n\n`;
        message += `📋 *MI PEDIDO:*\n`;
        message += `─────────────────────────\n`;

        this.items.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            message += `${index + 1}. 🎨 *${item.name}*\n`;
            
            // Mostrar información de personalización si existe
            if (item.isPersonalized && item.customText) {
                message += `   ✏️ *Personalizado con:* "${item.customText}"\n`;
            }
            
            message += `   📦 Cantidad: ${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}\n`;
            
            // Desglose de precio si está personalizado
            if (item.isPersonalized && item.personalizacionCosto > 0) {
                const basePrice = item.originalPrice || (item.price - item.personalizacionCosto);
                message += `   💰 Precio base: ${formatPrice(basePrice)} c/u\n`;
                message += `   ✨ Personalización: +${formatPrice(item.personalizacionCosto)} c/u\n`;
                message += `   💰 *Precio final: ${formatPrice(item.price)} c/u*\n`;
            } else if (item.isPersonalized) {
                message += `   💰 Precio (personalizado): ${formatPrice(item.price)} c/u\n`;
            } else {
                message += `   💰 Precio: ${formatPrice(item.price)} c/u\n`;
            }
            
            message += `   💵 Subtotal: *${formatPrice(subtotal)}*\n`;
            message += `\n`;
        });

        message += `─────────────────────────\n`;
        message += `🏷️ *TOTAL A PAGAR: ${formatPrice(this.getTotal())}*\n`;
        message += `─────────────────────────\n\n`;
        
        message += `🚚 ¿Podrían confirmarme disponibilidad y tiempo de entrega?\n\n`;
        message += `¡Gracias por crear arte tan hermoso! 🎭✨`;

        return encodeURIComponent(message);
    }

    // Proceder al checkout (WhatsApp)
    checkout() {
        if (this.isEmpty()) {
            this.showNotification('Tu carrito está vacío', 'error');
            return;
        }

        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappUrl, '_blank');
        
        // Opcional: vaciar carrito después del checkout
        // this.clear();
        // this.closeModal();
    }
}

// Crear instancia global del carrito
const cart = new ShoppingCart();

// Inicializar event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que el modal esté cerrado al inicio
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }
    
    // Botón del carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cart.openModal();
        });
    }

    // Botón cerrar carrito
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cart.closeModal();
        });
    }

    // Overlay del carrito
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cart.closeModal();
        });
    }

    // Botón vaciar carrito
    const clearCart = document.getElementById('clearCart');
    if (clearCart) {
        clearCart.addEventListener('click', () => {
            cart.clear();
        });
    }

    // Botón checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            cart.checkout();
        });
    }

    // Tecla Escape para cerrar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cart.isOpen) {
            cart.closeModal();
        }
    });

    // Inicializar carrito
    cart.updateCartDisplay();
    cart.updateCartCount();
});

// Función global para agregar al carrito (llamada desde los botones)
function addToCart(productId, quantity = 1) {
    cart.addItem(productId, quantity);
}

// Funciones para manejar modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function closeModal(modalId) {
    hideModal(modalId);
}

// Event listeners para el carrito
document.addEventListener('DOMContentLoaded', function() {
    // Botón del carrito en el header
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => cart.openModal());
    }

    // Botón cerrar modal del carrito
    const closeCartModal = document.getElementById('closeCartModal');
    if (closeCartModal) {
        closeCartModal.addEventListener('click', () => cart.closeModal());
    }

    // Botón cerrar modal de producto
    const closeProductModal = document.getElementById('closeProductModal');
    if (closeProductModal) {
        closeProductModal.addEventListener('click', () => closeModal('productModal'));
    }

    // Botón vaciar carrito
    const clearCart = document.getElementById('clearCart');
    if (clearCart) {
        clearCart.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
                cart.clear();
            }
        });
    }

    // Botón checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => cart.checkout());
    }

    // Cerrar modales al hacer click fuera
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const modalId = this.id;
                closeModal(modalId);
                if (modalId === 'cartModal') {
                    cart.isOpen = false;
                }
            }
        });
    });

    // Cerrar modales con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal.id);
                if (openModal.id === 'cartModal') {
                    cart.isOpen = false;
                }
            }
        }
    });
});

// Exportar para uso global
window.cart = cart;
window.addToCart = addToCart;
window.showModal = showModal;
window.hideModal = hideModal;
window.closeModal = closeModal;