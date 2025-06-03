// Import laptop data and constants
import './laptops.js';
import { CONTACT, UI, THEME } from './constants.js';

// Expose CONTACT constant globally for use in HTML script tags
window.CONTACT = CONTACT;

// Card template with consistent styling
const cardTemplate = (laptop) => `
  <div class="laptop-card">
    <img src="${laptop.image}" alt="${laptop.name}" class="laptop-image">
    <h3 class="laptop-title">${laptop.name}</h3>
    <p class="laptop-specs">${laptop.specs}</p>
    <div class="laptop-price">${laptop.price}</div>
    <a href="https://wa.me/${CONTACT.WHATSAPP}?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(laptop.name)}" 
       target="_blank" 
       class="whatsapp-button">
      Contact on WhatsApp
    </a>
  </div>
`;

function renderLaptops(filter = "") {
  const grid = document.getElementById("laptopGrid");
  const keyword = filter.trim().toLowerCase();
  
  if (!grid) return;
  
  grid.innerHTML = laptops
    .filter(laptop =>
      laptop.name.toLowerCase().includes(keyword) ||
      laptop.specs.toLowerCase().includes(keyword) ||
      laptop.price.toLowerCase().includes(keyword)
    )
    .map(cardTemplate)
    .join("");
}

// Initialize search functionality
function initializeSearch() {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", e => renderLaptops(e.target.value));
  }
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
    
    if(sunIcon) sunIcon.classList.toggle('hidden');
    if(moonIcon) moonIcon.classList.toggle('hidden');
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderLaptops();
  initializeSearch();
  initializeTheme();
});
