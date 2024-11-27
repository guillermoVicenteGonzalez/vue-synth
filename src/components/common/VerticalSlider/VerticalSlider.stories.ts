
import type { Meta, StoryObj } from "@storybook/vue3";
import  VerticalSlider  from "./VerticalSlider.vue"



const meta: Meta<typeof VerticalSlider> = {
	title: 'VerticalSlider',
  component: VerticalSlider,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VerticalSlider>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vertical-slider')

	//     void expect(container).toBeTruthy()
	// },
};
