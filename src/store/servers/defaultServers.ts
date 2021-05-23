import { BooruServer } from "./servers.model";

export const DEFAULT_SERVERS: BooruServer[] = [
  {
    name: "Safebooru",
    url: "https://safebooru.org/",
    meta: {
      readonly: true,
    },
  },
  {
    name: "Danbooru",
    url: "https://danbooru.donmai.us/",
    meta: {
      readonly: true,
    },
  },
];
