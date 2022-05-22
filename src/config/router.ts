import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("../views/Tab1Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to) =>
    to.hash
      ? { el: to.hash, behavior: "smooth" }
      : { top: 0, left: 0, behavior: "smooth" },
});

router.beforeEach((to, _, next) => {
  document.title = `Ionic App ${to.meta.title ?? ""}`;
  next();
});

export { router };
