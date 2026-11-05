/**
 * CIS Got Latent - Volume Engine
 * Status tiers, block indicators, and humorous tier descriptions.
 */

export interface VolumeStatus {
  tierName: string;
  tagline: string;
  colorClass: string;
}

export function getVolumeStatus(volume: number): VolumeStatus {
  const v = Math.round(volume * 10) / 10;
  if (v <= 2.0) {
    return {
      tierName: 'Barely Audible',
      tagline: 'Mic band hai kya bhai?',
      colorClass: 'text-zinc-400',
    };
  }
  if (v <= 4.0) {
    return {
      tierName: 'Background Character',
      tagline: 'Crowd mein baithne layak performance',
      colorClass: 'text-blue-400',
    };
  }
  if (v <= 6.0) {
    return {
      tierName: 'Average Human',
      tagline: 'Bilkul normal, no tension',
      colorClass: 'text-amber-400',
    };
  }
  if (v <= 8.0) {
    return {
      tierName: 'Main Character Energy',
      tagline: 'Stage par aag laga di!',
      colorClass: 'text-emerald-400',
    };
  }
  if (v <= 9.5) {
    return {
      tierName: 'Certified Legend',
      tagline: 'Samay Raina is impressed!',
      colorClass: 'text-purple-400',
    };
  }
  return {
    tierName: 'National Treasure',
    tagline: 'Crorepati level mathematical accuracy!',
    colorClass: 'text-yellow-300 font-bold',
  };
}

/**
 * Returns an array of 10 booleans for the 10 volume blocks.
 * e.g., 5.0 => 5 active blocks, 7.8 => 8 active blocks.
 */
export function getVolumeBlocks(volume: number): boolean[] {
  const rounded = Math.round(volume);
  const activeCount = Math.min(10, Math.max(0, rounded));
  return Array.from({ length: 10 }, (_, i) => i < activeCount);
}
