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
  
];
