import { createRouter, createWebHistory } from "vue-router";
import LoaderWrap from "components/common/LoaderWrap.vue";
import MainPage from "views/MainPage.vue";
import TestPage from "views/TestPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/test",
      name: "test",
      component: TestPage,
    },
    // {
    //    path: "/about",
    //    name: "about",
    //    // route level code-splitting
    //    // this generates a separate chunk (About.[hash].js) for this route
    //    // which is lazy-loaded when the route is visited.
    //    component: () => import("../views/AboutView.vue")
    // },
  ],
});

export default router;
