<template>
	<div class="VsHamburgerIcon" :class="VsHamburgerIconClasses">
		<div class="VsHamburgerIcon__slice"></div>
		<div class="VsHamburgerIcon__slice"></div>
		<div class="VsHamburgerIcon__slice"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const state = defineModel<boolean>({ default: true });

const VsHamburgerIconClasses = computed(() => ({
	"VsHamburgerIcon--active": state.value,
}));
</script>

<style scoped lang="scss">
$transition-time: 0.5s;

.VsHamburgerIcon {
	width: 100%;
	height: 100%;

	padding: 20%;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;

	transition: all $transition-time;
	position: relative;

	&__slice {
		transition: all $transition-time;

		width: 100%;
		height: 2px;
		background-color: black;
	}

	&--active {
		// display: block;
		.VsHamburgerIcon {
			&__slice {
				position: absolute;
				display: none;
				top: 50%;

				&:first-of-type {
					display: block;
					transform-origin: 50%;
					transform: rotate(405deg);
				}

				&:last-of-type {
					display: block;
					transform-origin: 50%;
					transform: rotate(-405deg);

					// transform: rotate(-45deg);
				}
			}
		}
	}
}
</style>
