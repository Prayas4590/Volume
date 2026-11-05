import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'First Step on Stage',
    description: 'Submit your very first score prediction in front of the five judges.',
    icon: 'mic',
    unlocked: false,
  },
  {
    id: 'exact_match',
    title: 'Mathematical Wizard',
    description: 'Correctly predict the exact rounded average of all 5 judges.',
    icon: 'target',
    unlocked: false,
  },
  {
    id: 'near_miss',
    title: 'Dard-e-Dil (0.1 Miss)',
    description: 'Miss the judges average by just 0.1! Unlimited embarrassment.',
    icon: 'heart-crack',
    unlocked: false,
  },
  {
    id: 'volume_master',
    title: 'National Treasure',
    description: 'Push the stage volume meter to 9.0 or higher.',
    icon: 'volume-2',
    unlocked: false,
  },
  {
    id: 'streak_2',
    title: 'Double Trouble',
    description: 'Get two correct predictions in a row.',
    icon: 'flame',
    unlocked: false,
  },
  {
    id: 'samay_checkmate',
    title: 'Supreme Leader Checkmate',
    description: 'Samay Raina awards you a score of 8.0 or higher.',
    icon: 'crown',
    unlocked: false,
  },
  {
    id: 'sakht_launda',
    title: 'Sakht Launda Pighal Gaya',
    description: 'Win a round where Zakir Khan gave a score of 8.5 or higher.',
    icon: 'sparkles',
    unlocked: false,
  },
];
