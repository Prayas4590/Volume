import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface ResultOverlayProps {
  isMatch: boolean;
  guess: number;
  average: number;
  onNext: () => void;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({
  isMatch,
  guess,
  average,
  onNext,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto select-none"
    >
      <div
        className={`relative max-w-md w-full rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] border-4 ${
          isMatch
            ? 'bg-gradient-to-b from-[#062413] via-[#0b1710] to-[#030a06] border-emerald-400 shadow-[0_0_40px_rgba(34,197,94,0.6)]'
            : 'bg-gradient-to-b from-[#2a0812] via-[#1a050c] to-[#0a0205] border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]'
        }`}
      >
        {/* Glow Halo */}
        <div
          className={`absolute -top-12 w-32 h-32 rounded-full pointer-events-none blur-3xl opacity-70 ${
            isMatch ? 'bg-emerald-400' : 'bg-red-500'
          }`}
        />

        {/* Confetti decoration on match */}
        {isMatch && (
          <div className="absolute -top-16 inset-x-0 flex justify-center pointer-events-none">
            <img
              src="/assets/decorations/confetti.png"
              alt="Confetti"
              className="w-48 sm:w-64 h-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-bounce"
            />
          </div>
        )}

        {/* Extracted Graphic Badge */}
        <div className="flex items-center justify-center mb-3">
          <img
            src={isMatch ? '/assets/ui/success.png' : '/assets/ui/failure.png'}
            alt={isMatch ? 'You Got It Right!' : 'Wrong Answer!'}
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Tagline */}
        <p className="text-zinc-300 text-xs sm:text-sm font-semibold mt-1">
          {isMatch
            ? 'THE JUDGES AGREE WITH YOU!'
            : 'Judges ka average kuch aur hi tha! Unlimited embarrassment.'}
        </p>

        {/* Score Comparison Display */}
        <div className="w-full my-5 bg-black/70 rounded-2xl border border-zinc-700/80 p-4 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest">
              YOUR GUESS
            </span>
            <span
              className="text-2xl sm:text-3xl font-black text-white mt-0.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {guess.toFixed(1)}
            </span>
          </div>

          <div className="h-10 w-[1px] bg-zinc-700" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-bold text-yellow-400 uppercase tracking-widest">
              JUDGES' AVERAGE
            </span>
            <span
              className="text-2xl sm:text-3xl font-black text-yellow-400 mt-0.5 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Volume Notification */}
        {isMatch ? (
          <div className="w-full bg-emerald-950/60 border border-emerald-500/60 rounded-xl py-2 px-3 mb-5">
            <span className="text-xs sm:text-sm font-bold text-emerald-300">
              VOLUME UPDATED: <span className="text-yellow-300 font-extrabold">{average.toFixed(1)} / 10</span>
            </span>
          </div>
        ) : (
          <div className="w-full bg-red-950/40 border border-red-600/40 rounded-xl py-1.5 px-3 mb-5">
            <span className="text-xs font-medium text-zinc-400">
              Volume remains unchanged at current level.
            </span>
          </div>
        )}

        {/* Continue / Next Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className={`w-full py-3 px-6 rounded-2xl font-black text-lg tracking-wider uppercase border-2 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${
            isMatch
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black border-emerald-200 shadow-emerald-900/60'
              : 'bg-red-600 hover:bg-red-500 text-white border-red-300 shadow-red-950/70'
          }`}
          style={{ fontFamily: "'Bangers', 'Outfit', cursive" }}
        >
          {isMatch ? (
            <>
              NEXT ROUND <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              TRY AGAIN! <RotateCcw className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
