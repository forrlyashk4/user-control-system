import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api";

type LoginPayload = {
  login: string;
  password: string;
};

export type LoginResponse = {
  data: {
    token: string;
  };
};

type ApiError = {
  response: {
    data: {
      message: string;
    };
  };
};

export const useAuth = () =>
  useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginRequest,
  });
