import type Wave from './wave';

export default class AudioModule {
  name: string;
  wave: Wave;
  oscillator: OscillatorNode;
  context: AudioContext;
  gain: GainNode;
  effects: AudioNode[];
<<<<<<< HEAD
<<<<<<< HEAD
  end: AudioNode; //last node before the gain ganancia el penultimo
  exit: AudioNode;
  disabled: Boolean;
<<<<<<< HEAD

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
    this.disabled = false;
=======
  end: AudioNode;
=======
  end: AudioNode; //last node before the gain ganancia el penultimo
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
  exit: AudioNode;
=======
>>>>>>> 3634227 (disabled functionality)

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
<<<<<<< HEAD
>>>>>>> 1a249fc (wave collection (unused) + filter management)
=======
    this.disabled = false;
>>>>>>> 3634227 (disabled functionality)

    this.effects = [];

    this.oscillator = this.context.createOscillator();
    this.oscillator.frequency.value = this.wave.getFrequency();
<<<<<<< HEAD
<<<<<<< HEAD
    this.oscillator.start();
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.end = this.oscillator;

    ex ? this.exit = ex : this.exit = this.context.destination
    this.gain.connect(this.exit, 0, 2);
=======
=======
    this.oscillator.start();
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.end = this.oscillator;

<<<<<<< HEAD
    this.end = this.gain;
    this.exit = ex;
    this.end.connect(ex);
>>>>>>> 1a249fc (wave collection (unused) + filter management)
=======
    ex ? this.exit = ex : this.exit = this.context.destination
    this.gain.connect(this.exit, 0, 2);
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
  }

  updateOscillator() {
    this.oscillator.frequency.value = this.wave.getFrequency();
    this.oscillator.type = this.wave.getForm();
    this.gain.gain.setTargetAtTime(this.wave.getAmplitude() / 50, this.context.currentTime, 0);
  }

  attachEffect(nEffect: AudioNode) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.end.disconnect(this.gain);
    this.end.connect(nEffect);
    this.end = nEffect;
    this.end.connect(this.gain);
=======
    this.end.disconnect(this.exit);
    this.end.connect(nEffect);
    this.end = nEffect;
    this.end.connect(this.exit);
>>>>>>> 1a249fc (wave collection (unused) + filter management)
=======
    this.end.disconnect(this.gain);
    this.end.connect(nEffect);
    this.end = nEffect;
    this.end.connect(this.gain);
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)

    this.effects.push(nEffect);
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9f97c7a (attach effects works)
  detachEffect(effect?: AudioNode): void {
    if (this.effects.length == 0) {
      console.log("effects are empty")
      return
    }

<<<<<<< HEAD
=======
  detachEffect(effect?: AudioNode) {
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
=======
>>>>>>> 9f97c7a (attach effects works)
    let index = this.effects.length - 1
    if (effect != null) {
      index = this.effects.indexOf(effect);
    }
<<<<<<< HEAD

    //if no parameter or the effect passed is the last one.
    if (effect == null || index >= this.effects.length - 1) {
      let detached = this.effects.pop()
      detached?.disconnect(this.gain)
      this.effects.length > 0
        ? this.end = this.effects[this.effects.length - 1]
        : this.end = this.oscillator;
    } else {
      this.effects[index].disconnect(this.effects[index + 1])
      this.effects[index - 1].connect(this.effects[index + 1])
      this.effects.splice(index, 1)
    }
  }

  connectExit(nExit: AudioNode) {
=======
  detachEffect(effect: AudioNode) {
    if (effect == null) {
      let tempEff = this.effects.pop();
      tempEff?.disconnect(this.exit);
=======
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)

    //if no parameter or the effect passed is the last one.
    if (effect == null || index >= this.effects.length - 1) {
      let detached = this.effects.pop()
      detached?.disconnect(this.gain)
      this.effects.length > 0
        ? this.end = this.effects[this.effects.length - 1]
        : this.end = this.oscillator;
    } else {
      this.effects[index].disconnect(this.effects[index + 1])
      this.effects[index - 1].connect(this.effects[index + 1])
      this.effects.splice(index, 1)
    }
  }

<<<<<<< HEAD
  changeExit(nExit: AudioNode) {
>>>>>>> 1a249fc (wave collection (unused) + filter management)
=======
  connectExit(nExit: AudioNode) {
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
    this.end.disconnect(this.exit);
    this.end.connect(nExit);
    this.exit = nExit;
  }
<<<<<<< HEAD
<<<<<<< HEAD

  unplugExit() {
    this.end.disconnect(this.exit)
  }

  plugExit() {
    this.end.connect(this.exit)
  }

  unplugOscillator() {
    this.oscillator.disconnect(this.gain)
  }

  plugOscillator() {
    this.oscillator.connect(this.gain)
  }
=======
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)

  unplugExit() {
    this.end.disconnect(this.exit)
  }

  plugExit() {
    this.end.connect(this.exit)
  }

  unplugOscillator() {
    this.oscillator.disconnect(this.gain)
  }

  plugOscillator() {
    this.oscillator.connect(this.gain)
  }

  toggleMute(flag?: boolean) {
    flag ? this.gain.gain.value = 0 : this.gain.gain.value = this.wave.getAmplitude() / 50
  }

  destroyModule() {
    this.oscillator.stop();
    this.gain.disconnect(this.exit)
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3634227 (disabled functionality)


  toggleModule(flag: Boolean) {
    this.disabled = !flag
    this.disabled
      ? this.unplugOscillator()
      : this.plugOscillator()
  }
<<<<<<< HEAD
=======
>>>>>>> 1a249fc (wave collection (unused) + filter management)
=======
>>>>>>> 2a37070 (refactor with data structs: create delete and update wave)
=======
>>>>>>> 3634227 (disabled functionality)
}
