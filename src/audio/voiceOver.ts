/**
 * CIS Got Latent - Voice-Over Engine
 * Uses Web Speech API (speechSynthesis) with distinct character profiles.
 * Provides onSubtitle callback so captions are visible on screen.
 */

type SubtitleListener = (text: string, speaker: string) => void;

class VoiceOverEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isMuted: boolean = false;
  private voiceVolume: number = 0.9;
  private isEnabled: boolean = true;
  private listeners: SubtitleListener[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public subscribeSubtitles(fn: SubtitleListener): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private emitSubtitle(text: string, speaker: string) {
    this.listeners.forEach((listener) => listener(text, speaker));
  }

  public setVolume(vol: number) {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Speaks a line with specific character settings.
   * Returns a promise that resolves when speech finishes or after a safe timeout.
   */
  public speak(
    text: string,
    speaker: string = 'HOST',
    pitch: number = 1.0,
    rate: number = 1.05
  ): Promise<void> {
    this.emitSubtitle(text, speaker);

    return new Promise((resolve) => {
      if (!this.synth || this.isMuted || !this.isEnabled || this.voiceVolume === 0) {
        // Fallback timing for reading subtitle if voice is disabled
        const readTime = Math.min(3000, Math.max(1200, text.length * 45));
        setTimeout(resolve, readTime);
        return;
      }

      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.voiceVolume;
      utterance.pitch = pitch;
      utterance.rate = rate;

      // Find an Indian English voice or general English voice if available
      const indianVoice = this.voices.find(
        (v) => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')
      );
      const englishVoice = this.voices.find((v) => v.lang.startsWith('en'));
      if (indianVoice) {
        utterance.voice = indianVoice;
      } else if (englishVoice) {
        utterance.voice = englishVoice;
      }

      let resolved = false;
      const done = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      utterance.onend = done;
      utterance.onerror = done;

      // Safety timeout: in some browsers onend doesn't fire
      const maxDuration = Math.max(2500, text.length * 90);
      setTimeout(done, maxDuration);

      this.currentUtterance = utterance;
      try {
        this.synth.speak(utterance);
      } catch {
        done();
      }
    });
  }
}

export const voiceOver = new VoiceOverEngine();
