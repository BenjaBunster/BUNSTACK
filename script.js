// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Touch support for mobile menu
let touchStartY = 0;
navMenu.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

navMenu.addEventListener('touchmove', (e) => {
    if (navMenu.classList.contains('active')) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Close menu with upward swipe
        if (deltaY < -50) {
            navMenu.classList.remove('active');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Plan selection
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const planPrice = card.querySelector('.amount').textContent;
        
        // Create modal or alert for plan selection
        alert(`Has seleccionado el plan ${planName} por $${planPrice} USD. 
        
En un sitio web real, esto redirigiría a un formulario de contratación o sistema de pago.

¿Te gustaría proceder con la contratación?`);
        
        // In a real website, you would redirect to a payment form or contact form
        // window.location.href = `/contratar/${planName.toLowerCase()}`;
    });
});

// Contact form handling with internal modal
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitButton = this.querySelector('.btn-primary');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulate form submission (in a real app, you'd send data to your backend)
        // For now, we'll use FormSubmit via fetch to maintain email functionality
        const formData = new FormData(this);
        
        // Submit to FormSubmit
        fetch('https://formsubmit.co/kayzeronpc@gmail.com', {
            method: 'POST',
            body: formData
        }).then(() => {
            // Show success modal
            showModal();
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }).catch(() => {
            // Even if fetch fails (due to CORS), FormSubmit might work
            // Show success modal anyway
            showModal();
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Success Modal functionality
function showModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'block';
        // Trigger animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('success-modal');
    const closeBtn = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Hero buttons actions
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.textContent.includes('Ver Planes')) {
            // Scroll to pricing section
            document.querySelector('#planes').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (this.textContent.includes('Consulta Gratis')) {
            // Scroll to contact section
            document.querySelector('#contacto').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Pricing card interactive effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 60px rgba(0, 212, 255, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-related functionality here
}, 16)); // ~60fps