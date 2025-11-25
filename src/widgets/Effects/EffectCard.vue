<template>
	<VsCard class="EffectCard" :class="dynamicClass">
		<div class="EffectCard__handle">
			<div class="EffectCard__handle__toggle-button">
				<ToggleButton
					v-model="disabled"
					:color="primaryColor"
					:true-value="false"
				></ToggleButton>
			</div>

			<div class="EffectCard__title">
				<h3 class="EffectCard__title__text">{{ title }}</h3>
			</div>
		</div>

		<div class="EffectCard__body">
			<slot name="body"></slot>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import { computed } from "vue";

interface EffectCardProps {
	title?: string;
}

const { title } = defineProps<EffectCardProps>();
const dynamicClass = computed(() => ({
	"EffectCard--disabled": disabled.value,
}));

const primaryColor = "#42d392";
const disabled = defineModel<boolean>();
</script>

<style scoped lang="scss">
$effect-card-height: 25rem;
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: $disabled-color-2;

$handle-width: 4rem;

.EffectCard {
	width: 100%;
	height: $effect-card-height;

	background-color: $bg-color-2;
	display: flex;

	&__handle {
		display: flex;
		flex-direction: column;

		// justify-content: center;
		flex: 0 0 $handle-width;
		background-color: $handle-bg-color;

		&__toggle-button {
			flex: 0 0 15%;
			// display: flex;
			margin: auto;
			padding: $handle-padding 0;
		}
		// padding: $handle-padding 0;
	}

	&__title {
		// width: 100%;
		flex: 1 1 100%;
		position: relative;
		padding: $gap-df 0;

		&__text {
			display: block;

			top: 0%;

			writing-mode: vertical-rl;
			margin: auto;

			color: $text-color;
			font-size: 1.6rem;
			text-transform: uppercase;
		}
	}

	&__body {
		padding: $gap-df;
		width: 100%;
		height: 100%;
	}

	&--disabled {
		.EffectCard__body {
			position: relative;

			&::after {
				content: "";
				top: 0;
				left: 0;
				position: absolute;
				height: 100%;
				width: 100%;
				background-color: rgba($disabled-color, 0.1);
				backdrop-filter: blur(1.5px);
			}
		}
	}
}
</style>
