import { useState, useEffect, useCallback } from 'react';
import { GamePhase, AttemptRecord, GameStats, AudioSettings, Achievement } from '../types/game';
import { JUDGES, getRandomReaction } from '../data/judges';
import { HOST_DIALOGUES } from '../data/dialogues';
import {
  generateAllJudgeScores,
  calculateAverage,
  checkScoreMatch,
} from '../engine/scoringEngine';
import { soundEffects } from '../audio/soundEffects';
import { voiceOver } from '../audio/voiceOver';
import { audioManager } from '../audio/audioManager';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import confetti from 'canvas-confetti';

const STATS_KEY = 'cis_got_latent_stats';
const ACHIEVEMENTS_KEY = 'cis_got_latent_achievements';
const VOLUME_KEY = 'cis_got_latent_volume';

export function useGame() {
  const [showStarted, setShowStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [attempt, setAttempt] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(VOLUME_KEY);
      return saved ? parseFloat(saved) : 5.0;
    } catch {
      return 5.0;
    }
  });

  const [contestantGuess, setContestantGuess] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState('7.5');
  const [inputError, setInputError] = useState<string | null>(null);

  const [phase, setPhase] = useState<GamePhase>('IDLE');
  const [judgeScores, setJudgeScores] = useState<number[]>([0, 0, 0, 0, 0]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeJudgeIndex, setActiveJudgeIndex] = useState<number | null>(null);
  const [activeSpeech, setActiveSpeech] = useState<{ speaker: string; text: string } | null>(null);
  const [calculatedAverage, setCalculatedAverage] = useState<number | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  // Settings & Modals
  const [toleranceTenths, setToleranceTenths] = useState(0); // 0 = exact match
  const [fastMode, setFastMode] = useState(false);
  const [activeModal, setActiveModal] = useState<
    'stats' | 'achievements' | 'sound' | 'settings' | 'instructions' | null
  >(null);

  // Stats & Achievements
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      totalAttempts: 0,
      totalWins: 0,
      currentStreak: 0,
      bestStreak: 0,
      highestVolume: 5.0,
      closestDiff: 10.0,
      history: [],
    };
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ACHIEVEMENTS;
  });

  const [audioSettings, setAudioSettingsState] = useState<AudioSettings>(() =>
    audioManager.getSettings()
  );

  // Subscribe to voice subtitles
  useEffect(() => {
    const unsub = voiceOver.subscribeSubtitles((text, speaker) => {
      setActiveSpeech({ speaker, text });
    });
    return unsub;
  }, []);

  const updateAudioSettings = (newSettings: Partial<AudioSettings>) => {
    audioManager.saveSettings(newSettings);
    setAudioSettingsState(audioManager.getSettings());
  };

  const toggleMute = () => {
    audioManager.toggleMute();
    setAudioSettingsState(audioManager.getSettings());
  };

  // Check achievement unlocks
  const checkAchievements = useCallback(
    (record: AttemptRecord, newVolume: number, newStreak: number) => {
      setAchievements((prev) => {
        let updated = false;
        const next = prev.map((ach) => {
          if (ach.unlocked) return ach;
          let unlockThis = false;

          if (ach.id === 'first_blood') unlockThis = true;
          if (ach.id === 'exact_match' && record.isMatch) unlockThis = true;
          if (ach.id === 'near_miss' && !record.isMatch && Math.abs(record.difference) === 0.1)
            unlockThis = true;
          if (ach.id === 'volume_master' && newVolume >= 9.0) unlockThis = true;
          if (ach.id === 'streak_2' && newStreak >= 2) unlockThis = true;

          const samayScore = record.judgeScores.find((j) => j.judgeId === 'samay')?.score ?? 0;
          if (ach.id === 'samay_checkmate' && samayScore >= 8.0) unlockThis = true;

          const zakirScore = record.judgeScores.find((j) => j.judgeId === 'zakir')?.score ?? 0;
          if (ach.id === 'sakht_launda' && record.isMatch && zakirScore >= 8.5) unlockThis = true;

          if (unlockThis) {
            updated = true;
            return { ...ach, unlocked: true, unlockedAt: Date.now() };
          }
          return ach;
        });

        if (updated) {
          try {
            localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(next));
          } catch {}
        }
        return next;
      });
    },
    []
  );

  // START SHOW ACTION
  const startShow = () => {
    setShowStarted(true);
    audioManager.startAmbience();
    soundEffects.playClick();
    const welcomeLine = HOST_DIALOGUES.welcome[0];
    voiceOver.speak(welcomeLine, 'HOST', 1.0, 1.05);
  };

  // SUBMIT CONTESTANT SCORE
  const submitScore = async (validatedScore: number) => {
    if (phase !== 'IDLE') return;

    soundEffects.playClick();
    setContestantGuess(validatedScore);
    setInputError(null);
    setPhase('COUNTDOWN');

    // Fresh random scores generated on every attempt!
    const freshScores = generateAllJudgeScores();
    setJudgeScores(freshScores);
    setRevealedCount(0);
    setActiveJudgeIndex(null);
    setCalculatedAverage(null);
    setIsMatch(null);

    // Announce lock in
    const lockLine =
      HOST_DIALOGUES.lockScores[
        Math.floor(Math.random() * HOST_DIALOGUES.lockScores.length)
      ];
    soundEffects.startSuspenseDrone();
    await voiceOver.speak(lockLine, 'HOST', 1.0, 1.1);

    // Transition to JUDGING phase
    setPhase('JUDGING');
    const delayPerJudge = fastMode ? 500 : 1500;

    for (let i = 0; i < 5; i++) {
      setActiveJudgeIndex(i);
      const judge = JUDGES[i];
      const score = freshScores[i];

      // Play tick and reveal chime
      soundEffects.playTick();
      soundEffects.playJudgeChime();
      setRevealedCount(i + 1);

      // Speak reaction
      const reaction = getRandomReaction(judge.id, score);
      await voiceOver.speak(reaction, judge.name, judge.voicePitch, judge.voiceRate);

      await new Promise((r) => setTimeout(r, delayPerJudge));
    }

    setActiveJudgeIndex(null);

    // Transition to AVERAGE_REVEAL
    setPhase('AVERAGE_REVEAL');
    const avg = calculateAverage(freshScores);
    setCalculatedAverage(avg);

    // Drumroll before average reveal
    soundEffects.playDrumroll(fastMode ? 1.0 : 2.0);
    const avgLine =
      HOST_DIALOGUES.beforeAverage[
        Math.floor(Math.random() * HOST_DIALOGUES.beforeAverage.length)
      ];
    await voiceOver.speak(avgLine, 'HOST', 1.0, 1.05);

    // Check match
    const matched = checkScoreMatch(validatedScore, avg, toleranceTenths);
    setIsMatch(matched);
    setPhase('RESULT');

    const diff = Math.round(Math.abs(validatedScore - avg) * 10) / 10;

    // Update Volume ONLY on correct guess!
    let nextVolume = currentVolume;
    let nextStreak = matched ? stats.currentStreak + 1 : 0;

    if (matched) {
      soundEffects.playVictory();
      // Animate volume to match the new score as requested by prompt
      nextVolume = avg;
      setCurrentVolume(nextVolume);
      try {
        localStorage.setItem(VOLUME_KEY, nextVolume.toString());
      } catch {}

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#eab308', '#ec4899', '#a855f7', '#22c55e', '#ffffff'],
        });
      } catch {}

      const successLine =
        HOST_DIALOGUES.success[
          Math.floor(Math.random() * HOST_DIALOGUES.success.length)
        ];
      voiceOver.speak(successLine, 'HOST', 1.05, 1.1);
    } else {
      soundEffects.playFailure();
      const failLine =
        HOST_DIALOGUES.failure[
          Math.floor(Math.random() * HOST_DIALOGUES.failure.length)
        ];
      voiceOver.speak(failLine, 'HOST', 0.95, 1.0);
    }

    // Save Attempt Record
    const record: AttemptRecord = {
      id: `${Date.now()}-${attempt}`,
      round,
      attempt,
      timestamp: Date.now(),
      guess: validatedScore,
      judgeScores: JUDGES.map((j, idx) => ({
        judgeId: j.id,
        judgeName: j.name,
        score: freshScores[idx],
      })),
      average: avg,
      isMatch: matched,
      difference: diff,
    };

    setStats((prev) => {
      const next: GameStats = {
        totalAttempts: prev.totalAttempts + 1,
        totalWins: prev.totalWins + (matched ? 1 : 0),
        currentStreak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        highestVolume: Math.max(prev.highestVolume, nextVolume),
        closestDiff: Math.min(prev.closestDiff, diff),
        history: [record, ...prev.history].slice(0, 50),
      };
      try {
        localStorage.setItem(STATS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

    checkAchievements(record, nextVolume, nextStreak);
  };

  // RESET TO NEXT ATTEMPT
  const nextAttempt = () => {
    soundEffects.playClick();
    voiceOver.stop();
    soundEffects.stopSuspenseDrone();
    setPhase('IDLE');
    setRevealedCount(0);
    setActiveJudgeIndex(null);
    setCalculatedAverage(null);
    setIsMatch(null);
    setContestantGuess(null);
    setAttempt((prev) => prev + 1);

    if (isMatch) {
      setRound((r) => r + 1);
    }
  };

  return {
    showStarted,
    startShow,
    round,
    attempt,
    currentVolume,
    phase,
    contestantGuess,
    inputVal,
    setInputVal,
    inputError,
    setInputError,
    judgeScores,
    revealedCount,
    activeJudgeIndex,
    activeSpeech,
    calculatedAverage,
    isMatch,
    submitScore,
    nextAttempt,
    stats,
    achievements,
    activeModal,
    setActiveModal,
    audioSettings,
    updateAudioSettings,
    toggleMute,
    toleranceTenths,
    setToleranceTenths,
    fastMode,
    setFastMode,
  };
}
