// src/components/FlipUnit.tsx
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface FlipUnitProps {
  value: string | number;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value }) => {
  return (
    <div className="w-16 h-20 bg-gray-900 text-white rounded-md overflow-hidden shadow-md text-4xl font-mono relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlipUnit;
