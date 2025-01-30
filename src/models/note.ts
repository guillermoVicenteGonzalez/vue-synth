//a note is its detune from "la" multiplied by its octave
export const noteDetunes = {
	do: -900,
	re: -700,
	mi: -500,
	fa: -400,
	sol: -200,
	la: 0,
	si: +200,
};

export type noteName = keyof typeof noteDetunes;

class Note {
	name: noteName;
	octave: number;
	detune: number;

	constructor(name: noteName, octave: number) {
		this.name = name;
		this.octave = octave;
		this.detune = noteDetunes[this.name] + 1200 * octave;
	}
}

export default Note;
