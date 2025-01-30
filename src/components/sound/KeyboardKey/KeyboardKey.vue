<template>
	<button
		:class="classObject"
		class="keyboard-key"
		@mouseleave="isPressed = false"
		@mouseup="isPressed = false"
		@mousedown="isPressed = true"
	>
		{{ note.name }}
	</button>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import type Note from "@/models/note";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

interface KeyboardKeyProps {
	keycode?: string;
	context: AudioContext;
	sourceCluster: AudioCluster;
	note: Note;
	blackKey?: boolean;
}

const { context, note, sourceCluster, keycode } =
	defineProps<KeyboardKeyProps>();

let oscillators: OscillatorNode[] = [];
const isPressed = ref<boolean>(false);

const classObject = computed(() => ({
	"keyboard-key--pressed": isPressed.value,
}));

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

function playNote() {
	console.log(sourceCluster.modules.length);
	if (sourceCluster.modules.length > 0) {
		const createdOscillators: OscillatorNode[] = [];

		for (const module of sourceCluster.modules) {
			const osc = module.cloneOscillator();
			osc.detune.value = note.detune;
			createdOscillators.push(osc);
		}

		return createdOscillators;
	}
	const osc = context.createOscillator();
	osc.detune.value = note.detune;
	osc.connect(context.destination);
	osc.start();

	isPressed.value = true;

	return [osc];
}

function stopNote() {
	console.log("note stopped");
	oscillators.forEach(osc => {
		osc.stop();
		osc.disconnect();
	});

	for (const osc of oscillators) {
		osc.stop();
		osc.disconnect();
	}

	oscillators = [];
}

function notePressed() {
	const oscs = playNote();
	oscillators.push(...oscs);
}

function keySetup() {
	console.log(keycode);
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
$key-width: 3rem;
$pressed-color: gray;
$key-color: #fff;

.keyboard-key {
	border: none;
	background-color: $key-color;
	height: 100%;
	width: $key-width;
	cursor: pointer;

	&--pressed {
		background-color: $pressed-color;
		transform: scale(0.9);
	}
}
</style>
