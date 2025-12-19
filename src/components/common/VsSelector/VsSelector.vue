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
			<option v-for="(item, index) in items" :key="item + index" :value="item">
				{{ item }}
			</option>
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
	items: string[];
	placeholder?: string;
	clearable?: boolean;
	name?: string;
}

const {
	items = [],
	placeholder,
	clearable = false,
	name,
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
