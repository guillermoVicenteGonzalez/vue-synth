/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-mdx-gfm",
	],

	framework: {
		name: "@storybook/vue3-vite",
		options: {},
	},

	docs: {
		autodocs: "tag",
	},
};
export default config;
