/**
 * Modern Effects and Enhanced Interactions
 * Enhanced portfolio website with 3D effects, particles, and modern animations
 */

(function() {
  "use strict";

  // Initialize all modern effects when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initParticleEffect();
    init3DEffects();
    initSmoothAnimations();
    initEnhancedScrollEffects();
    initModernIcons();
    initParallaxEffects();
    initLoadingAnimations();
  });

  /**
   * Particle Effect for Hero Section
   */
  function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    // Generate particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer, i);
    }
  }

  function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and timing
    const delay = Math.random() * 6;
    const duration = 6 + Math.random() * 4;
    const left = Math.random() * 100;
    
    particle.style.cssText = `
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
  }

  /**
   * 3D Effects and Transformations
   */
  function init3DEffects() {
    // Add 3D perspective to body
    document.body.style.perspective = '1000px';
    
    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.stats-item, .service-item, .portfolio-content, .info-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateZ(20px) scale(1.05) rotateX(2deg) rotateY(2deg)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
      });
      
      element.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)';
        this.style.boxShadow = '';
      });
      
      // Add subtle 3D movement on mouse move
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateZ(10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
  }

  /**
   * Smooth Animations and Transitions
   */
  function initSmoothAnimations() {
    // Enhanced scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateZ(0)';
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stats-item, .service-item, .portfolio-content, .info-item, .progress');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) translateZ(0)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    // Enhanced typing animation
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
      const words = typedElement.getAttribute('data-typed-items').split(',');
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      
      function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
          typedElement.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typedElement.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
          typeSpeed = 2000; // Pause at end
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
      }
      
      typeWriter();
    }
  }

  /**
   * Enhanced Scroll Effects
   */
  function initEnhancedScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero, .header');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) translateZ(0)`;
      });
      
      // Update scroll progress indicator
      const scrollProgress = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      updateScrollProgress(scrollProgress);
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Create scroll progress indicator
    createScrollProgressIndicator();
  }

  function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
  }

  function updateScrollProgress(progress) {
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  /**
   * Modern Icons with Enhanced Effects
   */
  function initModernIcons() {
    // Enhanced social media icons
    const socialIcons = document.querySelectorAll('.social-links a i');
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(360deg) scale(1.3)';
        this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) scale(1)';
      });
    });

    // Enhanced navigation icons
    const navIcons = document.querySelectorAll('.navicon');
    navIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(180deg) scale(1.2)';
        this.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) scale(1)';
      });
    });

    // Enhanced stats icons with pulse effect
    const statsIcons = document.querySelectorAll('.stats-item i');
    statsIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s infinite';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.animation = '';
      });
    });
  }

  /**
   * Parallax Effects
   */
  function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.dataset.speed = '0.3';
    
    // Add floating elements to hero
    const floatingElements = [
      { icon: '💻', delay: 0, duration: 3 },
      { icon: '🎨', delay: 1, duration: 4 },
      { icon: '🚀', delay: 2, duration: 3.5 },
      { icon: '⚡', delay: 0.5, duration: 4.5 }
    ];
    
    floatingElements.forEach((element, index) => {
      createFloatingElement(hero, element, index);
    });
  }

  function createFloatingElement(container, element, index) {
    const floatingDiv = document.createElement('div');
    floatingDiv.innerHTML = element.icon;
    floatingDiv.style.cssText = `
      position: absolute;
      font-size: 2rem;
      opacity: 0.3;
      animation: float ${element.duration}s ease-in-out infinite;
      animation-delay: ${element.delay}s;
      z-index: 1;
    `;
    
    // Position elements around the hero
    const positions = [
      { top: '20%', left: '10%' },
      { top: '30%', right: '15%' },
      { bottom: '25%', left: '20%' },
      { bottom: '35%', right: '10%' }
    ];
    
    Object.assign(floatingDiv.style, positions[index]);
    container.appendChild(floatingDiv);
  }

  /**
   * Loading Animations
   */
  function initLoadingAnimations() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', function() {
        this.style.animation = 'fadeInScale 0.6s ease-out';
      });
    });

    // Add staggered loading animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px) translateZ(0)';
      
      setTimeout(() => {
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0) translateZ(0)';
      }, index * 200);
    });
  }

  /**
   * Enhanced Counter Animation
   */
  function initEnhancedCounters() {
    const counters = document.querySelectorAll('.purecounter');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-purecounter-end'));
          const duration = parseInt(counter.getAttribute('data-purecounter-duration')) || 2000;
          const increment = target / (duration / 16); // 60fps
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  /**
   * Enhanced Form Interactions
   */
  function initEnhancedForms() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      // Add floating label effect
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        input.addEventListener('focus', function() {
          label.classList.add('floating');
        });
        
        input.addEventListener('blur', function() {
          if (!this.value) {
            label.classList.remove('floating');
          }
        });
      }
      
      // Add character counter for textarea
      if (input.tagName === 'TEXTAREA') {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
          font-size: 0.8rem;
          color: #666;
          text-align: right;
          margin-top: 0.5rem;
        `;
        input.parentNode.appendChild(counter);
        
        input.addEventListener('input', function() {
          const remaining = this.maxLength - this.value.length;
          counter.textContent = `${remaining} characters remaining`;
        });
      }
    });
  }

  /**
   * Enhanced Theme Toggle
   */
  function initEnhancedThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  /**
   * Enhanced Mobile Navigation
   */
  function initEnhancedMobileNav() {
    const mobileToggle = document.querySelector('.header-toggle');
    const header = document.querySelector('#header');
    
    if (mobileToggle && header) {
      mobileToggle.addEventListener('click', function() {
        // Add slide animation
        header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (header.classList.contains('header-show')) {
          header.style.transform = 'translateX(-100%) translateZ(0)';
        } else {
          header.style.transform = 'translateX(0) translateZ(0)';
        }
      });
    }
  }

  // Initialize all enhanced features
  document.addEventListener('DOMContentLoaded', function() {
    initEnhancedCounters();
    initEnhancedForms();
    initEnhancedThemeToggle();
    initEnhancedMobileNav();
  });

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8) translateZ(0);
      }
      to {
        opacity: 1;
        transform: scale(1) translateZ(0);
      }
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateZ(0); }
      50% { transform: translateY(-20px) translateZ(0); }
    }
    
    .floating {
      transform: translateY(-20px) scale(0.8) translateZ(0);
      color: var(--accent-color);
    }
  `;
  document.head.appendChild(style);

})();