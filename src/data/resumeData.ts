/**
 * Resume-Driven Content Data
 * All portfolio content is derived from Havya Sree's resume
 * This ensures authentic, non-generic content throughout the experience
 */

export const personalInfo = {
  name: "Havya Sree",
  fullName: "Kuppam Havya Sree",
  title: "AI & Web Developer",
  tagline: "Building intelligent, data-driven systems",
  email: "havyasree123@gmail.com",
  phone: "+91-8247514424",
  social: {
    leetcode: "https://leetcode.com/u/Havya_Sree/",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};

export const summary = {
  short: "Aspiring AI and Web Developer with hands-on experience in Django, Machine Learning, and Data Visualization.",
  full: "Passionate about building intelligent, data-driven systems and integrating AI into real-world applications. Eager to contribute to innovative environments that foster continuous learning and impactful problem-solving.",
  highlights: [
   
  ],
};

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Information Science and Engineering (ISE)",
    institution: "RV Institute of Technology and Management",
    year: "2023 - Present",
    score: "9.07 CGPA",
    highlight: true,
  },
  {
    degree: "12th Board",
    field: "Telangana State Board of Intermediate Education",
    institution: "Pinegrove JR College, Hyderabad",
    year: "2021-23",
    score: "98.0%",
  },
  {
    degree: "10th Board",
    field: "Board of Secondary Education, AP",
    institution: "Sreevani EM High School, Tadipatri",
    year: "2021",
    score: "10.0 CGPA",
  },
];

export const projects = [
  {
    id: "competency-diagnostic",
    title: "Smart Competency Diagnostic",
    subtitle: "AI-Driven Candidate Profiling System",
    description: "Engineered an AI-driven system to analyze candidate competencies and calculate profile scores using job-specific skill weightage.",
    highlights: [
      "Integrated Django backend with REST APIs",
      "Implemented ML algorithms for competency mapping",
      "Interactive web interface with real-time evaluation",
      "Dynamic tracking of candidate evaluation status",
    ],
    impact: "Improved recruiter efficiency and user transparency",
    tech: ["Django", "REST APIs", "Machine Learning", "Python"],
    category: "AI/ML",
    featured: true,
  },
  {
    id: "ai-trip-planner",
    title: "AI Trip Planner",
    subtitle: "Personalized Travel Intelligence",
    description: "Developed an AI-powered travel planner generating personalized itineraries based on user preferences, time, and budget constraints.",
    highlights: [
      "Google Maps API for optimized routing",
      "OpenAI API for destination recommendations",
      "Real-time adaptive itinerary planning",
      "Live tracking and dynamic adjustments",
    ],
    impact: "Higher route accuracy and user satisfaction",
    tech: ["Python", "Google Maps API", "OpenAI API", "Real-time Processing"],
    category: "AI/ML",
    featured: true,
  },
  {
    id: "placement-analysis",
    title: "Student Placement Analysis",
    subtitle: "Data Visualization Platform",
    description: "Built a professional analytics platform combining Django and Tableau for visualizing student placement performance and insights.",
    highlights: [
      "Interactive Tableau dashboards",
      "Placement rates and recruiter analysis",
      "Cross-departmental performance insights",
      "Professional data reporting",
    ],
    impact: "Enhanced institutional data reporting accuracy",
    tech: ["Django", "Tableau", "Data Analytics", "Python"],
    category: "Data Viz",
    featured: true,
  },
];

export const skills = {
  languages: [
    { name: "Python", level: 95, category: "primary" },
    { name: "Java", level: 85, category: "primary" },
    { name: "Advanced Java", level: 80, category: "primary" },
    { name: "C", level: 75, category: "secondary" },
  ],
  frameworks: [
    { name: "Django", level: 90, category: "primary" },
    { name: "Web Development", level: 85, category: "primary" },
    { name: "Java Collections", level: 80, category: "secondary" },
    { name: "JDBC", level: 75, category: "secondary" },
  ],
  tools: [
    { name: "MATLAB", level: 80, category: "primary" },
    { name: "Blender", level: 70, category: "creative" },
    { name: "Framer", level: 75, category: "creative" },
    { name: "Tableau", level: 85, category: "primary" },
  ],
  domains: [
    { name: "Machine Learning", level: 85 },
    { name: "Data Visualization", level: 90 },
    { name: "REST APIs", level: 85 },
    { name: "AI Integration", level: 80 },
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Object-Oriented Programming",
    "DBMS",
  ],
  soft: [
    "Problem Solving",
    "Self-Learning",
    "Teamwork",
    "Adaptability",
    "Ownership Mindset",
  ],
};

export const achievements = [
  {
    title: "Smart India Hackathon 2024 Finalist",
    description: "Led the team to successful completion at the national level",
    type: "competition",
    highlight: true,
  },
  {
    title: "PowerPoint with AI Certificate",
    description: "Obtained certification from Skill Nation",
    type: "certification",
  },
];

export const stats = [
  { value: "9.12", label: "CGPA", suffix: "" },
  { value: "3", label: "Major Projects", suffix: "+" },
  { value: "98", label: "12th Score", suffix: "%" },
  { value: "10", label: "10th CGPA", suffix: "" },
];
