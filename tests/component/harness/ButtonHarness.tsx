import { useState } from "react";
import { Button } from "../../../src/components/Button";

export function ButtonClickHarness() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <Button onClick={() => setClicked(true)}>Save</Button>
      {clicked ? <p>Clicked</p> : null}
    </div>
  );
}

export function DisabledButtonHarness() {
  return <Button disabled>Save</Button>;
}
