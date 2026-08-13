import { test, expect } from "@playwright/experimental-ct-react";
import { ToastHarness } from "./harness/ToastHarness";

test.describe("Toast", () => {
  test("shows a message and can be dismissed", async ({ mount, page }) => {
    await mount(<ToastHarness />);

    await expect(page.getByRole("status")).toHaveText(/Settings saved/);
    await page.getByRole("button", { name: "Dismiss notification" }).click();
    await expect(page.getByText("No notification")).toBeVisible();
  });
});
