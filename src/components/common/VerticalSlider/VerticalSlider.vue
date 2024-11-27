<template>
	<input
		v-model="model"
		type="range"
		min="1"
		:max="range"
		class="verticalSlider"
		@input="emit('change', model)"
	/>
</template>

<script setup lang="ts">
interface VerticalSliderProps {
	range?: number;
	initialValue?: number;
}
const { range = 100 } = defineProps<VerticalSliderProps>();

const model = defineModel<number>({
	default: 10,
	set(value) {
		return Number(value);
	},
	type: Number,
});

const emit = defineEmits<{
	(e: "change", value?: number): void;
}>();
</script>

<style lang="scss" scoped>
.verticalSlider {
	height: 100%;
	width: 2rem;
	writing-mode: vertical-lr;
	direction: rtl;
}
</style>
