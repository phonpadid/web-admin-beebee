import type { AxiosInstance } from "axios";
import axios from "axios";
import { singleton } from "tsyringe";

@singleton()
export class AxiosApi {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL, // ດຶງຄ່າ base URL ຈາກ environment
    });

    // ເພີມ request interceptor ສຳລັບການແນບ token
    this.axios.interceptors.request.use(
      async (config: any) => {
        // ກວດສອບຂໍ້ມູນ session user
        const session = sessionStorage.getItem("user");
        let user: any = null;
        if (session) {
          user = JSON.parse(session); // ແປງຂໍ້ມູນເປັນ object
        }

        // ດຶງ access token ຈາກ localStorage
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          console.log("Token not found in localStorage");
        } else {
          console.log("Token found:", accessToken);
        }

        // ກວດສອບການໝົດອາຍຸຂອງ user token ຫາກຈຳເປັນ
        if (user && Date.now() >= user.exp_in) {
          // ສາມາດໃຊ້ຟັງຊັນ refresh token ໂຕນີ້ໄດ້
          // const service = container.resolve(AuthenticationService)
          // await service.refreshToken();
          console.log("Token expired, please refresh token.");
        }

        // ເພີ່ມ Authorization header ສຳລັບທຸກ request
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error) // ຈັດການຂໍ້ຜິດພາດຂອງ request
    );
  }
}
