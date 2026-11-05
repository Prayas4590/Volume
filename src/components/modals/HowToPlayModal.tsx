import React from 'react';
import { motion } from 'motion/react';
import { X, HelpCircle, CheckCircle, Flame, Sparkles } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-lg bg-zinc-950 border-2 border-pink-500/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(236,72,153,0.4)] flex flex-col gap-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-pink-400" />
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Bangers', 'Outfit', sans-serif" }}
            >
              HOW TO PLAY CIS GOT LATENT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tagline */}
        <div className="bg-pink-950/30 border border-pink-500/40 rounded-2xl p-3 text-center">
          <p
            className="text-yellow-400 font-black text-sm tracking-wide uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            "Five judges. One average. Unlimited embarrassment."
          </p>
          <p className="text-zinc-300 text-xs mt-0.5">
            Yahaan talent nahi, average match hona chahiye!
          </p>
        </div>

        {/* Step-by-step Rules */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-3 p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Enter Your Score Prediction</span>
              <span className="text-zinc-400 mt-0.5">
                Type what you think the five judges will give you (between 0.0 and 10.0, e.g. 7.5) in the comic speech bubble right beside your face.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">The Panel Locks Their Scores</span>
              <span className="text-zinc-400 mt-0.5">
                Tanmay, Ashish, Samay, Carry, and Zakir will each generate fresh scores between 0.0 and 10.0. Scores are revealed directly below each judge's name!
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Mathematical Average Calculation</span>
              <span className="text-zinc-400 mt-0.5">
                All 5 scores are averaged and rounded to one decimal place.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Win Condition & Volume Meter</span>
              <span className="text-zinc-400 mt-0.5">
                If your prediction matches the rounded average, you win! The stage volume meter updates to that score. If wrong, try again with fresh scores!
              </span>
            </div>
          </div>
        </div>

        {/* Got It Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-black text-sm uppercase tracking-wider transition-colors cursor-pointer"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          LET'S PLAY!
        </button>
      </div>
    </motion.div>
  );
};
