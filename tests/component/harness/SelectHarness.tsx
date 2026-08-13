import { useState } from "react";
import { Select } from "../../../src/components/Select";

const options = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
];

export function SelectHarness() {
  const [value, setValue] = useState("all");

  return (
    <Select
      id="status"
      label="Status"
      value={value}
      options={options}
      onChange={setValue}
    />
  );
}
