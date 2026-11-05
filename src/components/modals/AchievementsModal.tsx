import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Medal, Lock, CheckCircle2 } from 'lucide-react';
import { Achievement } from '../../types/game';

interface AchievementsModalProps {
  achievements: Achievement[];
  currentVolume: number;
  totalWins: number;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  currentVolume,
  totalWins,
  onClose,
}) => {
  const [tab, setTab] = useState<'achievements' | 'leaderboard'>('achievements');

  // Satirical Hall of Fame leaderboard
  const LEADERBOARD = [
    { rank: 1, name: 'Samay Raina', title: 'Supreme Latent Master', score: '9.8 / 10', badge: '🥇' },
    { rank: 2, name: 'Tanmay Bhat', title: 'Bot Army Mathematical Genius', score: '9.4 / 10', badge: '🥈' },
    { rank: 3, name: 'Contestant #001 (You)', title: 'Active Stage Contestant', score: `${currentVolume.toFixed(1)} / 10`, badge: '⭐', isUser: true },
    { rank: 4, name: 'Zakir Khan', title: 'Sakht Launda Algorithm', score: '8.6 / 10', badge: '🎖️' },
    { rank: 5, name: 'CarryMinati', title: 'High Decibel Roaster', score: '8.2 / 10', badge: '🔥' },
    { rank: 6, name: 'Ashish Chanchlani', title: 'Bollywood Overactor', score: '7.9 / 10', badge: '🎭' },
  ].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-yellow-500/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(234,179,8,0.4)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Bangers', 'Outfit', sans-serif" }}
            >
              HALL OF FAME & TROPHIES
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-3 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          <button
            onClick={() => setTab('achievements')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'achievements'
                ? 'bg-yellow-400 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ACHIEVEMENTS ({unlockedCount}/{achievements.length})
          </button>
          <button
            onClick={() => setTab('leaderboard')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'leaderboard'
                ? 'bg-yellow-400 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LATENT LEADERBOARD
          </button>
        </div>

        {/* Tab 1: Achievements */}
        {tab === 'achievements' && (
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  ach.unlocked
                    ? 'bg-yellow-950/20 border-yellow-500/50 text-white'
                    : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      ach.unlocked
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-600'
                    }`}
                  >
                    {ach.unlocked ? (
                      <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold ${
                        ach.unlocked ? 'text-white' : 'text-zinc-400'
                      }`}
                    >
                      {ach.title}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {ach.description}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      ach.unlocked
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Latent Leaderboard */}
        {tab === 'leaderboard' && (
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
            {LEADERBOARD.map((item, idx) => (
              <div
                key={item.name}
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  item.isUser
                    ? 'bg-pink-950/40 border-pink-500/70 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black w-6 text-center">
                    {item.badge}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {item.name}
                      </span>
                      {item.isUser && (
                        <span className="text-[9px] font-extrabold bg-pink-500 text-white px-1.5 py-0.2 rounded-full uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-yellow-400 tabular-nums">
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
