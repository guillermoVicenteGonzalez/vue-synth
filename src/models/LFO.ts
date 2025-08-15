import Wave, { waveForms } from "./wave";

export class LFO {
	private _wave: Wave;
	private osc: OscillatorNode;
	private gain: GainNode;

	private _disabled: boolean = false;
	destination: AudioParam | null = null;

	constructor(ctx: AudioContext) {
		this.osc = ctx.createOscillator();
		this.gain = ctx.createGain();
		this._wave = new Wave(1, 1, 0);

		this.osc.frequency.value = this._wave.frequency;
		this.gain.gain.value = this._wave.amplitude;
		this.osc.start();
		this.osc.connect(this.gain);
	}

	set frequency(f: number) {
		this._wave.frequency = f;
		this.osc.frequency.value = this._wave.frequency;
	}

	get frequency(): number {
		return this._wave.frequency;
	}

	set amplitude(a: number) {
		this._wave.amplitude = a;
		this.gain.gain.value = this._wave.amplitude;
		// this.gain.gain.value = this._wave.amplitude / 50;
	}

	get amplitude(): number {
		return this._wave.amplitude;
	}

	get wave(): Wave {
		return this._wave;
	}

	set waveform(f: waveForms) {
		this._wave.form = f;
		this.osc.type = this._wave.form;
	}

	get waveform(): waveForms {
		return this._wave.form;
	}

	connect(d: AudioParam) {
		// if (this.destination != null) {
		// 	console.warn("Destination is not null");
		// 	this.gain.disconnect();
		// }
		this.disconnect();

		this.destination = d;
		this.gain.connect(this.destination);
	}

	disconnect() {
		if (this.destination != null) {
			try {
				this.gain.disconnect(this.destination);
			} catch (err) {
				console.log(err);
			}
		}

		this.destination = null;
	}

	set disabled(f: boolean) {
		this._disabled = f;

		if (this._disabled) {
			this.osc.disconnect(this.gain);
		} else {
			this.osc.connect(this.gain);
		}
	}

	get disabled() {
		return this._disabled;
	}

	get oscillator() {
		return this.osc;
	}

	get exit() {
		return this.gain;
	}
}
