// types/reference.ts

export interface Reference {
  id: number;
  name: string;
  title: string;
  statement: string;
  photo_url: string;
  rating: number;
  company?: string;
}

export interface ReferenceCarouselProps {
  references: Reference[];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
  className?: string;
  children: React.ReactNode;
}