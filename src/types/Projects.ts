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