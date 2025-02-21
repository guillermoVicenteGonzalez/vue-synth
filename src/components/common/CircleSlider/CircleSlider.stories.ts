import type { Meta, StoryObj } from "@storybook/vue3";
import CircleSlider from "./CircleSlider.vue";

const meta: Meta<typeof CircleSlider> = {
	title: "CircleSlider",
	component: CircleSlider,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CircleSlider>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('circle-slider')

	//     void expect(container).toBeTruthy()
	// },
};
