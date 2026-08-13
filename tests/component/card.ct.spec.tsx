import { test, expect } from "@playwright/experimental-ct-react";
import { Card } from "../../src/components/Card";

test.describe("Card", () => {
  test("renders the title and body", async ({ mount, page }) => {
    await mount(
      <Card title="Total Users">
        <p>4</p>
      </Card>,
    );

    await expect(
      page.getByRole("heading", { name: "Total Users" }),
    ).toBeVisible();
    await expect(page.getByText("4")).toBeVisible();
  });
});
