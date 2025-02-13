
import type { Meta, StoryObj } from "@storybook/vue3";
import  EnvelopeDisplay  from "./EnvelopeDisplay.vue"



const meta: Meta<typeof EnvelopeDisplay> = {
	title: 'EnvelopeDisplay',
  component: EnvelopeDisplay,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof EnvelopeDisplay>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('envelope-display')

	//     void expect(container).toBeTruthy()
	// },
};
