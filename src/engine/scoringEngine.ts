/**
 * CIS Got Latent - Scoring Engine
 * Enforces integer-tenths math to eliminate floating-point imprecision.
 */

export function generateJudgeScore(): number {
  // Random integer from 0 to 100, divided by 10 => 0.0 to 10.0 in 0.1 steps
  const tenths = Math.floor(Math.random() * 101);
  return tenths / 10;
}

export function generateAllJudgeScores(): number[] {
  return Array.from({ length: 5 }, () => generateJudgeScore());
}

/**
 * Calculates average of 5 scores using integer tenths.
 * Rounds to the nearest integer tenth and converts back to one-decimal score.
 */
export function calculateAverage(scores: number[]): number {
  if (scores.length === 0) return 0.0;
  
  // Sum integer tenths
  const sumTenths = scores.reduce((sum, score) => {
    const tenths = Math.round(score * 10);
    return sum + tenths;
  }, 0);

  // Divide by count and round to nearest tenth
  const avgTenths = Math.round(sumTenths / scores.length);
  return avgTenths / 10;
}

/**
 * Validates contestant's input string.
 * Returns { valid: boolean; error?: string; parsed?: number }
 */
export function validateContestantInput(input: string): {
  valid: boolean;
  error?: string;
  parsed?: number;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a score first!' };
  }

  // Regex allows: integer or decimal with up to 1 decimal place
  // e.g. "0", "7", "7.5", "10", "10.0"
  const regex = /^(10(\.0)?|[0-9](\.[0-9])?)$/;
  if (!regex.test(trimmed)) {
    // Check if user entered more than 1 decimal place
    if (/^\d+\.\d{2,}$/.test(trimmed)) {
      return { valid: false, error: 'Only one decimal place allowed! (e.g. 7.5)' };
    }
    const num = parseFloat(trimmed);
    if (isNaN(num)) {
      return { valid: false, error: 'Enter a valid number between 0 and 10' };
    }
    if (num < 0 || num > 10) {
      return { valid: false, error: 'Score must be between 0.0 and 10.0' };
    }
    return { valid: false, error: 'Format must be like 7.5 or 8.0' };
  }

  const parsed = parseFloat(trimmed);
  // Normalize to 1 decimal place
  const normalized = Math.round(parsed * 10) / 10;
  return { valid: true, parsed: normalized };
}

/**
 * Checks if contestant guess matches the calculated average.
 * Uses integer tenths for exact matching.
 * Also supports tolerance mode if specified.
 */
export function checkScoreMatch(
  guess: number,
  average: number,
  toleranceTenths: number = 0
): boolean {
  const guessTenths = Math.round(guess * 10);
  const avgTenths = Math.round(average * 10);
  const diffTenths = Math.abs(guessTenths - avgTenths);
  return diffTenths <= toleranceTenths;
}

export function formatScore(score: number): string {
  return (Math.round(score * 10) / 10).toFixed(1);
}
