import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL;
const LOGIN_PATH = "/auth/login";
console.log("BASE_URL", BASE_URL);
test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}${LOGIN_PATH}`);
  });

  test("successful login redirects to dashboard", async ({ page }) => {
    await page.getByLabel("Username").fill("emilys");
    await page.getByLabel("Password").fill("emilyspass");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(`${BASE_URL}/`);
    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("invalid credentials show error message", async ({ page }) => {
    await page.getByLabel("Username").fill("emilys");
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(`${BASE_URL}${LOGIN_PATH}`);
    await expect(page.getByRole("alert")).toHaveText(
      "Invalid username or password",
    );
  });

  test("submit is disabled until both fields are filled", async ({ page }) => {
    const submit = page.getByRole("button", { name: "Login" });

    await expect(submit).toBeDisabled();

    await page.getByLabel("Username").fill("   ");
    await page.getByLabel("Password").fill("anything");
    await expect(submit).toBeDisabled();

    await page.getByLabel("Username").fill("emilys");
    await expect(submit).toBeEnabled();
  });
});
