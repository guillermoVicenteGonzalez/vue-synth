import type { Meta, StoryObj } from "@storybook/vue3";
import VsCard from "./VsCard.vue";

const meta: Meta<typeof VsCard> = {
	title: "VsCard",
	component: VsCard,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsCard>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-card')

	//     void expect(container).toBeTruthy()
	// },
};
