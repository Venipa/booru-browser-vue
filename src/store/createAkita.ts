import { Query, Store } from "@datorama/akita";
import * as stores from ".";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $akita: {
      queries: { [key: string]: Query<any> };
      stores: { [key: string]: Store<any> };
    };
  }
}
export const createAkita = () => {
  return {
    stores: Object.values(stores)
      .filter((x: any) => x instanceof Store)
      .reduce((l: any, r: any) => {
        l[r.storeName] = r;
        return l;
      }, {}),
    queries: Object.values(stores as any)
      .filter((x: any) => x instanceof Query)
      .reduce((l: any, r: any) => {
        l[r.__store__.storeName + "Query"] = r;
        return l;
      }, {}),
  };
};
