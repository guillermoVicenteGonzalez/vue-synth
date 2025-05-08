
import type { Meta, StoryObj } from "@storybook/vue3";
import  VsTabs  from "./VsTabs.vue"



const meta: Meta<typeof VsTabs> = {
	title: 'VsTabs',
  component: VsTabs,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsTabs>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-tabs')

	//     void expect(container).toBeTruthy()
	// },
};
