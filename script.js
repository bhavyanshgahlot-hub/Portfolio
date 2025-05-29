// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu with animation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// Active nav link on scroll with smooth highlighting
const observerOptions = {
    threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveLink(id);
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

function updateActiveLink(id) {
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === id) {
            link.classList.add('active');
        }
    });
}

// Portfolio items data with enhanced details
const portfolioItems = [
    {
        title: 'Project One',
        category: 'web',
        image: '../work/1.png',
        description: 'Modern web development project with clean design',
        technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'College Work',
        category: 'branding',
        image: '../work/2.png',
        description: 'Creative branding solution with unique identity',
        technologies: ['Adobe Illustrator', 'Branding', 'Vector Design'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'Design',
        category: 'ui',
        image: '../work/3.png',
        description: 'User-centered interface design with modern aesthetics',
        technologies: ['Adobe XD', 'Logo Design', 'Illustrator'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'Freelance Projects',
        category: 'web',
        image: '../work/4.png',
        description: 'Collection of successful freelance design projects',
        technologies: [ 'UI/UX', 'Branding'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'Digital Design',
        category: 'ui',
        image: '../work/5.jpg',
        description: 'Digital design project with modern aesthetics',
        technologies: ['Adobe Illustrator', 'UI Design', 'Typography'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'Club Work',
        category: 'branding',
        image: '../work/6.png',
        description: 'Complete brand identity package for modern business',
        technologies: ['Logo Design', 'Brand Guidelines', 'Marketing Materials'],
        link: '#',
        caseStudy: '#'
    },
    {
        title: 'Creative Design',
        category: 'ui',
        image: '../work/7.png',
        description: 'Creative design solution with innovative approach',
        technologies: [ 'Visual Design', 'Prototyping'],
        link: '#',
        caseStudy: '#'
    }
];

// Slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slide-dots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        const offset = -currentSlide * 100;
        slidesWrapper.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    slidesWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slidesWrapper.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slidesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slidesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        if (filter === 'all') {
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.display = 'block';
            });
        } else {
            document.querySelectorAll('.slide').forEach((slide, index) => {
                if (portfolioItems[index].category === filter) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
        
        // Reset to first visible slide
        currentSlide = 0;
        updateDots();
    });
});

// Contact form handling with enhanced validation and feedback
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            group.classList.remove('focused');
        }
    });

    if (input.value) {
        group.classList.add('focused');
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
        submitBtn.classList.add('success');
        
        // Reset form
        contactForm.reset();
        formGroups.forEach(group => group.classList.remove('focused'));
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        // Handle error
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        submitBtn.classList.add('error');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('error');
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});