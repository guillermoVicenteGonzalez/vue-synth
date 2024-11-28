import type { Meta, StoryObj } from "@storybook/vue3";
import EffectListWidget from "./EffectListWidget.vue";

const meta: Meta<typeof EffectListWidget> = {
	title: "EffectListWidget",
	component: EffectListWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof EffectListWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('effect-list')

	//     void expect(container).toBeTruthy()
	// },
};
