import type { Meta, StoryObj } from "@storybook/vue3";
import VsSelector from "./VsSelector.vue";

const meta: Meta<typeof VsSelector> = {
	title: "VsSelector",
	component: VsSelector,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsSelector>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-selector')

	//     void expect(container).toBeTruthy()
	// },
};
