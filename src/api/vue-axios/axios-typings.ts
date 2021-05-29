import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";

export interface VueAxiosInstance extends AxiosStatic {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>;
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;

  setBaseURL(baseURL: string): void;
  setHeader(
    name: string,
    value?: string | false,
    scopes?: string | string[]
  ): void;
  setToken(
    token: string | false,
    type?: string,
    scopes?: string | string[]
  ): void;

  onRequest(
    callback: (
      config: AxiosRequestConfig
    ) => void | AxiosRequestConfig | Promise<AxiosRequestConfig>
  ): void;
  onResponse<T = any>(
    callback: (
      response: AxiosResponse<T>
    ) => void | AxiosResponse<T> | Promise<AxiosResponse<T>>
  ): void;
  onError(callback: (error: AxiosError) => any): void;
  onRequestError(callback: (error: AxiosError) => any): void;
  onResponseError(callback: (error: AxiosError) => any): void;

  create(options?: AxiosRequestConfig): VueAxiosInstance;
}
declare module "axios" {
  interface AxiosRequestConfig {
    progress?: boolean;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: VueAxiosInstance;
  }
}