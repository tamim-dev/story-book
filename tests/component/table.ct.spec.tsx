import { test, expect } from "@playwright/experimental-ct-react";
import { BaseDataTable } from "../../src/shared/table";

test.describe("Table", () => {
  test("renders column headers and row data", async ({ mount, page }) => {
    await mount(
      <BaseDataTable
        rows={[
          {
            id: "1",
            name: "Ada Lovelace",
            email: "ada@example.com",
          },
        ]}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
        ]}
      />,
    );

    await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Ada Lovelace" }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "ada@example.com" }),
    ).toBeVisible();
  });
});
