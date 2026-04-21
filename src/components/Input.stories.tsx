import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible input that standardizes `variant`, `size`, and `className`.\n\nCorrect usage: choose validation variant (`default|success|error`) from business state.\nIncorrect usage: do not hardcode border/text color classes in feature components.",
      },
    },
  },
  args: {
    value: "",
    placeholder: "Type here",
    variant: "default",
    size: "md",
    disabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "error"],
    },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const Stateful = (args: ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <Input
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Variants: Story = {
  render: (args) => {
    return (
      <div className="max-w-card space-y-3">
        <Stateful {...args} variant="default" placeholder="Default input" />
        <Stateful {...args} variant="success" value="Valid value" />
        <Stateful {...args} variant="error" value="Invalid value" />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="max-w-card space-y-3">
        <Stateful {...args} size="sm" placeholder="Small" />
        <Stateful {...args} size="md" placeholder="Medium" />
        <Stateful {...args} size="lg" placeholder="Large" />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: "Disabled",
    disabled: true,
  },
};
