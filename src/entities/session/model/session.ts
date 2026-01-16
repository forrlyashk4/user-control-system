const getToken = () => localStorage.getItem("token");

export const isAuthorized = () => Boolean(getToken());
