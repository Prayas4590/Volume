import React from 'react';
import { motion } from 'motion/react';

export const ShowLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex flex-col items-center select-none"
    >
      {/* Yellow Comic Action Rays (Left & Right) */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none opacity-80">
        <div className="w-4 h-1 bg-yellow-400 -rotate-25 rounded-full shadow-[0_0_8px_#facc15]" />
        <div className="w-6 h-1 bg-yellow-400 rotate-0 rounded-full shadow-[0_0_8px_#facc15]" />
        <div className="w-4 h-1 bg-yellow-400 rotate-25 rounded-full shadow-[0_0_8px_#facc15]" />
      </div>
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none opacity-80">
        <div className="w-4 h-1 bg-yellow-400 rotate-25 rounded-full shadow-[0_0_8px_#facc15]" />
        <div className="w-6 h-1 bg-yellow-400 rotate-0 rounded-full shadow-[0_0_8px_#facc15]" />
        <div className="w-4 h-1 bg-yellow-400 -rotate-25 rounded-full shadow-[0_0_8px_#facc15]" />
      </div>

      {/* Main Logo Sprite from Reference Image */}
      <motion.div
        animate={{ y: [0, -3, 0], scale: [1, 1.015, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-16 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]"
      >
        <img
          src="/assets/branding/cis-got-latent.png"
          alt="CIS GOT LATENT Logo"
          className="h-full w-auto object-contain select-none pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};
