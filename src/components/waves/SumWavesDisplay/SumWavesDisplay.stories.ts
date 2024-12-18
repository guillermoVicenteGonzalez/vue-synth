
import type { Meta, StoryObj } from "@storybook/vue3";
import  SumWavesDisplay  from "./SumWavesDisplay.vue"



const meta: Meta<typeof SumWavesDisplay> = {
	title: 'SumWavesDisplay',
  component: SumWavesDisplay,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SumWavesDisplay>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('sum-waves-display')

	//     void expect(container).toBeTruthy()
	// },
};
