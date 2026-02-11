<template>
	<button
		type="button"
		:class="classObject"
		class="keyboard-key"
		@pointerleave="isPressed = false"
		@pointerdown="isPressed = true"
		@pointerup="isPressed = false"
		@contextmenu.prevent
		@select="handleTest"
	></button>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import type Note from "@/models/note";
import { SynthModule } from "@/models/SynthSource";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

interface KeyboardKeyProps {
	keycode?: string; //If the key has a keycode, when that keycode (letter) is pressed on the keyboard, the play method will be used
	context: AudioContext;
	sourceCluster: AudioCluster;
	note: Note;
	blackKey?: boolean;
	envelope?: AudioEnvelope;
}

const {
	note,
	sourceCluster,
	keycode,
	envelope = undefined,
} = defineProps<KeyboardKeyProps>();

// const oscillators: OscillatorNode[] = [];
const isPressed = ref<boolean>(false);

const classObject = computed(() => ({
	"keyboard-key--pressed": isPressed.value,
	"keyboard-key--black": note.black,
}));

const synthModule: SynthModule = new SynthModule(sourceCluster, envelope);

/**
 * Events (keyboard and click) just turn isPressed on or off
 * Watch tracks those changes.
 * If the key is still pressed, watch returns instead of executing notePressed => creating osc
 */
watch(isPressed, (newValue, oldValue) => {
	if (newValue == oldValue) return;

	if (newValue) {
		notePressed();
	}

	if (!newValue) {
		stopNote();
	}
});

function handleKeyPress(e: KeyboardEvent) {
	if (e.code === keycode) {
		isPressed.value = true;
	}
}

function handleKeyRelease(e: KeyboardEvent) {
	if (e.code === keycode) {
		isPressed.value = false;
	}
}

/**
 * TODO
 * ! REFACTOR
 */
function playNote() {
	if (sourceCluster.modules.length > 0) {
		synthModule.play(note);
	}
}

function stopNote() {
	synthModule.stop();
}

function notePressed() {
	playNote();
}

function keySetup() {
	document.addEventListener("keydown", handleKeyPress);
	document.addEventListener("keyup", handleKeyRelease);
	document.addEventListener("MIDINoteOn", handleMidiNoteOn);
	document.addEventListener("MIDINoteOff", handleMidiNoteOff);
}

function handleMidiNoteOn(e: CustomEventInit) {
	if (e.detail.note.name == note.name && e.detail.note.octave == note.octave) {
		isPressed.value = true;
	} else if (note.name == e.detail.note) {
	}
}

function handleMidiNoteOff(e: CustomEventInit) {
	if (e.detail.note.name == note.name && e.detail.note.octave == note.octave)
		isPressed.value = false;
}

function eventCleanup() {
	document.removeEventListener("keydown", handleKeyPress);
	document.removeEventListener("keyup", handleKeyRelease);
	document.removeEventListener("MIDINoteOn", handleMidiNoteOn);
	document.removeEventListener("MIDINoteOff", handleMidiNoteOff);
}

onMounted(() => keySetup());
onUnmounted(() => eventCleanup());

//delete
function handleTest() {
	console.warn("Event");
}
</script>

<style lang="scss" scoped>
$pressed-color: $primary-color;
$key-color: #fff;

.keyboard-key {
	--key-width: 4rem;
	flex-shrink: 0;
	border: none;
	background-color: $key-color;
	// height: 100%;
	width: var(--key-width);
	position: relative;
	border-radius: 10px;
	border: 1px solid #000;
	border-radius: 5px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	transform-origin: 50% 0%;
	user-select: none;
	touch-action: cross-slide-x;

	cursor: default;

	&--black {
		background-color: black;

		width: calc(var(--key-width) / 2);
		height: 70%;

		z-index: 2;
		margin: 0 -10px 0 -10px;
	}

	&--pressed {
		background-color: $pressed-color;
		transform: scaleY(0.95);
	}

	@include respond(tab-port) {
		--key-width: 7rem;

		&--black {
			width: calc(var(--key-width) / 2.5);
		}
	}

	@include respond(phone) {
		--key-width: 5rem;

		&--black {
			width: calc(var(--key-width) / 2.5);
		}
	}
}
</style>
