<template>
	<VsCard class="envelope-widget">
		<!-- <div class="envelope-widget"> -->
		<div class="envelope-widget__display">
			<EnvelopeDisplay :envelope="model" :line-color="primaryColor" />
		</div>

		<div class="envelope-widget__controls">
			<div class="envelope-widget__control">
				<VsChip class="envelope-widget__control__label">Attack</VsChip>

				<VsSlider
					v-model.number="model.attack"
					class="envelope-widget__control__slider"
					:max="10"
					:min="0.01"
					:step="0.01"
				></VsSlider>
				<VsNinput
					v-model.number="model.attack"
					class="envelope-widget__control__input"
					:step="0.1"
					:min="0.01"
					:max="10"
				></VsNinput>
			</div>

			<div class="envelope-widget__control">
				<VsChip class="envelope-widget__control__label">Decay</VsChip>

				<VsSlider
					v-model.number="model.decay"
					class="envelope-widget__control__slider"
					:max="10"
					:min="0.01"
					:step="0.01"
				></VsSlider>
				<VsNinput
					v-model.number="model.decay"
					class="envelope-widget__control__input"
					:step="0.1"
					:min="0.01"
					:max="10"
				></VsNinput>
			</div>

			<div class="envelope-widget__control">
				<VsChip class="envelope-widget__control__label">Sustain</VsChip>
				<VsSlider
					v-model.number="model.sustain"
					class="envelope-widget__control__slider"
					:max="1"
					:min="0.01"
					:step="0.01"
				></VsSlider>

				<VsNinput
					v-model.number="model.sustain"
					class="envelope-widget__control__input"
					:step="0.1"
					:min="0.01"
					:max="1"
				></VsNinput>
			</div>

			<div class="envelope-widget__control">
				<VsChip class="envelope-widget__control__label">Release</VsChip>
				<VsSlider
					v-model.number="model.release"
					class="envelope-widget__control__slider"
					:max="10"
					:min="0.01"
					:step="0.01"
				></VsSlider>

				<VsNinput
					v-model.number="model.release"
					class="envelope-widget__control__input"
					:step="0.1"
					:min="0.01"
					:max="10"
				></VsNinput>
			</div>
		</div>
		<!-- </div> -->
	</VsCard>
</template>

<script setup lang="ts">
import EnvelopeDisplay from "@/components/EnvelopeDisplay/EnvelopeDisplay.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsNinput from "@/components/common/VsNinput/VsNinput.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import type { AudioEnvelope } from "@/models/AudioEnvelope";

// interface EnvelopeControlWidgetProps {}

// const {...} = defineProps<EnvelopeControlWidgetProps>();
const primaryColor = "#42d392";

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
	// resize: both;
	background-color: $bg-color-2;
	color: $text-color;

	padding: 2rem;
	min-height: 4rem;
	height: 100%;
	// max-height: 10rem;

	display: grid;
	grid-template-rows: 2fr 1fr;

	@include respond(tab-port) {
		grid-template-rows: auto;
		grid-template-columns: repeat(2, 1fr);
		gap: $gap-bg;
		padding: $gap-bg;
		justify-content: space-around;
		grid-template-rows: auto;
	}

	@include respond(phone) {
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: auto;

		gap: $gap-bg;
		padding: $gap-bg;
		justify-content: space-around;
		grid-template-rows: auto;
	}

	@include respond(tab-land) {
		grid-template-rows: auto;
		grid-template-columns: repeat(2, 1fr);
		gap: $gap-bg;
		padding: $gap-bg;
		justify-content: space-around;
		grid-template-rows: auto;
	}

	// height: fit-content;
	&__display {
		// max-height: 100px;
		// max-height: 70%;
		// background-color: red;
		// max-height: 12rem;
		border: solid 1px black;
		border-radius: 10px;
		overflow: hidden;

		background-color: $bg-color-1;
	}

	&__controls {
		// min-height: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0 5rem;

		@include respond(tab-port) {
			gap: $gap-bg;
		}
	}

	&__control {
		display: flex;
		flex-wrap: wrap;
		gap: 0 2rem;
		align-content: center;

		&__label {
			font-size: 1.6rem;
			// flex-grow: 1;
			flex-basis: 20%;
			flex-grow: 1;
			flex-shrink: 1;
		}

		&__slider {
			// max-width: 30rem;
			flex-basis: 50%;
			flex-grow: 1;
			flex-shrink: 1;
		}

		&__input {
			flex-basis: 20%;
			flex-grow: 1;
			flex-shrink: 1;

			@include respond(tab-port) {
				margin-top: $gap-df;
			}
		}
	}
}
</style>
