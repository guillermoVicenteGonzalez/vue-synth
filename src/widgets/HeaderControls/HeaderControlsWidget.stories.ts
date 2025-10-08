import type { Meta, StoryObj } from "@storybook/vue3";
import HeaderControlsWidget from "./HeaderControlsWidget.vue";

const meta: Meta<typeof HeaderControlsWidget> = {
	title: "HeaderControlsWidget",
	component: HeaderControlsWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof HeaderControlsWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('header-controls')

	//     void expect(container).toBeTruthy()
	// },
};
