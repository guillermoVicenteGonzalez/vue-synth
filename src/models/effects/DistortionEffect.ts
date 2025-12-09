import { AudioEffect } from "./AudioEffect";

export enum DistortionTypes {
	softClip = "Soft Clip",
	hardClip = "Hard Clip",
	bitcrush = "Bit Crush",
}

export enum DistortionFilterPositions {
	pre = "Pre",
	post = "Post",
	none = "None",
}

export const MAX_DISTORTION_MIX = 100;
export const MIN_DISTORTION_MIX = 0;

export const MAX_DISTORTION_CUTOFF = 24000;
export const MIN_DISTORTION_CUTOFF = 0;

/**
 * If filter option is pre => input => filter => distortion => wetGain
 * If filter option is none => input => distortion => wetGain
 * If _filterPos is post => input => distortion => filter => wetGain
 */

export default class DistortionEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;
	private _distortionType: DistortionTypes = DistortionTypes.hardClip;
	private distortionFilter: BiquadFilterNode;
	private _filterPos: DistortionFilterPositions =
		DistortionFilterPositions.none;
	private wetGain: GainNode;
	private dryGain: GainNode;
	private distortionNode: WaveShaperNode;
	private context: AudioContext;

	private _mix: number = 0;

	constructor(ctx: AudioContext) {
		super();
		this.context = ctx;

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.distortionFilter = ctx.createBiquadFilter();
		this.distortionNode = ctx.createWaveShaper();
		this.wetGain = ctx.createGain();
		this.dryGain = ctx.createGain();

		this.makeDistortionCurve();

		this.inputNode.connect(this.dryGain);
		this.inputNode.connect(this.distortionNode);
		this.distortionNode.connect(this.wetGain);

		this.wetGain.connect(this.exitNode);
		this.dryGain.connect(this.exitNode);

		this.distortionFilter.type = "highpass";
		this.mix = 50;
		this.filterPosition = DistortionFilterPositions.none;
		this.distortionNode.oversample = "4x";
	}

	set mix(m: number) {
		if (this.disabled) return;

		if (m > MAX_DISTORTION_MIX) this.mix = MAX_DISTORTION_MIX;
		if (m < MIN_DISTORTION_MIX) this.mix = MIN_DISTORTION_MIX;

		this._mix = m;
		this.wetGain.gain.value = this._mix / 100;
		this.dryGain.gain.value = (MAX_DISTORTION_MIX - this._mix) / 100;
	}

	get mix(): number {
		return this._mix;
	}

	set cutoff(f: number) {
		if (this.disabled) return;

		if (f < MIN_DISTORTION_CUTOFF) this.cutoff = MIN_DISTORTION_CUTOFF;
		if (f > MAX_DISTORTION_CUTOFF) this.cutoff = MAX_DISTORTION_CUTOFF;

		this.distortionFilter.frequency.value = f;
	}

	get cutoff() {
		return this.distortionFilter.frequency.value;
	}

	set filterPosition(f: DistortionFilterPositions) {
		if (this.disabled) return;
		if (f == this._filterPos) return;

		console.log("Setting filter position");

		if (this._filterPos == DistortionFilterPositions.pre) {
			this.inputNode.disconnect(this.distortionFilter);
			this.inputNode.connect(this.distortionNode);

			if (f == DistortionFilterPositions.post) {
				this.distortionNode.disconnect(this.wetGain);
				this.distortionNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.wetGain);
			}

			if (f == DistortionFilterPositions.none) {
				this.inputNode.connect(this.distortionNode);
				this.distortionNode.connect(this.wetGain);
			}
		}

		if (this._filterPos == DistortionFilterPositions.post) {
			try {
				this.distortionNode.disconnect(this.distortionFilter);

				if (f == DistortionFilterPositions.pre) {
					this.inputNode.disconnect(this.distortionNode);
					this.inputNode.connect(this.distortionFilter);
					this.distortionFilter.connect(this.distortionNode);
					this.distortionNode.connect(this.wetGain);
				}

				if (f == DistortionFilterPositions.none) {
					this.distortionNode.connect(this.wetGain);
				}
			} catch (err) {
				console.error(err);
			}
		}

		if (this._filterPos == DistortionFilterPositions.none) {
			if (f == DistortionFilterPositions.pre) {
				this.inputNode.disconnect(this.distortionNode);
				this.inputNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.distortionNode);
			}

			if (f == DistortionFilterPositions.post) {
				this.distortionNode.disconnect(this.wetGain);
				this.distortionNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.wetGain);
			}
		}

		this._filterPos = f;
	}

	get filterPosition() {
		return this._filterPos;
	}

	set distortionType(t: DistortionTypes) {
		this._distortionType = t;

		if (this.distortionNode) this.makeDistortionCurve();
	}

	get distortionType(): DistortionTypes {
		return this._distortionType;
	}

	private makeDistortionCurve() {
		console.log(`${this.distortionType == DistortionTypes.softClip}`);

		switch (this.distortionType as DistortionTypes) {
			case DistortionTypes.hardClip:
				console.log("This is hard clip");
				this.distortionNode.curve = this.hardClipDistortionCurve();
				break;

			case DistortionTypes.softClip:
				console.log("Estoy aqui");
				this.distortionNode.curve = this.softClipDistortionCurve(400);
				break;

			case DistortionTypes.bitcrush:
				console.log("This is bitcrush");
				this.distortionNode.curve = this.bitCrusherDistortionWave();
				break;

			default:
				console.log("No option matched???");
		}
	}

	private softClip() {
		const samplesNumber = this.context.sampleRate;
		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = i - Math.pow(i, 3) / 3;
			if (x > 1) curve[i] = (Math.sign(x) * 2) / 3;
			else curve[i] = x;
		}

		return curve;
	}

	private hiperbolicSoftClip() {
		const samplesNumber = this.context.sampleRate;
		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			curve[i] = Math.tanh(i);
		}

		return curve;
	}

	//gudermanian
	private softClipDistortionCurve(amount: number) {
		const samplesNumber = this.context.sampleRate;

		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = (i * 2) / samplesNumber - 1;
			curve[i] =
				((3 + amount) * Math.atan(Math.sinh(x * 0.25) * 5)) /
				(Math.PI + amount * Math.abs(x));
		}

		return curve;
	}

	//hardClip
	private hardClipDistortionCurve() {
		// const samplesNumber = 100;
		const samplesNumber = this.context.sampleRate;
		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = (2 * i) / samplesNumber - 1;
			if (Math.abs(x) > 1) curve[i] = 1 * Math.sign(x);
			else curve[i] = x;
		}

		return curve;
	}

	//bitCrusher
	private bitCrusherDistortionWave() {
		const samplesNumber = 65536; //2¹⁶ ??
		const levelsNumber = Math.pow(2, 16);

		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = (i * levelsNumber) / samplesNumber;
			curve[i] = (2 * Math.floor(x) + 1) / levelsNumber - 1;
		}

		return curve;
	}

	protected onDisable(): void {
		this.wetGain.disconnect(this.exitNode);
		this.dryGain.gain.value = 1;
	}

	protected onEnable(): void {
		this.wetGain.connect(this.exitNode);
		this.mix = this.mix;
	}
}
