import { createApp } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./assets/app.scss";
const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createMemoryHistory()
    : createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: App,
      name: "default",
      children: [
        {
          path: "/",
          component: () => import("./pages/main/index.vue"),
          children: [
            {
              path: "/",
              component: () => import("./pages/main/home-page.vue"),
            },
            {
              path: "servers",
              component: () => import("./pages/main/servers-page.vue"),
            },
            {
              path: "not-found",
              component: () => import("./pages/errors/not-found.vue"),
              name: "notFound",
            },
          ],
        },
      ],
    },
    {
      redirect: "/not-found",
      path: "/:pathMatch(.*)*",
    },
  ],
});
createApp(App)
  .use(router)
  .mount("#app");
