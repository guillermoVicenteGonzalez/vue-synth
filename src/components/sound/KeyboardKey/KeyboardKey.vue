<template>
	<button
		:class="classObject"
		class="keyboard-key"
		@mouseleave="isPressed = false"
		@mouseup="isPressed = false"
		@mousedown="isPressed = true"
		@touchstart="isPressed = true"
		@touchend="isPressed = false"
	>
		{{ note.name }}<br />{{ note.black }}
	</button>
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
}

function eventCleanup() {
	document.removeEventListener("keydown", handleKeyPress);
	document.removeEventListener("keyup", handleKeyRelease);
}

onMounted(() => keySetup());
onUnmounted(() => eventCleanup());
</script>

<style lang="scss" scoped>
$pressed-color: gray;
$key-color: #fff;

.keyboard-key {
	--key-width: 3rem;
	border: none;
	background-color: $key-color;
	// height: 100%;
	width: var(--key-width);
	cursor: pointer;

	&--pressed {
		background-color: $pressed-color;
		transform: scale(0.9);
	}

	&--black {
		background-color: black;
		width: calc(var(--key-width) / 2);
		height: 70%;
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
