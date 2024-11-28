
import type { Meta, StoryObj } from "@storybook/vue3";
import  WaveCanvas  from "./WaveCanvas.vue"



const meta: Meta<typeof WaveCanvas> = {
	title: 'WaveCanvas',
  component: WaveCanvas,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof WaveCanvas>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('wave-canvas')

	//     void expect(container).toBeTruthy()
	// },
};
