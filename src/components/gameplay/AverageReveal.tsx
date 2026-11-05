import React from 'react';
import { motion } from 'motion/react';

interface AverageRevealProps {
  average: number;
}

export const AverageReveal: React.FC<AverageRevealProps> = ({ average }) => {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 20 }}
      animate={{ scale: [0.7, 1.08, 1], opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none flex flex-col items-center"
    >
      <div className="relative px-6 py-4 rounded-3xl bg-black/90 border-4 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.9),inset_0_0_25px_rgba(236,72,153,0.4)] flex flex-col items-center">
        {/* Glow pulsing ring */}
        <div className="absolute inset-0 rounded-3xl bg-yellow-400/20 animate-pulse pointer-events-none" />

        <div className="relative flex items-center justify-center gap-3">
          <img
            src="/assets/ui/average-banner.png"
            alt="Judges Average"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
          />
          <span
            className="text-4xl sm:text-6xl font-black text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,1)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {average.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
