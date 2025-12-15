<template>
	<EffectCard v-model="equalizer.disabled" title="Equalizer">
		<template #body>
			<div class="Equalizer__body">
				<div class="Equalizer__body__controls">
					<div class="Equalizer__control">
						<span class="Equalizer__control__freq-label"
							>{{ LOW_KEY_FREQ }} Hz</span
						>
						<VsSlider
							v-model="equalizer.lowGain"
							:disabled="equalizer.disabled"
							orientation="vertical"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
						</VsSlider>
						<VsChip class="Equalizer__chip">Low</VsChip>
					</div>
					<div class="Equalizer__control">
						<span class="Equalizer__control__freq-label"
							>{{ MID_LOW_KEY_FREQ }} Hz</span
						>
						<VsSlider
							v-model="equalizer.midLowGain"
							:disabled="equalizer.disabled"
							orientation="vertical"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
						</VsSlider>
						<VsChip class="Equalizer__chip">Mid low</VsChip>
					</div>

					<div class="Equalizer__control">
						<span class="Equalizer__control__freq-label"
							>{{ MID_KEY_FREQ }} Hz</span
						>
						<VsSlider
							v-model="equalizer.midGain"
							:disabled="equalizer.disabled"
							orientation="vertical"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
						</VsSlider>
						<VsChip class="Equalizer__chip">Mid</VsChip>
					</div>

					<div class="Equalizer__control">
						<span class="Equalizer__control__freq-label"
							>{{ MID_HIGH_KEY_FREQ }} Hz</span
						>
						<VsSlider
							v-model="equalizer.midHighGain"
							:disabled="equalizer.disabled"
							orientation="vertical"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
						</VsSlider>
						<VsChip class="Equalizer__chip">Mid high</VsChip>
					</div>

					<div class="Equalizer__control">
						<span class="Equalizer__control__freq-label"
							>{{ HIGH_KEY_FREQ }} Hz</span
						>
						<VsSlider
							v-model="equalizer.highGain"
							:disabled="equalizer.disabled"
							orientation="vertical"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
						</VsSlider>
						<VsChip class="Equalizer__chip">High</VsChip>
					</div>
				</div>
			</div>
		</template>

		<template #context-menu>
			<div class="Equalizer__context-menu">
				<ul>
					<li @click="equalizer.resetEffect()">Reset effect</li>
				</ul>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import Equalizer, {
	EQUALIZER_MAX_GAIN,
	EQUALIZER_MIN_GAIN,
	HIGH_KEY_FREQ,
	LOW_KEY_FREQ,
	MID_HIGH_KEY_FREQ,
	MID_KEY_FREQ,
	MID_LOW_KEY_FREQ,
} from "@/models/effects/EqualizerEffect";
import EffectCard from "./EffectCard.vue";

const equalizer = defineModel<Equalizer>({ required: true });
</script>

<style lang="scss" scoped>
.Equalizer {
	&__body {
		width: 100%;
		height: 100%;
		// background-color: red
		display: flex;

		&__controls {
			flex: 1 1 100%;
			height: 100%;
			width: 100%;
			display: grid;
			gap: $gap-df;

			grid-template-columns: repeat(5, minmax(10rem, 1fr));
			justify-items: center;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		max-width: 100%;
		gap: $gap-df;

		align-items: center;

		&__freq-label {
			color: $text-color;
			font-size: 1.6rem;
			text-transform: uppercase;
		}
	}

	&__chip {
		width: 90%;
		flex: 1;
		font-size: 1.6rem;
		text-align: center;
	}

	&__context-menu {
		@include contextMenu;
	}
}
</style>
