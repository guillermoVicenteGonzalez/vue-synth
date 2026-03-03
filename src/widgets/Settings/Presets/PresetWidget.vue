<template>
	<div class="PresetWidget">
		<h4 class="PresetWidget__name">{{ preset.name }}</h4>
		<div class="PresetWidget__actions">
			<VsButton class="PresetWidget__button" @click="handleUpdatePreset"
				>Update</VsButton
			>
			<VsButton class="PresetWidget__button" @click="handleLoadPreset"
				>Load</VsButton
			>
			<VsButton
				class="PresetWidget__button PresetWidget__button--delete-btn"
				@click="handleDeletePreset"
				>Delete</VsButton
			>
		</div>
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
	(e: "updatePreset", name: string): void;
	(e: "deletePreset", name: string): void;
}>();

function handleLoadPreset() {
	emit("loadPreset", preset.name);
}

function handleUpdatePreset() {
	emit("updatePreset", preset.name);
}

function handleDeletePreset() {
	emit("deletePreset", preset.name);
}
</script>

<style lang="scss" scoped>
$item-height: 5rem;

.PresetWidget {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1px $text-color;
	height: $item-height;
	padding: $gap-df;

	&__actions {
		height: 100%;
		display: flex;
		gap: $gap-df;
	}

	&__button {
		height: 100%;

		&--delete-btn {
			background-color: red;
		}
	}

	&__name {
		font-size: 1.6rem;
	}
}
</style>
