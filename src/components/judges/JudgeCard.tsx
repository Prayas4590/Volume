import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Judge } from '../../types/game';

interface JudgeCardProps {
  judge: Judge;
  index: number;
  score: number;
  isRevealed: boolean;
  isActive: boolean;
  isCentre?: boolean;
}

const JUDGE_SPRITES: Record<string, string> = {
  tanmay: '/assets/judges/tanmay.png',
  ashish: '/assets/judges/ashish.png',
  samay: '/assets/judges/samay.png',
  carry: '/assets/judges/carry.png',
  zakir: '/assets/judges/zakir.png',
};

export const JudgeCard: React.FC<JudgeCardProps> = ({
  judge,
  index,
  score,
  isRevealed,
  isActive,
  isCentre = false,
}) => {
  // Animated score counter from 0.0 to score
  const [displayScore, setDisplayScore] = useState(0.0);

  useEffect(() => {
    if (!isRevealed) {
      setDisplayScore(0.0);
      return;
    }

    let start = 0.0;
    const end = score;
    const duration = 600; // ms
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      start += increment;
      if (currentStep >= totalSteps) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.min(end, Math.round(start * 10) / 10));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isRevealed, score]);

  const spriteSrc = JUDGE_SPRITES[judge.id] || '/assets/judges/samay.png';

  return (
    <div className="relative flex flex-col items-center flex-1 min-w-[105px] sm:min-w-[125px] md:min-w-[145px] max-w-[185px]">
      {/* Active Spotlight beam from above for this judge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-16 inset-x-0 h-44 pointer-events-none z-30"
            style={{
              background:
                'conic-gradient(from 180deg at 50% 0%, rgba(250,204,21,0.4) 0deg, rgba(236,72,153,0.35) 20deg, transparent 45deg)',
              filter: 'blur(16px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Gold Doodle Crown over Samay Raina (Centre Judge) */}
      {isCentre && (
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <img
            src="/assets/decorations/crown.png"
            alt="Gold Crown"
            className="w-8 h-6 sm:w-10 sm:h-7 object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
          />
        </motion.div>
      )}

      {/* Character Sprite Image from the Reference Artwork */}
      <motion.div
        animate={
          isActive
            ? { y: [0, -6, 0], scale: [1, 1.05, 1] }
            : { y: [0, -2, 0] }
        }
        transition={{
          duration: isActive ? 0.8 : 3.5 + index * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-[120px] sm:h-[145px] md:h-[165px] flex items-end justify-center z-10 overflow-visible"
      >
        <img
          src={spriteSrc}
          alt={judge.name}
          className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] pointer-events-none select-none"
        />

        {/* Ambient rim glow on active */}
        {isActive && (
          <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-xl pointer-events-none" />
        )}
      </motion.div>

      {/* JUDGE SCORE CARD — DIRECTLY BELOW NAME */}
      <motion.div
        animate={
          isActive
            ? {
                borderColor: '#facc15',
                boxShadow: '0 0 20px rgba(250, 204, 21, 0.8), inset 0 0 10px rgba(236,72,153,0.3)',
                scale: 1.03,
              }
            : isRevealed
            ? {
                borderColor: '#ec4899',
                boxShadow: '0 0 14px rgba(236, 72, 153, 0.5)',
                scale: 1,
              }
            : {
                borderColor: 'rgba(168, 85, 247, 0.5)',
                boxShadow: 'none',
                scale: 1,
              }
        }
        transition={{ duration: 0.3 }}
        className="w-full bg-[#0c0211]/95 backdrop-blur-md rounded-xl sm:rounded-2xl border-2 px-1.5 py-2 sm:px-2.5 sm:py-2.5 flex flex-col items-center justify-center text-center select-none z-20 transition-colors"
      >
        {/* Judge Name Displayed Prominently */}
        <span
          className="text-white text-[10px] sm:text-xs md:text-sm font-black tracking-wider uppercase leading-tight line-clamp-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {judge.name}
        </span>

        {/* Score Displayed IMMEDIATELY Below Name */}
        <div className="mt-1 flex items-baseline justify-center gap-0.5">
          <span
            className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tight ${
              isRevealed
                ? 'text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]'
                : 'text-zinc-600'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {isRevealed ? displayScore.toFixed(1) : '?.-'}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-zinc-400">
            / 10
          </span>
        </div>
      </motion.div>
    </div>
  );
};
