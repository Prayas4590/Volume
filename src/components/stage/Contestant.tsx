import React from 'react';
import { motion } from 'motion/react';

interface ContestantProps {
  isSpeaking: boolean;
  isCelebrating: boolean;
  isDisappointed: boolean;
}

export const Contestant: React.FC<ContestantProps> = ({
  isSpeaking,
  isCelebrating,
  isDisappointed,
}) => {
  const currentSprite = isCelebrating
    ? '/assets/contestant/contestant-celebrate.png'
    : isDisappointed
    ? '/assets/contestant/contestant-fail.png'
    : '/assets/contestant/contestant-silhouette.png';

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Contestant Silhouette Graphic Container */}
      <div className="relative w-[190px] h-[340px] sm:w-[230px] sm:h-[400px] md:w-[260px] md:h-[440px] flex items-end justify-center">
        {/* Glow Halo behind contestant */}
        <div
          className="absolute inset-0 -top-8 rounded-full pointer-events-none opacity-60"
          style={{
            background: isCelebrating
              ? 'radial-gradient(circle at 50% 40%, rgba(34, 197, 94, 0.45) 0%, transparent 70%)'
              : isDisappointed
              ? 'radial-gradient(circle at 50% 40%, rgba(239, 68, 68, 0.45) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.25) 0%, transparent 75%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Animated Contestant Sprite */}
        <motion.div
          animate={
            isCelebrating
              ? { y: [0, -14, 0], scale: [1, 1.03, 1] }
              : isDisappointed
              ? { y: [0, 6, 2], rotate: [0, 1.2, 0] }
              : isSpeaking
              ? { y: [0, -4, 0] }
              : { y: [0, -2, 0] }
          }
          transition={{
            duration: isCelebrating ? 0.6 : isDisappointed ? 1.2 : 3.5,
            repeat: isCelebrating ? Infinity : isDisappointed ? 1 : Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full flex items-end justify-center"
        >
          <img
            src={currentSprite}
            alt="Contestant Silhouette"
            className="h-full w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.45)]"
            style={{
              filter: isCelebrating
                ? 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.85))'
                : isDisappointed
                ? 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.75))'
                : 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 24px rgba(236,72,153,0.35))',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
