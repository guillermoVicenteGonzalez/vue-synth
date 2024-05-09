import type Wave from './wave';

export default class AudioModule {
  name: string;
  wave: Wave;
  oscillator: OscillatorNode;
  context: AudioContext;
  gain: GainNode;
  effects: AudioNode[];
  end: AudioNode;
  exit: AudioNode;

  constructor(n: string = 'default', w: Wave, ctx: AudioContext, ex: AudioNode) {
    this.name = n;
    this.wave = w;
    this.context = ctx;

    this.effects = [];

    this.oscillator = this.context.createOscillator();
    this.oscillator.frequency.value = this.wave.getFrequency();
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);

    this.end = this.gain;
    this.exit = ex;
    this.end.connect(ex);
  }

  updateOscillator() {
    this.oscillator.frequency.value = this.wave.getFrequency();
    this.oscillator.type = this.wave.getForm();
    this.gain.gain.setTargetAtTime(this.wave.getAmplitude() / 50, this.context.currentTime, 0);
  }

  attachEffect(nEffect: AudioNode) {
    this.end.disconnect(this.exit);
    this.end.connect(nEffect);
    this.end = nEffect;
    this.end.connect(this.exit);

    this.effects.push(nEffect);
  }

  detachEffect(effect: AudioNode) {
    if (effect == null) {
      let tempEff = this.effects.pop();
      tempEff?.disconnect(this.exit);

      let lastEff = this.effects[this.effects.length];
      lastEff.disconnect(tempEff);
    }
  }

  changeExit(nExit: AudioNode) {
    this.end.disconnect(this.exit);
    this.end.connect(nExit);
    this.exit = nExit;
  }
}
