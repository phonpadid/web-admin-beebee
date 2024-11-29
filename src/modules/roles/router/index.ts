import type { RouteRecordRaw } from "vue-router";

export const rolesRoute: RouteRecordRaw[] = [
  {
    path: "roles",
    name: "roles.index",
    component: () => import("../views/ListRoleView.vue"),
    meta: {
      label: ["messages.role.manage"],
    },
  },
  {
    path: "addRoles",
    name: "addRole.index",
    component: () => import("../components/AddRole.vue"),
    meta: {
      label: ["messages.role.form.add"],
    },
  },
  {
    path: "editRoles/:id",
    name: "editRoles.index",
    component: () => import("../components/EditRole.vue"),
    meta: {
      label: ["messages.role.form.edit"],
    },
  },
];
