import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { ApiProvider } from "../../providers/api-provider";
import { LoginPage } from "./LoginPage";

const meta = {
  title: "Pages/Auth/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ApiProvider>
          <Story />
        </ApiProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledFormInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const usernameInput = canvas.getByLabelText(/username/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const button = canvas.getByRole("button", { name: /login/i });

    await userEvent.type(usernameInput, "tamim");
    await userEvent.type(passwordInput, "123456");
    await userEvent.click(button);
    await expect((usernameInput as HTMLInputElement).value).toBe("tamim");
    await expect((passwordInput as HTMLInputElement).value).toBe("123456");
  },
};

export const SubmitDisabledUntilValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usernameInput = canvas.getByLabelText(/username/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const button = canvas.getByRole("button", { name: /login/i });

    await expect((button as HTMLButtonElement).disabled).toBe(true);
    await userEvent.type(usernameInput, "tamim");
    await expect((button as HTMLButtonElement).disabled).toBe(true);
    await userEvent.type(passwordInput, "123456");
    await expect((button as HTMLButtonElement).disabled).toBe(false);
  },
};