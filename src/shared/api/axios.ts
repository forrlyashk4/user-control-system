import axios from "axios";
import { loginMock } from "./login.mock";

const baseURL = `${process.env.API_URL ?? ""}${process.env.API_PREFIX ?? ""}`;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  if (config.url === "/login" && config.method === "post") {
    config.adapter = async () => {
      try {
        const payload =
          typeof config.data === "string"
            ? JSON.parse(config.data)
            : config.data;

        const result = await loginMock(payload);

        return {
          data: result,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }

  return config;
});
