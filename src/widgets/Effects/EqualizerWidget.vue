<template>
	<EffectCard v-model="equalizer.disabled" title="Equalizer">
		<template #body>
			<div class="Equalizer__body">
				<div class="Equalizer__body__controls">
					<div class="Equalizer__control">
						<span>{{ equalizer.lowGain }}</span>
						<VsSlider
							orientation="vertical"
							v-model="equalizer.lowGain"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
							<template #label>
								<VsChip class="Equalizer__chip">Low</VsChip>
							</template>
						</VsSlider>
					</div>
					<div class="Equalizer__control">
						<span>{{ equalizer.midLowGain }}</span>
						<VsSlider
							orientation="vertical"
							v-model="equalizer.midLowGain"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
							<template #label>
								<VsChip class="Equalizer__chip">Mid low</VsChip>
							</template>
						</VsSlider>
					</div>

					<div class="Equalizer__control">
						<span>{{ equalizer.midGain }}</span>
						<VsSlider
							orientation="vertical"
							v-model="equalizer.midGain"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
							<template #label>
								<VsChip class="Equalizer__chip">Mid</VsChip>
							</template>
						</VsSlider>
					</div>

					<div class="Equalizer__control">
						<span>{{ equalizer.midHighGain }}</span>
						<VsSlider
							orientation="vertical"
							v-model="equalizer.midHighGain"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
							<template #label>
								<VsChip class="Equalizer__chip">Mid high</VsChip>
							</template>
						</VsSlider>
					</div>

					<div class="Equalizer__control">
						<span>{{ equalizer.highGain }}</span>
						<VsSlider
							orientation="vertical"
							v-model="equalizer.highGain"
							:max="EQUALIZER_MAX_GAIN"
							:min="EQUALIZER_MIN_GAIN"
							:step="0.01"
						>
							<template #label>
								<VsChip class="Equalizer__chip">High</VsChip>
							</template>
						</VsSlider>
					</div>
				</div>

				<div class="Equalizer__body__visualization"></div>
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
			flex: 1 0 60%;
			height: 100%;
			width: 100%;
			display: grid;
			gap: $gap-df;

			grid-template-columns: repeat(5, 1fr);
			justify-items: center;
		}

		&__visualization {
			flex: 1 1 100%;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		max-width: 100%;
	}

	&__chip {
		width: 100%;
	}
}
</style>
