import { LoginResponse } from "./useAuth";

export function onSuccessLogin(
  response: LoginResponse,
  onRedirect: () => void
) {
  localStorage.setItem("token", response.data.token);
  onRedirect();
}
