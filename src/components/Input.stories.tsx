import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
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
    onChange: () => {},
    placeholder: "Type here",
  },
};

export const WithText: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "Hello Storybook",
    onChange: () => {},
    placeholder: "Type here",
  },
};
