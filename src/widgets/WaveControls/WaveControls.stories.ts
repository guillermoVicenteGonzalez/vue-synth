import type { Meta, StoryObj } from "@storybook/vue3";
import WaveControls from "./WaveControls.vue";

const meta: Meta<typeof WaveControls> = {
	title: "WaveControls",
	component: WaveControls,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof WaveControls>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('wave-controls')

	//     void expect(container).toBeTruthy()
	// },
};
