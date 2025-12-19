import { getNoteFromMIDICode } from "@/models/note";
import { computed, ref } from "vue";

const hasPermission = ref<boolean>(false);
const midi = ref<MIDIAccess | null>();
const inputs = ref<MIDIInputMap | null>();
const midiReady = computed<boolean>(() => {
	return midi.value != null && hasPermission.value;
});

//Should be local to composable ?
const midiInput = ref<MIDIInput>();

export function useMidi() {
	//CUIDAO QUE NO TENGA YA INPUT

	/******************************************************************
	 * LIFECYCLE FUNCTIONS
	 ******************************************************************/

	async function requestMidi() {
		if (!hasPermission.value) {
			const res = await navigator.permissions.query({ name: "midi" });
			if (res.state === "granted") hasPermission.value = true;
			else if (res.state === "prompt") hasPermission.value = true;
			else hasPermission.value = false;
		}

		navigator.requestMIDIAccess().then(onMidiSuccess, onMIidiFailure);
	}

	return {
		midiReady,
		inputs,
		selectMidiInput,
		disconnectMidiInput,
		requestMidi,
		midi,
	};
}

/******************************************************************
 * REQUEST ACCESS FUNCTIONS
 ******************************************************************/

function onMIidiFailure() {
	console.log("Failed to get midi access");
}

function onMidiSuccess(midiAccess: MIDIAccess) {
	midi.value = midiAccess;
	updateInputs();

	midi.value.addEventListener("statechange", () => {
		updateInputs();
	});
}

/******************************************************************
 * ACTION FUNCTIONS
 ******************************************************************/

function updateInputs() {
	if (!midi.value) {
		inputs.value = null;
		return;
	}

	inputs.value = midi.value.inputs;
}

function selectMidiInput(id: string) {
	if (!inputs.value) return;
	if (midiInput.value && midiInput.value.id == id) return;
	if (!inputs.value.has(id)) return;

	if (midiInput.value) cleanupMidiInput(midiInput.value);
	midiInput.value = inputs.value.get(id);
	if (midiInput.value) setupNewMidiInput(midiInput.value);
}

function disconnectMidiInput() {
	if (midiInput.value) cleanupMidiInput(midiInput.value);
	midiInput.value = undefined;
}

function setupNewMidiInput(input: MIDIInput) {
	console.log("setting up new input");
	input.addEventListener("midimessage", onMidiMessage);
}

function cleanupMidiInput(input: MIDIInput) {
	input.removeEventListener("midimessage", onMidiMessage);
}

/******************************************************************
 * MESSAGE LOGIC
 ******************************************************************/

function onMidiMessage(event: MIDIMessageEvent) {
	if (!event.data || event.data.length == 0) return;

	const messageType = event.data[0];
	switch (messageType) {
		case 128:
			handleNoteOffMessage(event.data[1], event.data[2]);
			break;

		case 144:
			handleNoteOnMessage(event.data[1], event.data[2]);
			break;

		default:
			console.log(messageType);
	}
}
function handleNoteOnMessage(noteNumber: number, speed: number) {
	console.log(noteNumber);
	const note = getNoteFromMIDICode(noteNumber);
	// console.log(`note name ${noteNumber} note speed ${speed}`);
	const event = new CustomEvent("MIDINoteOn", {
		detail: {
			note,
			speed: speed,
		},
	});

	document.dispatchEvent(event);
}

function handleNoteOffMessage(noteNumber: number, speed: number) {
	const note = getNoteFromMIDICode(noteNumber);

	const event = new CustomEvent("MIDINoteOff", {
		detail: {
			note,
			speed: speed,
		},
	});

	document.dispatchEvent(event);
}
