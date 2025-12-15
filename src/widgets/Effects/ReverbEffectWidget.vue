<template>
	<EffectCard v-model="reverb.disabled" title="Reverb" class="ReverbEffect">
		<template #body>
			<div class="ReverbEffect__body">
				<div class="ReverbEffect__left-controls">
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Room size</VsChip>
						<CircleSlider
							v-model="reverb.roomSize"
							:disabled="reverb.disabled"
							class="ReverbEffect__circle-slider"
							:min="0"
							:max="1"
							:step="0.001"
						></CircleSlider>
					</div>
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Dampening</VsChip>
						<CircleSlider
							v-model="reverb.dampening"
							:disabled="reverb.disabled"
							class="ReverbEffect__circle-slider"
							:min="0"
							:max="MAX_REVERB_DAMPENING"
						></CircleSlider>
					</div>
				</div>

				<div class="ReverbEffect__visualization">
					<MultiWaveAnalyser
						:canvas-height="200"
						:canvas-width="1000"
						class="ReverbEffect__visualization__canvas"
						:sources="multiAnalyserSources"
					></MultiWaveAnalyser>
					<div class="ReverbEffect__visualization__labels">
						<VsChip
							class="ReverbEffect__chip"
							:style="{ color: wetSignalColor }"
							>Wet Signal</VsChip
						>
						<VsChip
							class="ReverbEffect__chip"
							:style="{ color: drySignalColor }"
							>Dry Signal</VsChip
						>
					</div>
				</div>

				<div class="ReverbEffect__right-controls">
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Pre Delay</VsChip>
						<CircleSlider
							v-model="reverb.preDelay"
							:disabled="reverb.disabled"
							class="ReverbEffect__circle-slider"
							:min="0"
							:step="0.01"
							:max="MAX_REVERB_PRE_DELAY"
						></CircleSlider>
					</div>
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Pre High Cut</VsChip>
						<CircleSlider
							v-model="reverb.preHighCut"
							:disabled="reverb.disabled"
							:max="10000"
							class="ReverbEffect__circle-slider"
						></CircleSlider>
					</div>
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Pre Low Cut</VsChip>
						<CircleSlider
							v-model="reverb.preLowCut"
							:disabled="reverb.disabled"
							:max="10000"
							class="ReverbEffect__circle-slider"
						></CircleSlider>
					</div>
					<div class="ReverbEffect__control">
						<VsChip class="ReverbEffect__chip">Mix</VsChip>
						<CircleSlider
							v-model="reverb.mix"
							:disabled="reverb.disabled"
							:min="0"
							:max="100"
							class="ReverbEffect__circle-slider"
						></CircleSlider>
					</div>
				</div>
			</div>
		</template>

		<template #context-menu>
			<div class="ReverbEffect__context-menu">
				<ul>
					<li @click="reverb.resetEffect()">Reset Effect</li>
				</ul>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import MultiWaveAnalyser, {
	type analyserSource,
} from "@/components/waves/MultiWaveAnnalyser/MultiWaveAnalyser.vue";
import {
	MAX_REVERB_DAMPENING,
	MAX_REVERB_PRE_DELAY,
	ReverbEffect,
} from "@/models/effects/ReverbEffect";
import { computed } from "vue";
import EffectCard from "./EffectCard.vue";

interface ReverbEffectSource extends analyserSource {
	name: string;
}

const reverb = defineModel<ReverbEffect>({ required: true });

const wetSignalColor = "#e5c005";
const drySignalColor = "#23F0EC";

const multiAnalyserSources = computed<ReverbEffectSource[]>(() => {
	const wetSignal = reverb.value.getWetSignalNode();
	if (!wetSignal) return [];

	return [
		{
			name: "wet signal",
			node: wetSignal,
			color: wetSignalColor,
			disabled: false,
		},
		{
			name: "dry signal",
			node: reverb.value.getDrySignalNode(),
			color: drySignalColor,
			disabled: false,
		},
	];
});
</script>

<style scoped lang="scss">
.ReverbEffect {
	&__body {
		display: flex;
		height: 100%;
		gap: $gap-df;
	}

	&__left-controls {
		flex: 0 0 12rem;
	}

	&__right-controls {
		flex: 0 0 28rem;
		height: 100%;
		flex-wrap: wrap;
		display: grid;

		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;

		gap: $gap-df;
	}

	&__visualization {
		flex: 1 1 100%;

		display: flex;
		flex-direction: column;

		gap: $gap-df;

		&__canvas {
			background-color: $bg-color-1;
			border-radius: 0.5rem;
		}

		&__labels {
			display: flex;
			gap: $gap-df;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		gap: $gap-df;
		align-items: center;
	}

	&__circle-slider {
		color: $text-color;
	}

	&__chip {
		width: 100%;
		font-size: 1.6rem;
		text-align: center;
	}

	&__context-menu {
		@include contextMenu;
	}
}

.wet-signal-label {
	color: #ff0000;
}

.dry-signal-label {
	color: #00ff00;
}
</style>
