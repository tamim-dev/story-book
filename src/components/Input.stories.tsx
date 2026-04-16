import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        component: "A text input with basic size, variant, and disabled options.",
      },
    },
  },
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "error"],
    },
    disabled: { control: "boolean" },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "",
    placeholder: "Type here",
    size: "medium",
    variant: "default",
    disabled: false,
  },
};

export const WithText: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "Hello Storybook",
    placeholder: "Type here",
    size: "medium",
    variant: "default",
    disabled: false,
  },
};

export const ErrorVariant: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "Invalid value",
    placeholder: "Type here",
    size: "medium",
    variant: "error",
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "Disabled input",
    placeholder: "Type here",
    size: "medium",
    variant: "default",
    disabled: true,
  },
};
