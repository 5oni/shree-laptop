// Import laptop data and constants
import './laptops.js';
import './accessories.js';
import { CONTACT, UI, THEME } from './constants.js';

// Expose CONTACT constant globally for use in HTML script tags
window.CONTACT = CONTACT;

// Card template with consistent styling
const cardTemplate = (item) => `
  <div class="product-card">
    <img src="${item.image}" alt="${item.name}" class="product-image">
    <h3 class="product-title">${item.name}</h3>
    <p class="product-specs">${item.specs}</p>
    <div class="product-price">${item.price}</div>
    <a href="https://wa.me/${CONTACT.WHATSAPP}?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(item.name)}" 
       target="_blank" 
       class="whatsapp-button">
      Contact on WhatsApp
    </a>
  </div>
`;

function renderProducts(filter = "", type = "all") {
  const grid = document.getElementById("productGrid");
  const keyword = filter.trim().toLowerCase();
  
  if (!grid) return;
  
  let products = [];
  if (type === "all" || type === "laptops") {
    products = products.concat(laptops);
  }
  if (type === "all" || type === "accessories") {
    products = products.concat(accessories);
  }
  
  grid.innerHTML = products
    .filter(product =>
      product.name.toLowerCase().includes(keyword) ||
      product.specs.toLowerCase().includes(keyword) ||
      product.price.toLowerCase().includes(keyword)
    )
    .map(cardTemplate)
    .join("");
}

// Initialize search functionality
function initializeSearch() {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", e => renderProducts(e.target.value, getCurrentProductType()));
  }
}

// Initialize product type filter
function initializeProductTypeFilter() {
  const filterButtons = document.querySelectorAll('.product-type-filter');
  if (filterButtons) {
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(document.getElementById("searchBar")?.value || "", type);
      });
    });
  }
}

function getCurrentProductType() {
  const activeButton = document.querySelector('.product-type-filter.active');
  return activeButton ? activeButton.dataset.type : 'all';
}

// Initialize theme functionality
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  if (!themeToggle || !html) return;
  
  const currentTheme = localStorage.getItem(THEME.STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (currentTheme === THEME.DARK || (!currentTheme && prefersDark)) {
    html.classList.add(THEME.DARK);
    if(sunIcon) sunIcon.classList.remove('hidden');
    if(moonIcon) moonIcon.classList.add('hidden');
  } else {
    html.classList.remove(THEME.DARK);
    if(sunIcon) sunIcon.classList.add('hidden');
    if(moonIcon) moonIcon.classList.remove('hidden');
  }
  
  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains(THEME.DARK);
    html.classList.toggle(THEME.DARK);
    localStorage.setItem(THEME.STORAGE_KEY, isDark ? THEME.LIGHT : THEME.DARK);
    
    // Explicitly show/hide icons based on the new theme state
    if (html.classList.contains(THEME.DARK)) {
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    } else {
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initializeSearch();
  initializeProductTypeFilter();
  initializeTheme();
});
