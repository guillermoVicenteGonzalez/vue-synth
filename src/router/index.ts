
import SynthView from "@/views/SynthView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "synth",
			component: SynthView,
		},
	],
});

export default router;
