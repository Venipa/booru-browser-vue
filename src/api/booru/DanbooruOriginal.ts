import { BooruPostState } from "@/store/posts/posts.store";
import { Booru, BooruHttp, BooruHttpOptions, BooruOptions, BooruType } from "./Booru";

export class DanbooruHostV2 extends Booru {
  static typeName: BooruType = "danbooru_v2";
  constructor(url: string, options?: Partial<BooruOptions>) {
    super(url, options);
  }

  async get(page: number = 1, args: BooruHttpOptions) {
    return await this.httpClient
      .$get(`/posts.json`, {
        params: {
          [`search[name_matches]`]: args?.q || "*",
          page,
        },
      })
      .then((x) => {
        if (x?.length > 0) {
          return x.filter(x => x?.id).map(
            ({
              id,
              image_height: height,
              image_width: width,
              md5: hash,
              score,
              tags_string: tags,
              file_url: image,
              large_file_url: sample,
              preview_file_url: thumbnail,
              rating
            }: any) => {
              const next: BooruPostState = {
                id,
                height,
                width,
                hash,
                score,
                tags: tags?.split(" "),
                rating: {
                  s: "safe"
                }[rating] || `${rating}`,
                image,
                sample,
                thumbnail,
                source: image
              };
              return next;
            }
          );
        }
        return [];
      });
  }
}
