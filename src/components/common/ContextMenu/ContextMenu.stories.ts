import type { Meta, StoryObj } from "@storybook/vue3";
import ContextMenu from "./ContextMenu.vue";

const meta: Meta<typeof ContextMenu> = {
	title: "ContextMenu",
	component: ContextMenu,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('context-menu')

	//     void expect(container).toBeTruthy()
	// },
};
