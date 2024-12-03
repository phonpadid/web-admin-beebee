import { createRouter, createWebHistory } from "vue-router";
import { restaurantRoute } from "../modules/restaurant/router";
import { authenticationRoute } from "@/modules/authentication/router";
import { userRoute } from "@/modules/user/router";
import { rolesRoute } from "@/modules/roles/router";
import { dashboardRoute } from "@/modules/admin/dashboard/router";
import { tenantsRoute } from "@/modules/tenants/router";
import { permissionsRoute } from "@/modules/permissions/router";
import { customersRoute } from "@/modules/customers/router";
// import { UserEntity } from "@/modules/user/entity/user.entity";
// import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../components/layouts/Layout.vue"),
      children: [ 
        ...restaurantRoute, ...userRoute, ...rolesRoute,
        ...dashboardRoute,
        ...tenantsRoute,
        ...permissionsRoute,
        ...customersRoute
      ],
    },
    ...authenticationRoute,

    {
      path: '/none-permission',
      name: 'none-permission.index',
      component: () => import('../modules/authentication/views/NonePermission.vue')
  }

  ],
});

router.beforeEach((to, from, next) => {
  console.log(from);
  
  const userDataString = localStorage.getItem('access')
  // const roleData = localStorage.getItem('roles')
  if (!userDataString) {
    if (to.name !== 'login' && !to.meta.skipAuthCheck) {
      if(to.name === 'resetPassword' || to.name === 'confirmPassword' ) {
        next()
      }
      next({ name: 'login' })
    } else {
      next()
    }
    return
  } 
  next()
  
//   console.log('admin:', roleData);
//   const user = JSON.parse(userDataString) as UserEntity
//   const roles = user.groups ?? [];
//   const isAdmin = roles.some((role) => role.name === 'super_admin' || role.name === 'admin')
  
//   const userAdmin = user.is_superuser === true
//   if (isAdmin || userAdmin) {
//       next()
//       return
//   }
//   const requiredPermissions = to.meta.permissions as string[]
//   if (!requiredPermissions) {
//       next()
//       return
//   }
//   const hasPermission = roles.some((role) => {
//       return role.permissions.some((permission: PermissionsEntity) => requiredPermissions.includes(permission.name))
//   })
//   if (hasPermission) {
//       next()
//   } else {
//     next({name: 'none-permission.index'})
// }
})
export default router;
