<template>
	<div class="PresetList">
		<PresetWidget
			v-for="preset in presetList"
			:key="preset.name"
			:preset="preset"
			@load-preset="handleLoadPreset"
		></PresetWidget>
	</div>
</template>
<script lang="ts" setup>
import type { PresetList } from "@/composables/usePresets";
import PresetWidget from "./PresetWidget.vue";

interface PresetListProps {
	presetList: PresetList;
}

const { presetList } = defineProps<PresetListProps>();
const emit = defineEmits<{
	(e: "loadPreset", name: string): void;
}>();

function handleLoadPreset(name: string) {
	emit("loadPreset", name);
}
</script>
