
import type { Meta, StoryObj } from "@storybook/vue3";
import  {{ pascalCase name }}Widget  from "./{{ pascalCase name }}Widget.vue"



const meta: Meta<typeof {{ pascalCase name }}Widget> = {
	title: '{{ pascalCase name }}Widget',
  component: {{ pascalCase name }}Widget,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof {{ pascalCase name }}Widget>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('{{ kebabCase name }}')

	//     void expect(container).toBeTruthy()
	// },
};
