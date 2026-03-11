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
					@download-preset="handleDownloadPreset"
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
				<VsButton class="PresetsMenu__button" @click="handleUploadPreset">
					<VsSpinner v-if="vsSpinnerVisible" size="sm"></VsSpinner>
					<span v-else>Upload Preset</span>
				</VsButton>

				<!-- <input type="file" @change="handleUploadPreset" /> -->

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
import VsSpinner from "@/components/common/VsSpinner/VsSpinner.vue";
import VsTextInput from "@/components/common/VsTextInput/VsTextInput.vue";
import usePresets from "@/composables/usePresets";
import useToast from "@/composables/useToast";
import { ref } from "vue";
import PresetWidget from "./PresetWidget.vue";

const { addToast } = useToast();

const {
	presetList,
	savePreset,
	loadPreset,
	deletePreset,
	clearPresets,
	updateName,
	downloadPreset,
	uploadPreset,
} = usePresets();
const newPresetName = ref<string>("");
const vsSpinnerVisible = ref<boolean>(false);

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

function handleDownloadPreset(name: string) {
	downloadPreset(name);
}

async function handleUploadPreset() {
	const fInput: HTMLInputElement = document.createElement("input");
	fInput.type = "file";
	fInput.accept = ".json";

	const file = await new Promise<File>((resolve, reject) => {
		fInput.onchange = () => {
			if (fInput.files && fInput.files.length > 0) resolve(fInput.files[0]);
			reject();
		};

		fInput.oncancel = () => {
			reject();
		};
		fInput.click();
		vsSpinnerVisible.value = true;
	}).catch(err => {
		addToast({ title: "Upload preset", content: err }, { lifetime: 5000 });
		return null;
	});

	if (file)
		await uploadPreset(file).catch(err => {
			addToast({ title: "upload preset", content: err }, { lifetime: 5000 });
			vsSpinnerVisible.value = false;
		});
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
