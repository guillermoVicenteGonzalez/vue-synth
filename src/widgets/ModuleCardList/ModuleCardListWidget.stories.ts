import type { Meta, StoryObj } from "@storybook/vue3";
import ModuleCardListWidget from "./ModuleCardListWidget.vue";

const meta: Meta<typeof ModuleCardListWidget> = {
	title: "ModuleCardListWidget",
	component: ModuleCardListWidget,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ModuleCardListWidget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('module-card-list')

	//     void expect(container).toBeTruthy()
	// },
};
