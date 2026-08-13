import { test, expect } from "@playwright/test";

test.describe("Playground settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/playground/settings");
  });

  test("saves valid settings and shows a success notification", async ({
    page,
  }) => {
    await page.getByLabel("Display name").fill("Ada Byron");
    await page.getByLabel("Email", { exact: true }).fill("ada.byron@example.com");
    await page.getByLabel("Role").selectOption("Editor");
    await page.getByRole("switch", { name: "Email notifications" }).click();
    await page.getByRole("button", { name: "Save settings" }).click();

    await expect(page.getByRole("status")).toHaveText(/Settings saved/);
    await expect(
      page.getByRole("switch", { name: "Email notifications" }),
    ).toHaveAttribute("aria-checked", "false");
  });

  test("shows validation errors for invalid settings", async ({ page }) => {
    await page.getByLabel("Display name").fill("");
    await page.getByLabel("Email", { exact: true }).fill("invalid");
    await page.getByRole("button", { name: "Save settings" }).click();

    await expect(page.getByText("Display name is required")).toBeVisible();
    await expect(page.getByText("Enter a valid email")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });
});
