import { createRouter, createWebHistory } from "vue-router";
import { restaurantRoute } from "../modules/restaurant/router";
import { authenticationRoute } from "@/modules/authentication/router";
import { userRoute } from "@/modules/user/router";
import { rolesRoute } from "@/modules/roles/router";
import { rolesPermissionsRoute } from "@/modules/role_permissions/router";
import { dashboardRoute } from "@/modules/admin/dashboard/router";
import { tenantsRoute } from "@/modules/tenants/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../components/layouts/Layout.vue"),
      children: [ ...restaurantRoute, ...userRoute, ...rolesRoute, ...rolesPermissionsRoute,
        ...dashboardRoute,
        ...tenantsRoute
      ],
    },
    ...authenticationRoute,

  ],
});

router.beforeEach((to, from, next) => {
  const userDataString = localStorage.getItem('access')
  if (!userDataString) {
    if (to.name !== 'login' && !to.meta.skipAuthCheck) {
      next({ name: 'login' })
    } else {
      next()
    }
    return
  } else {
    next()
    return
  }
  // const user = JSON.parse(userDataString) as UserEntity
  // const roles = user.roles ?? [];
  // const isAdmin = roles.some((role) => role.name === 'super-admin' || role.name === 'admin')
  // if (isAdmin) {
  //     next()
  //     return
  // }
  // const requiredPermissions = to.meta.permissions as string[]
  // if (!requiredPermissions) {
  //     next()
  //     return
  // }
  // const hasPermission = roles.some((role) => {
  //     return role.permissions.some((permission) => requiredPermissions.includes(permission.name))
  // })
  // if (hasPermission) {
  //     next()
  // } 
})
export default router;
