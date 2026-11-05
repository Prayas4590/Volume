import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JUDGES } from '../../data/judges';
import { JudgeCard } from './JudgeCard';

interface JudgePanelProps {
  judgeScores: number[];
  revealedCount: number;
  activeJudgeIndex: number | null;
  activeSpeech: { speaker: string; text: string } | null;
}

export const JudgePanel: React.FC<JudgePanelProps> = ({
  judgeScores,
  revealedCount,
  activeJudgeIndex,
  activeSpeech,
}) => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-[850px]">
      {/* Speech Caption Banner when Host or Judge speaks */}
      <div className="h-10 sm:h-12 w-full flex items-center justify-center mb-1">
        <AnimatePresence mode="wait">
          {activeSpeech && (
            <motion.div
              key={activeSpeech.text}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="px-4 py-1.5 rounded-full bg-black/85 border border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center gap-2 max-w-[90%] truncate text-center"
            >
              <span className="text-[10px] sm:text-xs font-black text-pink-400 uppercase tracking-widest shrink-0">
                {activeSpeech.speaker}:
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                "{activeSpeech.text}"
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Guard character behind desk on the left side (Using Cropped Sprite) */}
      <div className="absolute -top-16 sm:-top-20 -left-6 sm:-left-10 w-20 sm:w-24 md:w-28 h-36 sm:h-44 pointer-events-none z-0">
        <img
          src="/assets/contestant/security.png"
          alt="Security Guard"
          className="h-full w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] opacity-95 pointer-events-none select-none"
        />
      </div>

      {/* Five Judges Seated Row */}
      <div className="relative w-full flex items-end justify-between gap-1.5 sm:gap-2 md:gap-3 px-1 sm:px-3 z-10">
        {JUDGES.map((judge, idx) => (
          <JudgeCard
            key={judge.id}
            judge={judge}
            index={idx}
            score={judgeScores[idx]}
            isRevealed={idx < revealedCount}
            isActive={idx === activeJudgeIndex}
            isCentre={judge.id === 'samay'}
          />
        ))}
      </div>

      {/* Main Illuminated Judges' Desk (Integrated table front) */}
      <div className="relative w-full mt-[-10px] z-20">
        {/* Glowing Top Desk Lip (Trapezoidal Angle) */}
        <div className="h-3 sm:h-4 w-full bg-gradient-to-r from-purple-900 via-pink-600 to-purple-900 rounded-t-lg shadow-[0_0_20px_#ec4899] border-t border-pink-300 flex items-center justify-center">
          <div className="w-[85%] h-[2px] bg-white/70 shadow-[0_0_8px_#ffffff]" />
        </div>

        {/* Desk Front Apron with Animated Audio Waveform */}
        <div className="relative h-12 sm:h-16 w-full bg-gradient-to-b from-[#11051b] to-[#08020d] border-x border-b border-pink-500/60 rounded-b-xl shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(168,85,247,0.3)] overflow-hidden flex items-center justify-center px-4">
          {/* Audio Waveform Bars (Subtle & Dynamic) */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full h-8 opacity-70">
            {Array.from({ length: 44 }).map((_, barIdx) => {
              const baseHeight = Math.sin(barIdx * 0.4) * 40 + 50;
              return (
                <motion.div
                  key={barIdx}
                  animate={{
                    height: [
                      `${Math.max(15, baseHeight * 0.5)}%`,
                      `${Math.min(95, baseHeight * 1.2)}%`,
                      `${Math.max(15, baseHeight * 0.4)}%`,
                    ],
                  }}
                  transition={{
                    duration: 1.2 + (barIdx % 5) * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex-1 max-w-[5px] bg-gradient-to-t from-purple-600 via-pink-500 to-pink-300 rounded-full"
                />
              );
            })}
          </div>

          {/* Table Bottom Neon Trim */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent shadow-[0_0_10px_#ec4899]" />
        </div>
      </div>
    </div>
  );
};
