import { test, expect } from "@playwright/test";

test.describe("Playground dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/playground/dashboard");
    await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
  });

  test("shows summary cards and the user table", async ({ page }) => {
    await expect(page.getByLabel("Total users count")).toHaveText("4");
    await expect(page.getByLabel("Active users count")).toHaveText("2");
    await expect(page.getByLabel("Pending users count")).toHaveText("1");
    await expect(page.getByRole("cell", { name: "Ada Lovelace" })).toBeVisible();
  });

  test("filters the table by search text", async ({ page }) => {
    await page.getByLabel("Search").fill("Grace");

    await expect(page.getByRole("cell", { name: "Grace Hopper" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ada Lovelace" })).toHaveCount(0);
  });

  test("filters the table by status", async ({ page }) => {
    await page.getByLabel("Status").selectOption("Pending");

    await expect(
      page.getByRole("cell", { name: "Linus Torvalds" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ada Lovelace" })).toHaveCount(0);
  });

  test("shows an empty state when nothing matches", async ({ page }) => {
    await page.getByLabel("Search").fill("does-not-exist");

    await expect(
      page.getByRole("heading", { name: "No users found" }),
    ).toBeVisible();
    await expect(
      page.getByText("Try a different search or status filter."),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Name" }),
    ).toHaveCount(0);
  });
});
