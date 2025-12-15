import { LFO } from "../LFO";
import { AudioEffect } from "./AudioEffect";

export const MIN_DELAY = 0.0009;
export const MAX_DELAY = 0.05;

export const MAX_VOICES = 16;
const DEFAULT_VOICES = 6;

export const MIN_RATE = 0.01;
export const MAX_RATE = 2;
const DEFAULT_RATE = 0.014;

export const MIN_AMOUNT = 0.0001;
export const MAX_AMOUNT = 0.01;
const DEFAULT_AMOUNT = 0.008;

export const MIN_GAIN = 0;
export const MAX_GAIN = 1;

export const MIN_SPREAD = 0;
export const MAX_SPREAD = 100;

export const MIN_MIX = 0;
export const MAX_MIX = 100;

export const MIN_FEEDBACK = 0;
export const MAX_FEEDBACK = 0.1;
const DEFAULT_FEEDBACK = 0.05;

export const MIN_FEEDBACK_DELAY = 0.1;
export const MAX_FEEDBACK_DELAY = 0.5;

export const DEFAULT_FEEDBACK_DELAY = 0.25;
const DEFAULT_DELAY_1 = 0.003;
const DEFAULT_DELAY_2 = 0.013;
const DEFAULT_MIX = 50;

export default class ChorusEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;
	private voiceNodes: DelayNode[] = [];
	private lfo: LFO;
	private context: AudioContext;
	private dryGain: GainNode;
	private wetGain: GainNode;
	private filter: BiquadFilterNode;
	private feedbackGain: GainNode;
	private feedbackDelayNode: DelayNode;

	private _delay1: number = MIN_DELAY;
	private _delay2: number = MAX_DELAY;
	private _mix: number = DEFAULT_MIX;

	constructor(ctx: AudioContext) {
		super();
		this.context = ctx;
		this.lfo = new LFO(ctx);

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.dryGain = ctx.createGain();
		this.wetGain = this.context.createGain();
		this.filter = ctx.createBiquadFilter();
		this.feedbackGain = ctx.createGain();
		this.feedbackDelayNode = ctx.createDelay();

		this.inputNode.connect(this.dryGain);
		this.dryGain.connect(this.exitNode);

		this.filter.connect(this.feedbackGain);
		this.filter.connect(this.wetGain);
		this.wetGain.connect(this.exitNode);

		this.feedbackGain.connect(this.feedbackDelayNode);
		this.feedbackDelayNode.connect(this.inputNode);

		this.filter.type = "allpass";

		this.voices = DEFAULT_VOICES;
		this.rate = DEFAULT_RATE;
		this.amount = DEFAULT_AMOUNT;
		this.delay1 = DEFAULT_DELAY_1;
		this.delay2 = DEFAULT_DELAY_2;
		this.feedback = DEFAULT_FEEDBACK;
		this.feedbackDelay = DEFAULT_FEEDBACK_DELAY;
	}

	private addVoice() {
		if (this.voiceNodes.length >= MAX_VOICES) return;

		const delay = this.context.createDelay();

		this.inputNode.connect(delay);
		delay.connect(this.filter);
		this.lfo.connect(delay.delayTime);

		this.voiceNodes.push(delay);

		this.setupVoicesDelay();
	}

	private deleteVoice() {
		if (this.voiceNodes.length <= 1) return;

		const deletedDelay = this.voiceNodes.pop();
		if (!deletedDelay) return;

		this.inputNode.disconnect(deletedDelay);
		deletedDelay.disconnect(this.filter);
		this.lfo.disconnect(deletedDelay.delayTime);

		this.setupVoicesDelay();
	}

	set voices(v: number) {
		const voice_diff = v - this.voiceNodes.length;

		if (voice_diff < 0) {
			for (let i = 0; i < Math.abs(voice_diff); i++) {
				this.deleteVoice();
			}
		} else {
			for (let i = 0; i < Math.abs(voice_diff); i++) {
				this.addVoice();
			}
		}
	}

	get voices(): number {
		return this.voiceNodes.length;
	}

	/**
	 * Controls the speed (frequency) of the internal lfo
	 */
	set rate(r: number) {
		if (r > MAX_RATE) {
			this.lfo.frequency = MAX_RATE;
		}

		if (r < MIN_RATE) {
			this.lfo.frequency = MIN_RATE;
		}

		this.lfo.frequency = r;
	}

	get rate(): number {
		return this.lfo.frequency;
	}

	/**
	 * Determines how extreme the pitch and time modulation is
	 * For now just the time modulation e.g the amplitude of the LFO
	 */
	set amount(a: number) {
		this.lfo.amplitude = a;
	}

	get amount(): number {
		return this.lfo.amplitude;
	}

	set delay1(d: number) {
		if (d < MIN_DELAY) {
			this.delay1 = MIN_DELAY;
			return;
		}

		if (d > MAX_DELAY) {
			this.delay1 = MAX_DELAY;
			return;
		}

		if (d > this.delay2) {
			this.delay1 = this.delay2;
			return;
		}

		this._delay1 = d;
		this.setupVoicesDelay();
	}

	get delay1(): number {
		return this._delay1;
	}

	set delay2(d: number) {
		if (d < MIN_DELAY) {
			this.delay2 = MIN_DELAY;
			return;
		}

		if (d > MAX_DELAY) {
			this.delay2 = MAX_DELAY;
			return;
		}

		if (d < this.delay1) {
			this.delay2 = this.delay1;
			return;
		}

		this._delay2 = d;
		this.setupVoicesDelay();
	}

	get delay2(): number {
		return this._delay2;
	}

	set mix(m: number) {
		if (m > MAX_MIX) {
			this.mix = MAX_GAIN;
		}

		if (m < MIN_MIX) {
			this.mix = MIN_GAIN;
		}

		this._mix = m;
		this.wetGain.gain.value = this._mix / 100;
		this.dryGain.gain.value = (MAX_MIX - this._mix) / 100;
	}

	get mix(): number {
		return this._mix;
	}

	set filterType(t: BiquadFilterType) {
		this.filter.type = t;
	}

	get filterType(): BiquadFilterType {
		return this.filter.type;
	}

	set filterCuttof(c: number) {
		this.filter.frequency.value = c;
	}

	get filterCuttof(): number {
		return this.filter.frequency.value;
	}

	private setupVoicesDelay() {
		const delayIncrement = (this.delay2 - this.delay1) / this.voices;

		this.voiceNodes.forEach((d: DelayNode, index: number) => {
			d.delayTime.value = this.delay1 + delayIncrement * index;
		});
	}

	set feedback(f: number) {
		if (f < MIN_FEEDBACK) {
			this.feedback = MIN_FEEDBACK;
		}

		if (f > MAX_FEEDBACK) {
			this.feedback = MAX_FEEDBACK;
		}

		this.feedbackGain.gain.value = f;
	}

	get feedback(): number {
		return this.feedbackGain.gain.value;
	}

	set feedbackDelay(d: number) {
		this.feedbackDelayNode.delayTime.value = d;
	}

	get feedbackDelay(): number {
		return this.feedbackDelayNode.delayTime.value;
	}

	protected onDisable(): void {
		try {
			this.wetGain.disconnect(this.exitNode);
			this.feedbackDelayNode.disconnect(this.inputNode);
			this.wetGain.gain.value = 0;
			this.dryGain.gain.value = 1;
		} catch (err) {
			console.error(err);
		}
	}

	protected onEnable(): void {
		try {
			this.mix = this._mix;
			this.wetGain.connect(this.exitNode);
			this.feedbackDelayNode.connect(this.inputNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected resetEffect(): void {
		this.voices = DEFAULT_VOICES;
		this.rate = DEFAULT_RATE;
		this.amount = DEFAULT_AMOUNT;
		this.delay1 = DEFAULT_DELAY_1;
		this.delay2 = DEFAULT_DELAY_2;
		this.feedback = DEFAULT_FEEDBACK;
		this.feedbackDelay = DEFAULT_FEEDBACK_DELAY;
	}
}
