import { createRouter, createWebHistory } from "vue-router";

import { useAuth0 } from "@auth0/auth0-vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
     {
      path: "/",
      redirect: "/home",
     },
      {
         path: "/",
         component: () => import("@/layout/AppLayout.vue"),
         children: [
            {
               path: "/home",
               name: "home",
               component: () => import("@/pages/Dashboard/DashboardHome/DashboardHome.vue"),
               meta: {requiresAuth: true},
            },
            {
               path: "/log-in",
               name: "logIn",
               component: () => import("@/pages/Login.vue"),
            },
            {
               path: "/log-out",
               name: "logOut",
               component: () => import("@/pages/Logout.vue"),
            },
            {
               path: "/details",
               name: "details",
               component: () => import("@/pages/Detail.vue"),
               meta: {requiresAuth: true},
            }
         ],
      },
   ],
});

router.beforeResolve(async (to, from, next) => {
   const { isAuthenticated } = useAuth0();
   if(to.meta.requiresAuth && !isAuthenticated.value)
   {
      console.log('user is not true. redirecting to login...');
      next({name: "logIn"})
   }
   else{
      next();
   }
})

export default router;
