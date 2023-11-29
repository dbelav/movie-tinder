import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/mainPage/MainPage.vue";
import MovieItem from '../views/movieItem/MovieItem.vue'
import Actors from '../views/actors/Actors.vue'
import ActorInfo from '../components/actorInfo/ActorInfo.vue'
import ListMovies from '../views/listMovies/ListMovies.vue'
import Favorites from "../views/favorites/Favorites.vue";
import Tinder from '../views/tinder/Tinder.vue'
import SignUp from '../components/signUp/SignUp.vue'
import SignIn from '../components/signIn/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/login",
      component: SignIn,
    },
    {
      path: "/register",
      component: SignUp,
    },
    {
      path: "/movies/",
      component: ListMovies,
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
    {
      path: '/favorites',
      component: Favorites
    },
    {
      path: '/tinder',
      component: Tinder
    },
  ],
});

export default router;
