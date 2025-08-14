// ================================
// src/utils/pathConfig.ts
// Centralized configuration for path-specific customization
// ================================

export type PortfolioPath = 'developer' | 'ux' | 'creative' | null;

export interface PathConfig {
  // Typography classes
  typography: {
    heading: string;
    body: string;
    accent: string;
    code: string;
  };
  
  // Path-specific terminology
  terminology: {
    // Navigation & Headers
    projects: string;
    project: string;
    portfolio: string;
    
    // Roles & Actions
    role: string;
    viewAction: string;
    exploreAction: string;
    
    // Content Sections
    skillsTitle: string;
    processTitle: string;
    resultsTitle: string;
    challengesTitle: string;
    outcomeTitle: string;
    
    // Case Study Focus
    caseStudyType: string;
    focusAreas: string[];
  };
  
  // Visual styling
  colors: {
    primary: string;
    accent: string;
    gradient: string;
    highlight: string;
    secondary?: string;
  };
}

export const pathConfigs: Record<string, PathConfig> = {
  developer: {
    typography: {
      heading: 'font-mono font-semibold',
      body: 'font-mono text-sm leading-relaxed',
      accent: 'font-mono font-bold',
      code: 'font-mono bg-gray-100 px-2 py-1 rounded text-sm'
    },
    terminology: {
      projects: 'Solutions',
      project: 'Solution',
      portfolio: 'Code Portfolio',
      role: 'Tech Lead',
      viewAction: 'Examine Code',
      exploreAction: 'Dive Into',
      skillsTitle: 'Tech Stack',
      processTitle: 'Implementation',
      resultsTitle: 'Performance',
      challengesTitle: 'Technical Challenges',
      outcomeTitle: 'Deployment Results',
      caseStudyType: 'Technical Deep Dive',
      focusAreas: [
        'Architecture & Code Structure',
        'Performance Optimization',
        'Technical Problem Solving',
        'Development Workflow',
        'Testing & Deployment'
      ]
    },
    colors: {
      primary: 'text-gray-900',
      accent: 'text-blue-600',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      highlight: 'bg-blue-50 border-l-4 border-blue-500',
      secondary: 'text-gray-700'
    }
  },
  
  ux: {
    typography: {
      heading: 'font-sans font-medium',
      body: 'font-sans leading-relaxed',
      accent: 'font-sans font-semibold',
      code: 'font-sans bg-purple-50 px-2 py-1 rounded text-sm'
    },
    terminology: {
      projects: 'Case Studies',
      project: 'Case Study',
      portfolio: 'Design Portfolio',
      role: 'Design Lead',
      viewAction: 'Explore Process',
      exploreAction: 'Discover',
      skillsTitle: 'Design Tools',
      processTitle: 'Design Process',
      resultsTitle: 'User Impact',
      challengesTitle: 'Design Challenges',
      outcomeTitle: 'Design Results',
      caseStudyType: 'Design Process Study',
      focusAreas: [
        'User Research & Insights',
        'Design System Development',
        'Usability Testing',
        'Information Architecture',
        'Interaction Design'
      ]
    },
    colors: {
      primary: 'text-gray-900',
      accent: 'text-purple-600',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      highlight: 'bg-purple-50 border-l-4 border-purple-500',
      secondary: 'text-gray-600'
    }
  },
  
  creative: {
    typography: {
      heading: 'font-sans font-bold',
      body: 'font-sans leading-relaxed',
      accent: 'font-sans font-extrabold',
      code: 'font-sans bg-green-50 px-2 py-1 rounded text-sm'
    },
    terminology: {
      projects: 'Campaigns',
      project: 'Campaign',
      portfolio: 'Creative Portfolio',
      role: 'Creative Director',
      viewAction: 'See Story',
      exploreAction: 'Experience',
      skillsTitle: 'Creative Tools',
      processTitle: 'Creative Journey',
      resultsTitle: 'Creative Impact',
      challengesTitle: 'Creative Challenges',
      outcomeTitle: 'Creative Success',
      caseStudyType: 'Creative Story',
      focusAreas: [
        'Concept Development',
        'Visual Storytelling',
        'Brand Strategy',
        'Audience Engagement',
        'Creative Execution'
      ]
    },
    colors: {
      primary: 'text-gray-900',
      accent: 'text-green-600',
      gradient: 'bg-gradient-to-r from-green-400 to-cyan-500',
      highlight: 'bg-green-50 border-l-4 border-green-500',
      secondary: 'text-gray-700'
    }
  }
};

// Helper function to get current path config
export const getPathConfig = (path: PortfolioPath): PathConfig | null => {
  return path ? pathConfigs[path] : null;
};