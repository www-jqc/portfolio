/**
 * Global Theme Manager
 * Handles dark/light mode switching with localStorage persistence
 */

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || 'light';
    this.init();
  }

  init() {
    // Apply the stored/default theme
    this.applyTheme(this.currentTheme);
    
    // Create theme toggle button
    this.createThemeToggle();
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  storeTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  createThemeToggle() {
    // Remove any existing theme toggle buttons
    const existingToggle = document.querySelector('.theme-toggle');
    if (existingToggle) {
      existingToggle.remove();
    }

    // Create new theme toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = '<i class="bi bi-sun"></i>';
    
    // Add click event listener
    toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Insert button into the page
    document.body.appendChild(toggleButton);
    
    // Update button state
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      const icon = toggleButton.querySelector('i');
      if (this.currentTheme === 'dark') {
        icon.className = 'bi bi-moon-stars-fill';
        toggleButton.setAttribute('title', 'Switch to light mode');
      } else {
        icon.className = 'bi bi-sun-fill';
        toggleButton.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  watchSystemTheme() {
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Public method to set specific theme
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.applyTheme(theme);
    }
  }
}

// Auto-detect system preference on first visit
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Set default theme based on system preference if no stored theme
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', getSystemTheme());
  }
  
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Remove old theme toggle from about section if it exists
  const oldToggle = document.getElementById('theme-toggle');
  if (oldToggle) {
    oldToggle.remove();
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}