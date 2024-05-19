import { createRouter, createWebHistory } from "vue-router";
import { restaurantRoute } from "../modules/restaurant/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../components/layouts/Layout.vue"),
      children: [...restaurantRoute],
    },
  ],
});

export default router;
