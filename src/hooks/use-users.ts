import { useEffect, useMemo, useState } from "react";
import { useApi } from "./use-api";
import { createUserService } from "../services/user.service";
import type { IList, User } from "../types/api.types";

export function useUsers() {
  const api = useApi();
  const userService = useMemo(() => createUserService(api), [api]);
  const [data, setData] = useState<IList<User>>({ offset: 0, pageSize: 10, total: 0, items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const users = await userService.getUsers();
        setData(users.data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    void fetchUsers();
  }, [userService]);

  return { data, loading, error };
}
