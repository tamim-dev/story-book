import { test, expect } from "@playwright/experimental-ct-react";
import { Button } from "../../src/components/Button";
import {
  ButtonClickHarness,
  DisabledButtonHarness,
} from "./harness/ButtonHarness";

test.describe("Button", () => {
  test("renders the accessible name", async ({ mount, page }) => {
    await mount(<Button>Save</Button>);

    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
  });

  test("updates the UI when pressed", async ({ mount, page }) => {
    await mount(<ButtonClickHarness />);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Clicked")).toBeVisible();
  });

  test("stays disabled and does not change the page", async ({
    mount,
    page,
  }) => {
    await mount(<DisabledButtonHarness />);

    await expect(page.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});
