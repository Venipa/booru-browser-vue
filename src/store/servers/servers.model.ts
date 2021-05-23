export interface BooruServer {
  name: string;
  url: string;
  nsfw?: boolean;
  options?: {
    showNSFW?: boolean;
    filter?: string;
  };
  auth?: {
    login: string;
    pass: string;
  };
  meta: {
    readonly: true;
  };
}
