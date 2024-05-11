import { createRouter, createWebHistory } from "vue-router";
import ListTable from "../views/ListTable.vue";
import TestTable from "../views/TestTable.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../components/layouts/Layout.vue"),
      children: [
        { path: "/list/data", component: ListTable },
        { path: "/test/table", component: TestTable },
      ],
    },
  ],
});

export default router;
