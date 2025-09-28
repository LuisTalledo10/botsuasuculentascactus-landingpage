// Carrusel de contacto
let currentContactSlide = 0;
const contactSlides = document.querySelectorAll('#contactCarousel .contact-carousel-slide');
const totalContactSlides = contactSlides ? contactSlides.length : 0;

function moveContactCarousel(direction) {
    if (totalContactSlides === 0) return;
    
    currentContactSlide += direction;
    
    if (currentContactSlide >= totalContactSlides) {
        currentContactSlide = 0;
    } else if (currentContactSlide < 0) {
        currentContactSlide = totalContactSlides - 1;
    }
    
    const carousel = document.getElementById('contactCarousel');
    if (carousel) {
        const translateX = -currentContactSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
    }
}

// Auto-avanzar el carrusel cada 4 segundos
setInterval(() => {
    if (totalContactSlides > 0) {
        moveContactCarousel(1);
    }
}, 4000);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que el carrusel esté en la primera posición
    const carousel = document.getElementById('contactCarousel');
    if (carousel) {
        carousel.style.transform = 'translateX(0%)';
    }
});