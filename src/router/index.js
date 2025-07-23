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
      component: () => import(/* webpackChunkName: "login" */ "../pages/login.vue"),
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
    {
      path: "/usercourses",
      name: "usercourses",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/UserCourse.vue"),
    },
    {
      path: "/userlessons",
      name: "userlessons",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/UserLesson.vue"),
    },
    {
      path: "/teacherforstudent",
      name: "teacherforstudent",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/TeacherForStudent.vue"),
    },
    {
      path: "/userteacher",
      name: "userteacher",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/UserTeacher.vue"),
    },
    {
      path: "/aboutus",
      name: "aboutus",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/AboutUs.vue"),
    },
     {
      path: "/userexam",
      name: "userexam",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Exam.vue"),
    },
    {
      path: "/userquiz",
      name: "userquiz",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/UserQuiz.vue"),
    },
    {
      path: "/certificate",
      name: "certificate",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Certificate.vue"),
    },
    {
      path: "/quiz",
      name: "quiz",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Quiz.vue"),
    },
{
      path: "/ans",
      name: "ans",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Ans.vue"),
    },


  ],
});
export default router;
