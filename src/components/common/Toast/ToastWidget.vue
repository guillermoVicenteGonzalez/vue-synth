<template>
	<div class="ToastContainer">
		<ToastCard
			v-for="message in messages"
			:key="message.title"
			:message="message"
		></ToastCard>
	</div>
</template>

<script setup lang="ts">
import useToast from "@/composables/useToast";
import ToastCard from "./ToastCard.vue";

const { messages } = useToast();
</script>

<style lang="scss" scoped>
.ToastContainer {
	position: absolute;
	top: 0;

	display: flex;
	flex-direction: column;
	align-items: flex-end;

	height: 100dvh;
	width: 100dvw;

	z-index: 2;
	padding: $gap-df;
	gap: $gap-df;

	pointer-events: none;
}
</style>
