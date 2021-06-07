import {
  EntityStore,
  PersistState,
  persistState,
  Query,
  QueryEntity,
  Store,
} from "@datorama/akita";
import * as stores from ".";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $akita: {
      queries: { [key: string]: Query<any> };
      stores: { [key: string]: EntityStore<any> | Store<any> };
    };
  }
}
export const createAkita = (_persistState?: boolean) => {
  let _persists: PersistState;
  if (_persistState) {
    _persists = persistState({
      include: ["servers"],
    });
  }
  return {
    ...(_persists ? { persists: _persists } : {}),
    stores: <{[key: string]: any}>Object.values(stores)
      .filter((x: any) => x instanceof Store)
      .reduce((l: any, r: any) => {
        l[r.storeName] = r;
        return l;
      }, {}),
    queries: <{[key: string]: Query<any> | QueryEntity<any>}>Object.values(stores as any)
      .filter((x: any) => x instanceof Query)
      .reduce((l: any, r: any) => {
        l[r.__store__.storeName + "Query"] = r;
        return l;
      }, {}),
      getQuery<T extends Query<any>>(name: string): T {
        return this.queries[name];
      },
      getEntityQuery<T extends QueryEntity<any>>(name: string): T {
        return this.queries[name];
      },
      getStore<T extends Store<any>>(name: string): T {
        return this.stores[name];
      },
      getEntityStore<T extends EntityStore<any>>(name: string): T {
        return this.stores[name];
      }
  };
};
