import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Option 2: Null check with error handling (more robust)
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Make sure you have <div id="root"></div> in your index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);