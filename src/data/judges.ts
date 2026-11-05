import { Judge } from '../types/game';

export const JUDGES: Judge[] = [
  {
    id: 'tanmay',
    name: 'TANMAY BHAT',
    shortName: 'Tanmay',
    tagline: 'Bot Army General & Meme Connoisseur',
    voicePitch: 0.85,
    voiceRate: 1.05,
    gender: 'male',
    personality: 'Analytical, laughing uncontrollably, checking the math',
    avatarSeed: 1,
  },
  {
    id: 'ashish',
    name: 'ASHISH CHANCHLANI',
    shortName: 'Ashish',
    tagline: 'Full Bollywood Melodrama',
    voicePitch: 1.25,
    voiceRate: 1.15,
    gender: 'male',
    personality: 'Hyper-energetic, shouting in shock, dramatic expressions',
    avatarSeed: 2,
  },
  {
    id: 'samay',
    name: 'SAMAY RAINA',
    shortName: 'Samay',
    tagline: 'Supreme Leader & Latent Overlord',
    voicePitch: 0.95,
    voiceRate: 1.0,
    gender: 'male',
    personality: 'Deadpan sarcasm, chess mastermind, ruthless grading',
    avatarSeed: 3,
  },
  {
    id: 'carry',
    name: 'CARRY MINATI',
    shortName: 'Carry',
    tagline: 'Roast King & Mic Drop Specialist',
    voicePitch: 1.1,
    voiceRate: 1.2,
    gender: 'male',
    personality: 'Aggressive roast vibe, intense energy, unfiltered honesty',
    avatarSeed: 4,
  },
  {
    id: 'zakir',
    name: 'ZAKIR KHAN',
    shortName: 'Zakir',
    tagline: 'Sakht Launda & Shayari Maestro',
    voicePitch: 0.9,
    voiceRate: 0.95,
    gender: 'male',
    personality: 'Poetic, gentle laugh, emotional life wisdom',
    avatarSeed: 5,
  },
];

export interface JudgeReactionDialogue {
  low: string[];     // 0.0 - 4.0
  medium: string[];  // 4.1 - 7.5
  high: string[];    // 7.6 - 10.0
}

export const JUDGE_REACTIONS: Record<string, JudgeReactionDialogue> = {
  tanmay: {
    low: [
      "Let's see what mathematics has done today. Disaster!",
      "Bro, iss performance pe toh meme bhi nahi ban sakta.",
      "Numbers don't lie, aur numbers ro rahe hain.",
    ],
    medium: [
      "Decent effort. Average ko respect milni chahiye.",
      "Neither great nor terrible, bilkul middle class performance.",
      "The math makes sense to me.",
    ],
    high: [
      "Bhai! Brilliant calculation, absolute gold!",
      "Yeh score toh seedha YouTube trending par jaayega!",
      "Peak content! High score locked!",
    ],
  },
  ashish: {
    low: [
      "BHAI! KYA SCORE DIYA HAI MAINE! Hahaha!",
      "Arre mummy re! Yeh kya sun liya!",
      "Bijli ka bill tera baap bharega?",
    ],
    medium: [
      "Theek tha bhai, thoda aur drama chahiye tha!",
      "Chalo pass kar diya, dil bada hai mera!",
      "Not bad! Bollywood style!",
    ],
    high: [
      "BAWAAL! EK DUM PHOD DIYA BOSS!",
      "Bhai meri aankhon mein khushi ke aansu aa gaye!",
      "Full paisa vasool act!",
    ],
  },
  samay: {
    low: [
      "Interesting. Very interesting. Chess mein isko blunder bolte hain.",
      "Talent toh latent hi reh gaya bhai.",
      "Bhai show ka format samajh aya tha na?",
    ],
    medium: [
      "Balanced score. Ab dekhte hain panel kya karta hai.",
      "Main neutral hoon. Average decide karega.",
      "Good game. Score locked.",
    ],
    high: [
      "Supreme Leader certifies this move. Superb!",
      "Finally someone who respects the Latent algorithm!",
      "Solid 8 plus territory. Well played.",
    ],
  },
  carry: {
    low: [
      "Ye toh unexpected tha... aur kaafi bura bhi.",
      "Toh kaise hain aap log? Score dekh ke ro rahe hain.",
      "Bhai roast karne ka bhi mann nahi kar raha.",
    ],
    medium: [
      "Chal theek hai, average bach gaya tera.",
      "Decent, but I expected more aggression!",
      "Score lock kar diya hai.",
    ],
    high: [
      "OH BHAI SAHAB! Ek dum faad diya!",
      "Yeh banda toh aag lagane aaya hai!",
      "Full volume, no compromises!",
    ],
  },
  zakir: {
    low: [
      "Bhai, kismat bhi kabhi kabhi ruth jaati hai.",
      "Pighalna nahi tha yahaan... par thoda sambhalna tha.",
      "Yeh waqt bhi guzar jaayega dost.",
    ],
    medium: [
      "Suno, mehnat dikhi tumhari. Yeh score tumhare naam.",
      "Acha kiya, dil se kiya. Respect.",
      "Dheere dheere hi sahi, baat ban rahi hai.",
    ],
    high: [
      "Kya baat hai! Dil jeet liya tumne!",
      "Hum sakht lounde the, par iss talent pe pighal gaye!",
      "Ustaad! Bemisaal calculation!",
    ],
  },
};

export function getRandomReaction(judgeId: string, score: number): string {
  const reactions = JUDGE_REACTIONS[judgeId];
  if (!reactions) return `Locked score: ${score.toFixed(1)}`;
  let pool = reactions.medium;
  if (score <= 4.0) pool = reactions.low;
  else if (score >= 7.6) pool = reactions.high;
  return pool[Math.floor(Math.random() * pool.length)];
}
