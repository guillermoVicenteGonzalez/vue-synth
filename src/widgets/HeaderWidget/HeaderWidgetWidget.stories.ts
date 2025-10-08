import type { Meta, StoryObj } from "@storybook/vue3";
import HeaderWidgetWidget from "./HeaderWidgetWidget.vue";

const meta: Meta<typeof HeaderWidgetWidget> = {
	title: "HeaderWidgetWidget",
	component: HeaderWidgetWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof HeaderWidgetWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('header-widget')

	//     void expect(container).toBeTruthy()
	// },
};
