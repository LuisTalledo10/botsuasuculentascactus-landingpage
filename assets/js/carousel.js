// Carrusel de Macetas
class MacetasCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 15; // Total de subsecciones
        this.carouselContainer = document.getElementById('carouselContainer');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }

    init() {
        this.updateCarousel();
        this.bindEvents();
        this.updateButtons();
        
        // Ajustar altura inicial después de que se haya cargado el contenido
        setTimeout(() => {
            this.adjustCarouselHeight();
        }, 100);
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

        // Touch/Swipe para móviles
        let startX = 0;
        let endX = 0;

        this.carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        this.carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = startX - endX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe izquierda - siguiente slide
                this.nextSlide();
            } else {
                // Swipe derecha - slide anterior
                this.prevSlide();
            }
        }
    }

    updateCarousel() {
        const translateX = -this.currentSlide * (100 / 15); // Cada slide es 1/15 del contenedor
        this.carouselContainer.style.transform = `translateX(${translateX}%)`;
        
        // Ajustar altura automáticamente según el contenido de la subsección activa
        this.adjustCarouselHeight();
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    adjustCarouselHeight() {
        // Obtener todas las subsecciones
        const slides = this.carouselContainer.querySelectorAll('.carousel-slide');
        if (slides[this.currentSlide]) {
            const activeSlide = slides[this.currentSlide];
            const activeSlideHeight = activeSlide.scrollHeight;
            
            // Ajustar la altura del contenedor del carrusel
            const carousel = document.querySelector('.macetas-carousel');
            carousel.style.height = `${activeSlideHeight}px`;
            
            // Añadir una transición suave para el cambio de altura
            carousel.style.transition = 'height 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
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
    // Solo inicializar si estamos en la sección de macetas
    const macetasSection = document.getElementById('macetas-section');
    if (macetasSection) {
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