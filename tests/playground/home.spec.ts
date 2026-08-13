import { test, expect } from "@playwright/test";

test.describe("Playground home", () => {
  test("shows the landing page and links to other sections", async ({
    page,
  }) => {
    await page.goto("/playground");

    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open Dashboard" })).toBeVisible();

    await page.getByRole("link", { name: "Open Users" }).click();
    await expect(page).toHaveURL(/\/playground\/users$/);
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  });
});
