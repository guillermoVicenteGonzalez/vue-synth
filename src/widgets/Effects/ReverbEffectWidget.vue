<template>
	<EffectCard title="Reverb" v-model="reverb.disabled"> </EffectCard>
</template>

<script setup lang="ts">
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import EffectCard from "./EffectCard.vue";
const reverb = defineModel<ReverbEffect>({ required: true });
</script>
