<template>
	<select
		id=""
		v-model="model"
		name=""
		class="selector"
		@change="emit('change', model)"
	>
		<option v-if="items.length == 0" value="">
			{{ placeholder || "select a value" }}
		</option>
		<option v-for="(item, index) in items" :key="item + index" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<script setup lang="ts">
interface VsSelectorProps {
	items: string[];
	placeholder?: string;
}

const model = defineModel<string>();
const emit = defineEmits<{
	(e: "change", value: string | undefined): void;
}>();

const { items = [], placeholder } = defineProps<VsSelectorProps>();
</script>

<style lang="scss" scoped>
.selector {
	border-radius: 5px;
	outline: none;
}
</style>
