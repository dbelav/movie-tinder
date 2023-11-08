import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/mainPage/MainPage.vue";
import LeftNavbar from "../components/leftnavbar/LeftNavbar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/asd",
      component: LeftNavbar,
    }
  ],
});

export default router;
