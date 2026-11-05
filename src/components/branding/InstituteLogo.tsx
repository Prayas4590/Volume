import React from 'react';
import { motion } from 'motion/react';

export const InstituteLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative flex items-center select-none"
    >
      <img
        src="/assets/branding/ieee-cis.png"
        alt="IEEE CIS KLS GIT Presents"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] pointer-events-none"
      />
    </motion.div>
  );
};
