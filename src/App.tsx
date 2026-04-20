import { useState } from "react";
import { Badge, Button, Card, Input, Toggle } from "./components";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [toggleChecked, setToggleChecked] = useState(false);

  return (
    <main className="space-y-6 dark">
      <h1 className="text-3xl font-semibold">Design System Playground</h1>

      <section className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="md">Primary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="outline" size="md">Outline</Button>
        <Badge variant="success" size="md">Ready</Badge>
      </section>

      <section className="max-w-card space-y-3">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Type to preview input component"
        />
        <p className="text-sm text-text-muted">Current value: {inputValue || "(empty)"}</p>
      </section>

      <section className="flex items-center gap-3">
        <Toggle
          checked={toggleChecked}
          onChange={setToggleChecked}
          aria-label="Enable notifications"
        />
        <span className="text-sm text-text-muted">
          Notifications {toggleChecked ? "enabled" : "disabled"}
        </span>
      </section>

      <Card
        title="Scalable component baseline"
        description="All styles are consumed from Tailwind theme extensions powered by design tokens."
        variant="elevated"
        size="md"
        className="max-w-card"
      >
        Add your product-specific components on top of this shared design-system package.
      </Card>
    </main>
  );
}

export default App;
