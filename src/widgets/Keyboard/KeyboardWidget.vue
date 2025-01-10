<template>
	<div class="keyboard">
		<KeyboardKey
			v-for="(note, index) in notes"
			:key="note.name + index"
			:note="note"
			:context="context"
			:source="sourceModules"
		></KeyboardKey>
	</div>
</template>

<script setup lang="ts">
import KeyboardKey from "@/components/sound/KeyboardKey/KeyboardKey.vue";
import type AudioModule from "@/models/AudioModule";
import Note, { noteDetunes, type noteName } from "@/models/note";
import { onMounted, ref } from "vue";

interface KeyboardWidgetProps {
	context: AudioContext;
	sourceModules: AudioModule[];
}

const { context, sourceModules } = defineProps<KeyboardWidgetProps>();

// const myNote = new Note("la", 1);

const notes = ref<Note[]>([]);

function setupNotes() {
	for (let i = 1; i < 5; i++) {
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
