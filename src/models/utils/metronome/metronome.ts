// interface MetronomeOptions {
// 	volume: number;
// 	tone: number;
// }

type MetronomeWorkerAction = "start" | "stop";

interface MetronomeWorkerMessage {
	type: MetronomeWorkerAction;
	interval?: number;
}

const METRONOME_MAX_VOLUME = 100;
const SOUND_DURATION = 0.1;
const MAIN_SOUND_FREQ = 440;
const SUB_SOUND_FREQ = 220;
const METRONOME_DEFAULT_VOLUME = 50;

const workerFunction = () => {
	let timerId: number | null;
	let intervalTime: number = 1000;

	function setupInterval(interval: number) {
		postMessage("tick");
		timerId = setInterval(() => {
			postMessage("tick");
		}, interval);
	}

	self.onmessage = (event: MessageEvent<MetronomeWorkerMessage>) => {
		switch (event.data.type) {
			case "start":
				if (timerId) {
					clearInterval(timerId);
					timerId = null;
				}
				if (event.data.interval) intervalTime = event.data.interval;
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
	private sub_beats: number = 4;
	private worker: Worker;
	private _isPlaying: boolean = false;
	public waveForm: OscillatorNode["type"] = "square";
	private beatQueue: OscillatorNode[] = [];

	// TODO!: options?: MetronomeOptions
	constructor(context?: AudioContext) {
		this.ctx = context != null ? context : new AudioContext();
		this.gainNode = this.ctx.createGain();

		this.gainNode.connect(this.ctx.destination);

		if (!window.Worker) throw new Error("Unable to creater metronome worker");

		const workerScript = createWorkerUrl();
		this.worker = new Worker(workerScript);
		// this.sendMessageToWorker({ type: "start", interval: 1000 });
		this.worker.onmessage = e => {
			console.log(e.data);
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
		//cancelScheduledValues
		// this.gainNode.gain.
		this._bpm = b;
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

	private playBeat(time: number, frequency: number = 440) {
		const osc = this.ctx.createOscillator();
		// osc.frequency.setValueAtTime(time, frequency);
		osc.frequency.value = frequency;
		osc.type = this.waveForm;
		osc.connect(this.gainNode);

		osc.start(time);
		this.beatQueue.push(osc);
		osc.onended = () => {
			console.warn("onended");
			this.beatQueue.splice(this.beatQueue.indexOf(osc), 1);
		};
		osc.stop(time + SOUND_DURATION);
	}

	playMetronomeTick(time: number) {
		if (!this._isPlaying) return;

		const subBeatInc = this.period / this.sub_beats;
		this.playBeat(time, MAIN_SOUND_FREQ);

		for (let i = 1; i < this.sub_beats; i++) {
			this.playBeat(time + i * subBeatInc, SUB_SOUND_FREQ);
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

		console.warn("Stop");
		this.beatQueue.forEach(osc => {
			osc.stop();
		});
	}

	private sendMessageToWorker(message: MetronomeWorkerMessage) {
		if (!this.worker) return;

		this.worker.postMessage(message);
	}
}
