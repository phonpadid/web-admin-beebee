import type { RouteRecordRaw } from "vue-router";

export const rolesRoute: RouteRecordRaw[] = [
  {
    path: "roles",
    name: "roles",
    component: () => import("../views/ListRoleView.vue"),
    meta: {
      label: ["ຈັດການRoles"],
    },
  },
];
