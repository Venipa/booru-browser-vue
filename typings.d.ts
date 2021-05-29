import { Observables } from "@nopr3d/vue-next-rx";

declare const __static: string;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    subscriptions?: Observables | ((this: CreateComponentPublicInstance) => Observables) | undefined
  }
}