// ColorBurstText.tsx
import { motion } from 'framer-motion';

const ColorBurstText = () => {
  const words = ['This', 'design', 'absolutely', 'explodes', 'with', 'style.'];
  const burstWords = ['explodes', 'style'];

  return (
    <p className="text-3xl md:text-4xl font-light text-gray-900 leading-relaxed flex flex-wrap gap-2">
      {words.map((word, idx) => {
        const isBurst = burstWords.includes(word);

        return (
          <motion.span
            key={idx}
            className={`relative inline-block px-2 ${
              isBurst
                ? 'font-bold text-white bg-gradient-to-r from-fuchsia-500 to-amber-400 rounded-md z-10'
                : ''
            }`}
            initial={isBurst ? { scale: 0.6, opacity: 0.3 } : {}}
            animate={isBurst ? { scale: 1.1, opacity: 1 } : {}}
            transition={{ delay: idx * 0.05, duration: 0.6, type: 'spring' }}
          >
            {isBurst && (
              <motion.span
                className="absolute -inset-1 blur-xl bg-gradient-to-r from-fuchsia-500 to-amber-400 opacity-70 rounded-md z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: idx * 0.05 }}
              />
            )}
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

export default ColorBurstText;
