import { test, expect } from "@playwright/experimental-ct-react";
import { Input } from "../../src/components/Input";
import { FormField } from "../../src/shared/form/fields";
import { InputHarness } from "./harness/InputHarness";

test.describe("Input", () => {
  test("accepts typed text", async ({ mount, page }) => {
    await mount(<InputHarness />);

    const input = page.getByLabel("Name");
    await input.fill("Ada Lovelace");
    await expect(input).toHaveValue("Ada Lovelace");
  });

  test("shows an error state for invalid input", async ({ mount, page }) => {
    await mount(
      <FormField label="Email" htmlFor="email" error="Enter a valid email">
        <Input
          id="email"
          aria-invalid="true"
          aria-describedby="email-error"
          variant="error"
        />
      </FormField>,
    );

    await expect(page.getByLabel("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByRole("alert")).toHaveText("Enter a valid email");
  });
});
