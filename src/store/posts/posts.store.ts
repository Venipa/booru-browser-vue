import {
  EntityState,
  EntityStore,
  QueryEntity,
  Store,
  StoreConfig,
} from "@datorama/akita";
import { produce } from "immer";
export interface BooruPostState extends EntityState {
  id: string;
  height: number;
  width: number;
  hash: string;
  score: number;
  tags: string[];
  image: string;
  sample: string;
  thumbnail: string;
  rating: string;
  source: string;
}

@StoreConfig({
  name: "posts",
  producerFn: produce,
  idKey: "id",
})
export class BooruPostStore extends EntityStore<BooruPostState> {}

export const booruPostStore = new BooruPostStore();

export class BooruPostQuery extends QueryEntity<BooruPostState> {
  // @ts-ignore
  get _store() {
    return this.__store__ as BooruPostStore;
  }
  constructor(store: BooruPostStore) {
    super(store);
  }
}

export const booruPostQuery = new BooruPostQuery(booruPostStore);
