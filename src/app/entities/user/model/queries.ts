import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";

export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
