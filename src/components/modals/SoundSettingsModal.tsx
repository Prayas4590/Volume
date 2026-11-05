import React from 'react';
import { motion } from 'motion/react';
import { X, Volume2, VolumeX, Mic, Music, BellRing } from 'lucide-react';
import { AudioSettings } from '../../types/game';
import { voiceOver } from '../../audio/voiceOver';
import { soundEffects } from '../../audio/soundEffects';

interface SoundSettingsModalProps {
  settings: AudioSettings;
  onUpdate: (newSettings: Partial<AudioSettings>) => void;
  onClose: () => void;
}

export const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({
  settings,
  onUpdate,
  onClose,
}) => {
  const handleTestVoice = () => {
    voiceOver.speak(
      "Mic testing 1 2 3! Samay Raina says latency is zero, comedy is infinite!",
      "HOST",
      1.0,
      1.05
    );
  };

  const handleTestSFX = () => {
    soundEffects.playJudgeChime();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-lg bg-zinc-950 border-2 border-pink-500/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(236,72,153,0.4)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-6 h-6 text-pink-400" />
            <h3
              className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Bangers', 'Outfit', sans-serif" }}
            >
              SOUND CONTROLS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Mute Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-zinc-900 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3">
            {settings.muted ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Master Sound</span>
              <span className="text-xs text-zinc-400">
                {settings.muted ? 'Audio is currently muted' : 'Audio is active'}
              </span>
            </div>
          </div>
          <button
            onClick={() => onUpdate({ muted: !settings.muted })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              settings.muted
                ? 'bg-red-500 text-white'
                : 'bg-emerald-500 text-black'
            }`}
          >
            {settings.muted ? 'UNMUTE' : 'MUTE'}
          </button>
        </div>

        {/* Sliders Container */}
        <div className="flex flex-col gap-4 py-2">
          {/* Master Volume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Music className="w-4 h-4 text-purple-400" /> Master Volume
              </span>
              <span>{Math.round(settings.masterVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.masterVolume}
              onChange={(e) => onUpdate({ masterVolume: parseFloat(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
            />
          </div>

          {/* Voice-Over Volume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-pink-400" /> Reality Show Voice-Over (Speech)
              </span>
              <span>{Math.round(settings.voiceVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.voiceVolume}
              onChange={(e) => onUpdate({ voiceVolume: parseFloat(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
            />
          </div>

          {/* Sound Effects Volume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-yellow-400" /> Sound Effects & Cheers
              </span>
              <span>{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => onUpdate({ sfxVolume: parseFloat(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Test Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
          <button
            onClick={handleTestVoice}
            className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            🔊 Test Voice-Over
          </button>
          <button
            onClick={handleTestSFX}
            className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            🔔 Test Judge Chime
          </button>
        </div>
      </div>
    </motion.div>
  );
};
