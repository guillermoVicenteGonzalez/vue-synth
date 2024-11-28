import type { Meta, StoryObj } from "@storybook/vue3";
import VsSlider from "./VsSlider.vue";

const meta: Meta<typeof VsSlider> = {
	title: "VsSlider",
	component: VsSlider,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsSlider>;

export const Default: Story = {
	args: {
		orientation: {},
	},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-slider')

	//     void expect(container).toBeTruthy()
	// },
};
