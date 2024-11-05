import type { RouteRecordRaw } from "vue-router";

export const authenticationRoute: RouteRecordRaw[] = [
  {
    path: "/admin/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      lable: ["ເຂົ້າສູ່ລະບົບ"],
    },
  },
  {
    path: "/admin/reset",
    name: "resetPassword",
    component: () => import("../components/ResetPassword.vue"),
    meta: {
      lable: ["ກຸ້ຄືນລະຫັດຜ່ານ"],
    },
  },
  {
    path: "/admin/confirmPassword",
    name: "confirmPassword",
    component: () => import("../components/ConfirmReset.vue"),
    meta: {
      lable: ["ຢຶນຢັນລະຫັດ OTP"],
    },
  },
  
];
