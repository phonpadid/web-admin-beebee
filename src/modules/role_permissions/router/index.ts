import type { RouteRecordRaw } from "vue-router";

export const rolesPermissionsRoute: RouteRecordRaw[] = [
  {
    path: "roles_permissions",
    name: "roles_permissions",
    component: () => import("../views/ListRolePermissionsView.vue"),
    meta: {
      label: ["ຈັດການRolesPermissions"],
    },
  },
];
