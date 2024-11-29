import type { RouteRecordRaw } from "vue-router";

export const dashboardRoute: RouteRecordRaw[] = [
  {
    path: "",
    name: "admin_dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      label: ["home_page"],
    },
  },
];
