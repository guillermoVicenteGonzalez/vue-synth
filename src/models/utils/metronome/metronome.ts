// interface MetronomeOptions {
// 	volume: number;
// 	tone: number;
// }

type MetronomeWorkerAction = "start" | "stop";

interface MetronomeWorkerMessage {
	type: MetronomeWorkerAction;
	interval?: number;
}

export const METRONOME_MAX_VOLUME = 100;
const METRONOME_DEFAULT_VOLUME = 20;

const SOUND_DURATION = 0.1;

const DEFAULT_METRONOME_PITCH = 440;
const SUB_BEAT_PITCH_DIVIDER = 2; //1 octave
export const MIN_METRONOME_PITCH = 200;
export const MAX_METRONOME_PITCH = 800;

export const MIN_METRONOME_BPM = 0;
export const MAX_METRONOME_BPM = 220;

export const MIN_METRONOME_BEATS = 1;
export const MAX_METRONOME_BEATS = 12;

const workerFunction = () => {
	let timerId: number | null;
	let intervalTime: number = 1000;

	function setupInterval(interval: number) {
		console.warn(`interval ${interval}`);
		postMessage("tick");
		timerId = setInterval(() => {
			postMessage("tick");
		}, interval);
	}

	self.onmessage = (event: MessageEvent<MetronomeWorkerMessage>) => {
		console.error("MESSAGE RECEIVED???");
		switch (event.data.type) {
			case "start":
				if (timerId) {
					console.error("Clearing timer");
					clearInterval(timerId);
					timerId = null;
				}
				if (event.data.interval) intervalTime = event.data.interval;
				console.error(`interval time ${intervalTime}`);
				setupInterval(intervalTime);
				break;

			case "stop":
				if (timerId) {
					clearInterval(timerId);
					timerId = null;
				}
		}
	};
};

function createWorkerUrl() {
	const codeToString = workerFunction.toString();
	const mainCode = codeToString.substring(
		codeToString.indexOf("{") + 1,
		codeToString.lastIndexOf("}")
	);
	const blob = new Blob([mainCode], { type: "application/javascript" });
	const worker_script = URL.createObjectURL(blob);
	return worker_script;
}

export default class Metronome {
	private gainNode: GainNode;
	private ctx: AudioContext;
	private _bpm: number = 60;
	private _volume: number = 1;
	private _sub_beats: number = 4;
	private worker: Worker;
	private _isPlaying: boolean = false;
	public waveForm: OscillatorNode["type"] = "square";
	private beatQueue: OscillatorNode[] = [];
	private _metronome_pitch: number = DEFAULT_METRONOME_PITCH;

	// TODO!: options?: MetronomeOptions
	constructor(context?: AudioContext) {
		this.ctx = context != null ? context : new AudioContext();
		this.gainNode = this.ctx.createGain();

		this.gainNode.connect(this.ctx.destination);

		if (!window.Worker) throw new Error("Unable to creater metronome worker");

		const workerScript = createWorkerUrl();
		this.worker = new Worker(workerScript);

		this.worker.onmessage = () => {
			this.playMetronomeTick(this.ctx.currentTime);
		};

		this.volume = METRONOME_DEFAULT_VOLUME;
	}

	set volume(v: number) {
		if (v > METRONOME_MAX_VOLUME) this.volume = METRONOME_MAX_VOLUME;

		this._volume = v / METRONOME_MAX_VOLUME;
		this.gainNode.gain.value = this._volume;
	}

	get volume() {
		return this._volume * METRONOME_MAX_VOLUME;
	}

	set bpm(b: number) {
		this._bpm = b;
		this.sendMessageToWorker({ type: "start", interval: this.period * 1000 });
		console.warn("MEssage sent");
	}

	get bpm() {
		return this._bpm;
	}

	get period() {
		return 60 / this.bpm;
	}

	get isPlaying() {
		return this._isPlaying;
	}

	set beats(b: number) {
		if (b > MAX_METRONOME_BEATS) this.beats = MAX_METRONOME_BEATS;
		if (b < MIN_METRONOME_BEATS) this.beats = MIN_METRONOME_BEATS;

		this._sub_beats = b;
	}

	get beats() {
		return this._sub_beats;
	}

	set pitch(p: number) {
		if (p > MAX_METRONOME_PITCH) this.pitch = MAX_METRONOME_PITCH;
		if (p < MIN_METRONOME_PITCH) this.pitch = MIN_METRONOME_PITCH;

		this._metronome_pitch = p;
	}

	get pitch() {
		return this._metronome_pitch;
	}

	private playBeat(time: number, frequency: number = 440) {
		const osc = this.ctx.createOscillator();
		osc.frequency.value = frequency;
		osc.type = this.waveForm;
		osc.connect(this.gainNode);

		osc.start(time);
		this.beatQueue.push(osc);
		osc.onended = () => {
			this.beatQueue.splice(this.beatQueue.indexOf(osc), 1);
		};
		osc.stop(time + SOUND_DURATION);
	}

	playMetronomeTick(time: number) {
		if (!this._isPlaying) return;

		const subBeatInc = this.period / this._sub_beats;
		this.playBeat(time, this.pitch);

		for (let i = 1; i < this._sub_beats; i++) {
			this.playBeat(time + i * subBeatInc, this.pitch / SUB_BEAT_PITCH_DIVIDER);
		}
	}

	start() {
		if (this._isPlaying) return;

		this.sendMessageToWorker({ type: "start", interval: this.period * 1000 });
		this._isPlaying = true;
	}

	stop() {
		this.sendMessageToWorker({ type: "stop" });
		this._isPlaying = false;

		this.beatQueue.forEach(osc => {
			osc.stop();
		});
	}

	private sendMessageToWorker(message: MetronomeWorkerMessage) {
		if (!this.worker) return;

		this.worker.postMessage(message);
	}
}
