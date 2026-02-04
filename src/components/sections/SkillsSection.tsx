import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillsData = [
  {
    title: "Languages",
    items: ["Java", "Python", "C", "JavaScript"],
  },
  {
    title: "Machine Learning & AI",
    items: ["Scikit-learn", "TensorFlow", "OpenCV", "MediaPipe", "NLP"],
  },
  {
    title: "Database & Cloud",
    items: ["MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "Web Development",
    items: ["Django","HTML", "CSS", "React", "Tailwind CSS", "SprinBoot", "Flask"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "GitHub"],
  },
  {
    title: "Computer Science Fundamentals",
    items: ["DSA (Java)", "Computer Networks", "Operating Systems", "OOPS", "DBMS"],
  },

];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-mono text-primary/80 text-sm tracking-wider">
            03 — SKILLS
          </span>
          <h2 className="text-headline mt-4">
            My <span className="text-primary">Skills</span>
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl border border-primary/30 bg-black/40 backdrop-blur hover-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm border border-primary/40 hover:bg-primary/10 transition"
                    data-hoverable
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
