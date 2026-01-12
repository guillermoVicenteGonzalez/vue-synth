import type { Meta, StoryObj } from "@storybook/vue3";
import ToggleButton from "./VsRadioButton.vue";

const meta: Meta<typeof ToggleButton> = {
	title: "ToggleButton",
	component: ToggleButton,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('toggle-button')

	//     void expect(container).toBeTruthy()
	// },
};
