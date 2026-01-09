<template>
	<div ref="selfRef" class="DropdownMenu">
		<div class="DropdownMenu__activator" @click="handleActivatorClick">
			<slot name="activator"> </slot>

			<div class="DropdownMenu__content" :class="dynamicContentClass">
				<slot name="content"> </slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useClickOutside from "@/composables/useClickOutside";
import { computed, ref } from "vue";

const active = ref<boolean>();
const selfRef = ref();

const dynamicContentClass = computed(() => ({
	"DropdownMenu__content--hidden": !active.value,
}));

useClickOutside(selfRef, () => {
	active.value = false;
});

function handleActivatorClick() {
	active.value = !active.value;
}
</script>

<style lang="scss" scoped>
$animation-duration: 0.1s;
$animation-timing-function: ease-in;

.DropdownMenu {
	&__activator {
		width: fit-content;
		height: fit-content;
		position: relative;
		overflow: visible;
	}

	&__content {
		background-color: $bg-color-3;

		interpolate-size: allow-keywords;
		z-index: 100;
		// position: fixed;
		position: absolute;
		top: 100%;
		left: 0%;

		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0px 1px 3px 1px #00000026;

		animation-duration: $animation-duration;
		animation-timing-function: $animation-timing-function;

		//animation
		&--hidden {
			visibility: hidden;
		}
	}
}
</style>
