/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "../pages/index.vue"),
    },
    {
      path: "/one",
      name: "one",
      component: () => import(/* webpackChunkName: "one" */ "../pages/One.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import(/* webpackChunkName: "one" */ "../pages/login.vue"),
    },
  ]
})
export default router
