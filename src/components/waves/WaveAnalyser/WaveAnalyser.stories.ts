
import type { Meta, StoryObj } from "@storybook/vue3";
import  WaveAnalyser  from "./WaveAnalyser.vue"



const meta: Meta<typeof WaveAnalyser> = {
	title: 'WaveAnalyser',
  component: WaveAnalyser,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof WaveAnalyser>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('wave-analyser')

	//     void expect(container).toBeTruthy()
	// },
};
