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
      component: () => import(/* webpackChunkName: "one" */ "../pages/Login.vue"),
    },
     {
      path: "/exam",
      name: "ExamAns",
      component: () => import(/* webpackChunkName: "home" */ "../pages/ExamAns.vue"),
    },
     {
      path: "/comments",
      name: "comments",
      component: () => import(/* webpackChunkName: "home" */ "../pages/Comments.vue"),
    },
     {
      path: "/lessons",
      name: "Lessons",
      component: () => import(/* webpackChunkName: "home" */ "../pages/Lessons.vue"),
    },
     {
      path: "/ratings",
      name: "Ratings",
      component: () => import(/* webpackChunkName: "home" */ "../pages/Ratings.vue"),
    },
    {
      path: "/languages",
      name: "Languages",
      component: () => import(/* webpackChunkName: "home" */ "../pages/Language.vue"),
    },
  ]
})
export default router
