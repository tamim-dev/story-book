import { useMemo, useState, type FormEvent } from "react";
import {
  Button,
  EmptyState,
  Input,
  Modal,
  Select,
} from "../../components";
import { FormField } from "../../shared/form/fields";
import { BaseDataTable } from "../../shared/table";
import { usePlaygroundToast } from "./PlaygroundToastContext";
import {
  filterPlaygroundUsers,
  playgroundUsers,
  roleOptions,
  statusFilterOptions,
  type PlaygroundUser,
  type PlaygroundUserRole,
  type PlaygroundUserStatus,
} from "./data";

type FormErrors = {
  name?: string;
  email?: string;
};

function validateUserForm(name: string, email: string): FormErrors {
  const errors: FormErrors = {};

  if (name.trim().length === 0) {
    errors.name = "Name is required";
  }

  if (email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  return errors;
}

export function PlaygroundUsersPage() {
  const { notify } = usePlaygroundToast();
  const [users, setUsers] = useState<PlaygroundUser[]>(playgroundUsers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<PlaygroundUserRole>("Viewer");
  const [userStatus, setUserStatus] = useState<PlaygroundUserStatus>("Pending");
  const [errors, setErrors] = useState<FormErrors>({});

  const visibleUsers = useMemo(
    () => filterPlaygroundUsers(users, search, status),
    [users, search, status],
  );

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("Viewer");
    setUserStatus("Pending");
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateUserForm(name, email);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailTaken = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail,
    );

    if (emailTaken) {
      setErrors({ email: "Email already exists" });
      return;
    }

    setUsers((current) => [
      ...current,
      {
        id: String(current.length + 1),
        name: name.trim(),
        email: email.trim(),
        role,
        status: userStatus,
      },
    ]);
    notify("User added");
    closeModal();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2>Users</h2>
          <p className="mt-1 text-sm text-text-muted">
            Search, filter, and add people to the playground list.
          </p>
        </div>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="users-search" className="text-sm font-medium">
            Search
          </label>
          <Input
            id="users-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
          />
        </div>
        <Select
          id="users-status"
          label="Status"
          value={status}
          options={statusFilterOptions}
          onChange={setStatus}
        />
      </div>

      {visibleUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try a different search or add a new user."
        />
      ) : (
        <BaseDataTable
          rows={visibleUsers}
          rowKey={(row) => row.id}
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "role", header: "Role" },
            { key: "status", header: "Status" },
          ]}
        />
      )}

      <Modal open={isModalOpen} title="Add User" onClose={closeModal}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Name" htmlFor="new-user-name" error={errors.name}>
            <Input
              id="new-user-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "new-user-name-error" : undefined}
            />
          </FormField>
          <FormField label="Email" htmlFor="new-user-email" error={errors.email}>
            <Input
              id="new-user-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "new-user-email-error" : undefined
              }
            />
          </FormField>
          <Select
            id="new-user-role"
            label="Role"
            value={role}
            options={roleOptions}
            onChange={(value) => setRole(value as PlaygroundUserRole)}
          />
          <Select
            id="new-user-status"
            label="Status"
            value={userStatus}
            options={statusFilterOptions.filter((option) => option.value !== "all")}
            onChange={(value) => setUserStatus(value as PlaygroundUserStatus)}
          />
          <Button type="submit" className="w-full">
            Save user
          </Button>
        </form>
      </Modal>
    </section>
  );
}
