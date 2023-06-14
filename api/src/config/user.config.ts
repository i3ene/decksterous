import config from "./config.json";

export namespace UserConfig {
  export const DEFAULT_ITEMS: number[] = config.user.default_items;
}