<template>
	<VsCard class="envelope-widget">
		<!-- <div class="envelope-widget"> -->
		<div class="envelope-widget__display">
			<EnvelopeDisplay :envelope="model" />
		</div>

		<div class="envelope-widget__controls">
			<div class="envelope-widget__control">
				<label>Attack</label>
				<input
					v-model.number="model.attack"
					type="range"
					step="0.1"
					min="0.01"
					max="10"
				/><input
					v-model.number="model.attack"
					step="0.1"
					min="0.01"
					max="10"
					type="number"
				/>
			</div>

			<div class="envelope-widget__control">
				<label>Decay</label>
				<input
					v-model.number="model.decay"
					type="range"
					step="0.01"
					min="0.01"
					max="10"
				/>
				<input
					v-model.number="model.decay"
					step="0.1"
					min="0.01"
					max="10"
					type="number"
				/>
			</div>

			<div class="envelope-widget__control">
				<label>Sustain</label>
				<input
					v-model.number="model.sustain"
					type="range"
					step="0.01"
					min="0.01"
					max="1"
				/>
				<input
					v-model.number="model.sustain"
					step="0.01"
					min="0.01"
					max="10"
					type="number"
				/>
			</div>

			<div class="envelope-widget__control">
				<label>Release</label>
				<input
					v-model.number="model.release"
					type="range"
					step="0.01"
					min="0.01"
					max="10"
				/>
				<input
					v-model.number="model.release"
					step="0.1"
					min="0.01"
					max="10"
					type="number"
				/>
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
.envelope-widget {
	padding: 2rem;
	min-height: 4rem;
	height: 100%;
	// max-height: 10rem;

	display: grid;
	grid-template-rows: 2fr 1fr;

	// height: fit-content;
	&__display {
		// max-height: 100px;
		// max-height: 70%;
		// background-color: red;
		// max-height: 12rem;
		border: solid 1px black;
		border-radius: 10px;
		overflow: hidden;
	}

	&__controls {
		// min-height: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0 5rem;
	}

	&__control {
		display: flex;
		flex-wrap: wrap;
		gap: 0 2rem;

		label {
			flex-basis: 100%;
			font-size: 1.6rem;
		}

		input[type="range"] {
			flex-basis: 6rem;
			flex-grow: 1;
			flex-shrink: 0;
		}

		input[type="number"] {
			flex-basis: 2rem;
			flex-shrink: 0;
			flex-grow: 0;
		}
	}
}
</style>
