import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A simple reusable button with variant, size, and disabled states.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "warning", "success", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click me",
    disabled: false,
    variant: "primary",
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled button",
    disabled: true,
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary button",
    variant: "secondary",
    size: "medium",
  },
};

export const Primary: Story = {
  args: {
    label: "Primary button",
    variant: "primary",
    size: "medium",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning button",
    variant: "warning",
    size: "medium",
  },
};

export const Success: Story = {
  args: {
    label: "Success button",
    variant: "success",
    size: "medium",
  },
};

export const Error: Story = {
  args: {
    label: "Error button",
    variant: "error",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large button",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    label: "Small button",
    size: "small",
  },
};
