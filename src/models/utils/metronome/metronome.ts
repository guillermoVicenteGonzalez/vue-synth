// interface MetronomeOptions {
// 	volume: number;
// 	tone: number;
// }

type MetronomeWorkerAction = "start" | "stop";

interface MetronomeWorkerMessage {
	type: MetronomeWorkerAction;
	interval: number;
}

const METRONOME_MAX_VOLUME = 100;
const SOUND_DURATION = 0.1;
const MAIN_SOUND_FREQ = 440;
const SUB_SOUND_FREQ = 400;

const workerFunction = () => {
	let timerId: number | null;

	function setupInterval(interval: number) {
		timerId = setInterval(() => {
			postMessage("tick");
		}, interval);
	}

	self.onmessage = (event: MessageEvent<MetronomeWorkerMessage>) => {
		console.log(event.data);

		switch (event.data.type) {
			case "start":
				if (timerId) {
					clearInterval(timerId);
					timerId = null;
				}
				setupInterval(event.data.interval);
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
	public playing: boolean = false;
	private worker: Worker;

	// TODO!: options?: MetronomeOptions
	constructor(context?: AudioContext) {
		this.ctx = context != null ? context : new AudioContext();
		this.gainNode = this.ctx.createGain();

		this.gainNode.connect(this.ctx.destination);

		if (!window.Worker) throw new Error("Unable to creater metronome worker");

		const workerScript = createWorkerUrl();
		this.worker = new Worker(workerScript);
		this.sendMessageToWorker({ type: "start", interval: 1000 });
		this.worker.onmessage = e => {
			console.log(e.data);
			this.playBeat(this.ctx.currentTime, MAIN_SOUND_FREQ);
		};
	}

	set volume(v: number) {
		if (v > METRONOME_MAX_VOLUME) this.volume = METRONOME_MAX_VOLUME;

		this._volume = v / METRONOME_MAX_VOLUME;
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

	playBeat(time: number, frequency: number = 440) {
		const osc = this.ctx.createOscillator();
		osc.frequency.setValueAtTime(time, frequency);
		osc.connect(this.gainNode);

		osc.start(time);
		osc.stop(time + SOUND_DURATION);
	}

	metronomeLoop(currentTime: number) {
		if (!this.playing) return;

		console.log("Entro");
		const subBeatInc = this.period / this.sub_beats;
		this.playBeat(currentTime, MAIN_SOUND_FREQ);

		for (let i = 1; i <= this.sub_beats; i++) {
			this.playBeat(currentTime + i * subBeatInc, SUB_SOUND_FREQ);
		}

		this.metronomeLoop(currentTime + this.period);
		console.log("Salgo");
	}

	start() {
		if (this.playing) return;

		this.playing = false;
		this.playing = true;
		this.metronomeLoop(this.ctx.currentTime);
	}

	stop() {}

	private initWorker() {}

	private sendMessageToWorker(message: MetronomeWorkerMessage) {
		if (!this.worker) return;

		this.worker.postMessage(message);
	}
}
