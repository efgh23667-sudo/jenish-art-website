pageYOffset/* ========================================
   SIMPLE WEBSITE - JAVASCRIPT
   Basic functionality for 3-page website
   ======================================== */

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Store message in localStorage (demo purposes)
                const enquiry = {
                    name: name,
                    email: email,
                    message: message,
                    date: new Date().toISOString()
                };
                
                let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
                enquiries.push(enquiry);
                localStorage.setItem('enquiries', JSON.stringify(enquiries));
                
                // Show success message
                alert('Thank you, ' + name + '! Your message has been sent successfully. We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Export functions globally
window.toggleMobileMenu = toggleMobileMenu;

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Scroll Animation Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .gallery-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Newsletter Form Handling
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! We will send updates to: ' + email);
                this.reset();
            }
        });
    }
}

// Quick View Product (for improved product cards)
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Quick View: ${product.name}\nPrice: $${product.price}\n${product.shortDescription}`);
    }
}

// Wishlist Function
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`${product.name} added to wishlist!`);
    }
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initScrollAnimations();
    initNewsletter();
});

