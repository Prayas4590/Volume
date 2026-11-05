/**
 * CIS Got Latent - Web Audio Synthesizer
 * High-fidelity reality show sound effects generated completely client-side.
 */

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxVolume: number = 0.8;
  private isMuted: boolean = false;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : this.sfxVolume;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
  }

  // --- BUTTON CLICK ---
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // --- SCORE NUMBER TICK ---
  public playTick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.03);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // --- JUDGE REVEAL CHIME ---
  public playJudgeChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Layered bells / reality-show chord (F# - A# - C#)
    const freqs = [587.33, 739.99, 880.0, 1174.66];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);

      gain.gain.setValueAtTime(0.25, now + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.03);
      osc.stop(now + idx * 0.03 + 0.8);
    });
  }

  // --- SUSPENSE DRONE ---
  public startSuspenseDrone() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    this.stopSuspenseDrone();

    const now = this.ctx.currentTime;
    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();

    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.setValueAtTime(65.41, now); // C2 low drone

    // Low pass filter for dark rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, now);
    filter.frequency.linearRampToValueAtTime(280, now + 4);

    this.droneGain.gain.setValueAtTime(0.01, now);
    this.droneGain.gain.linearRampToValueAtTime(0.25, now + 1.2);

    this.droneOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    this.droneOsc.start(now);
  }

  public stopSuspenseDrone() {
    if (this.droneOsc && this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      const osc = this.droneOsc;
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      }, 350);
      this.droneOsc = null;
      this.droneGain = null;
    }
  }

  // --- DRUMROLL ---
  public playDrumroll(durationSeconds: number = 2.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const steps = Math.floor(durationSeconds * 28);
    const interval = durationSeconds / steps;

    for (let i = 0; i < steps; i++) {
      const hitTime = now + i * interval;
      const progress = i / steps; // 0 to 1
      const noise = this.ctx.createBufferSource();
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let j = 0; j < bufferSize; j++) {
        output[j] = Math.random() * 2 - 1;
      }
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600 + progress * 400;
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      const volume = 0.05 + progress * 0.35;
      gain.gain.setValueAtTime(volume, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(hitTime);
      noise.stop(hitTime + 0.04);
    }

    // Final Cymbal / Hit at the end
    const crashTime = now + durationSeconds;
    const crashNoise = this.ctx.createBufferSource();
    const crashLen = Math.floor(this.ctx.sampleRate * 0.8);
    const crashBuf = this.ctx.createBuffer(1, crashLen, this.ctx.sampleRate);
    const crashData = crashBuf.getChannelData(0);
    for (let j = 0; j < crashLen; j++) {
      crashData[j] = Math.random() * 2 - 1;
    }
    crashNoise.buffer = crashBuf;

    const crashFilter = this.ctx.createBiquadFilter();
    crashFilter.type = 'highpass';
    crashFilter.frequency.value = 3500;

    const crashGain = this.ctx.createGain();
    crashGain.gain.setValueAtTime(0.4, crashTime);
    crashGain.gain.exponentialRampToValueAtTime(0.001, crashTime + 0.7);

    crashNoise.connect(crashFilter);
    crashFilter.connect(crashGain);
    crashGain.connect(this.masterGain);

    crashNoise.start(crashTime);
    crashNoise.stop(crashTime + 0.7);
  }

  // --- VICTORY FANFARE & CHEERING ---
  public playVictory() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    this.stopSuspenseDrone();
    const now = this.ctx.currentTime;

    // Ascending brass notes: C4, E4, G4, C5, E5, G5
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const noteTime = now + idx * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteTime);

      const dur = idx === notes.length - 1 ? 1.5 : 0.2;
      gain.gain.setValueAtTime(0.28, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + dur);
    });

    // Crowd applause sound synthesis
    this.playApplause(now + 0.5, 3.0);
  }

  // --- FAILURE BUZZER & SIGH ---
  public playFailure() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    this.stopSuspenseDrone();
    const now = this.ctx.currentTime;

    // Reality show buzzer dissonance (two harsh square waves: 140Hz and 147Hz)
    [140, 147].forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    });

    // Sad "womp womp" slide
    setTimeout(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.8);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.8);
    }, 400);
  }

  // --- SYNTHESIZED APPLAUSE ---
  private playApplause(startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const claps = Math.floor(duration * 20);
    for (let i = 0; i < claps; i++) {
      const hitTime = startTime + Math.random() * duration;
      const noise = this.ctx.createBufferSource();
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 800;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(hitTime);
      noise.stop(hitTime + 0.05);
    }
  }
}

export const soundEffects = new SoundEffectsEngine();
