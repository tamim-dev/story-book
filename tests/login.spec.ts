import { test, expect } from "@playwright/test";

const VALID_USERNAME = "emilys";
const VALID_PASSWORD = "emilyspass";

test.describe("Login form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
  });

  test("successful submission navigates to the dashboard", async ({ page }) => {
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Login" })).not.toBeVisible();
  });

  test("submit stays disabled when required fields are empty", async ({
    page,
  }) => {
    const submit = page.getByRole("button", { name: "Login" });

    await expect(submit).toBeDisabled();

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await expect(submit).toBeDisabled();

    await page.getByLabel("Username").clear();
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await expect(submit).toBeDisabled();
  });

  test("submit stays disabled when username is only whitespace", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill("   ");
    await page.getByLabel("Password").fill(VALID_PASSWORD);

    await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
  });

  test("submit is enabled when both required fields are filled", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);

    await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
  });

  test("invalid credentials keep the user on the login page", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("invalid credentials show an accessible error message", async ({
    page,
  }) => {
    const alert = page.getByRole("alert");

    await expect(alert).toHaveCount(0);

    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(alert).toBeVisible();
    await expect(alert).toHaveText("Invalid username or password");
    await expect(page.getByLabel("Username")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("valid submission shows the authenticated dashboard", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
    await expect(
      page.getByText(/you are logged in successfully/i),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });
});
