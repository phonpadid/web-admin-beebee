import type { AxiosInstance } from "axios";
import axios from "axios";
import { singleton } from "tsyringe";

@singleton()
export class AxiosApi {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    });

    this.axios.interceptors.request.use(
      async (config: any) => {
        const session = sessionStorage.getItem("user");
        const accessToken = localStorage.getItem("token");
        const user = JSON.parse(session as string);

        if (user) {
          if (Date.now() >= user.exp_in) {
            // const service = container.resolve(AuthenticationService)
            // await service.refreshToken()
          }
        }

        config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
      },
      (error: any) => Promise.reject(error)
    );
  }
}
