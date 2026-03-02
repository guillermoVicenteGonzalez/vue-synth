<template>
	<div class="PresetWidget">
		<h4 class="PresetWidget__name">{{ preset.name }}</h4>
		<VsButton class="PresetWidget__button" @click="handleLoadPreset"
			>Load</VsButton
		>
	</div>
</template>

<script lang="ts" setup>
import VsButton from "@/components/common/VsButton/VsButton.vue";
import { type SynthPreset } from "@/composables/usePresets";

interface PresetWidgetProps {
	preset: SynthPreset;
}

const { preset } = defineProps<PresetWidgetProps>();
const emit = defineEmits<{
	(e: "loadPreset", name: string): void;
}>();

function handleLoadPreset() {
	emit("loadPreset", preset.name);
}
</script>

<style lang="scss" scoped>
$item-height: 5rem;

.PresetWidget {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: solid 1px black;
	height: $item-height;
	padding: $gap-df;

	&__button {
		height: 100%;
	}

	&__name {
		font-size: 1.6rem;
	}
}
</style>
