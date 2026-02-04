import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '@/data/resumeData';

/**
 * AchievementsSection Component
 * 
 * Showcases certifications and awards with:
 * - Animated card reveals
 * - Visual hierarchy based on importance
 * - Icon indicators for achievement types
 */

const typeIcons: Record<string, React.ReactNode> = {
  competition: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  leadership: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  certification: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
};

const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-mono text-primary/80 text-sm tracking-wider">04 — ACHIEVEMENTS</span>
          <h2 className="text-headline mt-4">
            Recognition & <span className="text-primary">Milestones</span>
          </h2>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                relative p-6 rounded-xl overflow-hidden
                border transition-all duration-500
                ${achievement.highlight
                  ? 'border-primary/30 bg-gradient-to-br from-card to-primary/5 shadow-glow'
                  : 'border-border/30 bg-card/50 hover:border-primary/20'
                }
              `}
              data-hoverable
            >
              {/* Highlight glow */}
              {achievement.highlight && (
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              )}

              <div className="relative">
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${achievement.highlight
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-text-secondary'
                  }
                `}>
                  {typeIcons[achievement.type]}
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold mb-2 ${
                  achievement.highlight ? 'text-primary' : 'text-foreground'
                }`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {achievement.description}
                </p>

                {/* Type badge */}
                <div className="mt-4">
                  <span className="text-mono text-xs text-text-muted uppercase tracking-wider">
                    {achievement.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
