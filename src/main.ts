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
import axiosInstace from "./api/vue-axios/axiosInstance";
import { IpcRenderer } from "electron";
import { installBooru } from "./api/BooruInterface";
import { QueryEntity } from "@datorama/akita";
import {
  BooruServerQuery,
  BooruServerStore,
} from "./store/servers/servers.store";
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    _vue_instance: any;
  }
}
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
    const akita = createAkita(true);
    c.config.globalProperties.$akita = akita;
    const serversQuery = akita.getEntityQuery<BooruServerQuery>("serversQuery"),
      serversStore = akita.getEntityStore<BooruServerStore>("servers");
    if (!serversQuery.getActive())
      serversStore.setActive(serversQuery.getAll()[0].name);
    localStorage.activeBooru = serversQuery.getActiveId();
  })
  .use(axiosInstace)
  .use(installBooru)
  .mount("#app");

if (process.env.NODE_ENV !== "production") {
  console.log("Stores & Queries: ", app.$akita);
  window._vue_instance = app;
}
