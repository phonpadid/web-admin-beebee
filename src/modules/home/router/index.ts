// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const homeRoute: RouteRecordRaw[] = [
  {
    path: "",
    name: "home",
    component: () => import("../views/ListView.vue"),
    meta: {
      label: ["ໜ້າຫຼັກ"],
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN],
    },
    // beforeEnter: roleGuard,
  },
];
