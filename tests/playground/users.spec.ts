import { test, expect } from "@playwright/test";

test.describe("Playground users", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/playground/users");
  });

  test("searches and filters the user list", async ({ page }) => {
    await expect(page.getByRole("cell", { name: "Ada Lovelace" })).toBeVisible();

    await page.getByLabel("Search").fill("Alan");
    await expect(page.getByRole("cell", { name: "Alan Turing" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ada Lovelace" })).toHaveCount(0);

    await page.getByLabel("Search").fill("");
    await page.getByLabel("Status").selectOption("Inactive");
    await expect(page.getByRole("cell", { name: "Grace Hopper" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Alan Turing" })).toHaveCount(0);
  });

  test("shows validation errors when adding an empty user", async ({ page }) => {
    await page.getByRole("button", { name: "Add User" }).click();

    const dialog = page.getByRole("dialog", { name: "Add User" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Save user" }).click();

    await expect(dialog.getByText("Name is required")).toBeVisible();
    await expect(dialog.getByText("Email is required")).toBeVisible();
    await expect(page).toHaveURL(/\/playground\/users$/);
  });

  test("shows an error for an invalid email", async ({ page }) => {
    await page.getByRole("button", { name: "Add User" }).click();

    const dialog = page.getByRole("dialog", { name: "Add User" });
    await dialog.getByLabel("Name").fill("Katherine Johnson");
    await dialog.getByLabel("Email").fill("not-an-email");
    await dialog.getByRole("button", { name: "Save user" }).click();

    await expect(dialog.getByText("Enter a valid email")).toBeVisible();
  });

  test("adds a valid user and shows a success notification", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Add User" }).click();

    const dialog = page.getByRole("dialog", { name: "Add User" });
    await dialog.getByLabel("Name").fill("Katherine Johnson");
    await dialog.getByLabel("Email").fill("katherine@example.com");
    await dialog.getByLabel("Role").selectOption("Editor");
    await dialog.getByLabel("Status").selectOption("Active");
    await dialog.getByRole("button", { name: "Save user" }).click();

    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole("status")).toHaveText(/User added/);
    await expect(
      page.getByRole("cell", { name: "Katherine Johnson" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "katherine@example.com" }),
    ).toBeVisible();
  });
});
