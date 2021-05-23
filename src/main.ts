import { createApp } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import App from "./App.vue";
import { createAkita } from "./store/createAkita";
import VueRx from "@nopr3d/vue-next-rx";
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
const app = createApp(App)
  .use(router)
  .use(VueRx)
  .use((c) => {
    c.config.globalProperties.$akita = createAkita();
  })
  .mount("#app");

if (process.env.NODE_ENV !== "production") {
  console.log('Stores & Queries: ', app.$akita);
}
