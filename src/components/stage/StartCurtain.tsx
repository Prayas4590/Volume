import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';
import { ShowLogo } from './ShowLogo';

interface StartCurtainProps {
  showStarted: boolean;
  onStart: () => void;
}

export const StartCurtain: React.FC<StartCurtainProps> = ({ showStarted, onStart }) => {
  return (
    <AnimatePresence>
      {!showStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 select-none overflow-hidden"
        >
          {/* Left Red Theatrical Curtain */}
          <motion.div
            exit={{ x: '-100%', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #1e0413 0px,
                #4c0525 35px,
                #7f083b 70px,
                #b91c1c 100px,
                #4c0525 140px,
                #18030f 170px
              )`,
              boxShadow: '10px 0 30px rgba(0,0,0,0.9)',
            }}
          />

          {/* Right Red Theatrical Curtain */}
          <motion.div
            exit={{ x: '100%', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #18030f 0px,
                #4c0525 30px,
                #b91c1c 70px,
                #7f083b 100px,
                #4c0525 135px,
                #1e0413 170px
              )`,
              boxShadow: '-10px 0 30px rgba(0,0,0,0.9)',
            }}
          />

          {/* Golden Center Stage Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center max-w-lg w-full bg-black/85 backdrop-blur-xl border-2 border-pink-500/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(236,72,153,0.5)] text-center"
          >
            {/* Top Subtitle */}
            <span
              className="text-pink-400 font-extrabold tracking-widest text-xs uppercase mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              IEEE CIS KLS GIT Presents
            </span>

            {/* Show Logo */}
            <div className="py-2 scale-110">
              <ShowLogo />
            </div>

            {/* Tagline */}
            <p className="text-zinc-300 font-semibold text-sm sm:text-base mt-2 mb-4">
              "Five judges. One average. Unlimited embarrassment."
            </p>

            <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 mb-6 text-xs text-zinc-400 flex flex-col gap-1">
              <span className="text-white font-bold">Show Guidelines:</span>
              <span>Predict the judges' average score between 0.0 and 10.0.</span>
              <span className="text-yellow-400 font-semibold">Turn up your device volume for full voice-overs & crowd reactions!</span>
            </div>

            {/* Pulsing Red Start Show Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(239,68,68,0.6)',
                  '0 0 35px rgba(234,179,8,0.8)',
                  '0 0 20px rgba(239,68,68,0.6)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              onClick={onStart}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 border-2 border-yellow-300 font-black text-white text-lg tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-lg"
              style={{
                fontFamily: "'Bangers', 'Outfit', cursive",
                letterSpacing: '0.08em',
                textShadow: '2px 2px 0px #000',
              }}
            >
              <Play className="w-6 h-6 fill-white text-white" />
              START THE SHOW!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
