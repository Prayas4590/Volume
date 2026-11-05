import React from 'react';
import { motion } from 'motion/react';

interface AudienceProps {
  isCheering: boolean;
  isLaughing: boolean;
}

export const Audience: React.FC<AudienceProps> = ({ isCheering, isLaughing }) => {
  return (
    <div className="absolute -bottom-1 inset-x-0 h-28 sm:h-36 md:h-44 pointer-events-none select-none z-30 overflow-hidden flex items-end justify-center">
      <motion.div
        animate={
          isCheering
            ? { y: [0, -14, 0], scale: [1, 1.02, 1] }
            : isLaughing
            ? { rotate: [-0.8, 0.8, -0.8], y: [0, -4, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          duration: isCheering ? 0.45 : isLaughing ? 0.7 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full flex items-end justify-center"
      >
        <img
          src="/assets/stage/audience.png"
          alt="Audience Silhouettes"
          className="w-full h-full object-cover sm:object-contain object-bottom select-none pointer-events-none drop-shadow-[0_-5px_15px_rgba(0,0,0,0.8)]"
        />
      </motion.div>
    </div>
  );
};
