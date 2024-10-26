// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
import { RouteRecordRaw } from "vue-router";

export const registersRoute: RouteRecordRaw[] = [
  {
    path: "/admin/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      label: ["ສະໝັກສະມາຊິກ"],
    },
  },
];
