import { test, expect } from "@playwright/experimental-ct-react";
import { EmptyState } from "../../src/components/EmptyState";

test.describe("EmptyState", () => {
  test("renders the empty message", async ({ mount, page }) => {
    await mount(
      <EmptyState
        title="No users found"
        description="Try a different search or status filter."
      />,
    );

    await expect(
      page.getByRole("heading", { name: "No users found" }),
    ).toBeVisible();
    await expect(
      page.getByText("Try a different search or status filter."),
    ).toBeVisible();
  });
});
