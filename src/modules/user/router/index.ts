// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
// import { rolesRoute } from "@/modules/roles/router";
import type { RouteRecordRaw } from "vue-router";

export const userRoute: RouteRecordRaw[] = [
  {
    path: "user",
    name: "user",
    component: () => import("../views/ListUserView.vue"),
    meta: {
      label: ["users.label"],
      // requiredRoles: [GET_ROLES.ADMIN, GET_ROLES.SUPER_ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },
  {
    path: "editProfile/:id",
    name: "editProfile",
    component: () => import("../components/EditProfile.vue"),
    meta: {label: ['users.detail_user']}
  },
  {
    path: "addUser",
    name: "addUser.index",
    component: () => import("../components/AddUser.vue"),
    meta: {label: ['users.add_user']}
  },
  {
    path: "getMe",
    name: "getMe.index",
    component: () => import("../../authentication/views/GetMeView.vue"),
    meta: {label: ["me.label"]},
  },
  
];
