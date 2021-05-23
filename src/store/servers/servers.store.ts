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

export interface BooruServerState extends EntityState<BooruServer> {}

@StoreConfig({
  name: "servers",
  producerFn: produce,
  idKey: "name",
})
export class BooruServerStore extends EntityStore<BooruServerState> {}

export const booruServerStore = new BooruServerStore();
booruServerStore.upsertMany(DEFAULT_SERVERS);

export class BooruServerQuery extends QueryEntity<BooruServerState> {}

export const booruServerQuery = new BooruServerQuery(booruServerStore);
