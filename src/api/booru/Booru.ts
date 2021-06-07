import { BooruPostState } from "@/store/posts/posts.store";
import { App } from "vue";
import { VueAxiosInstance } from "../vue-axios/axios-typings";
import { createAxiosInstance, createAxiosIpcInstance } from "../vue-axios/axiosInstance";
export type BooruType = 'danbooru_v2' | 'danbooru_php';
export interface BooruHttpOptions {
  [key: string]: any;
}
export interface BooruContext {
  options: BooruOptions;
  vue: App<any>;
  httpClient: VueAxiosInstance;
}
export interface BooruHttp {
  get(
    page: number,
    options?: BooruHttpOptions
  ): Promise<BooruPostState[]>;
}
export interface BooruOptions {
  auth?: { login: string; password: string };
  origin?: string;
}
export class Booru implements BooruContext {
  options: any;
  vue: App<any>;
  httpClient: VueAxiosInstance;
  constructor(url: string, options?: Partial<BooruOptions>) {
    this.options = { ...(options || {}), origin: new URL(url).origin };
    this.httpClient = createAxiosIpcInstance({
      baseURL: url,
    });
  }
}