import { LFO } from "../LFO";
import { AudioEffect } from "./AudioEffect";

export const MIN_DELAY = 0.015;
export const MAX_DELAY = 0.05;

export const MAX_VOICES = 16;

export const MIN_RATE = 0.01;
export const MAX_RATE = 2;

export const MIN_AMOUNT = 0.0001;
export const MAX_AMOUNT = 0.01;

export const MIN_GAIN = 0;
export const MAX_GAIN = 1;

export const MIN_SPREAD = 0;
export const MAX_SPREAD = 100;

export default class ChorusEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;
	private voiceNodes: DelayNode[] = [];
	private lfo: LFO;
	private context: AudioContext;
	private chorusGain: GainNode;
	private _delay: number = MIN_DELAY;
	private _spread: number = 0;

	constructor(ctx: AudioContext) {
		super();
		this.context = ctx;
		this.lfo = new LFO(ctx);

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.inputNode.connect(this.exitNode);

		this.chorusGain = this.context.createGain();
		this.chorusGain.connect(this.exitNode);
		this.delay = MIN_DELAY;

		this.voices = 5;
		this.rate = 1;
		this.amount = 0.005;
	}

	private addVoice() {
		if (this.voiceNodes.length >= MAX_VOICES) return;

		const delay = this.context.createDelay();
		delay.delayTime.value = this.delay;

		this.inputNode.connect(delay);
		delay.connect(this.chorusGain);
		this.lfo.connect(delay.delayTime);

		this.voiceNodes.push(delay);
	}

	private deleteVoice() {
		if (this.voiceNodes.length <= 1) return;

		const deletedDelay = this.voiceNodes.pop();
		if (!deletedDelay) return;

		this.inputNode.disconnect(deletedDelay);
		deletedDelay.disconnect(this.chorusGain);
		this.lfo.disconnect(deletedDelay.delayTime);
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

	set delay(d: number) {
		this._delay = d;

		this.voiceNodes.forEach((delayNode: DelayNode) => {
			delayNode.delayTime.value = d;
		});
	}

	get delay(): number {
		return this._delay;
	}

	set feedback(f: number) {
		this.chorusGain.gain.value = f;
	}

	get feedback(): number {
		return this.chorusGain.gain.value;
	}

	/**
	 * Determines differences in delay between voices
	 */
	set spread(d: number) {
		if (d < MIN_SPREAD) {
			this.spread = MIN_SPREAD;
		}
		if (d > MAX_SPREAD) {
			this.spread = MAX_SPREAD;
		}

		this._spread = d;

		if (this.voices == 1) {
			this.voiceNodes.forEach((d: DelayNode) => {
				d.delayTime.value = this.delay;
			});
			return;
		}

		const totalDelay = (this.delay * this._spread) / 100;
		const delayIncrement = totalDelay / this.voices;

		this.voiceNodes.forEach((d: DelayNode, index) => {
			d.delayTime.value = delayIncrement * (index + 1);
		});
	}

	get spread(): number {
		return this._spread;
	}

	protected onDisable(): void {
		try {
			this.chorusGain.disconnect(this.exitNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected onEnable(): void {
		try {
			this.chorusGain.connect(this.exitNode);
		} catch (err) {
			console.error(err);
		}
	}
}
