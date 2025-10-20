<template>
	<div class="ActionsWidget">
		<div class="ActionsWidget__voices">
			<VsButton
				@click="emit('createWave')"
				:variant="buttonsVariant"
				class="ActionsWidget__button"
			>
				<span v-if="size != 'minimal'"> New Wave </span>
				<AudioWaveform class="ActionsWidget__button__icon"></AudioWaveform>
			</VsButton>
			<VsButton
				@click="emit('createFilter')"
				:variant="buttonsVariant"
				class="ActionsWidget__button"
			>
				<span v-if="size != 'minimal'"> New Filter </span>
				<SquareActivity class="ActionsWidget__button__icon"></SquareActivity>
			</VsButton>
			<VsButton
				@click="emit('deleteAll')"
				:variant="buttonsVariant"
				class="ActionsWidget__button"
			>
				<span v-if="size != 'minimal'"> New Filter </span>
				<Trash class="ActionsWidget__button__icon"></Trash
			></VsButton>
		</div>

		<VsSeparator orientation="vertical"></VsSeparator>

		<VsButton variant="round" class="ActionsWidget__button">
			<Play class="ActionsWidget__button__icon"></Play>
		</VsButton>
		<VsSeparator orientation="vertical"></VsSeparator>

		<VsSlider label="octave"></VsSlider>
		<VsSlider label="volume"></VsSlider>
	</div>
</template>

<script setup lang="ts">
import VsButton, {
	type VSButtonVariants,
} from "@/components/common/VsButton/VsButton.vue";
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import { AudioWaveform, Play, SquareActivity, Trash } from "lucide-vue-next";
import { computed } from "vue";

export type ActionsWidgetSize = "default" | "minimal";
export type ActionsWidgetOrientation = "vertical" | "horizontal";

interface ActionsWidgetProps {
	size?: ActionsWidgetSize;
	orientation?: ActionsWidgetOrientation;
}

const { size = "minimal" } = defineProps<ActionsWidgetProps>();

const buttonsVariant = computed<VSButtonVariants>(() => {
	return size == "default" ? "default" : "round";
});

const emit = defineEmits<{
	(e: "createWave"): void;
	(e: "createFilter"): void;
	(e: "deleteAll"): void;
}>();
</script>

<style scoped lang="scss">
$action-size: 4rem;

.ActionsWidget {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	gap: $gap-df;
	align-items: center;

	// background-color: $tertiary-color;
	padding: $gap-df;

	&__voices {
		display: flex;
		gap: $gap-df;
	}

	> * {
		min-height: $action-size;
	}

	&__button {
		min-width: 4rem;
		height: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;

		&__icon {
			color: $text-color;
		}

		&--round {
			width: 5rem;
			height: 5rem;
		}
	}
}
</style>
