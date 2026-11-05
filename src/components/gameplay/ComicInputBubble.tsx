import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { validateContestantInput } from '../../engine/scoringEngine';

interface ComicInputBubbleProps {
  inputVal: string;
  setInputVal: (val: string) => void;
  onSubmit: (score: number) => void;
  isDisabled: boolean;
  phase: string;
  error: string | null;
  setError: (err: string | null) => void;
}

export const ComicInputBubble: React.FC<ComicInputBubbleProps> = ({
  inputVal,
  setInputVal,
  onSubmit,
  isDisabled,
  phase,
  error,
  setError,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isDisabled) return;

    const validation = validateContestantInput(inputVal);
    if (!validation.valid || validation.parsed === undefined) {
      setError(validation.error || 'Please enter a valid score');
      return;
    }
    setError(null);
    onSubmit(validation.parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow typing numbers, decimal point, empty
    if (/^[0-9]*\.?[0-9]*$/.test(val) || val === '') {
      setInputVal(val);
      if (error) setError(null);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 select-none z-30 max-w-[280px] sm:max-w-[320px]">
      {/* Yellow comic action rays / sparks around bubbles */}
      <div className="absolute -top-5 -right-5 pointer-events-none">
        <img
          src="/assets/decorations/comic-rays.png"
          alt="Comic Rays"
          className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]"
        />
      </div>
      <div className="absolute bottom-2 -left-6 pointer-events-none rotate-180">
        <img
          src="/assets/decorations/comic-rays.png"
          alt="Comic Rays"
          className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]"
        />
      </div>

      {/* BUBBLE 1 — QUESTION BUBBLE */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -2 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#fffdf5] text-black px-4 py-3 rounded-[24px] border-[3.5px] border-black shadow-[4px_4px_0px_#000] drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
      >
        {/* Tail pointing toward the contestant's mouth/head on the left */}
        <div className="absolute -left-3 top-5 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-black border-b-[10px] border-b-transparent pointer-events-none">
          <div className="absolute -top-[7px] left-[3px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[12px] border-r-[#fffdf5] border-b-[7px] border-b-transparent" />
        </div>

        <p
          className="text-center font-black text-sm sm:text-base leading-tight tracking-wide text-zinc-950 uppercase"
          style={{ fontFamily: "'Bangers', 'Outfit', cursive" }}
        >
          WHAT DO YOU THINK THE JUDGES WILL GIVE ME?
        </p>
      </motion.div>

      {/* BUBBLE 2 — INPUT & SUBMIT BUBBLE */}
      <motion.div
        animate={
          phase === 'COUNTDOWN'
            ? { scale: [1, 1.05, 1], rotate: [0, -1, 1, 0] }
            : error
            ? { x: [-6, 6, -6, 6, 0] }
            : { rotate: 1 }
        }
        transition={{ duration: error ? 0.35 : 0.4 }}
        className="relative bg-[#fffdf5] text-black p-3.5 sm:p-4 rounded-[26px] border-[3.5px] border-black shadow-[5px_5px_0px_#000] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex flex-col gap-2.5"
      >
        {/* Pointer toward contestant */}
        <div className="absolute -left-3 top-7 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-black border-b-[10px] border-b-transparent pointer-events-none">
          <div className="absolute -top-[7px] left-[3px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[12px] border-r-[#fffdf5] border-b-[7px] border-b-transparent" />
        </div>

        {/* Title */}
        <div className="text-center">
          <span
            className="text-xs sm:text-sm font-black tracking-wider uppercase text-zinc-900"
            style={{ fontFamily: "'Bangers', 'Outfit', cursive" }}
          >
            ENTER YOUR SCORE (0 – 10)
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Numerical Input */}
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={inputVal}
              disabled={isDisabled}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="7.5"
              className="w-full text-center text-3xl sm:text-4xl font-black py-1.5 px-3 rounded-2xl bg-white border-2 border-purple-500/80 text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-pink-500/50 disabled:opacity-60 disabled:bg-zinc-100 tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Validation Feedback */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] font-bold text-red-600 text-center leading-tight bg-red-100 rounded-lg py-1 px-2 border border-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            disabled={isDisabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={isDisabled ? {} : { scale: 1.03 }}
            whileTap={isDisabled ? {} : { scale: 0.97, y: 2 }}
            className={`w-full py-2.5 sm:py-3 px-4 rounded-full font-black text-white text-base sm:text-lg tracking-wider uppercase border-[3px] border-black shadow-[3px_3px_0px_#000] transition-colors relative overflow-hidden ${
              isDisabled
                ? 'bg-zinc-400 cursor-not-allowed border-zinc-600'
                : 'bg-[#e5283b] hover:bg-[#d01e30] active:bg-[#b01424]'
            }`}
            style={{
              fontFamily: "'Bangers', 'Outfit', cursive",
              letterSpacing: '0.06em',
              textShadow: '1px 1px 0px #000',
            }}
          >
            {/* Gloss highlight on top half of button */}
            <div className="absolute top-0 left-2 right-2 h-[45%] bg-white/25 rounded-t-full pointer-events-none" />

            {isDisabled ? (
              phase === 'JUDGING' ? 'JUDGES ARE SCORING...' : 'LOCKING IN...'
            ) : (
              'SUBMIT YOUR SCORE!'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
