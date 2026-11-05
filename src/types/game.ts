export type GamePhase =
  | 'IDLE'            // Contestant thinking / input ready
  | 'COUNTDOWN'       // Drumroll / locking in
  | 'JUDGING'         // Revealing judges 1-by-1
  | 'AVERAGE_REVEAL'  // Showing the final average
  | 'RESULT';         // Win or Loss overlay / celebration

export interface Judge {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  voicePitch: number;
  voiceRate: number;
  gender: 'male' | 'female';
  personality: string;
  avatarSeed: number;
}

export interface JudgeScoreResult {
  judgeId: string;
  score: number; // e.g. 7.8
  comment: string;
}

export interface AttemptRecord {
  id: string;
  round: number;
  attempt: number;
  timestamp: number;
  guess: number;
  judgeScores: { judgeId: string; judgeName: string; score: number }[];
  average: number;
  isMatch: boolean;
  difference: number;
}

export interface GameStats {
  totalAttempts: number;
  totalWins: number;
  currentStreak: number;
  bestStreak: number;
  highestVolume: number;
  closestDiff: number;
  history: AttemptRecord[];
}

export interface AudioSettings {
  muted: boolean;
  masterVolume: number; // 0 to 1
  voiceVolume: number;  // 0 to 1
  sfxVolume: number;    // 0 to 1
  ambienceVolume: number; // 0 to 1
  speechEnabled: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}
