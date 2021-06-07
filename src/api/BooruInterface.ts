import { BooruPostQuery, BooruPostState } from "@/store/posts/posts.store";
import { BooruServer } from "@/store/servers/servers.model";
import { BooruServerQuery } from "@/store/servers/servers.store";
import { Observable } from "rxjs";
import { filter, map, startWith } from "rxjs/operators";
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
    // @ts-ignore
    const serversQuery: BooruServerQuery = app.config.globalProperties.$akita.getEntityQuery<
      BooruServerQuery
    >("serversQuery");
    // @ts-ignore
    const postsQuery: BooruPostQuery = app.config.globalProperties.$akita.getEntityQuery<
      BooruPostQuery
    >("postsQuery");
    app.config.globalProperties.$booru = {
      _instances: {},
      active() {
        const config = serversQuery.getActive() as BooruServer;
        return app.config.globalProperties.$booru["_instances"][
          config.name
        ] as BooruHttp;
      },
    } as any;
    serversQuery._store.setActive(localStorage.activeBooru);
    (serversQuery
      .selectActive() as Observable<BooruServer>)
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
        postsQuery._store.remove();
      });
  },
};
