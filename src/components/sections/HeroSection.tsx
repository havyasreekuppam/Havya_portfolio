import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, summary, stats } from '@/data/resumeData';
import Hero3D from '@/components/Hero3D';

/**
 * HeroSection Component
 * 
 * Immersive introduction with:
 * - 3D background interaction
 * - Staggered text reveals
 * - Scroll-driven parallax
 * - Cinematic entrance animation
 */

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms for depth
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f14]"
    >
      {/* 3D Background */}
      <Hero3D />

      {/* Gradient overlays for depth */}
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] pointer-events-none z-10" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f14] pointer-events-none z-10" />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-20 section-container text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Pre-title */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-mono text-primary/80 tracking-[0.3em] uppercase text-sm">
              AI & Web Developer
            </span>
          </motion.div>

          {/* Main name */}
          <motion.h1 variants={itemVariants} className="text-display mb-6">
            <span className="block text-foreground">{personalInfo.name.split(' ')[0]}</span>
            <span className="block text-primary glow-text">{personalInfo.name.split(' ')[1]}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-body max-w-2xl mx-auto mb-12">
            {summary.short}
          </motion.p>
          {/* CTA Buttons */}
<motion.div
  variants={itemVariants}
  className="flex flex-wrap justify-center gap-4 mt-8"
>
  {/* Resume */}
  <a
    href="/resume.pdf"
    download
    className="px-6 py-3 rounded-full bg-primary text-background font-medium hover:shadow-glow transition"
  >
    Download Resume
  </a>

  {/* LinkedIn */}
  <a
    href={personalInfo.social.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition"
  >
    LinkedIn
  </a>

  {/* Contact */}
  <a
    href="#contact"
    className="px-6 py-3 rounded-full border border-border text-foreground hover:border-primary transition"
  >
    Contact
  </a>
</motion.div>


          {/* Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {summary.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm text-text-secondary border border-border/50 rounded-full glass-subtle hover-glow transition-all duration-300"
                data-hoverable
              >
                {highlight}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                  <span className="text-lg text-primary/60">{stat.suffix}</span>
                </div>
                <div className="text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-text-muted uppercase tracking-wider">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
