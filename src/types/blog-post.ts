// src/types/blog-post.ts

// Define a union type for common blog themes.
// This makes your 'theme' property more type-safe by restricting it to a predefined set of strings.
// You can add or remove themes from this list as needed.
export type BlogTheme = 
  'Technology' | 
  'Productivity' | 
  'Personal Development' | 
  'Creative Arts' | 
  'Tutorials' | 
  'Reviews' | 
  'General' |
  'Thoughts'; // Added 'Thoughts' as an example for personal blogs

export interface BlogPost {
  id: string;
  title: string;
  image: string;       // URL to the main image for the blog post
  snippet: string;     // A short preview (summary) of the blog post
  tldr: string;        // "Too Long; Didn't Read" summary of the post
  fullContent: string; // The complete, detailed content of the blog post
  theme: BlogTheme;    // Using the more specific 'BlogTheme' union type
  date: string;        // Stored as an ISO 8601 string (e.g., "YYYY-MM-DD") for consistent parsing.
                       // You'll typically convert this string to a JavaScript Date object when needed in your components.
  
  // These properties are calculated dynamically after fetching the data.
  // The '?' denotes that they are optional when the data is initially fetched from JSON.
  wordCount?: number;
  readTime?: number;
}

// Interface for the result of a read time calculation helper function.
// This clearly defines the structure of data returned by such a function.
export interface ReadTimeResult {
  wordCount: number;
  readTime: number;
}