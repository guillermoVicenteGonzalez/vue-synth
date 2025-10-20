<template>
	<div class="ActionsWidget" :class="ActionsWidgetDynamicClass">
		<div class="ActionsWidget__voices">
			<VsButton
				:variant="buttonsVariant"
				class="ActionsWidget__button"
				@click="emit('createWave')"
			>
				<span v-if="size != 'minimal'"> New Wave </span>
				<VsTooltip orientation="right" delay="2s" text="New Wave">
					<AudioWaveform class="ActionsWidget__button__icon"></AudioWaveform>
				</VsTooltip>
			</VsButton>
			<VsButton
				:variant="buttonsVariant"
				class="ActionsWidget__button"
				@click="emit('createFilter')"
			>
				<span v-if="size != 'minimal'"> New Filter </span>
				<VsTooltip orientation="right" delay="2s" text="New Filter">
					<SquareActivity class="ActionsWidget__button__icon"></SquareActivity>
				</VsTooltip>
			</VsButton>
			<VsButton
				:variant="buttonsVariant"
				class="ActionsWidget__button"
				@click="emit('deleteAll')"
			>
				<span v-if="size != 'minimal'"> New Filter </span>
				<VsTooltip orientation="right" delay="2s" text="Delete All">
					<Trash class="ActionsWidget__button__icon"></Trash>
				</VsTooltip>
			</VsButton>
		</div>

		<VsSeparator
			:orientation="SeparatorOrientation"
			class="ActionsWidget__separator"
		></VsSeparator>

		<div class="ActionsWidget__recording">
			<VsButton variant="round" class="ActionsWidget__button">
				<Play class="ActionsWidget__button__icon"></Play>
			</VsButton>

			<VsButton variant="round" class="ActionsWidget__button">
				<Pause class="ActionsWidget__button__icon"></Pause>
			</VsButton>

			<VsButton variant="round" class="ActionsWidget__button">
				<Square class="ActionsWidget__button__icon"></Square>
			</VsButton>
		</div>

		<VsSeparator
			:orientation="SeparatorOrientation"
			class="ActionsWidget__separator"
		></VsSeparator>

		<div class="ActionsWidget__sliders">
			<VsSlider label="octave">
				<template #label>
					<VsChip class="ActionsWidget__chip">Octave</VsChip>
				</template>
			</VsSlider>
			<VsSlider label="volume">
				<template #label>
					<VsChip class="ActionsWidget__chip">Volume</VsChip>
				</template>
			</VsSlider>
		</div>
	</div>
</template>

<script setup lang="ts">
import VsButton, {
	type VSButtonVariants,
} from "@/components/common/VsButton/VsButton.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSeparator, {
	type VsSeparatorOrientation,
} from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import {
	AudioWaveform,
	Pause,
	Play,
	Square,
	SquareActivity,
	Trash,
} from "lucide-vue-next";
import { computed } from "vue";

export type ActionsWidgetSize = "default" | "minimal";
export type ActionsWidgetOrientation = "vertical" | "horizontal";

interface ActionsWidgetProps {
	size?: ActionsWidgetSize;
	orientation?: ActionsWidgetOrientation;
}

const { size = "minimal", orientation = "vertical" } =
	defineProps<ActionsWidgetProps>();

const buttonsVariant = computed<VSButtonVariants>(() => {
	return size == "default" ? "default" : "round";
});

const ActionsWidgetDynamicClass = computed(() => ({
	[`ActionsWidget--${orientation}`]: orientation,
}));

const SeparatorOrientation = computed<VsSeparatorOrientation>(() =>
	orientation == "horizontal" ? "vertical" : "horizontal"
);

const emit = defineEmits<{
	(e: "createWave"): void;
	(e: "createFilter"): void;
	(e: "deleteAll"): void;
}>();
</script>

<style scoped lang="scss">
$action-size: 5rem;

.ActionsWidget {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	gap: $gap-df;
	align-items: center;

	// background-color: $tertiary-color;
	padding: $gap-df;

	&__recording,
	&__voices {
		width: fit-content;
		display: flex;
		gap: $gap-df;
		justify-content: space-between;
	}

	&__sliders {
		flex-basis: 50%;
		flex-shrink: 1;
		flex-grow: 0;
		gap: $gap-df;
		display: flex;
		flex-direction: column;
	}

	&__separator {
		min-height: $action-size;
	}

	&__button {
		min-width: $action-size;
		height: $action-size;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: $gap-df;

		&__icon {
			color: $text-color;
			width: 100%;
			height: 100%;
			margin: auto;
		}

		&--round {
			width: 5rem;
			height: 5rem;
		}
	}

	&__chip {
		font-size: 1.6rem;
		min-width: 8rem;
	}

	&--vertical {
		flex-direction: column;
		padding: $gap-df 0;

		.ActionsWidget {
			&__separator {
				min-height: 0;
			}
		}
	}
}
</style>
