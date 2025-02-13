import type { Meta, StoryObj } from "@storybook/vue3";
import EnvelopeControlWidget from "./EnvelopeControlWidget.vue";

const meta: Meta<typeof EnvelopeControlWidget> = {
	title: "EnvelopeControlWidget",
	component: EnvelopeControlWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof EnvelopeControlWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('envelope-control')

	//     void expect(container).toBeTruthy()
	// },
};
