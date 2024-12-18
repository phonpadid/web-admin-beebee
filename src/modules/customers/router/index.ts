// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
// import { rolesRoute } from "@/modules/roles/router";
import type { RouteRecordRaw } from "vue-router";

export const customersRoute: RouteRecordRaw[] = [
  {
    path: "customers",
    name: "customers",
    component: () => import("../views/ListCustomerView.vue"),
    meta: {
      label: ["customers.label"],
      // requiredRoles: [GET_ROLES.ADMIN, GET_ROLES.SUPER_ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },
  {
    path: "customer_edit/:id",
    name: "customer_edit",
    component: () => import("../components/UpdateCustomer.vue"),
    meta: {label: ['customers.label']}
  },
  {
    path: "addCustomer",
    name: "addCustomer",
    component: () => import("../components/AddCustomer.vue"),
    meta: {label: ['customers.label_add']}
  },
  {
    path: "getMe",
    name: "getMe.index",
    component: () => import("../../authentication/views/GetMeView.vue"),
    meta: {label: ["me.label"]},
  },
  
];
