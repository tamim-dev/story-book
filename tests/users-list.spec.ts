import { test, expect } from "@playwright/test";

const VALID_USERNAME = "emilys";
const VALID_PASSWORD = "emilyspass";

function isUsersListRequest(url: URL | string) {
  return new URL(url, "http://localhost").pathname === "/users";
}

test.describe("Users list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Username").fill(VALID_USERNAME);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("button", { name: "Users List" })).toBeVisible();
  });

  test("loads users from the API and shows them in the table", async ({
    page,
  }) => {
    const usersResponsePromise = page.waitForResponse((response) => {
      return (
        response.request().method() === "GET" &&
        isUsersListRequest(response.url())
      );
    });

    await page.getByRole("button", { name: "Users List" }).click();

    const usersResponse = await usersResponsePromise;
    expect(usersResponse.ok()).toBeTruthy();

    const payload = await usersResponse.json();
    const firstUser = payload.users[0];

    await expect(page).toHaveURL(/\/users$/);
    await expect(page.getByText("Loading...")).toHaveCount(0);
    await expect(
      page.getByRole("columnheader", { name: "First Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: firstUser.email, exact: true }),
    ).toBeVisible();
  });

  test("shows an error when the users API fails and keeps the page usable", async ({
    page,
  }) => {
    await page.route(isUsersListRequest, async (route) => {
      if (route.request().method() !== "GET") {
        await route.continue();
        return;
      }

      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Internal Server Error" }),
      });
    });

    const usersResponsePromise = page.waitForResponse((response) => {
      return (
        response.request().method() === "GET" &&
        isUsersListRequest(response.url())
      );
    });

    await page.getByRole("button", { name: "Users List" }).click();

    const usersResponse = await usersResponsePromise;
    expect(usersResponse.status()).toBe(500);

    await expect(page).toHaveURL(/\/users$/);
    await expect(page.getByText("Error: Failed to fetch users")).toBeVisible();
    await expect(page.getByText("Loading...")).toHaveCount(0);
    await expect(
      page.getByRole("columnheader", { name: "First Name" }),
    ).toHaveCount(0);

    const search = page.getByPlaceholder("Search by ID, name, contract...");
    await search.fill("contract-123");
    await expect(search).toHaveValue("contract-123");

    await page.getByRole("button", { name: "Open advanced filters" }).click();
    await expect(
      page.getByRole("dialog", { name: "Advanced Filters" }),
    ).toBeVisible();
  });
});
