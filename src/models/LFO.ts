import Wave, { waveForms } from "./wave";

export class LFO {
	private _wave: Wave;
	private osc: OscillatorNode;
	private gain: GainNode;

	private _disabled: boolean = false;
	destinations: AudioParam[] = [];

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
		// this.disconnect();

		// this.destination = d;
		// this.gain.connect(this.destination);
		try {
			this.gain.connect(d);
			this.destinations.push(d);
		} catch (err) {
			console.error(err);
		}
	}

	disconnectAll() {
		if (this.destinations.length == 0) return;
		if (this.destinations.length == 1) this.disconnect(this.destinations[0]);

		while (this.destinations.length > 0) {
			this.disconnect(this.destinations[this.destinations.length - 1]);
		}
	}

	disconnect(d: AudioParam) {
		if (this.destinations.length == 0) return;

		const paramIndex: number = this.destinations.indexOf(d);
		this.destinations.splice(paramIndex, 1);
		try {
			this.gain.disconnect(d);
		} catch (err) {
			console.error(err);
		}
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
