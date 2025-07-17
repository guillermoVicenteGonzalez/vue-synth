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
		this.gain.gain.value = this._wave.amplitude / 50;
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
		if (this.destination != null) this.gain.disconnect(this.destination);

		this.destination = d;
		this.gain.connect(this.destination);
		this.osc.connect(d);
	}

	disconnect(d?: AudioParam) {
		if (this.destination == null) {
			console.error("The LFO is not connected to any node");
			return;
		}

		if (!d && this.destination != null) {
			this.gain.disconnect(this.destination);
			return;
		}

		if (d != this.destination) {
			console.error(
				"The provided destination and the current connection are different"
			);
		}

		this.gain.disconnect(this.destination);
	}
}
