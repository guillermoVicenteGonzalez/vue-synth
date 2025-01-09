<template>
	<div class="VS-Selector">
		<select
			id=""
			v-model="model"
			name=""
			class="VS-Selector__select"
			@change="emit('change', model)"
		>
			<option v-if="items.length == 0" value="">
				{{ placeholder || "select a value" }}
			</option>
			<option v-for="(item, index) in items" :key="item + index" :value="item">
				{{ item }}
			</option>
		</select>

		<button
			v-if="clearable && model"
			class="VS-Selector__clear-btn"
			@click="clearSelection"
		>
			X
		</button>
	</div>
</template>

<script setup lang="ts">
interface VsSelectorProps {
	items: string[];
	placeholder?: string;
	clearable?: boolean;
}

const {
	items = [],
	placeholder,
	clearable = false,
} = defineProps<VsSelectorProps>();

const model = defineModel<string>();
const emit = defineEmits<{
	(e: "change", value: string | undefined): void;
	(e: "clear"): void;
}>();

function clearSelection() {
	model.value = "";
	emit("clear");
	emit("change", undefined);
}
</script>

<style lang="scss" scoped>
.VS-Selector {
	border-radius: 5px;
	width: 100%;
	display: flex;
	// background-color:red;
	border: solid 1px black;

	&__select,
	&__clear-btn {
		border: none;
		outline: none;
		background-color: transparent;
	}

	&__select {
		flex-basis: 100%;
		border: none;
		flex-shrink: 1;
	}

	&__clear-btn {
		justify-self: end;
	}
}
</style>
