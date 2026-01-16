import { api } from "@/shared/api/axios";
import { User } from "../model";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};
