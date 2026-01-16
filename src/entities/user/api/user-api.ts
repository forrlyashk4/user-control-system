import { api } from "@/shared/api/axios";
import { User, CreateUserDto, EditUserDto, DeleteUserDto } from "../model";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const createUser = async (dto: CreateUserDto): Promise<User> => {
  const { data } = await api.post<User>("/users", dto);
  return data;
};

export const editUser = async (dto: EditUserDto): Promise<User> => {
  const { data } = await api.put<User>(`/users/${dto.id}`, dto);
  return data;
};

export const deleteUser = async (dto: DeleteUserDto): Promise<void> => {
  await api.delete<User>(`/users/${dto.id}`);
};
