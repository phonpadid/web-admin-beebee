import type { RouteRecordRaw } from "vue-router";

export const restaurantRoute: RouteRecordRaw[] = [
  {
    path: "restaurants",
    name: "restaurants",
    component: () => import("../views/ListView.vue"),
    meta: {
      label: ["Restaurant"],
    },
  },
];
