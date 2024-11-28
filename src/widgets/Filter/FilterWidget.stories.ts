
import type { Meta, StoryObj } from "@storybook/vue3";
import  FilterWidget  from "./FilterWidget.vue"



const meta: Meta<typeof FilterWidget> = {
	title: 'FilterWidget',
  component: FilterWidget,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FilterWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('filter')

	//     void expect(container).toBeTruthy()
	// },
};
