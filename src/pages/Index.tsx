import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Portfolio Index Page
 * 
 * A cinematic, scroll-driven narrative experience for Havya Sree
 * 
 * Architecture:
 * - CustomCursor: Physics-based, magnetic cursor system
 * - Navigation: Minimal floating nav with section tracking
 * - Sections: Each section is a "scene" in the narrative
 * 
 * All content is derived from resumeData.ts
 */

const Index: React.FC = () => {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f14] text-white noise-overlay">

      {/* Custom cursor - desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content - scroll-driven narrative */}
      <main>
        {/* Scene 1: Hero Introduction */}
        <HeroSection />

        {/* Scene 2: About & Education */}
        <AboutSection />

        {/* Scene 3: Featured Projects */}
        <ProjectsSection />

        {/* Scene 4: Technical Skills */}
        <SkillsSection />

        {/* Scene 5: Achievements */}
        <AchievementsSection />

        {/* Scene 6: Contact - Final Moment */}
        <ContactSection />
      </main>

      {/* Background ambient elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0b0f14] to-transparent" />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0f14] to-transparent" />
      </div>
    </div>
  );
};

export default Index;
