import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const defaultOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

const disabledOptionSet = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived", disabled: true },
];

const meta = {
  title: "Design System/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible, controlled tabs with keyboard navigation and optional deselect behavior.\n\nCorrect usage: keep tab selection in external state and pass a descriptive `ariaLabel`.\nIncorrect usage: avoid local DOM-only tab state that bypasses React state.",
      },
    },
  },
  args: {
    ariaLabel: "Content filters",
    options: defaultOptions,
    value: "all",
    allowDeselect: false,
    onChange: () => {},
  },
  argTypes: {
    value: {
      control: { type: "text" },
      description: "Selected tab value (or null when deselected).",
    },
    allowDeselect: { control: "boolean" },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const Stateful = (args: ComponentProps<typeof Tabs>) => {
  const [value, setValue] = useState<string | null>(args.value ?? null);
  return (
    <div className="max-w-[560px]">
      <Tabs {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Stateful {...args} />,
};

export const WithDisabledOption: Story = {
  args: {
    options: disabledOptionSet,
  },
  render: (args) => <Stateful {...args} />,
};

export const AllowDeselect: Story = {
  args: {
    allowDeselect: true,
    value: "active",
  },
  render: (args) => <Stateful {...args} />,
};
