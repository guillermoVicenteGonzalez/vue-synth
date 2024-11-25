
import type { Meta, StoryObj } from "@storybook/vue3";
import  VsButton  from "./VsButton.vue"



const meta: Meta<typeof VsButton> = {
	title: 'VsButton',
  component: VsButton,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsButton>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-button')

	//     void expect(container).toBeTruthy()
	// },
};
