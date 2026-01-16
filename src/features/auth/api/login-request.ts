import { api } from "@/shared";

type LoginDto = {
  login: string;
  password: string;
};

export const loginRequest = (data: LoginDto) =>
  api.post<{ token: string }>("/login", data);
