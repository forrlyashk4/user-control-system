import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, editUser, deleteUser } from "../api";
import {
  ApiError,
  CreateUserDto,
  DeleteUserDto,
  EditUserDto,
  User,
} from "./types";
import { AxiosError } from "axios";

const userQueryKeys = {
  all: ["users"] as const,
};

export const useUsersQuery = () =>
  useQuery({
    queryKey: userQueryKeys.all,
    queryFn: fetchUsers,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ApiError>, CreateUserDto>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ApiError>, EditUserDto>({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, DeleteUserDto>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};
