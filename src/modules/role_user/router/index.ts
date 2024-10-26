import type { RouteRecordRaw } from "vue-router";

export const rolesUserRoute: RouteRecordRaw[] = [
  {
    path: "roles_user",
    name: "roles_user",
    component: () => import("../views/ListRoleUserView.vue"),
    meta: {
      label: ["ຈັດການRolesUser"],
    },
  },
];
