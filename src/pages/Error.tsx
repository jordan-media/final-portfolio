// src/pages/Error.tsx
import { Link } from "react-router-dom";

const Error = () => { // Type the functional component
  return (
    // Main container for the error page, styled with Tailwind
    // 'flex flex-col items-center justify-center' centers content vertically and horizontally
    // 'min-h-screen-minus-header-footer' ensures it fills the viewport (excluding header/footer)
    // 'bg-gray-50 text-gray-800 font-space-grotesk' for consistent styling
    // 'p-8 text-center' for padding and text alignment
    <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer bg-gray-50 text-gray-800 font-space-grotesk p-8 text-center">
      {/* Heading for the 404 error */}
      {/* 'text-5xl sm:text-6xl md:text-7xl font-extrabold text-red-600 mb-4' for prominent, red styling */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-red-600 mb-4">
        404 - Page Not Found
      </h1>

      {/* Descriptive paragraph */}
      {/* 'text-lg md:text-xl text-gray-700 mb-8' for clear, slightly softer text */}
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Sorry, the page you were looking for does not exist.
      </p>

      {/* Link back to home page */}
      {/* 'inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
          hover:bg-blue-700 transition-colors duration-300 no-underline
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' for a clear, clickable button */}
      <Link
        to='/'
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                   hover:bg-blue-700 transition-colors duration-300 no-underline
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default Error;