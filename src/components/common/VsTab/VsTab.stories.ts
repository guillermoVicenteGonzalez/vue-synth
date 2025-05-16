
import type { Meta, StoryObj } from "@storybook/vue3";
import  VsTab  from "./VsTab.vue"



const meta: Meta<typeof VsTab> = {
	title: 'VsTab',
  component: VsTab,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VsTab>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('vs-tab')

	//     void expect(container).toBeTruthy()
	// },
};
