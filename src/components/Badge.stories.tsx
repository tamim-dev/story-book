import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: "A small status label that supports success, warning, and error variants.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    label: "Error",
    variant: "error",
  },
};
