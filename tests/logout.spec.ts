import { test, expect } from "@playwright/test";

test.describe("Logout", () => {
  test("logged-in user can sign out and return to the login page", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    await page.getByLabel("Username").fill("emilys");
    await page.getByLabel("Password").fill("emilyspass");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();
  });
});
