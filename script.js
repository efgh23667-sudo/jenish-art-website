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

// ========================================
// CUSTOMER REVIEWS FUNCTIONALITY
// ========================================
function initCustomerReviews() {
    const reviewForm = document.getElementById('review-form');
    const reviewsDisplay = document.getElementById('reviews-display');
    const reviewsCount = document.getElementById('reviews-count');
    const noReviews = document.getElementById('no-reviews');
    
    // Load existing reviews from localStorage
    let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];
    
    // Function to display reviews
    function displayReviews() {
        if (reviews.length === 0) {
            reviewsDisplay.innerHTML = '';
            reviewsDisplay.appendChild(noReviews);
            noReviews.style.display = 'block';
        } else {
            noReviews.style.display = 'none';
            reviewsDisplay.innerHTML = reviews.map((review, index) => createReviewCard(review, index)).join('');
        }
        reviewsCount.textContent = reviews.length + ' review' + (reviews.length !== 1 ? 's' : '');
    }
    
    // Function to create review card HTML
    function createReviewCard(review, index) {
        const initial = review.name.charAt(0).toUpperCase();
        const date = new Date(review.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += '<i class="fas fa-star' + (i > review.rating ? ' empty' : '') + '"></i>';
        }
        
        // Get current user's review ID from localStorage
        const currentUserReviewId = localStorage.getItem('myReviewId');
        
        // Check if this review belongs to the current user
        const isOwnReview = currentUserReviewId && review.id === currentUserReviewId;
        
        // Add delete button only for user's own review
        const deleteButton = isOwnReview ? 
            '<button class="review-delete-btn" onclick="deleteReview(\'' + review.id + '\')" title="Delete your review">' +
            '<i class="fas fa-trash-alt"></i> Delete' +
            '</button>' : '';
        
        return '<div class="review-card" style="animation-delay: ' + (index * 0.1) + 's">' +
            '<div class="review-card-header">' +
            '<div class="review-avatar">' + escapeHtml(review.name.charAt(0).toUpperCase()) + '</div>' +
            '<div class="review-card-info">' +
            '<h4>' + escapeHtml(review.name) + '</h4>' +
            '<span class="review-date">' + date + '</span>' +
            '</div>' +
            deleteButton +
            '</div>' +
            '<div class="review-rating">' + starsHtml + '</div>' +
            '<p class="review-message">' + escapeHtml(review.message) + '</p>' +
            '</div>';
    }
    
    // Function to delete a review
    window.deleteReview = function(reviewId) {
        if (!confirm('Are you sure you want to delete this review?')) {
            return;
        }
        
        // Remove review from array
        reviews = reviews.filter(review => review.id !== reviewId);
        
        // Save to localStorage
        localStorage.setItem('customerReviews', JSON.stringify(reviews));
        
        // Clear user's review ID if they deleted their own review
        const currentUserReviewId = localStorage.getItem('myReviewId');
        if (currentUserReviewId === reviewId) {
            localStorage.removeItem('myReviewId');
        }
        
        // Display reviews
        displayReviews();
        
        // Show confirmation
        alert('Your review has been deleted.');
    };
    
    // Function to escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewer-name').value.trim();
            const message = document.getElementById('review-message').value.trim();
            const ratingInput = document.querySelector('input[name="rating"]:checked');
            
            if (!name || !message || !ratingInput) {
                alert('Please fill in all fields and select a rating.');
                return;
            }
            
            const rating = parseInt(ratingInput.value);
            
            // Create review object with unique ID
            const uniqueId = 'review_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const newReview = {
                id: uniqueId,
                name: name,
                message: message,
                rating: rating,
                date: new Date().toISOString()
            };
            
            // Store the user's review ID in localStorage
            localStorage.setItem('myReviewId', uniqueId);
            
            // Add to reviews array (at the beginning for newest first)
            reviews.unshift(newReview);
            
            // Save to localStorage
            localStorage.setItem('customerReviews', JSON.stringify(reviews));
            
            // Display reviews
            displayReviews();
            
            // Reset form
            reviewForm.reset();
            
            // Show success message
            alert('Thank you, ' + name + '! Your review has been submitted successfully.');
            
            // Scroll to reviews section
            const reviewsSection = document.querySelector('.customer-reviews');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Initial display
    displayReviews();
}

// Quick View Product
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
    initCustomerReviews();
    initHeroParticles();
});

// ========================================
// HERO PARTICLE ANIMATION - ENHANCED VERSION
// ========================================
function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    
    // Blue/cyan color palette - brighter colors for better visibility
    const colors = ['#00e5ff', '#40e0ff', '#00bfff', '#87cefa', '#1e90ff'];
    
    // Optimized particle configuration for better visibility
    let particles = [];
    const particleCount = 80; // Increased for more visible particles
    const connectionDistance = 150; // Increased for more connecting lines
    const mouseDistance = 200; // Increased for better interaction
    
    // Mouse position
    let mouse = { x: null, y: null };
    let isScattering = false;
    let scatterTimer = null;
    
    // Resize canvas to match hero section
    function resizeCanvas() {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    // Enhanced Particle class with floating movement and pulse effect
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Varying speeds - some slow, some fast
            const speedMultiplier = Math.random() * 1.5 + 0.3; // Range: 0.3 to 1.8
            this.vx = (Math.random() - 0.5) * 2 * speedMultiplier;
            this.vy = (Math.random() - 0.5) * 2 * speedMultiplier;
            
            // Base radius and pulse properties
            this.baseRadius = Math.random() * 3 + 2; // 2-5px
            this.radius = this.baseRadius;
            
            // Floating movement - sinusoidal motion
            this.floatOffset = Math.random() * Math.PI * 2;
            this.floatSpeed = Math.random() * 0.02 + 0.01;
            this.floatAmplitude = Math.random() * 0.5 + 0.2;
            
            // Pulse/shimmer effect - random particles will pulse
            this.pulseEnabled = Math.random() > 0.5; // 50% of particles pulse
            this.pulseSpeed = Math.random() * 0.05 + 0.02;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.baseOpacity = Math.random() * 0.3 + 0.7; // 0.7-1.0 - higher for better visibility
            
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.density = (Math.random() * 30) + 10; // Density for mouse interaction
        }
        
        draw() {
            // Calculate pulse effect
            let currentOpacity = this.baseOpacity;
            let currentRadius = this.baseRadius;
            
            if (this.pulseEnabled) {
                const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset);
                currentOpacity = this.baseOpacity + pulse * 0.3;
                currentRadius = this.baseRadius + pulse * 1.5;
            }
            
            // Draw particle with enhanced glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
            
            // Create gradient for glowing effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentRadius * 2
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.4, this.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.globalAlpha = currentOpacity;
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 10; // Reduced from 25 for performance
            ctx.shadowColor = this.color;
            ctx.fill();
            
            // Draw bright core
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = currentOpacity * 0.9;
            ctx.shadowBlur = 5; // Reduced from 10 for performance
            ctx.fill();
            
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
        
        update() {
            // Floating movement - add sinusoidal motion
            this.floatOffset += this.floatSpeed;
            const floatX = Math.cos(this.floatOffset) * this.floatAmplitude;
            const floatY = Math.sin(this.floatOffset) * this.floatAmplitude;
            
            // Normal movement with floating
            this.x += this.vx + floatX;
            this.y += this.vy + floatY;
            
            // Boundary collision with smooth bounce
            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -1;
                this.x = Math.max(0, Math.min(canvas.width, this.x));
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -1;
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
            
            // Enhanced mouse interaction - stronger repulsion
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    
                    // Stronger reaction when mouse is close
                    const repulsionStrength = isScattering ? 8 : 3;
                    const directionX = forceDirectionX * force * this.density * repulsionStrength;
                    const directionY = forceDirectionY * force * this.density * repulsionStrength;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
            
            // Dramatic scatter effect on click
            if (isScattering) {
                const scatterForce = 30;
                this.x += (Math.random() - 0.5) * scatterForce;
                this.y += (Math.random() - 0.5) * scatterForce;
                
                // Temporarily increase velocity during scatter
                this.vx = (Math.random() - 0.5) * 6;
                this.vy = (Math.random() - 0.5) * 6;
            }
            
            this.draw();
        }
    }
    
    // Initialize particles
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Enhanced connection drawing with glowing lines
    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    // Calculate opacity based on distance
                    let opacity = 1 - (distance / connectionDistance);
                    opacity = Math.pow(opacity, 1.5); // Smooth falloff
                    
                    // Create gradient for glowing line
                    const gradient = ctx.createLinearGradient(
                        particles[a].x, particles[a].y,
                        particles[b].x, particles[b].y
                    );
                    
                    // Interpolate colors based on particle colors
                    gradient.addColorStop(0, particles[a].color);
                    gradient.addColorStop(0.5, `rgba(0, 229, 255, ${opacity * 0.8})`);
                    gradient.addColorStop(1, particles[b].color);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = Math.max(0.5, opacity * 2); // Varying line width
                    ctx.shadowBlur = 15; // Add glow to lines
                    ctx.shadowColor = '#00e5ff';
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                    
                    ctx.shadowBlur = 0;
                }
            }
        }
    }
    
    // Animation loop with smooth rendering
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        
        // Draw connections
        connect();
        
        requestAnimationFrame(animate);
    }
    
    // Mouse event listeners
    heroSection.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    heroSection.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Enhanced click scatter effect
    heroSection.addEventListener('click', function() {
        isScattering = true;
        
        if (scatterTimer) clearTimeout(scatterTimer);
        
        // Scatter lasts longer and particles reconnect smoothly
        scatterTimer = setTimeout(function() {
            isScattering = false;
            // Gradually restore normal velocities
            particles.forEach(p => {
                const speedMultiplier = Math.random() * 1.5 + 0.3;
                p.vx = (Math.random() - 0.5) * 2 * speedMultiplier;
                p.vy = (Math.random() - 0.5) * 2 * speedMultiplier;
            });
        }, 500);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        init();
    });
    
    // Initialize
    resizeCanvas();
    init();
    animate();
}

