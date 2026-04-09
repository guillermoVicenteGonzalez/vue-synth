<template>
	<section class="PresetsMenu">
		<h3 class="PresetsMenu__title">Preset List</h3>

		<section class="PresetsMenu__list">
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

			<!-- <VsSeparator></VsSeparator> -->
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

	vsSpinnerVisible.value = false;
}
</script>

<style lang="scss" scoped>
$preset-list-max-height: 30rem;
$title-height: 3rem;
$actions-height: auto;

.PresetsMenu {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	height: 100%;
	overflow: hidden;

	&__title {
		color: $text-color;
		flex: 0 0 $title-height !important;
		font-size: 2rem;
		text-align: center;
		margin-bottom: $gap-df;
	}

	&__actions {
		margin-top: $gap-df;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;
		gap: $gap-df $gap-bg;
		flex: 0 1 4rem;

		&__buttons {
			width: 100%;
			display: flex;
			gap: $gap-df;
			justify-content: center;
		}
	}

	&__list {
		flex: 1 1 auto;
		overflow: auto;
	}

	&__button {
		flex: 1 1 100%;

		&--delete-btn {
			background-color: $error-color;
		}
	}

	&__name-input {
		flex: 1 1 100%;
		width: 100%;
		height: 3rem;
	}
}
</style>
