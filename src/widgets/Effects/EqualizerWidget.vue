<template>
	<EffectCard v-model="equalizer.disabled" title="Equalizer">
		<template #body>
			<div class="Equalizer__body">
				<div class="Equalizer__body__controls">
					<div class="Equalizer__control">
						<span>3</span>
						<VsSlider orientation="vertical">
							<template #label>
								<VsChip class="Equalizer__chip">Low</VsChip>
							</template>
						</VsSlider>
					</div>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import Equalizer from "@/models/effects/EqualizerEffect";
import EffectCard from "./EffectCard.vue";

const equalizer = defineModel<Equalizer>({ required: true });
</script>

<style lang="scss" scoped>
.Equalizer {
	&__body {
		width: 100%;
		height: 100%;
		background-color: red;

		&__controls {
			height: 100%;
			width: 100%;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
}
</style>
