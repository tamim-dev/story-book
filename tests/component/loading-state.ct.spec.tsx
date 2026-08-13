import { test, expect } from "@playwright/experimental-ct-react";
import { LoadingState } from "../../src/components/LoadingState";

test.describe("LoadingState", () => {
  test("renders the loading status", async ({ mount, page }) => {
    await mount(<LoadingState label="Loading dashboard..." />);

    const status = page.getByRole("status");
    await expect(status).toHaveText("Loading dashboard...");
    await expect(status).toHaveAttribute("aria-busy", "true");
  });
});
