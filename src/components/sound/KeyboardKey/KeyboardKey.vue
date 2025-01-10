<template>
	<button
		class="keyboard-key"
		@mouseleave="noteReleased"
		@mouseup="noteReleased"
		@mousedown="notePressed"
	></button>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import type Note from "@/models/note";

interface KeyboardKeyProps {
	context: AudioContext;
	sourceCluster: AudioCluster;
	note: Note;
	blackKey?: boolean;
}

const { context, note, sourceCluster } = defineProps<KeyboardKeyProps>();

let oscillators: OscillatorNode[] = [];

// function createSound() {}

function playNote() {
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
	return [osc];
}

function notePressed() {
	const oscs = playNote();
	oscillators.push(...oscs);
}

function noteReleased() {
	// oscillators.forEach(osc => {
	// 	// osc.disconnect(context.destination);
	// 	osc.stop();
	// });
	console.log("note released");
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
