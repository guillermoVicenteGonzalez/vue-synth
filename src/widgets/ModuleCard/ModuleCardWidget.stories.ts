import type { Meta, StoryObj } from "@storybook/vue3";
import ModuleCardWidget from "./ModuleCardWidget.vue";

const meta: Meta<typeof ModuleCardWidget> = {
	title: "ModuleCardWidget",
	component: ModuleCardWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ModuleCardWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('module-card')

	//     void expect(container).toBeTruthy()
	// },
};
