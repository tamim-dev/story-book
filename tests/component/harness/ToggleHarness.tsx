import { useState } from "react";
import { Toggle } from "../../../src/components/Toggle";

export function ToggleHarness() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      onChange={setChecked}
      aria-label="Email notifications"
    />
  );
}
