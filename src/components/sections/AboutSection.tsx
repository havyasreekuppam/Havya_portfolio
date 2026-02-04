import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { summary, education } from '@/data/resumeData';

/**
 * AboutSection Component
 * 
 * Personal introduction with:
 * - Scroll-triggered reveal animations
 * - Education timeline
 * - Key strengths visualization
 */

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Left: Story */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-mono text-primary/80 text-sm tracking-wider">01 — ABOUT</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-headline mb-8">
              Crafting Intelligent
              <span className="block text-primary">Digital Experiences</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-body mb-6">
              {summary.full}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              {['AI Integration', 'Data-Driven Systems', 'Real-World Impact'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-px bg-primary" />
                  <span className="text-text-secondary">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Education Timeline */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-mono text-primary/80 text-sm tracking-wider">EDUCATION</span>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative pl-8 pb-6 border-l ${
                    index === education.length - 1 ? 'border-transparent' : 'border-border/50'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2 ${
                    edu.highlight 
                      ? 'bg-primary shadow-glow-sm' 
                      : 'bg-border'
                  }`} />

                  <div className={`p-5 rounded-lg transition-all duration-300 ${
                    edu.highlight 
                      ? 'glass gradient-border' 
                      : 'bg-card/30'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <span className="text-mono text-xs text-primary">{edu.score}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{edu.field}</p>
                    <p className="text-xs text-text-muted">{edu.institution}</p>
                    <span className="text-xs text-text-muted mt-2 block">{edu.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
