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

export type noteName = keyof typeof noteDetunes;

class Note {
	name: noteName;
	octave: number;
	detune: number;
	black: boolean = false;

	constructor(name: noteName, octave: number) {
		this.name = name;
		this.octave = octave;
		this.detune = noteDetunes[this.name] + 1200 * octave;

		this.black = /.*#/.test(this.name);
	}
}

export default Note;
