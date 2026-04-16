import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  args: {
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        component: "A minimal on/off switch with checked and disabled states.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    checked: false,
    disabled: true,
  },
};
