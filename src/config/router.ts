import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Episodes from "../views/Episodes.vue";
import Seasons from "../views/Seasons.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/season",
  },
  {
    path: "/season",
    component: Seasons,
    meta: {
      title: "Seasons",
    },
  },
  {
    path: "/season/:season/episode",
    component: Episodes,
    meta: {
      title: "Episodes",
    },
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

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title ? to.meta.title + " - " : ""}Jeopardy App`;
  next();
});

export { router };
