import { useState, type FormEvent } from "react";
import { Button, Input, Select, Toggle } from "../../components";
import { FormField } from "../../shared/form/fields";
import { usePlaygroundToast } from "./PlaygroundToastContext";
import { roleOptions, type PlaygroundUserRole } from "./data";

type FormErrors = {
  displayName?: string;
  email?: string;
};

function validateSettings(displayName: string, email: string): FormErrors {
  const errors: FormErrors = {};

  if (displayName.trim().length === 0) {
    errors.displayName = "Display name is required";
  }

  if (email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  return errors;
}

export function PlaygroundSettingsPage() {
  const { notify } = usePlaygroundToast();
  const [displayName, setDisplayName] = useState("Ada Lovelace");
  const [email, setEmail] = useState("ada@example.com");
  const [role, setRole] = useState<PlaygroundUserRole>("Admin");
  const [notifications, setNotifications] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSettings(displayName, email);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    notify("Settings saved");
  };

  return (
    <section className="space-y-6">
      <div>
        <h2>Settings</h2>
        <p className="mt-1 text-sm text-text-muted">
          Update the playground profile and notification preference.
        </p>
      </div>

      <form
        className="max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6"
        onSubmit={handleSubmit}
      >
        <FormField
          label="Display name"
          htmlFor="settings-display-name"
          error={errors.displayName}
        >
          <Input
            id="settings-display-name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={
              errors.displayName ? "settings-display-name-error" : undefined
            }
          />
        </FormField>
        <FormField label="Email" htmlFor="settings-email" error={errors.email}>
          <Input
            id="settings-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "settings-email-error" : undefined
            }
          />
        </FormField>
        <Select
          id="settings-role"
          label="Role"
          value={role}
          options={roleOptions}
          onChange={(value) => setRole(value as PlaygroundUserRole)}
        />
        <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span id="settings-notifications-label" className="text-sm font-medium">
            Email notifications
          </span>
          <Toggle
            checked={notifications}
            onChange={setNotifications}
            aria-label="Email notifications"
            aria-labelledby="settings-notifications-label"
          />
        </div>
        <Button type="submit">Save settings</Button>
      </form>
    </section>
  );
}
