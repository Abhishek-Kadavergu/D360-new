// Web Audio API sound engine — smooth, pleasant, professional
class SoundEngine {
  private ctx: AudioContext | null = null;
  private initialized = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  async init() {
    if (this.initialized) return;
    const ctx = this.getContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    this.initialized = true;
  }

  // Gentle chime for step transitions
  playTransition() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Soft bell tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.3);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);

    // Subtle harmonic
    const h = ctx.createOscillator();
    const hg = ctx.createGain();
    h.type = "sine";
    h.frequency.setValueAtTime(1320, now);
    h.frequency.exponentialRampToValueAtTime(990, now + 0.25);
    hg.gain.setValueAtTime(0, now);
    hg.gain.linearRampToValueAtTime(0.015, now + 0.02);
    hg.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    h.connect(hg).connect(ctx.destination);
    h.start(now);
    h.stop(now + 0.4);
  }

  // Soft click for node connections
  playNodeConnect() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Elegant reveal — warm ascending tones
  playIgnition() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Warm pad swell
    const notes = [220, 330, 440, 550, 660];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = now + i * 0.3;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.03, start + 0.2);
      gain.gain.setValueAtTime(0.03, start + 1);
      gain.gain.linearRampToValueAtTime(0, start + 2.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 2.5);
    });

    // Final shimmer
    const shimmer = ctx.createOscillator();
    const sGain = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(1760, now + 1.5);
    shimmer.frequency.exponentialRampToValueAtTime(880, now + 3.5);
    sGain.gain.setValueAtTime(0, now + 1.5);
    sGain.gain.linearRampToValueAtTime(0.02, now + 2);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
    shimmer.connect(sGain).connect(ctx.destination);
    shimmer.start(now + 1.5);
    shimmer.stop(now + 3.5);
  }

  // Soft ambient pad
  playAmbientHum(duration: number = 5) {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    [110, 165, 220].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.008, now + 2);
      gain.gain.setValueAtTime(0.008, now + duration - 2);
      gain.gain.linearRampToValueAtTime(0, now + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  // Gentle whoosh
  playWhoosh() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const noise = ctx.createBufferSource();
    const len = ctx.sampleRate * 0.3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1);
    }
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.1);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.25);
    filter.Q.value = 1;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.3);
  }
}

export const soundEngine = new SoundEngine();
