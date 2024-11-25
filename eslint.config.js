import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginCypress from "eslint-plugin-cypress/flat";
import pluginVue from "eslint-plugin-vue";

export default [
	{
		name: "app/files-to-lint",
		files: ["**/*.{ts,mts,tsx,vue}"],
	},

	{
		name: "app/files-to-ignore",
		ignores: [
			"**/dist/**",
			"**/dist-ssr/**",
			"**/coverage/**",
			"**/.blueprints/**",
		],
	},

	...pluginVue.configs["flat/recommended"],
	...vueTsEslintConfig(),

	{
		...pluginVitest.configs.recommended,
		files: ["src/**/__tests__/*"],
	},

	{
		...pluginCypress.configs.recommended,
		files: [
			"cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
			"cypress/support/**/*.{js,ts,jsx,tsx}",
		],
	},

	{
		name: "custom vue rules",
		rules: {
			"vue/no-arrow-functions-in-watch": "error",
			"vue/no-unused-vars": "error",

			// "vue/no-template-key": "error",
			"vue/define-emits-declaration": ["error", "type-based"],
			"vue/define-props-declaration": ["error", "type-based"],
			"vue/enforce-style-attribute": [
				"error",
				{
					allow: ["scoped", "module"],
				},
			],
			"vue/block-lang": [
				"error",
				{
					script: {
						lang: "ts",
					},
				},
			],
			"vue/block-order": [
				"error",
				{
					order: ["template", ["script", "style"]],
				},
			],
			"vue/component-api-style": ["error", ["script-setup"]],
			"vue/max-template-depth": ["error", { maxDepth: 10 }],
		},
	},

	{
		name: "custom typescript rules",
		rules: {
			indent: ["error", 4],
			complexity: ["error", 10],
			"prefer-arrow-callback": "warn",
			//rules for both ts and vue files
			"@typescript-eslint/array-type": "error",
			"@typescript-eslint/class-methods-use-this": "error",
			//rules for vue
			//rules for typescript
			"@typescript-eslint/consistent-type-definitions": "error",
			"@typescript-eslint/no-empty-function": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/array-type": "error",
			"no-unused-expressions": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/naming-convention": [
				"error",
				{ selector: "variableLike", format: ["camelCase"] },
			],
			//to enforce naming for specific variable types

			//booleans have verb is
		},
		files: ["/src/**/*.{ts,mts,tsx,vue}"],
	},
	skipFormatting,
];
