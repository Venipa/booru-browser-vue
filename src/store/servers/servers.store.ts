import {
  EntityState,
  EntityStore,
  guid,
  QueryEntity,
  Store,
  StoreConfig,
} from "@datorama/akita";
import { produce } from "immer";
import { DEFAULT_SERVERS } from "./defaultServers";
import { BooruServer } from "./servers.model";

export interface BooruServerState extends EntityState<BooruServer> {
  activeBooru: string;
}

@StoreConfig({
  name: "servers",
  producerFn: produce,
  idKey: "name",
})
export class BooruServerStore extends EntityStore<BooruServerState> {
  constructor() {
    super();
  }
  // @ts-ignore
  akitaPreUpdate(_, next: BooruServerState) {
    next.activeBooru = next.active;
    return next;
  }
}

export const booruServerStore = new BooruServerStore();

export class BooruServerQuery extends QueryEntity<BooruServerState> {
  // @ts-ignore
  get _store() {
    return this.__store__ as BooruServerStore;
  }
}

export const booruServerQuery = new BooruServerQuery(booruServerStore);

if (booruServerQuery.getCount() === 0)
  booruServerStore.upsertMany(DEFAULT_SERVERS);

const activeBooru = booruServerQuery.getValue().activeBooru;
if (activeBooru && !booruServerQuery.getActiveId()) {
  booruServerQuery._store.setActive(activeBooru);
}
