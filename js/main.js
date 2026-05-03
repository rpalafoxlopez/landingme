// Módulo de funcionalidades globales
window.initializeModules = function() {
    initMobileDrawer();
    initSmoothScroll();
    initActiveNavLinks();
    initCopyEmail();
};

// Mobile drawer functionality
function initMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const menuBtn = document.getElementById('menuButton');
    
    if (!drawer || !menuBtn) return;
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.drawer-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        document.body.appendChild(overlay);
    }
    
    // Abrir/cerrar drawer
    window.toggleDrawer = function() {
        drawer.classList.toggle('-translate-x-full');
        overlay.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('-translate-x-full') ? '' : 'hidden';
    };
    
    menuBtn.onclick = window.toggleDrawer;
    
    // Cerrar al hacer clic en overlay
    overlay.onclick = window.toggleDrawer;
    
    // Cerrar al hacer clic en enlaces del drawer
    drawer.querySelectorAll('a').forEach(link => {
        link.onclick = function(e) {
            setTimeout(() => {
                if (!drawer.classList.contains('-translate-x-full')) {
                    window.toggleDrawer();
                }
            }, 100);
        };
    });
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Resaltar enlace activo en navbar
function initActiveNavLinks() {
    const sections = document.querySelectorAll('.section-module, [id]');
    const navLinks = document.querySelectorAll('nav a, .mobile-nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary-container', 'border-primary-container');
            link.classList.add('text-gray-500');
            
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.remove('text-gray-500');
                link.classList.add('text-primary-container', 'border-primary-container');
            }
        });
    });
}

// Copiar email al portapapeles
function initCopyEmail() {
    const emailBtn = document.querySelector('[data-copy-email]');
    if (!emailBtn) return;
    
    emailBtn.addEventListener('click', async () => {
        const email = 'rpalafox@hey.com';
        try {
            await navigator.clipboard.writeText(email);
            
            // Mostrar feedback
            const originalText = emailBtn.textContent;
            emailBtn.textContent = '✓ COPIADO!';
            setTimeout(() => {
                emailBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    });
}

// Ejecutar después de cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.initializeModules) window.initializeModules();
    });
} else {
    if (window.initializeModules) window.initializeModules();
}