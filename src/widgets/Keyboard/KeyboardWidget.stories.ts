
import type { Meta, StoryObj } from "@storybook/vue3";
import  KeyboardWidget  from "./KeyboardWidget.vue"



const meta: Meta<typeof KeyboardWidget> = {
	title: 'KeyboardWidget',
  component: KeyboardWidget,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof KeyboardWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('keyboard')

	//     void expect(container).toBeTruthy()
	// },
};
