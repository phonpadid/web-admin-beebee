// import { GET_ROLES } from "@/common/utils/const";
import type { UserEntity } from "../entity/user.entity";
import { AuthService } from "../services/auth.store";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export interface AuthState {
  data: UserEntity | null;
  isLoading: boolean;
  errorMessage: string;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const authService = container.resolve(AuthService);
  const state = reactive<AuthState>({
    data: null,
    isLoading: false,
    errorMessage: "",
  });

  const form = reactive<UserEntity>({
    email: "",
    password: "",
  });

  async function login(item: any) {
    state.isLoading = true;

    try {
      const result = await authService.login(item);
      console.log(result);

      if (result.status === "success" && result.data) {
        localStorage.setItem("access", result.data.access);
        // localStorage.setItem("roles", JSON.stringify(result.data.roles));
        // localStorage.setItem(
        //   "permissions",
        //   JSON.stringify(result.data.permissions)
        // );
        // localStorage.setItem("locale", "en");

        state.errorMessage = "";
        router.push({ name: "admin_dashboard" });

        // const roleUsers = result.data.roles;

        // if (
        //   roleUsers.includes(GET_ROLES.SUPER_ADMIN) ||
        //   roleUsers.includes(GET_ROLES.ADMIN) ||
        //   roleUsers.includes(GET_ROLES.USER)
        // ) {
        //   router.push({ name: "admin.dashboard" });
        //   router.afterEach(() => {
        //     window.location.reload();
        //   });
        // } else if (
        //   roleUsers.includes(GET_ROLES.ADMIN_RESTAURANT) ||
        //   roleUsers.includes(GET_ROLES.USER_RESTAURANT)
        // ) {
        //   router.push({ name: "restaurants" });
        //   router.afterEach(() => {
        //     window.location.reload();
        //   });
        // } else {
        //   router.push({ name: "restaurants" });
        //   router.afterEach(() => {
        //     window.location.reload();
        //   });
        // }
      } else {
        state.errorMessage = result.message ? result.message : "";
      }
    } catch (error: any) {
      let responseError = "";
      if (error.response.status === 422) {
        responseError = Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      } else if (error.response.status === 401) {
        responseError = "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ.";
      } else {
        responseError = error.response.data.error;
      }
      state.errorMessage = responseError;
    }
    state.isLoading = false;
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("access");
    localStorage.removeItem("roles");
    localStorage.removeItem("permissions");

    router.push({ name: "login" });
  }

  async function showMe() {
    state.isLoading = true;
    const results = await authService.showMe();

    if (results && results.data && results.status === "success") {
      console.log('ab:');
      
      state.data = results.data;
      state.isLoading = false;
    }
    // console.log("Data from API:", state.data.props);
  }
  return { state, form, login, logout, showMe };
});
