import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Episode from "../views/Episode.vue";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";
import Round from "../views/Round.vue";
import Season from "../views/Season.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   redirect: "/season",
  // },
  {
    path: "/",
    component: Home,
    meta: {
      title: "Jeopardy!",
    },
  },
  {
    path: "/season/:season",
    component: Season,
  },
  {
    path: "/season/:season/episode/:episodeNumber",
    component: Episode,
  },
  {
    path: "/season/:season/episode/:episodeNumber/round/:round",
    component: Round,
  },
  {
    path: "/season/:season/episode/:episodeNumber/round/:round",
    component: Round,
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
