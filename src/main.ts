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
import axiosInstace from "./api/vue-axios/axiosInstace";
import { Booru, installBooru } from "./api/BooruInterface";
import { IpcRenderer } from "electron";
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
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
    c.config.globalProperties.$akita = createAkita();
  })
  .use(axiosInstace)
  .use(installBooru)
  .use((c) => {
    const corsMapping = Object.values(
      c.config.globalProperties?.$booru as { [key: string]: Booru }
    )
      .filter((x) => x.baseUrl)
      .map((x) => x.baseUrl!);
    window.ipcRenderer.send("cors:allow-booru", corsMapping);
  })
  .mount("#app");

if (process.env.NODE_ENV !== "production") {
  console.log("Stores & Queries: ", app.$akita);
}
