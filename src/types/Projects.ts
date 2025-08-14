// src/types/Project.ts
export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string; // Optional property
}

export interface ProjectChallenge {
  description: string;
  solution: string;
}

export interface Project {
  id: string;
  name: string;
  isFeatured: boolean;
  shortDescription: string;
  longDescription: string;
  
  // NEW: Path-specific descriptions
  descriptions?: {
    developer?: string;
    ux?: string;
    creative?: string;
  };
  
  images: ProjectImage[];
  technologiesUsed: string[];
  toolsUsed: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  caseStudyUrl: string | null;
  rolePlayed: string;
  challenges: ProjectChallenge[];
  outcome: string;
}

// Portfolio path type for the modal system
export type PortfolioPath = 'developer' | 'ux' | 'creative' | null;