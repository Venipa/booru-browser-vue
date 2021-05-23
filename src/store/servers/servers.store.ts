import {
  EntityState,
  EntityStore,
  QueryEntity,
  Store,
  StoreConfig,
} from "@datorama/akita";
import { produce } from "immer";
export interface BooruServerState extends EntityState {
  name: string;
  url: string;
  nsfw: boolean;
  options: {
    showNSFW: boolean;
    filter: { [key: string]: any };
  };
  auth: {
    login: string;
    pass: string;
  };
}

@StoreConfig({
  name: "servers",
  producerFn: produce,
})
export class BooruServerStore extends EntityStore<BooruServerState> {}

export const booruServerStore = new BooruServerStore();

export class BooruServerQuery extends QueryEntity<BooruServerState> {}

export const booruServerQuery = new BooruServerQuery(booruServerStore);
