<template>
	<nav>
		<ul>
			Tab
		</ul>
	</nav>

	<slot ref="myslot" name="content" html></slot>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

// interface VsTabsProps {}

// const {...} = defineProps<VsTabsProps>();
const slot = useTemplateRef("myslot");
console.log(slot.value);

watch(slot, () => {
	console.log(slot.value);
});
</script>

<style lang="scss" scoped></style>
