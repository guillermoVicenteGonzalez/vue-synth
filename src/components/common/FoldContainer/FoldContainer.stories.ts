import type { Meta, StoryObj } from "@storybook/vue3";
import FoldContainer from "./FoldContainer.vue";

const meta: Meta<typeof FoldContainer> = {
	title: "FoldContainer",
	component: FoldContainer,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FoldContainer>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('fold-container')

	//     void expect(container).toBeTruthy()
	// },
};
