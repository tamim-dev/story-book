import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

const meta = {
  title: "Design System/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch component with ARIA role, semantic variants, and controlled checked state.\n\nCorrect usage: pass an accessible `aria-label`.\nIncorrect usage: avoid uncontrolled local DOM toggling.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    onChange: { table: { disable: true } },
  },
  args: {
    checked: false,
    disabled: false,
    variant: "primary",
    size: "md",
    "aria-label": "Enable feature",
    onChange: () => {},
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const Stateful = (args: ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState(args.checked);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Stateful {...args} variant="primary" />
      <Stateful {...args} variant="secondary" />
      <Stateful {...args} variant="outline" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Stateful {...args} size="sm" />
      <Stateful {...args} size="md" />
      <Stateful {...args} size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, onChange: () => {} },
};
