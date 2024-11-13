// import { GET_ROLES } from "@/common/utils/const";
import type { UserEntity } from "../entity/user.entity";
import { AuthService } from "../services/auth.store";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { MeEntity } from "../entity/me.entity";
import { message } from "ant-design-vue";

export interface AuthState {
  data: UserEntity | null;
  isLoading: boolean;
  errorMessage: string;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const authService = container.resolve(AuthService);
  const stateGetMe = reactive<AuthState>({
    data: null,
    isLoading: false,
    errorMessage: "",
  });

  let form = reactive<UserEntity>({
    email: "",
    password: "",
  });

  async function login(item: any) {
    
    try {
      stateGetMe.isLoading = true;
      const result = await authService.login(item);
      if (result.status === "success" && result.data) {
        localStorage.setItem("access", result.data.access);
        localStorage.setItem("roles", JSON.stringify(result.data.roles));
        localStorage.setItem(
          "permissions",
          JSON.stringify(result.data.permissions)
        );
        // localStorage.setItem("locale", "en");

        message.success({
          content: "ຍີນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ.",
          duration: 3,
        });
        router.push({ name: "admin_dashboard" });
        clearFormUser()
      } else {
        console.log('errMessage:', );
        stateGetMe.errorMessage = result.message ? result.message : "";
      }
    } catch (error: any) {
      let responseError = "";
      if (error.response.status === 422) {
        responseError = Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      } else if (error.status === 401) {
        stateGetMe.errorMessage = "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ.";
        stateGetMe.isLoading = false;
        message.error({
          content: "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ.",
          duration: 3,
        });
      } else {
        responseError = error.response.data.error;
      }
      stateGetMe.errorMessage = responseError;
    }
    stateGetMe.isLoading = false;
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("access");
    localStorage.removeItem("roles");
    localStorage.removeItem("permissions");

    router.push({ name: "login" });
  }

  async function showMe() {
    stateGetMe.isLoading = true;
    const results = await authService.showMe();

    if (results && results.data && results.status === "success") {
      stateGetMe.data = results.data;
      stateGetMe.isLoading = false;
    }
    // console.log("Data from API:", state.data.props);
  }
  async function changePassword(input: MeEntity) {
    
    return await authService.changePassowrd(input);
  }

  function clearFormUser() {
    form = reactive<UserEntity>({ email: "", password: "" });
  }
  return { stateGetMe, form, login, logout, showMe, changePassword, clearFormUser };
});
