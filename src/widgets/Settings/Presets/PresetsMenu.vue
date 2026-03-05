<template>
	<section class="PresetsMenu">
		<section class="PresetsMenu__list">
			<h3 class="PresetsMenu__list__title">Preset List</h3>
			<div class="PresetsMenu__list__content">
				<PresetWidget
					v-for="preset in presetList"
					:key="preset.name"
					:preset="preset"
					@load-preset="handleLoadPreset"
					@delete-preset="handleDeletePreset"
					@update-preset="handleUpdatePreset"
					@update-preset-name="handleUpdateName"
				></PresetWidget>
			</div>

			<VsSeparator></VsSeparator>
		</section>

		<VsSeparator></VsSeparator>

		<div class="PresetsMenu__actions">
			<VsTextInput
				v-model="newPresetName"
				placeholder="new preset name"
				class="PresetsMenu__name-input"
				clearable
			></VsTextInput>

			<div class="PresetsMenu__actions__buttons">
				<VsButton
					:disabled="!newPresetName"
					class="PresetsMenu__button"
					@click="handleSavePreset"
					>Save Preset</VsButton
				>
				<!-- <VsButton class="PresetsMenu__button">Upload preset</VsButton> -->

				<VsButton
					class="PresetsMenu__button PresetsMenu__button--delete-btn"
					@click="handleDeleteAll"
					>Delete all</VsButton
				>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsTextInput from "@/components/common/VsTextInput/VsTextInput.vue";
import usePresets from "@/composables/usePresets";
import { ref } from "vue";
import PresetWidget from "./PresetWidget.vue";

const {
	presetList,
	savePreset,
	loadPreset,
	deletePreset,
	clearPresets,
	updateName,
} = usePresets();
const newPresetName = ref<string>("");

function handleSavePreset() {
	savePreset(newPresetName.value);
	newPresetName.value = "";
}

function handleUpdatePreset(name: string) {
	savePreset(name);
}

function handleLoadPreset(name: string) {
	loadPreset(name);
}

function handleDeletePreset(name: string) {
	deletePreset(name);
}

function handleDeleteAll() {
	clearPresets();
}

function handleUpdateName(oldName: string, newName: string) {
	updateName(oldName, newName);
}
</script>

<style lang="scss" scoped>
$preset-list-max-height: 30rem;

.PresetsMenu {
	&__button {
		width: 20rem;

		&--delete-btn {
			background-color: red;
		}
	}

	&__actions {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		align-items: center;
		gap: $gap-df $gap-bg;

		&__buttons {
			width: 100%;
			display: flex;
			gap: $gap-df;
			justify-content: center;
		}
	}

	&__name-input {
		flex: 1 1 100%;
		width: 100%;
		height: 3rem;
	}

	&__list {
		&__title {
			font-size: 2rem;
			text-align: center;
			margin-bottom: $gap-df;
		}

		&__content {
			// display: none;
			max-height: $preset-list-max-height;
			overflow: auto;
		}
	}
}
</style>
