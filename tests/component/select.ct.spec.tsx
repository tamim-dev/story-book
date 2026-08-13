import { test, expect } from "@playwright/experimental-ct-react";
import { SelectHarness } from "./harness/SelectHarness";

test.describe("Select", () => {
  test("renders labeled options and allows a selection", async ({
    mount,
    page,
  }) => {
    await mount(<SelectHarness />);

    const select = page.getByLabel("Status");
    await expect(select).toHaveValue("all");
    await select.selectOption("Active");
    await expect(select).toHaveValue("Active");
  });
});
