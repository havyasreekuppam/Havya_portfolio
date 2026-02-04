import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '@/data/resumeData';

/**
 * Navigation Component
 * 
 * Minimal, floating navigation with:
 * - Scroll-based visibility
 * - Active section tracking
 * - Smooth scroll to sections
 * - Glass morphism effect
 */

const navItems = [
  { id: 'about', label: '01' },
  { id: 'projects', label: '02' },
  { id: 'skills', label: '03' },
  { id: 'achievements', label: '04' },
  { id: 'contact', label: '05' },
];

const Navigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Track active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            data-magnetic
          >
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
            <span className="text-primary">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-4 py-2 text-mono text-xs tracking-wider transition-colors
                  ${activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-text-muted hover:text-foreground'
                  }
                `}
                data-hoverable
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="hidden md:block px-5 py-2 text-sm text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-all duration-300"
            data-magnetic
          >
            Contact
          </a>
        </div>
      </motion.header>

      {/* Side navigation dots (visible on scroll) */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative flex items-center gap-3"
                data-hoverable
              >
                {/* Label (shows on hover) */}
                <span className="absolute right-full mr-4 text-mono text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.id}
                </span>
                
                {/* Dot */}
                <span className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${activeSection === item.id
                    ? 'bg-primary shadow-glow-sm scale-150'
                    : 'bg-border group-hover:bg-primary/50'
                  }
                `} />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
