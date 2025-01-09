<template>
	<button
		class="keyboard-key"
		@mouseleave="noteReleased"
		@mouseup="noteReleased"
		@mousedown="notePressed"
	></button>
</template>

<script setup lang="ts">
import type AudioModule from "@/models/AudioModule";
import type Note from "@/models/note";

interface KeyboardKeyProps {
	context: AudioContext;
	source?: AudioModule;
	note: Note;
	blackKey?: boolean;
}

const { context, note } = defineProps<KeyboardKeyProps>();

const oscillators: OscillatorNode[] = [];

function playNote() {
	const osc = context.createOscillator();
	osc.detune.value = note.detune;
	osc.connect(context.destination);
	osc.start();

	return osc;
}

function notePressed() {
	const osc = playNote();
	oscillators.push(osc);
	console.log(oscillators);
}

function noteReleased() {
	// oscillators.forEach(osc => {
	// 	// osc.disconnect(context.destination);
	// 	osc.stop();
	// });

	for (const osc of oscillators) {
		osc.disconnect(context.destination);
		osc.stop();
		const index = oscillators.indexOf(osc);
		oscillators.splice(index, 1);
	}
}
</script>

<style lang="scss" scoped>
$key-width: 3rem;

.keyboard-key {
	border: none;
	background-color: #fff;
	height: 100%;
	width: $key-width;
	cursor: pointer;
}
</style>
