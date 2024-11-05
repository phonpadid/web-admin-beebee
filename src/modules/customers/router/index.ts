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
      label: ["ຈັດການລູກຄ້າ"],
      // requiredRoles: [GET_ROLES.ADMIN, GET_ROLES.SUPER_ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },
  {
    path: "customer_edit/:id",
    name: "customer_edit.index",
    component: () => import("../components/UpdateCustomer.vue"),
    meta: {label: ['ລາຍລະອຽດຜູ້ໃຊ້']}
  },
  {
    path: "addCustomer",
    name: "addCustomer.index",
    component: () => import("../components/AddCustomer.vue"),
    meta: {label: ['ເພີ່ມຂໍ້ມູນລູກຄ້າ']}
  },
  {
    path: "getMe",
    name: "getMe.index",
    component: () => import("../../authentication/views/GetMeView.vue"),
    meta: {label: ["ໂປຣຟາຍຂອງຂ້ອຍ"]},
  },
  
];
