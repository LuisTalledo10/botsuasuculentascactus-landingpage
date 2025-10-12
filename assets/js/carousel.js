// Carrusel de Macetas
class MacetasCarousel {
    constructor() {
        this.currentSlide = 0;
        this.carouselContainer = document.getElementById('carouselContainer');
        this.slides = this.carouselContainer ? this.carouselContainer.querySelectorAll('.carousel-slide') : [];
        this.totalSlides = this.slides.length;
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        // Ajustar dinámicamente el ancho del contenedor y de los slides
        if (this.carouselContainer && this.totalSlides > 0) {
            this.carouselContainer.style.width = `calc(100% * ${this.totalSlides})`;
            this.slides.forEach(slide => {
                slide.style.width = `calc(100% / ${this.totalSlides})`;
                slide.style.flex = `0 0 calc(100% / ${this.totalSlides})`;
            });
        }
        
        this.init();
    }

    init() {
        this.updateCarousel();
        this.bindEvents();
        this.updateButtons();
        
        // Establecer cursor inicial
        this.carouselContainer.style.cursor = 'grab';
        
        // Ajustar altura inicial después de que se haya cargado el contenido
        // Usar múltiples timeouts para asegurar que todo esté renderizado
        setTimeout(() => {
            this.adjustCarouselHeight();
        }, 200);
        
        setTimeout(() => {
            this.adjustCarouselHeight();
        }, 500);
        
        // También ajustar cuando se redimensione la ventana
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.adjustCarouselHeight();
            }, 100);
        });
    }

    bindEvents() {
        // Botones de navegación
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });

        // Variables para gestos táctiles y de mouse
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.initialTranslate = 0;
        this.animationId = 0;

        // Touch events (móviles)
        this.carouselContainer.addEventListener('touchstart', (e) => this.touchStart(e), { passive: false });
        this.carouselContainer.addEventListener('touchmove', (e) => this.touchMove(e), { passive: false });
        this.carouselContainer.addEventListener('touchend', (e) => this.touchEnd(e));

        // Mouse events (escritorio)
        this.carouselContainer.addEventListener('mousedown', (e) => this.mouseStart(e));
        this.carouselContainer.addEventListener('mousemove', (e) => this.mouseMove(e));
        this.carouselContainer.addEventListener('mouseup', (e) => this.mouseEnd(e));
        this.carouselContainer.addEventListener('mouseleave', (e) => this.mouseEnd(e));

        // Prevenir selección de texto durante el arrastre
        this.carouselContainer.addEventListener('selectstart', (e) => e.preventDefault());
        this.carouselContainer.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // Métodos para gestos táctiles
    touchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.hasMoved = false;
        this.horizontalDrag = null;
        this.isDragging = false;
        this.allowHorizontalDrag = true;

        // Reiniciar variables de arrastre
        this.startX = this.touchStartX;
        this.currentX = this.touchStartX;
        this.inMagnetZone = false;
        this.magnetDirection = null;
    }

    touchMove(e) {
        // Ya no se restringe por zona lateral
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        const diffX = moveX - this.touchStartX;
        const diffY = moveY - this.touchStartY;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        const THRESHOLD = 10; // px mínimos para decidir dirección

        if (this.horizontalDrag === null) {
            if (absDiffX < THRESHOLD && absDiffY < THRESHOLD) {
                // No decidir aún
                return;
            }
            // Decidir dirección
            if (absDiffX > absDiffY) {
                this.horizontalDrag = true;
                this.isDragging = true;
                this.startDrag(this.touchStartX);
            } else {
                this.horizontalDrag = false;
                this.isDragging = false;
                // No activar drag, permitir scroll
                return;
            }
        }

        if (this.horizontalDrag && this.isDragging) {
            e.preventDefault();
            this.duringDrag(moveX);
        }
        // Si es vertical, no hacer nada y permitir scroll
    }

    touchEnd(e) {
        if (this.horizontalDrag && this.isDragging) {
            this.endDrag();
        }
        // Si fue vertical, no hacer nada
        this.horizontalDrag = null;
        this.isDragging = false;
        this.allowHorizontalDrag = false;
    }

    // Métodos para gestos con mouse
    mouseStart(e) {
        e.preventDefault();
        this.startDrag(e.clientX);
        this.carouselContainer.style.cursor = 'grabbing';
    }

    mouseMove(e) {
        if (this.isDragging) {
            e.preventDefault();
            this.duringDrag(e.clientX);
        }
    }

    mouseEnd(e) {
        this.endDrag();
        this.carouselContainer.style.cursor = 'grab';
    }

    // Lógica común para ambos tipos de gestos
    startDrag(clientX) {
        this.isDragging = true;
        this.startX = clientX;
    this.initialTranslate = -this.currentSlide * (100 / this.totalSlides);
        this.inMagnetZone = false; // Solo detectar zona, no activar aún
        this.magnetDirection = null;
        
        // Cancelar cualquier animación en progreso
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    duringDrag(clientX) {
        if (!this.isDragging) return;

        this.currentX = clientX;
        const diffX = this.currentX - this.startX;
        const containerWidth = this.carouselContainer.parentElement.offsetWidth;

        // Sensibilidad
        const sensitivity = 0.07;
        const adjustedDiffX = diffX * sensitivity;

        // Limitar el arrastre máximo SOLO al siguiente/previo slide
        const slideWidth = containerWidth / this.totalSlides;
        let maxDragDistance = slideWidth; // Solo 1 slide
        if (adjustedDiffX < 0) maxDragDistance = -slideWidth;

        // Clamp para que solo se vea el siguiente/previo slide
        const clampedDiffX = Math.max(Math.min(adjustedDiffX, slideWidth), -slideWidth);

        // Calcular el porcentaje de arrastre
        const dragPercentage = (clampedDiffX / containerWidth) * 100;

        // La posición base es siempre el slide actual
        const baseTranslate = -this.currentSlide * (100 / this.totalSlides);
        let newTranslate = baseTranslate + dragPercentage;

        // Aplicar resistencia en los extremos
        if (this.currentSlide === 0 && diffX > 0) {
            newTranslate = baseTranslate + (dragPercentage * 0.3);
        } else if (this.currentSlide === this.totalSlides - 1 && diffX < 0) {
            newTranslate = baseTranslate + (dragPercentage * 0.3);
        }

        this.carouselContainer.style.transition = 'none';
        this.carouselContainer.style.transform = `translateX(${newTranslate}%)`;

        // Detectar zona de imán para el salto al soltar
        const magnetThreshold = slideWidth * 0.5; // 50% del slide para activar el imán
        this.inMagnetZone = Math.abs(adjustedDiffX) > magnetThreshold;

        if (this.inMagnetZone) {
            if (diffX > 0 && this.currentSlide > 0) {
                this.magnetDirection = 'prev';
            } else if (diffX < 0 && this.currentSlide < this.totalSlides - 1) {
                this.magnetDirection = 'next';
            } else {
                this.inMagnetZone = false;
                this.magnetDirection = null;
            }
        }
    }

    endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        
        // AQUÍ es donde se activa el imán - solo cuando sueltas el click
        if (this.inMagnetZone && this.magnetDirection) {
            // Activar efecto imán con transición suave
            this.carouselContainer.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            if (this.magnetDirection === 'prev' && this.currentSlide > 0) {
                // Engancharse suavemente al slide anterior
                this.currentSlide--;
                const targetTranslate = -this.currentSlide * (100 / this.totalSlides);
                this.carouselContainer.style.transform = `translateX(${targetTranslate}%)`;
                this.updateButtons();
                
                // Actualizar indicadores después de un pequeño delay
                setTimeout(() => {
                    this.indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === this.currentSlide);
                    });
                    // Forzar recálculo de altura después del cambio
                    this.adjustCarouselHeight();
                }, 150);
                
            } else if (this.magnetDirection === 'next' && this.currentSlide < this.totalSlides - 1) {
                // Engancharse suavemente al siguiente slide
                this.currentSlide++;
                const targetTranslate = -this.currentSlide * (100 / this.totalSlides);
                this.carouselContainer.style.transform = `translateX(${targetTranslate}%)`;
                this.updateButtons();
                
                // Actualizar indicadores después de un pequeño delay
                setTimeout(() => {
                    this.indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === this.currentSlide);
                    });
                    // Forzar recálculo de altura después del cambio
                    this.adjustCarouselHeight();
                }, 150);
            }
        } else {
            // Sin zona de imán - volver suavemente a la posición actual
            this.carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            this.updateCarousel();
        }
        
        // Limpiar estado
        this.inMagnetZone = false;
        this.magnetDirection = null;
    }

    updateCarousel() {
    const translateX = -this.currentSlide * (100 / this.totalSlides); // Cada slide es 1/totalSlides del contenedor
        
        // Asegurar que la transición esté activada para los cambios programáticos
        this.carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.carouselContainer.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Ajustar altura después de que la transición haya comenzado
        setTimeout(() => {
            this.adjustCarouselHeight();
        }, 100);
    }

    adjustCarouselHeight() {
        // Obtener todas las subsecciones
        const slides = this.carouselContainer.querySelectorAll('.carousel-slide');
        if (slides[this.currentSlide]) {
            const activeSlide = slides[this.currentSlide];
            
            // Forzar recálculo del layout antes de medir
            activeSlide.style.display = 'block';
            activeSlide.style.visibility = 'visible';
            
            // Esperar un momento para que se renderice completamente
            requestAnimationFrame(() => {
                // Obtener la altura real incluyendo todos los elementos internos
                let maxHeight = 0;
                
                // Método 1: Usar getBoundingClientRect para altura más precisa
                const rect = activeSlide.getBoundingClientRect();
                maxHeight = Math.max(maxHeight, rect.height);
                
                // Método 2: Verificar scrollHeight
                maxHeight = Math.max(maxHeight, activeSlide.scrollHeight);
                
                // Método 3: Calcular la altura de los elementos internos
                const innerElements = activeSlide.querySelectorAll('.subcategory-section, .product-card, .product-grid');
                let totalInnerHeight = 0;
                
                innerElements.forEach(element => {
                    const elementRect = element.getBoundingClientRect();
                    const computedStyle = window.getComputedStyle(element);
                    const marginTop = parseFloat(computedStyle.marginTop) || 0;
                    const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
                    totalInnerHeight += elementRect.height + marginTop + marginBottom;
                });
                
                // Usar la altura más grande encontrada, con un mínimo
                const finalHeight = Math.max(maxHeight, totalInnerHeight, 400); // Mínimo 400px
                
                // Ajustar la altura del contenedor del carrusel
                const carousel = document.querySelector('.macetas-carousel');
                if (carousel) {
                    carousel.style.height = `${finalHeight + 50}px`; // +50px de padding extra
                    carousel.style.transition = 'height 0.6s ease';
                }
            });
        }
    }

    updateButtons() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    // Auto-play opcional (descomentado si se desea)
    /*
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.goToSlide(0); // Volver al inicio
            }
        }, 5000); // 5 segundos
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    */
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const macetasSection = document.getElementById('macetas-section');
    // Solo crear si no existe ya la instancia
    if (macetasSection && !window.macetasCarousel) {
        window.macetasCarousel = new MacetasCarousel();
    }
});

// Funciones adicionales para integración con el sistema existente
function showMacetasCarousel() {
    const macetasSection = document.getElementById('macetas-section');
    if (macetasSection && window.macetasCarousel) {
        macetasSection.style.display = 'block';
        window.macetasCarousel.updateCarousel();
    }
}

function hideMacetasCarousel() {
    const macetasSection = document.getElementById('macetas-section');
    if (macetasSection) {
        macetasSection.style.display = 'none';
    }
}