<template>
	<div class="PresetWidget">
		<div v-if="editNameToggled" class="PresetWidget__name-edit">
			<VsTextInput v-model="newPresetName"></VsTextInput>
			<VsTooltip>
				<VsButton
					class="PresetWidget__icon-btn"
					variant="round"
					@click="updateName"
				>
					<Check class="PresetWidget__icon-btn__icon"></Check>
				</VsButton>
			</VsTooltip>
			<VsTooltip>
				<VsButton
					class="PresetWidget__icon-btn"
					variant="round"
					@click="hideEdit"
				>
					<X class="PresetWidget__icon-btn__icon"></X>
				</VsButton>
			</VsTooltip>
		</div>
		<div v-else class="PresetWidget__title">
			<h4 class="PresetWidget__name">{{ preset.name }}</h4>
			<VsTooltip>
				<VsButton
					class="PresetWidget__icon-btn"
					variant="round"
					@click="toggleEdit"
				>
					<Pencil class="PresetWidget__icon-btn__icon"></Pencil>
				</VsButton>
			</VsTooltip>
		</div>

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
import VsTextInput from "@/components/common/VsTextInput/VsTextInput.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import { type SynthPreset } from "@/composables/usePresets";
import { Check, Pencil, X } from "lucide-vue-next";
import { ref } from "vue";

interface PresetWidgetProps {
	preset: SynthPreset;
}

const { preset } = defineProps<PresetWidgetProps>();

const emit = defineEmits<{
	(e: "loadPreset", name: string): void;
	(e: "updatePreset", name: string): void;
	(e: "deletePreset", name: string): void;
	(e: "updatePresetName", oldName: string, newName: string): void;
}>();

const newPresetName = ref<string>(preset.name);
const editNameToggled = ref<boolean>(false);

function handleLoadPreset() {
	emit("loadPreset", preset.name);
}

function handleUpdatePreset() {
	emit("updatePreset", preset.name);
}

function handleDeletePreset() {
	emit("deletePreset", preset.name);
}

function toggleEdit() {
	editNameToggled.value = true;
	newPresetName.value = preset.name;
}

function hideEdit() {
	editNameToggled.value = false;
	newPresetName.value = preset.name;
}

function updateName() {
	editNameToggled.value = false;

	emit("updatePresetName", preset.name, newPresetName.value);
}
</script>

<style lang="scss" scoped>
$item-height: 5rem;
$button-width: 4rem;
$button-height: 3rem;

.PresetWidget {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: solid 1px $text-color;
	height: $item-height;
	padding: $gap-df;
	width: 100%;

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
		margin: 0;
		padding: 0;
		text-align: center;
	}

	&__title {
		flex: 1 1 100%;
		width: 100%;
		display: flex;
		align-items: center;
		// justify-content: flex-start;
		justify-content: left;
		gap: $gap-df;
	}

	&__name-edit {
		display: flex;
		gap: $gap-sm;
	}

	&__icon-btn {
		width: $button-height;
		height: $button-height;
		// padding: $gap-df;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem;
		margin: 0;

		&__icon {
			color: $tertiary-color;
			color: $text-color;
		}
	}
}
</style>
