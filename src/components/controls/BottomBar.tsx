import React from 'react';
import { motion } from 'motion/react';
import { Target, RotateCcw, BarChart3, Trophy, Volume2, VolumeX, Settings, HelpCircle } from 'lucide-react';

interface BottomBarProps {
  round: number;
  attempt: number;
  isMuted: boolean;
  onOpenStats: () => void;
  onOpenAchievements: () => void;
  onOpenSound: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  round,
  attempt,
  isMuted,
  onOpenStats,
  onOpenAchievements,
  onOpenSound,
  onOpenSettings,
  onOpenHelp,
}) => {
  return (
    <div className="relative w-full flex items-center justify-between px-3 sm:px-6 py-2.5 z-50 pointer-events-auto select-none">
      {/* Bottom-Left: Round and Attempt Cards */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* ROUND CARD */}
        <div className="bg-black/85 backdrop-blur-md rounded-2xl border-2 border-pink-500/80 px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center gap-2 sm:gap-2.5">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
          <div className="flex flex-col">
            <span
              className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ROUND
            </span>
            <span
              className="text-base sm:text-lg font-black text-white leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {round}
            </span>
          </div>
        </div>

        {/* ATTEMPT CARD */}
        <div className="bg-black/85 backdrop-blur-md rounded-2xl border-2 border-pink-500/80 px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center gap-2 sm:gap-2.5">
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <div className="flex flex-col">
            <span
              className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ATTEMPT
            </span>
            <span
              className="text-base sm:text-lg font-black text-white leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {attempt}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom-Right: Four Icon Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Statistics Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenStats}
          title="Statistics"
          aria-label="Statistics"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/85 border-2 border-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)] flex items-center justify-center p-1.5 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.7)] transition-all cursor-pointer"
        >
          <img
            src="/assets/ui/stat-icon.png"
            alt="Statistics"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.button>

        {/* Achievements / Leaderboard Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenAchievements}
          title="Achievements & Leaderboard"
          aria-label="Achievements & Leaderboard"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/85 border-2 border-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)] flex items-center justify-center p-1.5 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.7)] transition-all cursor-pointer"
        >
          <img
            src="/assets/ui/trophy-icon.png"
            alt="Trophy"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.button>

        {/* Sound Settings Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenSound}
          title="Sound Settings"
          aria-label="Sound Settings"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/85 border-2 border-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)] flex items-center justify-center p-1.5 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.7)] transition-all cursor-pointer"
        >
          <img
            src="/assets/ui/sound-icon.png"
            alt="Sound"
            className={`w-full h-full object-contain pointer-events-none select-none ${isMuted ? 'opacity-40 grayscale' : ''}`}
          />
        </motion.button>

        {/* General Settings Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenSettings}
          title="Game Settings"
          aria-label="Game Settings"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/85 border-2 border-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)] flex items-center justify-center p-1.5 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.7)] transition-all cursor-pointer"
        >
          <img
            src="/assets/ui/settings-icon.png"
            alt="Settings"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.button>
      </div>
    </div>
  );
};
