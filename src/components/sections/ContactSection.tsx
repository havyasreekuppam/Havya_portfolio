import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '@/data/resumeData';

/**
 * ContactSection Component
 * 
 * Final elegant moment with:
 * - Clean contact information
 * - Social links
 * - Call-to-action
 * - Cinematic closing
 */

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="section-container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Section label */}
          <motion.div variants={itemVariants}>
            <span className="text-mono text-primary/80 text-sm tracking-wider">05 — CONNECT</span>
          </motion.div>

          {/* Main heading */}
          <motion.h2 variants={itemVariants} className="text-headline mt-6 mb-6">
            Let's Build Something
            <span className="block text-primary glow-text">Extraordinary</span>
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-body mb-12 max-w-xl mx-auto">
            Open to opportunities in AI development, full-stack engineering, and innovative tech projects.
            Let's create impactful solutions together.
          </motion.p>

          {/* Email CTA */}
          <motion.div variants={itemVariants} className="mb-12">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-500 hover:shadow-glow"
              data-magnetic
            >
              <span className="text-lg text-foreground group-hover:text-primary transition-colors">
                {personalInfo.email}
              </span>
              <motion.span
                whileHover={{ x: 5 }}
                className="text-primary"
              >
                →
              </motion.span>
            </a>
          </motion.div>

          {/* Contact info grid */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
              data-hoverable
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">{personalInfo.phone}</span>
            </a>

            {/* GitHub */}
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
              data-hoverable
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm">GitHub</span>
            </a>
            {/* LeetCode */}
<a
  href={personalInfo.social.leetcode}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
  data-hoverable
>
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-1.242-1.242a1.5 1.5 0 01-.443-1.06v-3.26a1.5 1.5 0 01.443-1.06l1.242-1.242a1.5 1.5 0 012.121 2.121l-.682.682v2.258l.682.682a1.5 1.5 0 11-2.121 2.121z"/>
    <path d="M7.898 6.07l1.242 1.242a1.5 1.5 0 01.443 1.06v3.26a1.5 1.5 0 01-.443 1.06L7.898 13.93a1.5 1.5 0 11-2.121-2.121l.682-.682V8.87l-.682-.682A1.5 1.5 0 017.898 6.07z"/>
  </svg>
  <span className="text-sm">LeetCode</span>
</a>


            {/* LinkedIn */}
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
              data-hoverable
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-sm">LinkedIn</span>
            </a>
          </motion.div>

          {/* Footer signature */}
          <motion.div variants={itemVariants} className="pt-12 border-t border-border/30">
            <p className="text-mono text-xs text-text-muted">
              Designed & Built by <span className="text-primary">{personalInfo.name}</span>
            </p>
            <p className="text-mono text-xs text-text-muted mt-2">
              © {new Date().getFullYear()} — All rights reserved
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
