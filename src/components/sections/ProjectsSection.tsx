import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/resumeData';

/**
 * ProjectsSection Component
 * 
 * Interactive visual panels with:
 * - Hover-driven detail reveal
 * - Smooth transitions between projects
 * - Tech stack visualization
 * - Impact metrics
 */

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-mono text-primary/80 text-sm tracking-wider">02 — PROJECTS</span>
          <h2 className="text-headline mt-4">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-body max-w-xl mt-4">
            AI-powered solutions and data-driven platforms that solve real-world problems.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-hoverable
            >
              <div className={`
                relative p-8 md:p-10 rounded-2xl overflow-hidden
                border border-border/30 
                bg-gradient-to-br from-card/80 to-card/40
                transition-all duration-500 ease-out
                ${hoveredProject === project.id ? 'border-primary/30 shadow-glow' : ''}
              `}>
                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 grid md:grid-cols-[1fr,300px] gap-8">
                  {/* Content */}
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-mono text-xs text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-title mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-4">{project.subtitle}</p>

                    {/* Description */}
                    <p className="text-body mb-6">{project.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {project.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Impact */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-muted">Impact:</span>
                      <span className="text-primary">{project.impact}</span>
                    </div>
                  </div>

                  {/* Tech stack sidebar */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-mono text-xs text-text-muted mb-4 uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs text-text-secondary bg-secondary/50 rounded-md border border-border/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project number - decorative */}
                    <div className="hidden md:block text-right mt-8">
                      <span className="text-8xl font-bold text-border/30 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
