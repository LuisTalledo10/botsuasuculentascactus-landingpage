// Enviar mensaje a WhatsApp desde el formulario de contacto
function sendWhatsAppMessage(e) {
    e.preventDefault();
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    if (!nombre || !apellido || !mensaje) {
        // Mostrar validación visual
        showFormValidation();
        return false;
    }
    
    // Mostrar animación de envío
    showSendingAnimation();
    
    var texto = `Hola, soy ${nombre} ${apellido}.%0A${mensaje}`;
    var url = `https://wa.me/51987510300?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    
    // Resetear formulario después de enviar
    setTimeout(() => {
        document.getElementById('contact-form-botsua').reset();
        hideSendingAnimation();
    }, 1000);
    
    return false;
}

// Mostrar validación del formulario
function showFormValidation() {
    const inputs = document.querySelectorAll('#contact-form-botsua input, #contact-form-botsua textarea');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    });
}

// Mostrar animación de envío
function showSendingAnimation() {
    const button = document.querySelector('#contact-form-botsua button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.style.background = '#27ae60';
    button.disabled = true;
    
    // Restaurar después de un tiempo
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 2000);
}

// Ocultar animación de envío
function hideSendingAnimation() {
    const button = document.querySelector('#contact-form-botsua button[type="submit"]');
    button.textContent = 'Enviar a WhatsApp';
    button.style.background = '';
    button.disabled = false;
}
// Controlar video de fondo solo para el hero
function handleHeroVideoBg() {
    const heroSection = document.getElementById('inicio');
    let inView = false;
    
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        inView = rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    document.body.classList.toggle('hero-active', inView);
}

window.addEventListener('scroll', handleHeroVideoBg);
window.addEventListener('resize', handleHeroVideoBg);
document.addEventListener('DOMContentLoaded', function() {
    handleHeroVideoBg(); // Ejecutar inmediatamente al cargar
    if (typeof MacetasCarousel !== 'undefined') {
        window.macetasCarousel = new MacetasCarousel();
    }
});
// JavaScript principal para Botsua Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación
    initializeApp();
});

function initializeApp() {
    // Inicializar navegación
    initNavigation();
    
    // Inicializar catálogo
    initCatalog();
    
    // Inicializar formularios
    initContactForm();
    
    // Inicializar efectos de scroll
    initScrollEffects();
    
    // Inicializar lazy loading para imágenes
    initLazyLoading();
    
    console.log('Botsua Landing Page inicializada correctamente');
}

// === NAVEGACIÓN ===
function initNavigation() {
    // Header sticky
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Agregar/quitar clase sticky
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        // Navegación siempre visible - auto-hide desactivado
        // La barra de navegación permanece siempre visible
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        lastScrollY = currentScrollY;
    });

    // Navegación móvil
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        // Variable para rastrear el estado del menú
        let isMenuOpen = false;
        
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation(); // Detener TODA propagación inmediatamente
            
            if (!isMenuOpen) {
                // Abrir menú
                nav.classList.add('active');
                menuToggle.classList.add('active');
                nav.style.maxHeight = '400px';
                nav.style.opacity = '1';
                nav.style.visibility = 'visible';
                nav.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
                isMenuOpen = true;
            } else {
                // Cerrar menú
                nav.style.maxHeight = '0';
                nav.style.opacity = '0';
                nav.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
                setTimeout(() => {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    nav.style.visibility = 'hidden';
                    isMenuOpen = false;
                }, 300);
            }
        });

        // Cerrar menú al hacer click en un enlace (solo en móvil)
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar el menú si estamos en móvil (ventana <= 768px)
                if (window.innerWidth <= 768) {
                    nav.style.maxHeight = '0';
                    nav.style.opacity = '0';
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    nav.style.visibility = 'hidden';
                    isMenuOpen = false;
                }
            });
        });

        // Función para cerrar el menú desde fuera (solo en móvil)
        function closeMenuFromOutside(e) {
            // Solo aplicar en móvil
            if (window.innerWidth <= 768 && 
                isMenuOpen && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                nav.style.maxHeight = '0';
                nav.style.opacity = '0';
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                nav.style.visibility = 'hidden';
                isMenuOpen = false;
            }
        }

        // Agregar el event listener después de un delay para evitar conflictos
        setTimeout(() => {
            document.addEventListener('click', closeMenuFromOutside);
        }, 500);
        
        // Reset del menú cuando se cambie el tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                // En escritorio, asegurar que el nav esté visible
                nav.style.maxHeight = '';
                nav.style.opacity = '';
                nav.style.visibility = '';
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                isMenuOpen = false;
            }
        });
    }

    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                // Efecto visual de click
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.2s ease';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                // Forzar scrollspy inmediato
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const navLinkToActivate = Array.from(document.querySelectorAll('.nav-link')).find(l => l.getAttribute('href') === `#${targetId}`);
                if (navLinkToActivate) navLinkToActivate.classList.add('active');
                // Smooth scroll con curva personalizada
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                requestAnimationFrame(animation);
            }
        });
    });

    // Resaltar enlace activo en navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveLink() {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        let found = false;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (!found && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                found = true;
            }
        });
        // Si no se encontró ninguna sección (por ejemplo, arriba del todo), quitar todos los activos
        if (!found) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
}

// === CATÁLOGO ===
function initCatalog() {
    // Renderizar productos iniciales
    renderProducts();
    
    // Inicializar filtros de categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
            
            // Scroll al inicio del catálogo después de filtrar
            const catalogSection = document.getElementById('catalogo');
            if (catalogSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: catalogSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Búsqueda de productos (si se implementa en el futuro)
    initProductSearch();
}

function initProductSearch() {
    // Crear barra de búsqueda dinámicamente si no existe
    const catalogSection = document.getElementById('catalogo');
    const sectionHeader = catalogSection.querySelector('.section-header');
    
    if (sectionHeader && !document.getElementById('productSearch')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `

        `;
        
        // Agregar estilos para la búsqueda
        if (!document.querySelector('#searchStyles')) {
            const styles = document.createElement('style');
            styles.id = 'searchStyles';
            styles.textContent = `
                .search-container {
                    max-width: 400px;
                    margin: 0 auto 2rem;
                }
                .search-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .search-box input {
                    width: 100%;
                    padding: 12px 40px 12px 16px;
                    border: 2px solid #e9ecef;
                    border-radius: 25px;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }
                .search-box input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }
                .search-box i {
                    position: absolute;
                    right: 16px;
                    color: #6c757d;
                }
            `;
            document.head.appendChild(styles);
        }
        
        sectionHeader.appendChild(searchContainer);
        
        // Funcionalidad de búsqueda
        const searchInput = document.getElementById('productSearch');
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    const searchResults = searchProducts(query);
                    renderProducts(searchResults);
                    
                    // Actualizar botones de filtro
                    const filterButtons = document.querySelectorAll('.filter-btn');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                } else if (query.length === 0) {
                    renderProducts();
                    // Restaurar filtro "Todos"
                    const allButton = document.querySelector('.filter-btn[data-category="all"]');
                    if (allButton) allButton.classList.add('active');
                }
            }, 300);
        });
    }
}

// === FORMULARIO DE CONTACTO ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validar formulario
    const isValid = validateContactForm(data);
    
    if (isValid) {
        // Simular envío (aquí se integraría con un backend real)
        showFormLoading(true);
        
        setTimeout(() => {
            showFormLoading(false);
            showFormSuccess();
            form.reset();
            
            // Opcional: enviar por WhatsApp también
            const whatsappMessage = generateContactWhatsAppMessage(data);
            const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${whatsappMessage}`;
            
            // Preguntar si quiere abrir WhatsApp
            if (confirm('¿Deseas enviar este mensaje también por WhatsApp?')) {
                window.open(whatsappUrl, '_blank');
            }
            
        }, 2000);
    }
}

function validateContactForm(data) {
    let isValid = true;
    
    // Validar nombre
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Ingresa un email válido');
        isValid = false;
    }
    
    // Validar mensaje
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError('email', 'Ingresa un email válido');
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remover error anterior
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo error
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #dc3545; font-size: 14px; margin-top: 5px;';
    
    formGroup.appendChild(errorElement);
    field.style.borderColor = '#dc3545';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#e9ecef';
}

function showFormLoading(show) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    if (show) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.opacity = '0.8';
        submitBtn.style.transition = 'all 0.3s ease';
        
        // Añadir efecto de pulso
        submitBtn.style.animation = 'pulse 1.5s infinite';
    } else {
        submitBtn.innerHTML = 'Enviar mensaje';
        submitBtn.disabled = false;
        submitBtn.style.transform = 'scale(1)';
        submitBtn.style.opacity = '1';
        submitBtn.style.animation = 'none';
        
        // Efecto de confirmación
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        setTimeout(() => {
            submitBtn.style.background = '';
        }, 1000);
    }
}

function showFormSuccess() {
    // Crear notificación de éxito
    const notification = document.createElement('div');
    notification.className = 'form-success-notification';
    notification.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>¡Mensaje enviado correctamente!</h4>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
        </div>
    `;
    
    // Agregar estilos
    if (!document.querySelector('#formSuccessStyles')) {
        const styles = document.createElement('style');
        styles.id = 'formSuccessStyles';
        styles.textContent = `
            .form-success-notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -60%) scale(0.8);
                background: linear-gradient(135deg, #ffffff, #f8fff9);
                padding: 3rem 2rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                text-align: center;
                z-index: 2001;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(40, 167, 69, 0.2);
                animation: successSlideIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            }
            .success-content i {
                font-size: 4rem;
                color: #28a745;
                margin-bottom: 1.5rem;
                animation: checkBounce 0.8s ease 0.3s both;
            }
            .success-content h4 {
                color: #333;
                margin-bottom: 1rem;
                font-size: 1.5rem;
                animation: slideInUp 0.6s ease 0.5s both;
            }
            .success-content p {
                color: #666;
                margin: 0;
                animation: slideInUp 0.6s ease 0.7s both;
            }
            @keyframes successSlideIn {
                to {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            @keyframes checkBounce {
                0% { transform: scale(0) rotate(0deg); }
                50% { transform: scale(1.2) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'successSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

function generateContactWhatsAppMessage(data) {
    let message = `*Nuevo mensaje de contacto* 📧\n\n`;
    message += `*Nombre:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Mensaje:*\n${data.message}`;
    
    return encodeURIComponent(message);
}

// === EFECTOS DE SCROLL ===
function initScrollEffects() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeInUp');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 100); // Stagger animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que se quieren animar
    const animatedElements = document.querySelectorAll('.product-card, .about-text, .contact-form, .footer-section, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Parallax effect para hero con suavizado
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3; // Reduced for smoother effect
            heroBackground.style.transform = `translateY(${rate}px)`;
            heroBackground.style.transition = 'transform 0.1s ease-out';
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Indicador de progreso de scroll
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// === LAZY LOADING ===
function initLazyLoading() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// === UTILIDADES ===
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// === MANEJO DE ERRORES ===
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// === PERFORMANCE ===
// Precargar imágenes críticas
function preloadCriticalImages() {
    const criticalImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/logo.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Inicializar precarga
preloadCriticalImages();

// === EXPOSICIÓN GLOBAL ===
window.BotsuaApp = {
    cart,
    products: getAllProducts(),
    filterProducts,
    openProductModal,
    showModal,
    hideModal
};

// === MEJORAS DEL FORMULARIO DE CONTACTO ===
document.addEventListener('DOMContentLoaded', function() {
    initializeContactFormEnhancements();
});

function initializeContactFormEnhancements() {
    const form = document.getElementById('contact-form-botsua');
    const textarea = document.getElementById('mensaje');
    
    if (!form || !textarea) return;
    
    // Agregar contador de caracteres para el textarea
    addCharacterCounter(textarea);
    
    // Validación en tiempo real
    addRealTimeValidation(form);
    
    // Efectos de focus/blur
    addFocusEffects(form);
    
    // Animación de entrada
    addFormEntryAnimation(form);
}

function addCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength') || 500;
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0/${maxLength} caracteres`;
    textarea.parentNode.appendChild(counter);
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length}/${maxLength} caracteres`;
        
        if (length > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    });
}

function addRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && value === '') {
        setFieldState(field, 'invalid');
        return false;
    }
    
    if (field.type === 'text' && value.length > 0 && value.length < 2) {
        setFieldState(field, 'invalid');
        return false;
    }
    
    setFieldState(field, 'valid');
    return true;
}

function setFieldState(field, state) {
    field.classList.remove('valid', 'invalid');
    field.classList.add(state);
    
    if (state === 'valid') {
        field.style.borderColor = '#27ae60';
    } else if (state === 'invalid') {
        field.style.borderColor = '#e74c3c';
    }
}

function addFocusEffects(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color, #3B755F)';
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.classList.contains('valid') && !this.classList.contains('invalid')) {
                this.style.borderColor = '#e0e0e0';
            }
            this.style.transform = 'translateY(0)';
        });
    });
}

function addFormEntryAnimation(form) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(form);
}

// Agregar animación de shake y slideInUp al CSS si no existe
if (!document.querySelector('#contact-form-animations')) {
    const style = document.createElement('style');
    style.id = 'contact-form-animations';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .contact-form-botsua input.valid,
        .contact-form-botsua textarea.valid {
            border-color: #27ae60 !important;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }
        
        .contact-form-botsua input.invalid,
        .contact-form-botsua textarea.invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// === FUNCIONES PARA MODAL DE LETRAS ===

function openLettersModal() {
    // Cerrar cualquier modal que pueda estar abierto
    const personalizationModal = document.getElementById('personalizationModal');
    if (personalizationModal && personalizationModal.classList.contains('active')) {
        personalizationModal.classList.remove('active');
    }
    
    // Abrir el modal de letras
    const modal = document.getElementById('lettersModal');
    if (modal) {
        modal.classList.add('active');
        resetLettersForm();
    }
}

function closeLettersModal() {
    const modal = document.getElementById('lettersModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function resetLettersForm() {
    document.getElementById('lettersQuantity').value = '4';
    document.getElementById('lettersText').value = '';
    document.getElementById('lettersPainted').checked = false;
    updateLettersPrice();
}

function updateLettersPrice() {
    const quantity = parseInt(document.getElementById('lettersQuantity').value);
    const isPainted = document.getElementById('lettersPainted').checked;
    
    const singleLetterPrice = 20.00; // 1 letra + macetero
    const basePrice = 30.00; // 4 letras + macetero
    const extraLetterPrice = 4.00;
    const paintedPrice = 5.00;
    
    let total, extraLetters, extraLettersCost;
    
    if (quantity === 1) {
        // Caso especial: 1 letra
        total = singleLetterPrice;
        extraLetters = 0;
        extraLettersCost = 0;
    } else {
        // Caso normal: 4+ letras
        extraLetters = quantity > 4 ? quantity - 4 : 0;
        extraLettersCost = extraLetters * extraLetterPrice;
        total = basePrice + extraLettersCost;
    }
    
    let paintedCost = isPainted ? paintedPrice : 0;
    total += paintedCost;
    
    // Actualizar la visualización
    const basePriceRow = document.getElementById('basePriceRow');
    const basePriceText = document.getElementById('basePriceText');
    const basePriceValue = document.getElementById('basePriceValue');
    const extraLettersRow = document.getElementById('extraLettersRow');
    const extraLettersText = document.getElementById('extraLettersText');
    const extraLettersPrice = document.getElementById('extraLettersPrice');
    const paintedRow = document.getElementById('paintedRow');
    const totalElement = document.getElementById('lettersTotal');
    
    // Actualizar precio base según la cantidad
    if (quantity === 1) {
        basePriceText.textContent = 'Base (1 letra + macetero):';
        basePriceValue.textContent = 'S/.20.00';
    } else {
        basePriceText.textContent = 'Base (4 letras + macetero):';
        basePriceValue.textContent = 'S/.30.00';
    }
    
    if (extraLetters > 0) {
        extraLettersRow.style.display = 'flex';
        extraLettersText.textContent = `${extraLetters} letra${extraLetters > 1 ? 's' : ''} adicional${extraLetters > 1 ? 'es' : ''}:`;
        extraLettersPrice.textContent = `S/.${extraLettersCost.toFixed(2)}`;
    } else {
        extraLettersRow.style.display = 'none';
    }
    
    if (isPainted) {
        paintedRow.style.display = 'flex';
    } else {
        paintedRow.style.display = 'none';
    }
    
    totalElement.textContent = `S/.${total.toFixed(2)}`;
    
    // Animación de actualización
    totalElement.classList.add('price-updated');
    setTimeout(() => totalElement.classList.remove('price-updated'), 500);
}

function validateLettersInput(input) {
    // Permitir solo letras y limitar a la cantidad seleccionada
    const quantity = parseInt(document.getElementById('lettersQuantity').value);
    let value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    
    if (value.length > quantity) {
        value = value.substring(0, quantity);
    }
    
    input.value = value;
    
    // Validación visual
    const button = document.querySelector('#lettersModal .btn-primary');
    if (value.length === quantity && value.length > 0) {
        button.disabled = false;
        button.style.opacity = '1';
        input.style.borderColor = '#27ae60';
    } else {
        button.disabled = true;
        button.style.opacity = '0.6';
        input.style.borderColor = value.length === 0 ? '#e0e0e0' : '#e74c3c';
    }
}

function addLettersToCart() {
    const quantity = parseInt(document.getElementById('lettersQuantity').value);
    const lettersText = document.getElementById('lettersText').value.toUpperCase();
    const isPainted = document.getElementById('lettersPainted').checked;
    
    // Validar que se hayan escrito todas las letras
    if (lettersText.length !== quantity) {
        alert(`Por favor, escribe exactamente ${quantity} letra${quantity > 1 ? 's' : ''}.`);
        return;
    }
    
    // Calcular precio total
    const singleLetterPrice = 20.00;
    const basePrice = 30.00;
    const extraLetterPrice = 4.00;
    const paintedPrice = 5.00;
    
    let totalPrice, extraLetters, extraLettersCost;
    
    if (quantity === 1) {
        totalPrice = singleLetterPrice;
        extraLetters = 0;
        extraLettersCost = 0;
    } else {
        extraLetters = quantity > 4 ? quantity - 4 : 0;
        extraLettersCost = extraLetters * extraLetterPrice;
        totalPrice = basePrice + extraLettersCost;
    }
    
    let paintedCost = isPainted ? paintedPrice : 0;
    totalPrice += paintedCost;
    
    // Crear nombre descriptivo del producto
    let productName = `Letras "${lettersText}"`;
    if (isPainted) {
        productName += ' (Pintadas)';
    }
    
    // Crear descripción detallada
    let description = `${quantity} letras: "${lettersText}"`;
    if (extraLetters > 0) {
        description += ` (+${extraLetters} letra${extraLetters > 1 ? 's' : ''} adicional${extraLetters > 1 ? 'es' : ''})`;
    }
    if (isPainted) {
        description += ' + Pintado';
    }
    description += ' + Base melamine + Corazón de regalo';
    
    // Agregar al carrito
    const letterProduct = {
        id: 56,
        name: productName,
        price: totalPrice,
        image: "assets/images/letras.PNG",
        quantity: 1,
        personalization: {
            type: 'letras',
            letters: lettersText,
            lettersCount: quantity,
            painted: isPainted,
            description: description,
            basePrice: basePrice,
            extraLettersCost: extraLettersCost,
            paintedCost: paintedCost
        }
    };
    
    // Usar la función existente del carrito
    if (typeof window.BotsuaApp !== 'undefined' && window.BotsuaApp.cart) {
        window.BotsuaApp.cart.addItem(letterProduct);
    } else {
        // Fallback si no existe el sistema de carrito
        console.log('Producto de letras agregado:', letterProduct);
        alert('Letras agregadas al carrito exitosamente!');
    }
    
    closeLettersModal();
}

// Event listeners para el modal de letras
document.addEventListener('DOMContentLoaded', function() {
    // Listener para el selector de cantidad
    const quantitySelect = document.getElementById('lettersQuantity');
    if (quantitySelect) {
        quantitySelect.addEventListener('change', updateLettersPrice);
    }
    
    // Listener para el checkbox de pintado
    const paintedCheckbox = document.getElementById('lettersPainted');
    if (paintedCheckbox) {
        paintedCheckbox.addEventListener('change', updateLettersPrice);
    }
    
    // Listener para cerrar modal al hacer clic fuera
    const lettersModal = document.getElementById('lettersModal');
    if (lettersModal) {
        lettersModal.addEventListener('click', function(e) {
            if (e.target === lettersModal) {
                closeLettersModal();
            }
        });
    }
    
    // Inicializar precio
    setTimeout(updateLettersPrice, 100);
});