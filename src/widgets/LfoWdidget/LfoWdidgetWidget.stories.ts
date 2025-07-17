
import type { Meta, StoryObj } from "@storybook/vue3";
import  LfoWdidgetWidget  from "./LfoWdidgetWidget.vue"



const meta: Meta<typeof LfoWdidgetWidget> = {
	title: 'LfoWdidgetWidget',
  component: LfoWdidgetWidget,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof LfoWdidgetWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('lfo-wdidget')

	//     void expect(container).toBeTruthy()
	// },
};
