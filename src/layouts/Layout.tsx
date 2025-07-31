// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // Assuming Header will also be converted to TS/Tailwind
import NavigationGrid from "../sections/NavigationGrid"; // Assuming NavigationGrid will also be converted
import Footer from "../components/Footer"; // Assuming Footer will also be converted

// Explicitly type the functional component to return JSX.Element
export default function Layout() {
  return (
    // The main container for the entire layout.
    // 'min-h-screen' ensures it takes at least the full viewport height.
    // 'flex flex-col' makes it a flex container that stacks its children vertically.
    // 'bg-gray-50' for a subtle background, adjust as needed.
    // 'font-sans' (or 'font-serif', etc.) sets a default font if you have it configured in Tailwind.
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top bar (Header) */}
      {/* 'sticky top-0 z-50' for a sticky header */}
      {/* 'bg-white shadow-md' for a white background and subtle shadow */}
      {/* 'p-4' for padding, 'flex justify-between items-center' for horizontal alignment */}
      <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <Header />
        {/* All Clerk-related buttons and their container are now completely removed */}
      </header>

      {/* Main content area */}
      {/* 'flex-grow' ensures this div takes up all available vertical space between header and footer.
          'container mx-auto' to center content and give it a max-width.
          'p-4 md:p-6 lg:p-8' for responsive padding.
          'bg-white' for background, 'shadow-sm' for subtle shadow.
      */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-sm my-4 rounded-lg">
        <Outlet />
      </main>

      {/* NavigationGrid and Footer will render here, their styling will be handled in their own files */}
      <NavigationGrid />
      <Footer />
    </div>
  );
}