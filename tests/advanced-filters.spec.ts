import { test, expect } from "@playwright/test";

const VALID_USERNAME = "emilys";
const VALID_PASSWORD = "emilyspass";

test.describe("Advanced filters drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Users List" }).click();
    await expect(page).toHaveURL(/\/users$/);
  });

  test("drawer is closed when the users page first loads", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Open advanced filters" }),
    ).toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Advanced Filters" }),
    ).toHaveCount(0);
  });

  test("opens the drawer and shows the Type filter options", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open advanced filters" }).click();

    const drawer = page.getByRole("dialog", { name: "Advanced Filters" });

    await expect(drawer).toBeVisible();
    await expect(
      drawer.getByRole("heading", { name: "Advanced Filters" }),
    ).toBeVisible();
    await expect(
      drawer.getByText("Narrow your search results by using these attributes."),
    ).toBeVisible();
    await expect(drawer.getByRole("checkbox", { name: "Electricity" })).toBeVisible();
    await expect(drawer.getByRole("checkbox", { name: "Gas" })).not.toBeChecked();
    await expect(drawer.getByRole("button", { name: "Show Results" })).toBeDisabled();
  });

  test("checking a filter option updates the drawer", async ({ page }) => {
    await page.getByRole("button", { name: "Open advanced filters" }).click();

    const drawer = page.getByRole("dialog", { name: "Advanced Filters" });
    const electricity = drawer.getByRole("checkbox", { name: "Electricity" });

    await electricity.check();

    await expect(electricity).toBeChecked();
    await expect(
      drawer.getByRole("button", { name: "Show Results" }),
    ).toBeEnabled();
    await expect(
      drawer.getByRole("button", { name: "Reset", exact: true }),
    ).toBeVisible();
  });

  test("Reset All clears selected filters", async ({ page }) => {
    await page.getByRole("button", { name: "Open advanced filters" }).click();

    const drawer = page.getByRole("dialog", { name: "Advanced Filters" });
    const electricity = drawer.getByRole("checkbox", { name: "Electricity" });

    await electricity.check();
    await expect(electricity).toBeChecked();

    await drawer.getByRole("button", { name: "Reset All" }).click();

    await expect(electricity).not.toBeChecked();
    await expect(
      drawer.getByRole("button", { name: "Show Results" }),
    ).toBeDisabled();
    await expect(
      drawer.getByRole("button", { name: "Reset", exact: true }),
    ).toHaveCount(0);
  });

  test("close button dismisses the drawer", async ({ page }) => {
    await page.getByRole("button", { name: "Open advanced filters" }).click();

    const drawer = page.getByRole("dialog", { name: "Advanced Filters" });
    await expect(drawer).toBeVisible();

    await drawer.getByRole("button", { name: "Close filters" }).click();

    await expect(drawer).toHaveCount(0);
  });

  test("Escape closes the drawer", async ({ page }) => {
    await page.getByRole("button", { name: "Open advanced filters" }).click();

    const drawer = page.getByRole("dialog", { name: "Advanced Filters" });
    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(drawer).toHaveCount(0);
  });
});
