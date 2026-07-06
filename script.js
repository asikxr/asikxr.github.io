// ================================
// TEMA CLARO/OSCURO
// ================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;
const logoSvg = document.getElementById('logo');

// Detectar tema preferido del sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Rutas de logo para modo claro/oscuro
const logoPathLight = 'Resources/LogoWhitemode.png';
const logoPathDark = 'Resources/LogoDarkmode.png';

// Inicializar tema
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Establecer tema
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (logoSvg) logoSvg.src = logoPathDark;
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        if (logoSvg) logoSvg.src = logoPathLight;
        themeToggle.textContent = '🌙';
    }
}

// Event listener para el botón de tema
themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// ================================
// CARRUSEL DE IMÁGENES
// ================================

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');

// Solo ejecutar si los elementos existen
if (carousel && prevBtn && nextBtn && indicators.length > 0) {
    let currentSlide = 0;
    const totalSlides = 5;
    let autoplayInterval;

    // Función para ir a un slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        resetAutoplay();
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        resetAutoplay();
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        resetAutoplay();
    }

    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Reproducción automática
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }

    // Reiniciar autoplay
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event listeners para los botones del carrusel
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Detener autoplay al pasar el mouse sobre el carrusel
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }

    // Teclado: flechas para navegar el carrusel
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Iniciar autoplay del carrusel
    startAutoplay();
}

// ================================
// ANIMACIONES EN SCROLL
// ================================

const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            animationObserver.unobserve(entry.target);
        }
    });
}, animationObserverOptions);

// Observar feature cards
document.querySelectorAll('.feature-card').forEach((card) => {
    card.style.opacity = '0';
    animationObserver.observe(card);
});

// ================================
// EFECTO PARALLAX SUAVE Y DINÁMICO
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const header = document.querySelector('.header');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    }

    // Cambiar sombra del header según scroll
    if (scrolled > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ================================
// ANIMACIONES EN SCROLL CON INTERSECTION OBSERVER
// ================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.animation = element.dataset.animation || 'fadeInUp 0.6s ease-out forwards';
            
            // Agregar delay basado en la posición
            if (element.dataset.delay) {
                element.style.animationDelay = element.dataset.delay;
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observar secciones principales
document.querySelectorAll('.section-title, .cta-section').forEach((element) => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ================================
// FEATURE CARDS - MODAL EXPANDIBLE
// ================================

const featureCards = document.querySelectorAll('.feature-card');
const featureModal = document.getElementById('featureModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalIcon = document.getElementById('modalIcon');
const contactBtn = document.getElementById('contactBtn');

// Solo ejecutar si el modal existe (en index.html)
if (featureModal && modalOverlay && modalClose && modalTitle && modalDescription && modalIcon && contactBtn) {
    // Abrir modal al hacer click en una tarjeta
    featureCards.forEach((card) => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.getAttribute('data-description');
            const icon = card.querySelector('.feature-icon').innerHTML;

            // Llenar contenido del modal
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalIcon.innerHTML = icon;

            // Mostrar modal con animación
            featureModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evitar scroll

            // Reproducir animación de entrada
            const content = document.querySelector('.modal-content');
            content.style.animation = 'none';
            setTimeout(() => {
                content.style.animation = 'modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 10);
        });

        // Efecto hover en tarjeta
        card.style.cursor = 'pointer';
    });

    // Cerrar modal
    function closeModal() {
        featureModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && featureModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Botón de contacto en modal
    contactBtn.addEventListener('click', () => {
        closeModal();
        // Aquí puedes agregar lógica adicional para contactar
        alert('¡Pronto nos pondremos en contacto contigo!');
    });
}

// ================================
// SMOOTH SCROLL BUTTONS
// ================================

const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        // No hacer scroll si es un botón de contacto en modal
        if (this.id === 'contactBtn') {
            return;
        }

        // Para botón "Conoce Nuestro Trabajo"
        if (this.classList.contains('cta-hero')) {
            // Scroll suave
            window.scrollTo({
                top: document.querySelector('.carousel-section').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });

    // Agregar efecto de feedback visual
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ================================
// EFECTO HOVER EN ELEMENTOS INTERACTIVOS
// ================================

document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', function() {
        if (!this.classList.contains('no-hover-effect')) {
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    });
});

// ================================
// INICIALIZACIÓN
// ================================

// Inicializar tema
initTheme();

// Escuchar cambios en preferencia del sistema
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Iniciar autoplay del carrusel (solo en index.html)
const carouselElement = document.getElementById('carousel');
if (carouselElement) {
    startAutoplay();
}

// Animación de entrada de elementos
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'slideInDown 0.6s ease-out';
    }
});

// ================================
// WHATSAPP INTEGRATION
// ================================

// Agregar funcionalidad a botones "Comenzar Ahora"
const whatsappButtons = document.querySelectorAll('#whatsappCTA');
const whatsappNumber = '4491853490';
const whatsappMessage = 'Hola! me intereza impulsar mi empresa mediante una pagina web';

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        // Crear URL de WhatsApp Web
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        // Abrir en nueva pestaña
        window.open(whatsappUrl, '_blank');
    });
});

// ================================
// UTILIDADES
// ================================

// Función para detectar si el elemento está en viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para agregar animaciones en scroll
function addScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}

window.addEventListener('scroll', addScrollAnimations);

console.log('BlackGrid - Agencia de diseño web cargada correctamente');
