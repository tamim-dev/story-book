import { test, expect } from "@playwright/test";

test.describe("Playground navigation", () => {
  test("moves between home, dashboard, users, and settings", async ({
    page,
  }) => {
    await page.goto("/playground");

    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();

    const sidebar = page.getByRole("navigation", { name: "Playground" });

    await sidebar.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL(/\/playground\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await sidebar.getByRole("link", { name: "Users" }).click();
    await expect(page).toHaveURL(/\/playground\/users$/);
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    await sidebar.getByRole("link", { name: "Settings" }).click();
    await expect(page).toHaveURL(/\/playground\/settings$/);
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();

    await sidebar.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/playground$/);
    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  });
});
