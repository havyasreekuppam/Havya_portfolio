import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CustomCursor Component
 * 
 * A physics-based, expressive cursor system that feels alive:
 * - Magnetic attraction to interactive elements
 * - Soft trailing motion with spring physics
 * - Shape morphing on hover states
 * - Ripple/shockwave feedback on click
 * - Organic, fluid movement
 */

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  hoverScale: number;
  magneticTarget: { x: number; y: number } | null;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    hoverScale: 1,
    magneticTarget: null,
  });

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics for trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  // Outer ring with more lag
  const outerSpringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const outerX = useSpring(cursorX, outerSpringConfig);
  const outerY = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      let isMagnetic = false;
      let magnetX = clientX;
      let magnetY = clientY;

      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
        );

        // Magnetic attraction radius
        const attractRadius = 100;
        if (distance < attractRadius) {
          isMagnetic = true;
          // Pull cursor toward element center with easing
          const pull = 1 - distance / attractRadius;
          magnetX = clientX + (centerX - clientX) * pull * 0.4;
          magnetY = clientY + (centerY - clientY) * pull * 0.4;
        }
      });

      cursorX.set(magnetX);
      cursorY.set(magnetY);

      // Check for hoverable elements
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.closest('a, button, [data-hoverable], [data-magnetic]') !== null;
      
      setState(prev => ({
        ...prev,
        isHovering: isHoverable,
        hoverScale: isHoverable ? 1.5 : 1,
      }));
    };

    const handleMouseDown = (e: MouseEvent) => {
      setState(prev => ({ ...prev, isClicking: true }));
      
      // Create ripple effect
      if (rippleRef.current) {
        const ripple = rippleRef.current;
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.classList.remove('animate-ripple');
        // Trigger reflow
        void ripple.offsetWidth;
        ripple.classList.add('animate-ripple');
      }
    };

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseLeave = () => {
      setState(prev => ({ ...prev, isHovering: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
      
      @keyframes ripple-expand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
      
      .animate-ripple {
        animation: ripple-expand 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: state.isClicking ? 0.8 : state.hoverScale,
            opacity: state.isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Inner core */}
          <div 
            className="w-3 h-3 rounded-full bg-primary"
            style={{
              boxShadow: state.isHovering 
                ? '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)' 
                : '0 0 10px hsl(var(--primary) / 0.5)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: state.isHovering ? 1.8 : 1,
            opacity: state.isHovering ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-8 h-8 rounded-full border border-primary/50"
          style={{
            boxShadow: state.isHovering 
              ? '0 0 15px hsl(var(--primary) / 0.3)' 
              : 'none',
          }}
        />
      </motion.div>

      {/* Outer magnetic ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: state.isHovering ? 2.5 : 1.2,
            opacity: state.isHovering ? 0.3 : 0.1,
            rotate: state.isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-12 rounded-full border border-primary/20"
        />
      </motion.div>

      {/* Click ripple effect */}
      <div
        ref={rippleRef}
        className="fixed pointer-events-none z-[9996] w-24 h-24 rounded-full border-2 border-primary/40"
        style={{
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
