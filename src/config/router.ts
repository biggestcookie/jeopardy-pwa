import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Categories from "../views/Categories.vue";
import Episodes from "../views/Episodes.vue";
import Question from "../views/Question.vue";
import Rounds from "../views/Rounds.vue";
import Seasons from "../views/Seasons.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   redirect: "/season",
  // },
  {
    path: "/",
    component: Seasons,
  },
  {
    path: "/season/:season",
    component: Episodes,
  },
  {
    path: "/season/:season/episode/:episodeNumber",
    component: Rounds,
  },
  {
    path: "/season/:season/episode/:episodeNumber/round/:round",
    component: Categories,
  },
  {
    path: "/season/:season/episode/:episodeNumber/round/:round/category/:categoryNumber/question/:questionNumber",
    component: Question,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // scrollBehavior: (to) =>
  //   to.hash
  //     ? { el: to.hash, behavior: "smooth" }
  //     : { top: 0, left: 0, behavior: "smooth" },
});

// router.beforeEach((to, _, next) => {
//   document.title = `${to.meta.title ? to.meta.title + " - " : ""}Jeopardy App`;
//   next();
// });

export { router };
