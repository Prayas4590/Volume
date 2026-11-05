import React from 'react';
import { motion } from 'motion/react';

interface StageBackgroundProps {
  phase: string;
  isMatch: boolean | null;
}

export const StageBackground: React.FC<StageBackgroundProps> = ({ phase, isMatch }) => {
  const isJudging = phase === 'JUDGING' || phase === 'COUNTDOWN';
  const isCelebration = isMatch === true;
  const isFailure = isMatch === false;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dark theater base */}
      <div className="absolute inset-0 bg-[#07020d]" />

      {/* Theatrical Curtain Folds (SVG Gradients) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #15031b 0px,
            #320627 35px,
            #4a0a2f 65px,
            #700d33 90px,
            #2a0421 120px,
            #120215 150px
          )`,
          backgroundSize: '150px 100%',
        }}
      />

      {/* Deep Red / Purple Stage Wash */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isCelebration
            ? 'radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.4) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(5, 2, 10, 0.95) 100%)'
            : isFailure
            ? 'radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.5) 0%, rgba(88, 10, 28, 0.5) 50%, rgba(5, 2, 10, 0.95) 100%)'
            : isJudging
            ? 'radial-gradient(circle at 50% 25%, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 40%, rgba(4, 1, 8, 0.95) 100%)'
            : 'radial-gradient(circle at 50% 20%, rgba(185, 28, 28, 0.45) 0%, rgba(109, 14, 52, 0.4) 40%, rgba(6, 1, 10, 0.92) 100%)',
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Spotlight 1: Over Contestant (Left side) */}
      <motion.div
        className="absolute -top-20 left-[8%] w-[380px] h-[950px] origin-top opacity-55"
        animate={{
          rotate: [-3, 1, -3],
          opacity: isJudging ? 0.3 : 0.65,
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'conic-gradient(from 170deg at 50% 0%, rgba(255,255,255,0.3) 0deg, rgba(236,72,153,0.35) 18deg, transparent 38deg)',
          filter: 'blur(35px)',
        }}
      />

      {/* Spotlight 2: Over Judges Table (Right side) */}
      <motion.div
        className="absolute -top-24 right-[12%] w-[850px] h-[950px] origin-top opacity-60"
        animate={{
          rotate: [2, -2, 2],
          opacity: isJudging ? 0.85 : 0.5,
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'conic-gradient(from 185deg at 50% 0%, rgba(255,255,255,0.2) 0deg, rgba(168,85,247,0.35) 25deg, transparent 50deg)',
          filter: 'blur(45px)',
        }}
      />

      {/* Stage Floor Glow line */}
      <div className="absolute bottom-[80px] left-0 right-0 h-[280px] bg-gradient-to-t from-black via-[#1c0828]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-[90px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d946ef] to-transparent shadow-[0_0_25px_#ec4899] opacity-80" />

      {/* Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%]" />
    </div>
  );
};
