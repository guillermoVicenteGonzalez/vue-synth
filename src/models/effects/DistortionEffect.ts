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

export enum DistortionFilterTypes {
	lowpass = "lowpass",
	highpass = "highpass",
	bandpass = "bandpass",
	peaking = "peaking",
}

export const MAX_DISTORTION_MIX = 100;
export const MIN_DISTORTION_MIX = 0;
const DEFAULT_DISTORTION_MIX = 50;

export const MAX_DISTORTION_CUTOFF = 1000;
export const MIN_DISTORTION_CUTOFF = 0;
const DEFAULT_DISTORTION_CUTOFF = 350;

export const MIN_DISTORTION_NBITS = 0;
export const MAX_DISTORTION_NBITS = 16;
const DEFAULT_NBNITS = 8;

export const MIN_DISTORTION_THRESHOLD = 0;
export const MAX_DISTORTION_THRESHOLD = 1;
const DEFAULT_DISTORTION_THRESHOLD = 0.1;

const DEFAULT_DISTORTION_DRIVE = 1;
const DEFAULT_DISTORTION_TYPE = DistortionTypes.hardClip;
const DEFAULT_DISTORTION_FILTER_POSITION = DistortionFilterPositions.none;

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

	private _mix: number = 50;
	private _threshold: number = DEFAULT_DISTORTION_THRESHOLD;
	private _nBits: number = DEFAULT_NBNITS;
	private _drive: number = 1;
	private _samplesNumber: number = 0;

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
		this.mix = DEFAULT_DISTORTION_MIX;
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

	set filterType(t: DistortionFilterTypes) {
		this.distortionFilter.type = t as BiquadFilterType;
	}

	get filterType(): BiquadFilterType {
		return this.distortionFilter.type;
	}

	set filterPosition(f: DistortionFilterPositions) {
		if (this.disabled) return;
		if (f == this._filterPos) return;

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

	set threshold(t: number) {
		if (t > MAX_DISTORTION_THRESHOLD) this.threshold = MAX_DISTORTION_THRESHOLD;
		if (t < MIN_DISTORTION_THRESHOLD) this.threshold = MIN_DISTORTION_THRESHOLD;

		this._threshold = t;
		if (this._distortionType != DistortionTypes.bitcrush)
			this.makeDistortionCurve();
	}

	get threshold(): number {
		return this._threshold;
	}

	//nBits
	set nBits(b: number) {
		if (b > MAX_DISTORTION_NBITS) this.nBits = MAX_DISTORTION_NBITS;
		if (b < MIN_DISTORTION_NBITS) this.nBits = MIN_DISTORTION_NBITS;

		this._nBits = b;
		if (this._distortionType == DistortionTypes.bitcrush)
			this.makeDistortionCurve();
	}

	get nBits(): number {
		return this._nBits;
	}

	set distortionType(t: DistortionTypes) {
		this._distortionType = t;

		if (this.distortionNode) this.makeDistortionCurve();
	}

	get distortionType(): DistortionTypes {
		return this._distortionType;
	}

	set drive(d: number) {
		this._drive = d;
		this.makeDistortionCurve();
	}

	get drive() {
		return this._drive;
	}

	get distortionCurve(): Float32Array | null {
		return this.distortionNode.curve;
	}

	get samplesNumber() {
		return this._samplesNumber;
	}

	private makeDistortionCurve() {
		switch (this.distortionType as DistortionTypes) {
			case DistortionTypes.hardClip:
				this.distortionNode.curve = this.hardClipDistortionCurve();
				break;

			case DistortionTypes.softClip:
				this.distortionNode.curve = this.softClipDistortionCurve();
				break;

			case DistortionTypes.bitcrush:
				this.distortionNode.curve = this.bitCrusherDistortionWave();
				break;

			default:
				console.log("No option matched???");
		}
	}

	//gudermanian
	private softClipDistortionCurve() {
		const samplesNumber = this.context.sampleRate;
		this._samplesNumber = samplesNumber;

		const default_amount = 10;
		const amount = default_amount * this.drive;

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
		this._samplesNumber = samplesNumber;

		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = (2 * i) / samplesNumber - 1;
			if (Math.abs(x) > this.threshold)
				curve[i] = this.threshold * Math.sign(x);
			else curve[i] = x;
		}

		return curve;
	}

	//bitCrusher
	private bitCrusherDistortionWave() {
		const samplesNumber = 65536; //2¹⁶ ??
		this._samplesNumber = samplesNumber;
		const levelsNumber = Math.pow(2, this.nBits);

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

	resetEffect(): void {
		this._distortionType = DEFAULT_DISTORTION_TYPE;
		this._filterPos = DEFAULT_DISTORTION_FILTER_POSITION;
		this.drive = DEFAULT_DISTORTION_DRIVE;
		this.cutoff = DEFAULT_DISTORTION_CUTOFF;
		this.threshold = DEFAULT_DISTORTION_THRESHOLD;
		this.mix = DEFAULT_DISTORTION_MIX;
		this.nBits = DEFAULT_NBNITS;
	}
}
