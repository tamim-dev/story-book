import { useState } from "react";
import {
  FilterProvider,
  TopFilterBar,
  type FilterConfig,
  type FiltersState,
} from "../components/search-hub";
import { SearchResultTable } from "../shared/table";
import { useUsers } from "../hooks/use-users";

const dashboardFilters: FilterConfig[] = [
  {
    key: "type",
    label: "Type",
    options: [
      { label: "Electricity", value: "electricity" },
      { label: "Gas", value: "gas" },
    ],
  },
  {
    key: "payment",
    label: "Payment",
    options: [
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" },
    ],
  },
  {
    key: "paymentMethod",
    label: "Payment Method",
    options: [
      { label: "Credit Card", value: "creditCard" },
      { label: "Debit Card", value: "debitCard" },
      { label: "Bank Transfer", value: "bankTransfer" },
      { label: "Cash", value: "cash" },
    ],
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    options: [
      { label: "Partially Paid", value: "partiallyPaid" },
      { label: "Overdue", value: "overdue" },
      { label: "Refunded", value: "refunded" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Failed", value: "failed" },
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
    ],
  },
  {
    key: "accountStatus",
    label: "A/C Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Processing", value: "processing" },
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
    ],
  },
  {
    key: "group",
    label: "Group",
    options: [
      { label: "Group 1", value: "group1" },
      { label: "Group 2", value: "group2" },
      { label: "Group 3", value: "group3" },
    ],
  },
  {
    key: "month",
    label: "Month",
    options: [
      { label: "January", value: "01" },
      { label: "February", value: "02" },
      { label: "March", value: "03" },
    ],
  },
];

export function UsersPage() {
  const { data, loading, error } = useUsers();

  const [executions, setExecutions] = useState(0);
  const [lastSearch, setLastSearch] = useState<{
    filters: FiltersState;
    searchInput: string;
    source: string;
  } | null>(null);

  console.log(lastSearch, executions);

  return (
    <main className="w-full bg-background">
      <section className="w-full p-4">
        <FilterProvider
          filters={dashboardFilters}
          requiredFilters={["type", "status", "group"]}
          validationMode="flexible"
          onExecuteSearch={(payload) => {
            setExecutions((value) => value + 1);
            setLastSearch(payload);
          }}
        >
          <TopFilterBar />
        </FilterProvider>

        <section className="mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <SearchResultTable
              rows={data.users.map((user) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }))}
              columns={[
                {
                  key: "id",
                  header: "ID",
                },
                {
                  key: "firstName",
                  header: "First Name",
                },
                {
                  key: "lastName",
                  header: "Last Name",
                },
                {
                  key: "email",
                  header: "Email",
                },
              ]}
              rowKey={(row, index) => `${row.id}-${index}`}
            />
          )}
        </section>
      </section>
    </main>
  );
}
