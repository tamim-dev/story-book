import { useState } from "react";
import { Input } from "../../../src/components/Input";

export function InputHarness() {
  const [value, setValue] = useState("");

  return (
    <label>
      Name
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
    </label>
  );
}
