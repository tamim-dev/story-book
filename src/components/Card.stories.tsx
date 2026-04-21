import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Container component for grouped content with standardized variants and spacing sizes.",
      },
    },
  },
  args: {
    title: "Card title",
    description: "Card description",
    variant: "default",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-3 md:grid-cols-3">
      <Card {...args} variant="default" />
      <Card {...args} variant="outlined" />
      <Card {...args} variant="elevated" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-3 md:grid-cols-3">
      <Card {...args} size="sm" title="Small" />
      <Card {...args} size="md" title="Medium" />
      <Card {...args} size="lg" title="Large" />
    </div>
  ),
};
