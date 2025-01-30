import type { Meta, StoryObj } from "@storybook/vue3";
import KeyboardKey from "./KeyboardKey.vue";

const meta: Meta<typeof KeyboardKey> = {
	title: "KeyboardKey",
	component: KeyboardKey,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof KeyboardKey>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('keyboard-key')

	//     void expect(container).toBeTruthy()
	// },
};
