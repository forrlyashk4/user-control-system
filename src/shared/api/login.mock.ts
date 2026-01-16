type LoginPayload = {
  login: string;
  password: string;
};

export const loginMock = ({ login, password }: LoginPayload) =>
  new Promise<{ token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (login === "admin" && password === "admin") {
        resolve({ token: "super-mega-hype-token-3000" });
      } else {
        reject({
          response: {
            status: 401,
            data: {
              message: "Неверные данные для входа",
            },
          },
        });
      }
    }, 2000);
  });
