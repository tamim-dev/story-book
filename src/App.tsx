import { useState } from "react";
import { Badge, Button, Card, Input, Toggle } from "./components";
import { useTheme } from "./hooks/useTheme";
import { FormRadioGroup } from "./shared/form/fields/FormRadioGroup";
import { FormTextField } from "./shared/form/fields/FormTextField";
import { FormSelectField } from "./shared/form/fields/FormSelectField";
import { TextInput } from "./shared/ui/input";
import { useUsers } from "./hooks/use-users";

function App() {
  const { theme, setTheme } = useTheme();
  const { data: users, loading: usersLoading, error: usersError } = useUsers();
  const [inputValue, setInputValue] = useState("");
  const [toggleChecked, setToggleChecked] = useState(false);

  return (
    <main className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1>Design System Playground</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">Dark mode</span>
          <Toggle
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark mode"
          />
        </div>
      </header>

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

      <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <TextInput
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Type to preview text field component"
      />
      <form>
        <FormRadioGroup
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
          ]}
          selectedValue={inputValue}
          name="radio-group"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <FormTextField
          placeholder="Type to preview text field component"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <FormSelectField
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FormSelectField>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Users API Example</h2>

        {usersLoading && (
          <p className="text-sm text-text-muted">Loading users...</p>
        )}

        {usersError && <p className="text-sm text-danger">{usersError}</p>}

        {!usersLoading && !usersError && (
          <ul className="space-y-2">
            {users.items.map((user) => (
              <li key={user.id} className="rounded-md border border-border p-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-text-muted">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
