import { useEffect, useMemo, useState } from "react";
import {
  Card,
  EmptyState,
  Input,
  LoadingState,
  Select,
} from "../../components";
import { BaseDataTable } from "../../shared/table";
import {
  filterPlaygroundUsers,
  playgroundUsers,
  statusFilterOptions,
} from "./data";

export function PlaygroundDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const visibleUsers = useMemo(
    () => filterPlaygroundUsers(playgroundUsers, search, status),
    [search, status],
  );

  const activeCount = playgroundUsers.filter(
    (user) => user.status === "Active",
  ).length;
  const pendingCount = playgroundUsers.filter(
    (user) => user.status === "Pending",
  ).length;

  return (
    <section className="space-y-6">
      <div>
        <h2>Dashboard</h2>
        <p className="mt-1 text-sm text-text-muted">
          Review team activity and filter the user list.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total Users">
          <p aria-label="Total users count">{playgroundUsers.length}</p>
        </Card>
        <Card title="Active Users">
          <p aria-label="Active users count">{activeCount}</p>
        </Card>
        <Card title="Pending Users">
          <p aria-label="Pending users count">{pendingCount}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="dashboard-search" className="text-sm font-medium">
            Search
          </label>
          <Input
            id="dashboard-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
          />
        </div>
        <Select
          id="dashboard-status"
          label="Status"
          value={status}
          options={statusFilterOptions}
          onChange={setStatus}
        />
      </div>

      {loading ? (
        <LoadingState label="Loading dashboard..." />
      ) : visibleUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try a different search or status filter."
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
    </section>
  );
}
