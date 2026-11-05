import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { getVolumeStatus, getVolumeBlocks } from '../../engine/volumeEngine';

interface VolumeMeterProps {
  volume: number;
}

export const VolumeMeter: React.FC<VolumeMeterProps> = ({ volume }) => {
  const status = getVolumeStatus(volume);
  const blocks = getVolumeBlocks(volume);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative select-none"
    >
      {/* Outer Card with Neon Purple Border & Glow */}
      <div className="relative bg-black/70 backdrop-blur-md rounded-2xl border-2 border-pink-500/80 px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_0_20px_rgba(236,72,153,0.45),inset_0_0_15px_rgba(168,85,247,0.2)] flex flex-col gap-2 min-w-[200px] sm:min-w-[230px]">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-pink-400 drop-shadow-[0_0_6px_#f472b6]" />
            <span
              className="text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              CURRENT VOLUME
            </span>
          </div>
        </div>

        {/* Big Yellow Digits */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={volume.toFixed(1)}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-4xl font-black text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)] tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {volume.toFixed(1)}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm sm:text-base font-bold text-zinc-400 tracking-wide">
              / 10
            </span>
          </div>

          {/* Volume Status Tagline */}
          <div className="text-right flex flex-col items-end">
            <span className={`text-xs font-bold ${status.colorClass}`}>
              {status.tierName}
            </span>
          </div>
        </div>

        {/* 10 Segmented Horizontal Volume Blocks */}
        <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
          {blocks.map((isActive, idx) => (
            <motion.div
              key={idx}
              animate={{
                scaleY: isActive ? [1, 1.15, 1] : 1,
              }}
              transition={{
                duration: 0.4,
                delay: idx * 0.04,
              }}
              className={`h-4 sm:h-5 flex-1 rounded-[3px] border transition-colors duration-300 ${
                isActive
                  ? 'bg-yellow-400 border-yellow-200 shadow-[0_0_8px_rgba(250,204,21,0.9)]'
                  : 'bg-zinc-800/80 border-zinc-700/60'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
