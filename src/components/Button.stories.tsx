import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click me",
    onClick: () => {
      console.log("Button clicked");
    },
    disabled: false,
    variant: "primary",
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled button",
    onClick: () => {
      console.log("Button clicked");
    },
    disabled: true,
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary button",
    onClick: () => {
      console.log("Button clicked");
    },
    variant: "secondary",
    size: "medium",
  },
};

export const Primary: Story = {
  args: {
    label: "Primary button",
    onClick: () => {
      console.log("Button clicked");
    },
    variant: "primary",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large button",
    onClick: () => {
      console.log("Button clicked");
    },
    size: "large",
  },
};

export const Small: Story = {
  args: {
    label: "Small button",
    onClick: () => {
      console.log("Button clicked");
    },
    size: "small",
  },
};
