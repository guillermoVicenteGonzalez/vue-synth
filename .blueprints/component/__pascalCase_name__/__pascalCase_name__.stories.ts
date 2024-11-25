
import type { Meta, StoryObj } from "@storybook/vue3";
import  {{ pascalCase name }}  from "./{{ pascalCase name }}.vue"



const meta: Meta<typeof {{ pascalCase name }}> = {
	title: '{{ pascalCase name }}',
  component: {{ pascalCase name }},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof {{ pascalCase name }}>;

export const Default: Story = {
	args: {},
	// async play({ canvasElement }) {
	//     const canvas = within(canvasElement)
	//     const container = canvas.getByTestId('{{ kebabCase name }}')

	//     void expect(container).toBeTruthy()
	// },
};
