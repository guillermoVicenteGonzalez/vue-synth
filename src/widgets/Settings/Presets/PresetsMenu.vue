<template>
	<section class="PresetsMenu">
		<section class="PresetList">
			<h3>Preset List</h3>
			<PresetList
				:preset-list="presetList"
				@load-preset="loadPreset"
			></PresetList>
			<VsSeparator></VsSeparator>
		</section>

		<VsSeparator></VsSeparator>

		<div class="PresetsMenu__actions">
			<VsTextInput
				v-model="newPresetName"
				class="PresetsMenu__name-input"
				clearable
			></VsTextInput>

			<VsButton class="PresetsMenu__button" @click="handleSavePreset"
				>Save Preset</VsButton
			>
			<VsButton class="PresetsMenu__button">Upload preset</VsButton>
		</div>
	</section>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsTextInput from "@/components/common/VsTextInput/VsTextInput.vue";
import usePresets from "@/composables/usePresets";
import { ref } from "vue";
import PresetList from "./PresetList.vue";

const { presetList, savePreset, loadPreset } = usePresets();
const newPresetName = ref();

function handleSavePreset() {
	savePreset(newPresetName.value);
}
</script>

<style lang="scss" scoped>
.PresetsMenu {
	&__button {
		width: 20rem;
	}

	&__actions {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: $gap-df $gap-bg;
	}

	&__name-input {
		flex: 1 1 100%;
		width: 100%;
		height: 3rem;
	}
}
</style>
