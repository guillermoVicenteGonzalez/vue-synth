<template>
	<EffectCard v-model="flanger.disabled" class="FlangerEffect" title="Flanger">
		<template #body>
			<div class="FlangerEffect__body">
				<div class="FlangerEffect__body__controls">
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Delay</VsChip>
						<CircleSlider
							v-model="flanger.delay"
							:disabled="flanger.disabled"
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.001"
							class="FlangerEffect__circle-slider"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Depth</VsChip>
						<CircleSlider
							v-model="flanger.depth"
							:disabled="flanger.disabled"
							:fill-color="primaryColor"
							:min="0"
							:max="0.01"
							:step="0.0001"
							class="FlangerEffect__circle-slider"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Feedback</VsChip>
						<CircleSlider
							v-model="flanger.feedback"
							:disabled="flanger.disabled"
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.001"
							class="FlangerEffect__circle-slider"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Speed</VsChip>
						<CircleSlider
							v-model="flanger.speed"
							:disabled="flanger.disabled"
							:fill-color="primaryColor"
							:min="0"
							:max="10"
							:step="0.01"
							class="FlangerEffect__circle-slider"
						></CircleSlider>
					</div>
				</div>

				<div class="FlangerEffect__body__display">
					<MultiWaveAnalyser :sources="flangerSources"></MultiWaveAnalyser>
				</div>

				<div class="FlangerEffect__body__sources">
					<VsChip class="FlangerEffect__body__sources__title"
						>Visualization</VsChip
					>
					<div
						v-for="(source, index) in flangerSources"
						:key="index"
						class="FlangerEffect__source-control"
					>
						<ToggleButton
							v-model="source.disabled"
							:disabled="flanger.disabled"
							:true-value="false"
							:color="source.color"
							class="FlangerEffect__source-control__toggle-btn"
						></ToggleButton>
						<VsChip class="FlangerEffect__source-control__chip">{{
							source.name
						}}</VsChip>
					</div>
				</div>
			</div>
		</template>

		<template #context-menu>
			<div class="FlangerEffect__context-menu">
				<ul>
					<li @click="flanger.resetEffect()">Reset effect</li>
				</ul>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import ToggleButton from "@/components/common/VsRadioButton/VsRadioButton.vue";
import MultiWaveAnalyser, {
	type analyserSource,
} from "@/components/waves/MultiWaveAnnalyser/MultiWaveAnalyser.vue";
import type { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ref } from "vue";
import EffectCard from "./EffectCard.vue";

const flanger = defineModel<FlangerEffect>({ required: true });
const primaryColor = "#42d392";
// const secondaryColor = "#9242d3";
const tertiaryColor = "#E681E2";
const complementaryColor = "#89CAE7";

interface flangerEffectSources extends analyserSource {
	name: string;
}

const flangerSources = ref<flangerEffectSources[]>([
	{
		node: flanger.value.inputNode,
		color: primaryColor,
		disabled: true,
		name: "input",
	},
	{ node: flanger.value.exitNode, color: complementaryColor, name: "exit" },
	{ node: flanger.value.getDelayNode(), color: tertiaryColor, name: "delay" },
]);
</script>

<style lang="scss" scoped>
$max-controls-width: 20rem;
$max-wave-width: 10rem;

.FlangerEffect {
	&__body {
		display: flex;
		height: 100%;
		gap: $gap-bg;
		padding: 0 $gap-df;

		&__controls {
			display: flex;
			height: 100%;
			max-height: 100%;
			flex: 0 0 $max-controls-width;
			flex-wrap: wrap;
			gap: $gap-df;

			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
		}

		&__display {
			flex: 1 1 100%;
			background-color: $bg-color-1;
			border-radius: 0.5rem;
		}

		&__sources {
			flex: 0 0 $max-wave-width;
			display: flex;
			flex-direction: column;
			gap: $gap-df;
			justify-content: space-around;

			&__title {
				font-size: 1.6rem;
				width: 100%;
			}
		}
	}

	&__control {
		width: 100%;
		display: flex;
		gap: $gap-df;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	&__chip {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
	}

	&__circle-slider {
		color: $text-color;
	}

	&__source-control {
		display: flex;
		gap: $gap-df;
		align-items: center;

		&__chip {
			// width: 100%;
			flex: 1 1 100%;
			font-size: 1.6rem;
			text-align: center;
		}

		&__toggle-btn {
			// flex: 1 1 100%;
		}
	}

	&__context-menu {
		@include contextMenu;
	}
}
</style>
