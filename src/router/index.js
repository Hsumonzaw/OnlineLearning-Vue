/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/index.vue"),
    },
    {
      path: "/useraccount",
      name: "useraccount",
      component: () => import(/* webpackChunkName: "useraccount" */ "../pages/Useraccount.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import(/* webpackChunkName: "login" */ "../pages/Login.vue"),
    },
    {
      path: "/exam",
      name: "ExamAns",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/ExamAns.vue"),
    },
    {
      path: "/comments",
      name: "comments",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Comments.vue"),
    },
    {
      path: "/lessons",
      name: "Lessons",
      component: () =>
        import(/* webpackChunkName: "Lessons" */ "../pages/Lessons.vue"),
    },
    {
      path: "/ratings",
      name: "Ratings",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Ratings.vue"),
    },
    {
      path: "/languages",
      name: "Languages",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Language.vue"),
    },
    {
      path: "/courses",
      name: "Courses",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Courses.vue"),
    },
  ],
});
export default router;
