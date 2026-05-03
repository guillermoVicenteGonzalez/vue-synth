<template>
	<div class="ActionsWidget" :class="ActionsWidgetDynamicClass">
		<div class="ActionsWidget__voices">
			<VsTooltip orientation="right" delay="1s" text="New Wave">
				<VsButton
					:variant="buttonsVariant"
					class="ActionsWidget__button"
					@click="emit('createWave')"
				>
					<span v-if="size != 'minimal'"> New Wave </span>
					<AudioWaveform class="ActionsWidget__button__icon"></AudioWaveform>
				</VsButton>
			</VsTooltip>

			<VsTooltip orientation="right" delay="1s" text="New Filter">
				<VsButton
					:variant="buttonsVariant"
					class="ActionsWidget__button"
					@click="emit('createFilter')"
				>
					<span v-if="size != 'minimal'"> New Filter </span>
					<SquareActivity class="ActionsWidget__button__icon"></SquareActivity>
				</VsButton>
			</VsTooltip>

			<VsTooltip orientation="right" delay="1s" text="Delete All">
				<VsButton
					:variant="buttonsVariant"
					class="ActionsWidget__button"
					@click="emit('deleteAll')"
				>
					<span v-if="size != 'minimal'"> New Filter </span>
					<Trash class="ActionsWidget__button__icon"></Trash>
				</VsButton>
			</VsTooltip>
		</div>

		<VsSeparator
			:orientation="SeparatorOrientation"
			class="ActionsWidget__separator"
		></VsSeparator>

		<div class="ActionsWidget__recording">
			<RecorderWidget :source="source"></RecorderWidget>
		</div>

		<VsSeparator
			:orientation="SeparatorOrientation"
			class="ActionsWidget__separator"
		></VsSeparator>

		<div class="ActionsWidget__sliders">
			<VsSlider
				v-model="transpose"
				:min="MIN_TRANSPOSE"
				:max="MAX_TRANSPOSE"
				:step="1"
			>
				<template #label>
					<span class="ActionsWidget__chip">Tranpose: {{ transpose }}</span>
				</template>
			</VsSlider>
			<VsSlider v-model="volume" label="volume" :min="0" :max="100" :step="1">
				<template #label>
					<span class="ActionsWidget__chip">Volume {{ volumeString }}%</span>
				</template>
			</VsSlider>
		</div>
	</div>
</template>

<script setup lang="ts">
import VsButton, {
	type VSButtonVariants,
} from "@/components/common/VsButton/VsButton.vue";
import VsSeparator, {
	type VsSeparatorOrientation,
} from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type AudioCluster from "@/models/AudioCluster";
import { AudioWaveform, SquareActivity, Trash } from "lucide-vue-next";
import { computed } from "vue";
import RecorderWidget from "../RecorderWidget/RecorderWidget.vue";

const MAX_TRANSPOSE = 24;
const MIN_TRANSPOSE = -24;

export type ActionsWidgetSize = "default" | "minimal";
export type ActionsWidgetOrientation = "vertical" | "horizontal";
export type ActionsWidgetVariants = "rounded" | "block";

interface ActionsWidgetProps {
	size?: ActionsWidgetSize;
	orientation?: ActionsWidgetOrientation;
	source: AudioCluster;
	variant?: ActionsWidgetVariants;
}

const {
	size = "minimal",
	orientation = "vertical",
	source,
	variant = "rounded",
} = defineProps<ActionsWidgetProps>();

const transpose = defineModel<number>("transpose");
const volume = defineModel<number>("volume");

const buttonsVariant = computed<VSButtonVariants>(() => {
	return size == "default" ? "default" : "round";
});

const ActionsWidgetDynamicClass = computed(() => ({
	[`ActionsWidget--${orientation}`]: orientation,
	[`ActionsWidget--${variant}`]: variant,
}));

const volumeString = computed<string>(() => {
	return volume.value?.toFixed(0) ?? "0";
});

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
	background-color: $bg-color-2;
	border-radius: $border-radius-bg;

	height: 100%;

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
			@include iconButton;
			z-index: 1;
		}

		&--round {
			width: 5rem;
			height: 5rem;
		}
	}

	&__chip {
		display: block;
		font-size: 1.6rem;
		min-width: fit-content;
		width: 12rem;
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

	&--block {
		border-radius: 0;
	}

	// @include respond(tab-land) {
	// 	flex-wrap: wrap;
	// 	display: grid;

	// 	grid-template-columns: 1fr 1fr;
	// 	grid-template-rows: 1fr 1fr;

	// 	justify-items: center;
	// 	justify-content: center;

	// 	&__separator {
	// 		display: none;
	// 	}

	// 	&__voices {
	// 		width: 100%;
	// 		justify-content: center;
	// 	}

	// 	&__sliders {
	// 		width: 100%;
	// 		padding: 0 $gap-bg;
	// 		grid-column: 1 / -1;
	// 	}
	// }

	@include respond(phone) {
		flex-wrap: wrap;
		gap: 0;

		&__voices,
		&__recording {
			flex: 0 1 49.5%;
			justify-content: center;
			padding: 0;
			margin: 0;
			padding-bottom: $gap-df;
			// width: 100%;
		}

		&__separator {
			height: auto;
			flex: 0 0 0.5%;

			&:nth-of-type(2) {
				display: none;
			}
		}

		&__sliders {
			// border-top: solid 1px;
			flex: 1 0 100%;
			padding: 0 $gap-df;
		}
	}
}
</style>
