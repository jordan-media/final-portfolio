// src/contexts/PathContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

type PortfolioPath = 'developer' | 'ux' | 'creative';
type MaybePath = PortfolioPath | null;

interface PathCtx {
  selectedPath: MaybePath;
  showModal: boolean;
  initialized: boolean;
  handlePathSelection: (p: PortfolioPath) => void;
  showPathModal: () => void;
  hideModal: () => void;
}

const PathContext = createContext<PathCtx | undefined>(undefined);

const STORAGE_KEY = 'portfolio:selectedPath';
const VISITED_KEY = 'portfolio:hasVisited';

export const PathProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPath, setSelectedPath] = useState<MaybePath>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize on mount - only show modal on true first visit
  useEffect(() => {
    try {
      const storedPath = localStorage.getItem(STORAGE_KEY) as MaybePath;
      const hasVisited = localStorage.getItem(VISITED_KEY) === 'true';

      // Set path if valid
      if (storedPath === 'developer' || storedPath === 'ux' || storedPath === 'creative') {
        setSelectedPath(storedPath);
      }

      // Only show modal if user has NEVER visited before AND no path is set
      if (!hasVisited && !storedPath) {
        setShowModal(true);
        // Mark as visited immediately to prevent future auto-opens
        localStorage.setItem(VISITED_KEY, 'true');
      }

      setInitialized(true);
    } catch (error) {
      console.error('Error initializing PathContext:', error);
      // Even on error, mark as visited to prevent modal loops
      try {
        localStorage.setItem(VISITED_KEY, 'true');
      } catch {}
      setInitialized(true);
    }
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const newPath = e.newValue as MaybePath;
        if (newPath === 'developer' || newPath === 'ux' || newPath === 'creative') {
          setSelectedPath(newPath);
        } else if (newPath === null) {
          setSelectedPath(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handlePathSelection = useCallback((path: PortfolioPath) => {
    try {
      setSelectedPath(path);
      localStorage.setItem(STORAGE_KEY, path);
      localStorage.setItem(VISITED_KEY, 'true'); // Ensure visited flag is set
      setShowModal(false);
    } catch (error) {
      console.error('Error saving path selection:', error);
      // Still update state even if localStorage fails
      setSelectedPath(path);
      setShowModal(false);
    }
  }, []);

  // This function can be called from anywhere (header button, etc.)
  const showPathModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const value = useMemo<PathCtx>(
    () => ({
      selectedPath,
      showModal,
      initialized,
      handlePathSelection,
      showPathModal,
      hideModal,
    }),
    [selectedPath, showModal, initialized, handlePathSelection, showPathModal, hideModal]
  );

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export const usePath = (): PathCtx => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('usePath must be used within a PathProvider');
  }
  return context;
};