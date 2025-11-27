"use client";

import { useEffect } from 'react';

// Atomic Health-style smooth scroll configuration
const SMOOTH_SCROLL_CONFIG = {
  duration: 800,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // easeOutQuad
  offset: 80 // Account for fixed header
};

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enhanced smooth scrolling like Atomic Health
    function smoothScrollTo(targetY: number, duration: number = SMOOTH_SCROLL_CONFIG.duration) {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      const startTime = performance.now();

      function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic bezier easing function
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      
      requestAnimationFrame(step);
    }

    // Handle anchor link clicks
    function handleAnchorClick(e: Event) {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const targetY = elementTop - SMOOTH_SCROLL_CONFIG.offset;
          smoothScrollTo(targetY);
          
          // Update URL without causing a jump
          history.pushState(null, '', href);
        }
      }
    }

    // Handle category navigation and other smooth scrolls
    function handleSmoothScroll(e: Event) {
      const target = e.target as HTMLElement;
      
      // Check for data-smooth-scroll attribute
      const scrollTarget = target.getAttribute('data-smooth-scroll');
      if (scrollTarget) {
        e.preventDefault();
        const element = document.querySelector(scrollTarget);
        
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const targetY = elementTop - SMOOTH_SCROLL_CONFIG.offset;
          smoothScrollTo(targetY);
        }
      }
    }

    // Add event listeners
    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('click', handleSmoothScroll);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}