import type Wave from './wave';

export default class AudioModule {
  name: string;
  wave: Wave;
  oscillator: OscillatorNode;
  context: AudioContext;
  gain: GainNode;
  effects: AudioNode[];
  end: AudioNode; //last node before the gain ganancia el penultimo
  exit: AudioNode;

  /**
   * 
   * @param n - name of the module
   * @param w - associated wave of the module ?
   * @param ctx - asociated context of the module
   * @param ex - default sound exit of the module (redundant, it is in the audio context)
   * * The gain node should always be the penultimate. This way effects are also affected by the gain
   */
  constructor(n: string = 'default', w: Wave, ctx: AudioContext, ex?: AudioNode) {
    this.name = n;
    this.wave = w;
    this.context = ctx;

    this.effects = [];

    this.oscillator = this.context.createOscillator();
    this.oscillator.frequency.value = this.wave.getFrequency();
    this.oscillator.start();
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.end = this.oscillator;

    ex ? this.exit = ex : this.exit = this.context.destination
    this.gain.connect(this.exit, 0, 2);
  }

  updateOscillator() {
    this.oscillator.frequency.value = this.wave.getFrequency();
    this.oscillator.type = this.wave.getForm();
    this.gain.gain.setTargetAtTime(this.wave.getAmplitude() / 50, this.context.currentTime, 0);
  }

  attachEffect(nEffect: AudioNode) {
    this.end.disconnect(this.gain);
    this.end.connect(nEffect);
    this.end = nEffect;
    this.end.connect(this.gain);

    this.effects.push(nEffect);
  }

  detachEffect(effect?: AudioNode) {
    let index = this.effects.length - 1
    if (effect != null) {
      index = this.effects.indexOf(effect);
    }

    //if no parameter or the effect passed is the last one.
    if (effect == null || index >= this.effects.length - 1) {
      let detached = this.effects.pop()
      detached?.disconnect(this.gain)
      let newLastEff = this.effects[this.effects.length]
      this.end = newLastEff
      this.end.connect(this.gain)
    } else {
      this.effects[index].disconnect(this.effects[index + 1])
      this.effects[index - 1].connect(this.effects[index + 1])
      this.effects.splice(index, 1)
    }
  }

  connectExit(nExit: AudioNode) {
    this.end.disconnect(this.exit);
    this.end.connect(nExit);
    this.exit = nExit;
  }

  toggleMute(flag?: boolean) {
    flag ? this.gain.gain.value = 0 : this.gain.gain.value = this.wave.getAmplitude() / 50
  }

  destroyModule() {
    this.oscillator.stop();
    this.gain.disconnect(this.exit)
  }
}
