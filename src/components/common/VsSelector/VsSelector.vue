<template>
	<div class="VS-Selector">
		<select
			id=""
			v-model="model"
			:name="name"
			class="VS-Selector__select"
			@change="emit('change', model)"
		>
			<option v-if="items.length == 0" value="">
				{{ placeholder || "select a value" }}
			</option>
			<option v-for="(item, index) in items" :key="index" :value="item">
				{{ parseItemName(item) }}
			</option>

			<slot></slot>
		</select>

		<button
			v-if="clearable && model"
			class="VS-Selector__clear-btn"
			@click="clearSelection"
		>
			<X class="VS-Selector__clear-btn__icon"></X>
		</button>
	</div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

interface VsSelectorProps {
	items?: unknown[];
	itemTitle?: string;
	placeholder?: string;
	clearable?: boolean;
	name?: string;
}

const {
	items = [],
	itemTitle,
	placeholder,
	clearable = false,
	name,
} = defineProps<VsSelectorProps>();

const model = defineModel<unknown>();
const emit = defineEmits<{
	(e: "change", value: unknown): void;
	(e: "clear"): void;
}>();

function parseItemName(item: unknown) {
	if (!itemTitle) return item;
	if (typeof item !== "object") return item;
	if (item === null) return null;

	return itemTitle in item ? item[itemTitle as keyof typeof item] : item;
}

function clearSelection() {
	model.value = null;
	emit("clear");
	// emit("change", undefined);
}
</script>

<style lang="scss" scoped>
.VS-Selector {
	@include inputStyles;
	border-radius: 5px;
	width: 100%;
	display: flex;
	// background-color:red;
	border: solid 1px black;
	align-items: center;

	&__select,
	&__clear-btn {
		border: none;
		outline: none;
		background-color: $bg-color-1;
		color: $text-color;
	}

	&__select {
		flex-basis: 100%;
		border: none;
		flex-shrink: 1;
		width: 100%;
	}

	&__clear-btn {
		justify-self: end;
		display: flex;

		&__icon {
			@include iconButton;
		}
	}
}
</style>
