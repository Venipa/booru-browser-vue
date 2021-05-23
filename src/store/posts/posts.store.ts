import {
  EntityState,
  EntityStore,
  QueryEntity,
  Store,
  StoreConfig,
} from "@datorama/akita";
import { produce } from "immer";
export interface BooruPostState extends EntityState {
  name: string;
  source: string; // server id
}

@StoreConfig({
  name: "posts",
  producerFn: produce,
})
export class BooruPostStore extends EntityStore<BooruPostState> {}

export const booruPostStore = new BooruPostStore();

export class BooruPostQuery extends QueryEntity<BooruPostState> {}

export const booruPostQuery = new BooruPostQuery(booruPostStore);
