import { api } from "@/shared/api/axios";
import { User, CreateUserDto } from "../model";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const createUser = async (dto: CreateUserDto): Promise<User> => {
  const { data } = await api.post<User>("/users", dto);
  return data;
};
