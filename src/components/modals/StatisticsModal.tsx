import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Target, Flame, Volume2, History } from 'lucide-react';
import { GameStats } from '../../types/game';

interface StatisticsModalProps {
  stats: GameStats;
  onClose: () => void;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({ stats, onClose }) => {
  const winRate =
    stats.totalAttempts > 0
      ? Math.round((stats.totalWins / stats.totalAttempts) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-purple-500/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Bangers', 'Outfit', sans-serif" }}
            >
              SHOW STATISTICS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-4">
          <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              ATTEMPTS
            </span>
            <span className="text-2xl font-black text-white mt-1 tabular-nums">
              {stats.totalAttempts}
            </span>
          </div>

          <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              MATCHES (WINS)
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
              {stats.totalWins}
            </span>
          </div>

          <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
              WIN RATE
            </span>
            <span className="text-2xl font-black text-yellow-400 mt-1 tabular-nums">
              {winRate}%
            </span>
          </div>

          <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">
              BEST STREAK
            </span>
            <span className="text-2xl font-black text-pink-400 mt-1 tabular-nums flex items-center gap-1">
              <Flame className="w-4 h-4 text-pink-400" /> {stats.bestStreak}
            </span>
          </div>
        </div>

        {/* History Table */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              RECENT ATTEMPTS HISTORY
            </span>
          </div>

          {stats.history.length === 0 ? (
            <div className="py-10 text-center text-zinc-500 text-sm">
              No attempts yet! Enter your first score prediction on stage.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.history.map((record) => (
                <div
                  key={record.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                    record.isMatch
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-zinc-400 w-14">
                      R{record.round} · #{record.attempt}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-400">Guess:</span>
                      <span className="font-bold text-white tabular-nums">
                        {record.guess.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 hidden sm:flex">
                      <span className="text-zinc-400">Average:</span>
                      <span className="font-bold text-yellow-400 tabular-nums">
                        {record.average.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        record.isMatch
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {record.isMatch ? 'MATCH!' : `OFF BY ${record.difference.toFixed(1)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
