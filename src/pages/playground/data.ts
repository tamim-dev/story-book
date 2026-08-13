export type PlaygroundUserStatus = "Active" | "Inactive" | "Pending";
export type PlaygroundUserRole = "Admin" | "Editor" | "Viewer";

export type PlaygroundUser = {
  id: string;
  name: string;
  email: string;
  role: PlaygroundUserRole;
  status: PlaygroundUserStatus;
};

export const playgroundUsers: PlaygroundUser[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Alan Turing",
    email: "alan@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: "3",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Linus Torvalds",
    email: "linus@example.com",
    role: "Editor",
    status: "Pending",
  },
];

export const statusFilterOptions = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
];

export const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Editor", value: "Editor" },
  { label: "Viewer", value: "Viewer" },
];

export function filterPlaygroundUsers(
  users: PlaygroundUser[],
  search: string,
  status: string,
) {
  const query = search.trim().toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      query.length === 0 ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);
    const matchesStatus = status === "all" || user.status === status;
    return matchesSearch && matchesStatus;
  });
}
