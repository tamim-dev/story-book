import { test, expect } from "@playwright/experimental-ct-react";
import { ToggleHarness } from "./harness/ToggleHarness";

test.describe("Toggle", () => {
  test("changes checked state when clicked", async ({ mount, page }) => {
    await mount(<ToggleHarness />);

    const toggle = page.getByRole("switch", { name: "Email notifications" });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});
