import { soundEffects } from './soundEffects';
import { voiceOver } from './voiceOver';
import { AudioSettings } from '../types/game';

const STORAGE_KEY = 'cis_got_latent_audio_settings';

const DEFAULT_SETTINGS: AudioSettings = {
  muted: false,
  masterVolume: 0.9,
  voiceVolume: 0.85,
  sfxVolume: 0.85,
  ambienceVolume: 0.4,
  speechEnabled: true,
};

class AudioManager {
  private settings: AudioSettings = DEFAULT_SETTINGS;
  private ambienceOsc: OscillatorNode | null = null;
  private ambienceGain: GainNode | null = null;
  private ambienceCtx: AudioContext | null = null;
  private isAmbienceRunning: boolean = false;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {}
    this.applySettings();
  }

  public saveSettings(newSettings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {}
    this.applySettings();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  private applySettings() {
    const effectiveMute = this.settings.muted;
    const effectiveSfx = effectiveMute ? 0 : this.settings.sfxVolume * this.settings.masterVolume;
    const effectiveVoice = effectiveMute ? 0 : this.settings.voiceVolume * this.settings.masterVolume;

    soundEffects.setVolume(effectiveSfx);
    soundEffects.setMuted(effectiveMute);

    voiceOver.setVolume(effectiveVoice);
    voiceOver.setMuted(effectiveMute);
    voiceOver.setEnabled(this.settings.speechEnabled);

    if (this.ambienceGain && this.ambienceCtx) {
      const effAmb = effectiveMute ? 0 : this.settings.ambienceVolume * this.settings.masterVolume * 0.15;
      this.ambienceGain.gain.setValueAtTime(effAmb, this.ambienceCtx.currentTime);
    }
  }

  public startAmbience() {
    if (this.isAmbienceRunning) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ambienceCtx = new AudioCtx();
      this.ambienceGain = this.ambienceCtx.createGain();
      const effAmb = this.settings.muted ? 0 : this.settings.ambienceVolume * this.settings.masterVolume * 0.12;
      this.ambienceGain.gain.setValueAtTime(effAmb, this.ambienceCtx.currentTime);
      this.ambienceGain.connect(this.ambienceCtx.destination);

      // Warm background theater rumble / AC hum
      const osc = this.ambienceCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ambienceCtx.currentTime); // A1 note
      osc.connect(this.ambienceGain);
      osc.start();
      this.ambienceOsc = osc;
      this.isAmbienceRunning = true;
    } catch {}
  }

  public toggleMute() {
    this.saveSettings({ muted: !this.settings.muted });
  }
}

export const audioManager = new AudioManager();
