//a note is its detune from "la" multiplied by its octave
export const noteDetunes = {
	do: -900,
	"do#": -800,
	re: -700,
	"re#": -600,
	mi: -500,
	fa: -400,
	"fa#": -300,
	sol: -200,
	"sol#": -100,
	la: 0,
	"la#": +100,
	si: +200,
};

const C4ID = 60;
export type noteName = keyof typeof noteDetunes;

class Note {
	name: noteName;
	octave: number;
	detune: number;
	black: boolean = false;

	/**
	 * The private global detune holds the real detune to be applied.
	 * Its getter and setter deal with smaller numbers and multiply or divide the general detune by 100
	 */
	private static globalDetune: number = 0;

	static set generalDetune(d: number) {
		this.globalDetune = d * 100;
	}

	static get generalDetune() {
		return this.globalDetune / 100;
	}

	constructor(name: noteName, octave: number) {
		this.name = name;
		this.octave = octave;
		this.detune = noteDetunes[this.name] + Note.globalDetune + 1200 * octave;

		this.black = /.*#/.test(this.name);
	}
}

export default Note;

export function getNoteFromMIDICode(noteId: number): Note {
	const octaveDiff = Math.floor((noteId - C4ID) / 12);
	const noteDiff = (C4ID - noteId) % 12;

	if (noteDiff == 0) return new Note("do", octaveDiff);

	const notes: string[] =
		noteDiff < 0
			? Object.keys(noteDetunes)
			: Object.keys(noteDetunes).reverse();

	const noteName = notes[Math.abs(noteDiff)] as noteName;
	return new Note(noteName, octaveDiff);
}
