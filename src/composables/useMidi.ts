import { computed, onMounted, onUnmounted, ref } from "vue";

const hasPermission = ref<boolean>(false);
const midi = ref<MIDIAccess | null>();
const inputs = ref<MIDIInputMap | null>();
const midiReady = computed<boolean>(() => {
	return midi.value != null && hasPermission.value;
});

const midiInput = ref<MIDIInput>();

export function useMidi() {
	onMounted(() => {
		navigator.permissions.query({ name: "midi" }).then(result => {
			if (result.state === "granted") {
				// Access granted.
				hasPermission.value = true;
			} else if (result.state === "prompt") {
				// Using API will prompt for permission
				hasPermission.value = true;
			} else {
				hasPermission.value = false;
			}
		});

		requestMidi();
	});

	/******************************************************************
	 * LIFECYCLE FUNCTIONS
	 ******************************************************************/

	function requestMidi() {
		navigator.requestMIDIAccess().then(onMidiSuccess, onMIidiFailure);
	}

	function onMidiSuccess(midiAccess: MIDIAccess) {
		midi.value = midiAccess;
		updateInputs();

		midi.value.addEventListener("statechange", () => {
			updateInputs();
		});
	}

	function updateInputs() {
		if (!midi.value) {
			inputs.value = null;
			return;
		}

		inputs.value = midi.value.inputs;
	}

	function onMIidiFailure() {
		console.log("Failed to get midi access");
	}

	/******************************************************************
	 * ACTION FUNCTIONS
	 ******************************************************************/

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
		console.log(event);
	}

	onUnmounted(() => {
		if (!midi.value) return;
	});

	return {
		midiReady,
		inputs,
		midiInput,
		selectMidiInput,
		disconnectMidiInput,
		midi,
	};
}
