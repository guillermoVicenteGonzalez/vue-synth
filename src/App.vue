<template>
	<RouterView />
	<ToastWidget></ToastWidget>
</template>

<script setup lang="ts">
import ToastWidget from "./components/common/Toast/ToastWidget.vue";
</script>
