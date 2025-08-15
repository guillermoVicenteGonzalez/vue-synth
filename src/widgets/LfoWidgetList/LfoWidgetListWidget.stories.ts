
import type { Meta, StoryObj } from "@storybook/vue3";
import  LfoWidgetListWidget  from "./LfoWidgetListWidget.vue"



const meta: Meta<typeof LfoWidgetListWidget> = {
	title: 'LfoWidgetListWidget',
  component: LfoWidgetListWidget,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof LfoWidgetListWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('lfo-widget-list')

	//     void expect(container).toBeTruthy()
	// },
};
