import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser } from "../api";
import { ApiError, CreateUserDto, User } from "./types";
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
