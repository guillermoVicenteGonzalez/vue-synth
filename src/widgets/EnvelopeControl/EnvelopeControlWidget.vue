<template>
	<VsCard class="envelope-control">
		<!-- <div class="envelope-control"> -->
		<div class="envelope-control__display">
			<EnvelopeDisplay :envelope="model" />
		</div>

		<div class="envelope-control__controls">
			<div>
				<label>Attack</label>
				<input
					v-model.number="model.attack"
					type="range"
					step="0.1"
					min="0.01"
					max="10"
				/><span>{{ model.attack }}</span>
			</div>

			<div>
				<label>Decay</label>
				<input
					v-model.number="model.decay"
					type="range"
					step="0.1"
					min="0.01"
					max="10"
				/>
				<span>{{ model.decay }}</span>
			</div>

			<div>
				<label>Sustain</label>
				<input
					v-model.number="model.sustain"
					type="range"
					step="0.1"
					min="0.01"
					max="1"
				/>
				<span>{{ model.sustain }}</span>
			</div>

			<div>
				<label>Release</label>
				<input
					v-model.number="model.release"
					type="range"
					step="0.1"
					min="0.01"
					max="10"
				/>
				<span>{{ model.release }}</span>
			</div>
		</div>
		<!-- </div> -->
	</VsCard>
</template>

<script setup lang="ts">
import EnvelopeDisplay from "@/components/EnvelopeDisplay/EnvelopeDisplay.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import type { AudioEnvelope } from "@/models/AudioEnvelope";

// interface EnvelopeControlWidgetProps {}

// const {...} = defineProps<EnvelopeControlWidgetProps>();

const model = defineModel<AudioEnvelope>({
	type: Object,

	default: {
		attack: 2,
		decay: 2,
		release: 2,
		sustain: 0.5,
	},
});
// const model = ref<AudioEnvelope>({
// 	attack: 2,
// 	decay: 2,
// 	release: 2,
// 	sustain: 0.5,
// });
</script>

<style lang="scss" scoped>
.envelope-control {
	min-height: 4rem;
	height: fit-content;
	// max-height: 10rem;

	background-color: green;
	display: grid;
	grid-template-rows: 2fr 1fr;

	// height: fit-content;
	&__display {
		// max-height: 100px;
		// max-height: 70%;
		background-color: yellow;
		// background-color: red;
	}

	&__controls {
		// min-height: 2rem;
		background-color: blue;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}
}
</style>
