import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/mainPage/MainPage.vue";
import MovieItem from '../views/movieItem/MovieItem.vue'
import Actors from '../views/actors/Actors.vue'
import ActorInfo from '../components/actorInfo/ActorInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: '/movies/:id',
      component: MovieItem
    },
    {
      path: '/actors/:page',
      component: Actors
    },
    {
      path: '/actors/actorInformation/:actor',
      component: ActorInfo
    },

  ],
});

export default router;
