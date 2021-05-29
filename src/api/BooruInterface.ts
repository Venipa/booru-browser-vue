import { App, ComponentCustomProperties, Plugin } from "vue";
import { VueAxiosInstance } from "./vue-axios/axios-typings";
import { createAxiosInstance } from "./vue-axios/axiosInstace";

export interface BooruOptions {
  auth: { login: string; password: string };
}
export class Booru {
  protected _options: BooruOptions;
  private _vue!: App<any>;
  private _httpClient: VueAxiosInstance;
  get baseUrl() {
    return this.httpClient.defaults.baseURL;
  }
  get options() {
    return this._options;
  }
  protected get httpClient(): VueAxiosInstance {
    return this._httpClient;
  }
  constructor(baseUrl: string, options?: Partial<BooruOptions>) {
    this._options = options as any;
    this._httpClient = createAxiosInstance({ baseURL: baseUrl });
  }

  setCustomUrl(url: string) {
    if (!url.startsWith("http")) throw new Error("Invalid Uri Format");
    this.httpClient.defaults.baseURL = url;
  }
  injectVue(app: App<any>) {
    this._vue = app;
  }
}

export class DanbooruHost extends Booru {
  static readonly defaultParams: { [key: string]: any } = {
    page: "dapi",
    json: 1,
    s: "post",
    q: "index",
  };
  constructor(url: string, options?: Partial<BooruOptions>) {
    super(url, options);
  }

  get(page: number = 1) {
    return this.httpClient
      .$get(`/index.php`, {
        params: {
          ...DanbooruHost.defaultParams,
          pid: page,
        },
      })
      .then((x) => {
        if (x?.length > 0) {
          return x.map((y: any) => {
            y.imageId = y.image.match(/^(.*)\./)[1];
            if (y.imageId) {
              y.thumbnail = `https://safebooru.org/thumbnails/${y.directory}/thumbnail_${y.imageId}.jpg`;
              y.sample = `https://safebooru.org/samples/${y.directory}/sample_${y.imageId}.jpg`;
              y.source = `https://safebooru.org/images/${y.directory}/${y.image}`;
            }
            return y;
          });
        }
        return x;
      });
  }
}
function useBooru<T extends Booru>(BooruBase: T) {
  return (app: App<any>) => {
    BooruBase.injectVue(app);
    return BooruBase;
  };
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $booru: { [key: string]: Booru };
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
    app.config.globalProperties.$booru = {} as any;
    app.config.globalProperties.$booru["safebooru"] = useBooru(
      new DanbooruHost("https://safebooru.org")
    )(app);
  },
};
