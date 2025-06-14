const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const today = new Date();

currentYear.textContent += today.getFullYear();
lastModified.textContent += document.lastModified;
lastModified.style.color = '#2a05e4';

// Global variables and data
const destinationsData = [
    {
        id: 1,
        name: "Cape Coast Castle",
        description: "Historic fortress and UNESCO World Heritage site with deep cultural significance.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        region: "Central Region",
        activities: ["Historical Tours", "Cultural Learning", "Photography"]
    },
    {
        id: 2,
        name: "Kakum National Park",
        description: "Experience the famous canopy walkway and diverse wildlife in pristine rainforest.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        region: "Central Region",
        activities: ["Canopy Walk", "Bird Watching", "Nature Trails"]
    },
    {
        id: 3,
        name: "Lake Volta",
        description: "One of the world's largest artificial lakes, perfect for water activities and relaxation.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        region: "Eastern Region",
        activities: ["Boat Tours", "Fishing", "Swimming"]
    },
    {
        id: 4,
        name: "Mole National Park",
        description: "Ghana's largest wildlife refuge, home to elephants, antelopes, and diverse bird species.",
        image: "https://media.istockphoto.com/id/1412231192/photo/wild-life-animals-in-mole-national-park-the-largest-wildlife-refuge-of-ghana.webp?a=1&b=1&s=612x612&w=0&k=20&c=gsJmtUhm1TEIjUjg37jgYRwdIc1kio6zGngLrxPEIRA=",
        region: "Northern Region",
        activities: ["Safari Tours", "Wildlife Photography", "Camping"]
    }
];

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// DOM manipulation functions
function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

function showMessage(elementId, message, type = 'success') {
    const messageEl = $(elementId);
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenu = $('#mobile-menu');
    const navMenu = $('#nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = $(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Destinations rendering
function renderDestinations() {
    const grid = $('#destinations-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    destinationsData.forEach(destination => {
        const card = createElement('div', 'destination-card');
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" loading="lazy">
            <div class="card-content">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <div class="card-meta">
                    <small>Region: ${destination.region}</small>
                </div>
            </div>
        `;
        
        // Add click event for destination details
        card.addEventListener('click', () => {
            showDestinationDetails(destination);
        });
        
        grid.appendChild(card);
    });
}

// Show destination details (modal-like functionality)
function showDestinationDetails(destination) {
    // Store selected destination in localStorage
    localStorage.setItem('selectedDestination', JSON.stringify(destination));
    
    // Create and show modal or redirect to details page
    alert(`${destination.name}\n\n${destination.description}\n\nActivities: ${destination.activities.join(', ')}`);
}

// Visitor counter with localStorage
function initializeVisitorCounter() {
    const counterEl = $('#visitor-count');
    if (!counterEl) return;
    
    let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
    visitorCount += 1;
    localStorage.setItem('visitorCount', visitorCount.toString());
    
    // Animate counter
    animateCounter(counterEl, visitorCount);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 30);
}

// Newsletter functionality
function initializeNewsletter() {
    const form = $('#newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = $('#email');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showMessage('#newsletter-message', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Store email in localStorage (in real app, would send to server)
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        
        if (subscribers.includes(email)) {
            showMessage('#newsletter-message', 'You are already subscribed!', 'error');
            return;
        }
        
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        showMessage('#newsletter-message', 'Thank you for subscribing!', 'success');
        emailInput.value = '';
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Lazy loading implementation
function initializeLazyLoading() {
    const images = $$('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Theme management (bonus feature)
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderDestinations();
    initializeVisitorCounter();
    initializeNewsletter();
    initializeLazyLoading();
    initializeTheme();
    
    // Add global click handler for CTA buttons
    $$('.cta-button').forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                if (target) {
                    scrollToSection(target);
                }
            });
        }
    });
});

// Export functions for use in other files
window.GhanaTravel = {
    scrollToSection,
    showDestinationDetails,
    destinationsData
};