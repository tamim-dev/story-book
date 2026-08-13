import { test, expect } from "@playwright/experimental-ct-react";
import { ModalHarness } from "./harness/ModalHarness";

test.describe("Modal", () => {
  test("opens and closes from user actions", async ({ mount, page }) => {
    await mount(<ModalHarness />);

    const dialog = page.getByRole("dialog", { name: "Add User" });
    await expect(dialog).toHaveCount(0);

    await page.getByRole("button", { name: "Open modal" }).click();
    await expect(dialog).toBeVisible();
    await expect(page.getByText("Create a playground user.")).toBeVisible();

    await page.getByRole("button", { name: "Close dialog" }).click();
    await expect(dialog).toHaveCount(0);
  });

  test("closes when Escape is pressed", async ({ mount, page }) => {
    await mount(<ModalHarness startOpen />);

    const dialog = page.getByRole("dialog", { name: "Add User" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});
