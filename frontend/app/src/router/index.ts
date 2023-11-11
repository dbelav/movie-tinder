import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/mainPage/MainPage.vue";
import MovieItem from '../views/movieItem/MovieItem.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: '/:id',
      component: MovieItem
    },
  ],
});

export default router;
