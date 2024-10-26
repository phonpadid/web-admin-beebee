import type { RouteRecordRaw } from "vue-router";

export const tenantsRoute: RouteRecordRaw[] = [
  {
    path: "tenants",
    name: "tenants",
    component: () => import("../views/ListTenantsView.vue"),
    meta: {
      label: ["ຈັດການການສ້າງຮ້ານ"],
    },
  },
];
