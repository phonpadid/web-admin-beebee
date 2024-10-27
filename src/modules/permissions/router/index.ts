import type { RouteRecordRaw } from "vue-router";

export const permissionsRoute: RouteRecordRaw[] = [
  {
    path: "permissions",
    name: "permissions",
    component: () => import("../views/ListPemissionView.vue"),
    meta: {
      label: ["ຈັດການPermissions"],
    },
  },
];
