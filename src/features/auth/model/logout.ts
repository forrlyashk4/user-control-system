export function onLogout(onRedirect: () => void) {
  localStorage.removeItem("token");
  onRedirect();
}
