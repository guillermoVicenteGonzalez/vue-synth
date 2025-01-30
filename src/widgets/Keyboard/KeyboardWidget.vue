<template>
	<div v-if="sourceCluster" class="keyboard">
		<KeyboardKey
			v-for="(note, index) in notes"
			:key="note.name + index"
			:note="note"
			:keycode="assignKeycode(note)"
			:context="context"
			:source-cluster="sourceCluster"
		></KeyboardKey>
	</div>
</template>

<script setup lang="ts">
import KeyboardKey from "@/components/sound/KeyboardKey/KeyboardKey.vue";
import type AudioCluster from "@/models/AudioCluster";
import Note, { noteDetunes, type noteName } from "@/models/note";
import { onMounted, ref } from "vue";

interface KeyboardWidgetProps {
	context: AudioContext;
	sourceCluster: AudioCluster;
}

const { context, sourceCluster = null } = defineProps<KeyboardWidgetProps>();

const notes = ref<Note[]>([]);

function assignKeycode(note: Note) {
	if (note.octave == -1) {
		switch (note.name) {
			case "si":
				return "KeyS";
			case "la":
				return "KeyA";
		}
	}

	if (note.octave == 0) {
		switch (note.name) {
			case "do":
				return "KeyD";
			case "re":
				return "KeyF";
			case "mi":
				return "KeyG";
			case "fa":
				return "KeyH";
			case "sol":
				return "KeyJ";
			case "la":
				return "KeyK";
			case "si":
				return "KeyL";
		}
	}

	if (note.octave == 1) {
		switch (note.name) {
			case "do":
				return "Semicolon";
			case "re":
				return "Quote";
		}
	}
}

function setupNotes() {
	for (let i = -3; Math.abs(i) <= 3; i++) {
		for (const note in noteDetunes) {
			const nNote = new Note(note as noteName, i);
			notes.value.push(nNote);
		}
	}
}

onMounted(() => {
	setupNotes();
});
</script>

<style lang="scss" scoped>
.keyboard {
	width: 100%;
	height: 100%;
	background-color: red;
	display: flex;
	gap: 0.5rem;
}
</style>
