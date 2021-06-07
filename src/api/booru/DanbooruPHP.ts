import { BooruPostState } from "@/store/posts/posts.store";
import { Booru, BooruContext, BooruOptions, BooruType } from "./Booru";

export class DanbooruHostPHP extends Booru {
  static typeName: BooruType = "danbooru_php";
  readonly defaultParams: { [key: string]: any } = {
    page: "dapi",
    json: 1,
    s: "post",
    q: "index",
  };
  constructor(url: string, options?: Partial<BooruOptions>) {
    super(url, options);
  }

  async get(page: number = 1): Promise<BooruPostState[]> {
    return await this.httpClient
      .$get(`/index.php`, {
        params: {
          ...this.defaultParams,
          pid: page,
        },
      })
      .then((x) => {
        if (x?.length > 0) {
          return x.filter(x => x?.id).map(
            ({
              id,
              height,
              width,
              directory,
              hash,
              score,
              tags,
              image,
              rating
            }: any) => {
              const next: any = {
                id,
                directory,
                height,
                width,
                hash,
                score,
                tags: tags?.split(" "),
                image,
                rating
              };
              next.imageId = image.match(/^(.*)\./)[1];
              if (next.imageId) {
                next.thumbnail = `${this.options.origin}/thumbnails/${directory}/thumbnail_${next.imageId}.jpg`;
                next.sample = `${this.options.origin}/samples/${directory}/sample_${next.imageId}.jpg`;
                next.source = `${this.options.origin}/images/${directory}/${image}`;
              }
              return next as BooruPostState[];
            }
          );
        }
        return x;
      });
  }
}
