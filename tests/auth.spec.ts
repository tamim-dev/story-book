import { test, expect } from "@playwright/test";

const VALID_USERNAME = "emilys";
const VALID_PASSWORD = "emilyspass";

test.describe("Authentication", () => {
  test("successful login shows the dashboard", async ({ page }) => {
    await page.goto("/auth/login");

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("invalid credentials show an error and stay on login", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole("alert")).toHaveText(
      "Invalid username or password",
    );
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("submit stays disabled until both required fields are filled", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    const submit = page.getByRole("button", { name: "Login" });

    await expect(submit).toBeDisabled();

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await expect(submit).toBeDisabled();

    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await expect(submit).toBeEnabled();
  });

  test("successful login redirects to the dashboard", async ({ page }) => {
    await page.goto("/auth/login");

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Login" })).not.toBeVisible();
  });

  test("unauthenticated visitor is redirected away from protected pages", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.goto("/users");
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
