import React from 'react';
import { motion } from 'motion/react';
import { X, Settings, Zap, ShieldAlert, RotateCcw } from 'lucide-react';

interface GeneralSettingsModalProps {
  toleranceTenths: number;
  setToleranceTenths: (t: number) => void;
  fastMode: boolean;
  setFastMode: (fast: boolean) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const GeneralSettingsModal: React.FC<GeneralSettingsModalProps> = ({
  toleranceTenths,
  setToleranceTenths,
  fastMode,
  setFastMode,
  onResetData,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-lg bg-zinc-950 border-2 border-purple-500/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-purple-400" />
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Bangers', 'Outfit', sans-serif" }}
            >
              GAMEPLAY SETTINGS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoring Tolerance Mode */}
        <div className="flex flex-col gap-2 p-3.5 bg-zinc-900 rounded-2xl border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Scoring Precision</span>
            <span className="text-xs font-semibold text-pink-400">
              {toleranceTenths === 0 ? 'Exact Match (0.0)' : 'Casual Mode (±0.1)'}
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Official rules require your guess to match the judges average exactly to 1 decimal place.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setToleranceTenths(0)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                toleranceTenths === 0
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Strict (Exact 0.0)
            </button>
            <button
              onClick={() => setToleranceTenths(1)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                toleranceTenths === 1
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Casual (±0.1 leeway)
            </button>
          </div>
        </div>

        {/* Reveal Pace */}
        <div className="flex items-center justify-between p-3.5 bg-zinc-900 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 ${fastMode ? 'text-yellow-400' : 'text-zinc-500'}`} />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Fast Reveal Mode</span>
              <span className="text-xs text-zinc-400">
                {fastMode ? 'Rapid judging sequence' : 'Full dramatic reality-show suspense'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setFastMode(!fastMode)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              fastMode ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {fastMode ? 'FAST' : 'NORMAL'}
          </button>
        </div>

        {/* Reset Progress */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-400">Reset Local Progress</span>
            <span className="text-[11px] text-zinc-500">Clears attempts history and resets volume to 5.0</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset your score history and volume?')) {
                onResetData();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700/60 text-xs font-bold text-red-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
};
