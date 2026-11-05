import React from 'react';
import { motion } from 'motion/react';

export const TopLeftPresents: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center select-none"
    >
      <img
        src="/assets/branding/ieee-cis.png"
        alt="IEEE CIS KLS GIT Presents"
        className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] pointer-events-none"
      />
    </motion.div>
  );
};
