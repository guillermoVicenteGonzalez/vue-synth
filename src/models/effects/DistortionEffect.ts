import { AudioEffect } from "./AudioEffect";
/**
 * If filter option is pre => input => filter => distortion => wetGain
 * If filter option is none => input => distortion => wetGain
 * If filterOPtion is post => input => distortion => filter => wetGain
 */

type DistortionType =
	| "Soft Clip"
	| "Hard Clip"
	| "Linear Clip"
	| "Sine Fold"
	| "Bit Crush"
	| "Down Sample";

type DistortionFilterOptions = "pre" | "post" | "none";

const MAX_DISTORTION_MIX = 100;
const MIN_DISTORTION_MIX = 0;

const MAX_DISTORTION_CUTOFF = 24000;
const MIN_DISTORTION_CUTOFF = 0;

export default class DistortionEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;
	private distortionType: DistortionType = "Soft Clip";
	private distortionFilter: BiquadFilterNode;
	private filterOption: DistortionFilterOptions = "none";
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

		this.mix = 50;
	}

	private makeDistortionCurve() {
		switch (this.distortionType) {
			case "Hard Clip":
				this.distortionNode.curve = this.hardClipDistortionCurve(400);
				break;

			case "Soft Clip":
				this.distortionNode.curve = this.softClipDistortionCurve(400);
				break;

			case "Bit Crush":
				this.distortionNode.curve = this.bitCrusherDistortionWave();
		}
	}

	//softClip ??
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
		const samplesNumber = 100;
		const curve = new Float32Array(samplesNumber);

		for (let i = 0; i < samplesNumber; ++i) {
			const x = (2 * i) / samplesNumber - 1;
			if (Math.abs(x) > 0.5) curve[i] = 0.5 * Math.sign(x);
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

	set filterType(f: DistortionFilterOptions) {
		if (this.disabled) return;
		if (f == this.filterOption) return;

		if (this.filterOption == "pre") {
			this.inputNode.disconnect(this.distortionFilter);
			this.inputNode.connect(this.distortionNode);

			if (f == "post") {
				this.distortionNode.disconnect(this.wetGain);
				this.distortionNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.wetGain);
			}

			if (f == "none") {
				this.inputNode.connect(this.distortionNode);
				this.distortionNode.connect(this.wetGain);
			}
		}

		if (this.filterOption == "post") {
			try {
				this.distortionNode.disconnect(this.distortionFilter);

				if (f == "pre") {
					this.inputNode.disconnect(this.distortionNode);
					this.inputNode.connect(this.distortionFilter);
					this.distortionFilter.connect(this.distortionNode);
					this.distortionNode.connect(this.wetGain);
				}

				if (f == "none") {
					this.distortionNode.connect(this.wetGain);
				}
			} catch (err) {
				console.error(err);
			}
		}

		if (this.filterOption == "none") {
			if (f == "pre") {
				this.inputNode.disconnect(this.distortionNode);
				this.inputNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.distortionNode);
			}

			if (f == "post") {
				this.distortionNode.disconnect(this.wetGain);
				this.distortionNode.connect(this.distortionFilter);
				this.distortionFilter.connect(this.wetGain);
			}
		}

		this.filterOption = f;
	}

	protected onDisable(): void {}

	protected onEnable(): void {}
}
