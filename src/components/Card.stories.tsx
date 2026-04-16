import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "A simple card container with a title, description, and optional content area.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "This is a short card description.",
  },
};

export const WithContent: Story = {
  args: {
    title: "Card With Content",
    description: "You can place extra elements in the card body.",
    children: "This is the optional children area.",
  },
};
