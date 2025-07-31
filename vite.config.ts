// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the Tailwind CSS Vite plugin

export default defineConfig({
  plugins: [
    react(), // Keep your React plugin
    tailwindcss(), // Add the Tailwind CSS Vite plugin here, with no arguments
  ],
});