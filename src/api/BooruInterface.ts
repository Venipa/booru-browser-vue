import { BooruPostState } from "@/store/posts/posts.store";
import { BooruServer } from "@/store/servers/servers.model";
import { filter } from "rxjs/operators";
import { App, ComponentCustomProperties, Plugin } from "vue";
import { Booru, BooruContext, BooruHttp } from "./booru/Booru";
import { DanbooruHostV2 } from "./booru/DanbooruOriginal";
import { DanbooruHostPHP } from "./booru/DanbooruPHP";

const BOORU_CLASSES = [DanbooruHostPHP, DanbooruHostV2];
function useBooru<T extends Booru>(BooruBase: T) {
  return (app: App<any>) => {
    BooruBase.vue = app;
    return BooruBase;
  };
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $booru: { active(): BooruHttp };
  }
}
export const installBooru: Plugin = {
  install(
    app,
    options?: Partial<{
      baseUrl: string;
      headers: { [key: string]: any };
      debug: boolean;
    }>
  ) {
    app.config.globalProperties.$akita.queries.serversQuery.selectAll().subscribe((configs: BooruServer[]) => {
      window.ipcRenderer.send("cors:allow-booru", configs.map(x => new URL(x.url)?.origin).filter(x => !!x));
    })
    app.config.globalProperties.$akita.queries.serversQuery
      .selectActive()
      .pipe(
        filter(
          (config: BooruServer) =>
            !!BOORU_CLASSES.find((x) => x.typeName === config?.meta?.type)
        )
      )
      .subscribe((config: BooruServer) => {
        const BOORU_CLASS = BOORU_CLASSES.find(
          (x) => x.typeName === config.meta.type
        );
        const booruInstance: BooruContext & BooruHttp = new BOORU_CLASS(
          config.url,
          {
            ...(config.auth
              ? {
                  auth: {
                    login: config.auth.login,
                    password: config.auth.pass,
                  },
                }
              : {}),
          }
        );

        const booru = useBooru(booruInstance)(app);
        app.config.globalProperties.$booru["_instances"][config.name] = booru;
      });
    app.config.globalProperties.$booru = {
      _instances: {},
      active() {
        const config: BooruServer = app.config.globalProperties.$akita.queries.serversQuery.getActive();
        return app.config.globalProperties.$booru["_instances"][
          config.name
        ] as BooruHttp;
      },
    } as any;
  },
};
