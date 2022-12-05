export interface RequestOptions {
  /**
   * The instance Model
   */
  model: { new (...args: any[]): any } & any;

  /**
   * Additional Scopes
   */
  scopes?: any[];

  /**
   * Specific association options
   */
  association?: {
    /**
     * Association name
     */
    name?: string;
    /**
     * Key(path) to save data to relative from `data.name`
     */
    key?: string;
    /**
     * Key(path) to access data from
     * (E.g. `req.data[key1][key2]...`.)
     */
    data?: string | string[] | any | any[];
  }
  
  /**
   * Specifc data options.
   * (This affects `req.data`.)
   */
  data?: {
    /**
     * Key(path) to access data from
     * (E.g. `req.data[key1][key2]...`.)
     */
    key?: string | string[];
    /**
     * Key(path) to save data to
     * (E.g. `req.data[key1][key2]...`.)
     */
    name?: string | string[];
  }

  /**
   * Specific body options
   */
  body?: {
    /**
     * Key(path) to access data from
     * (E.g. `req.body[key1][key2]...`.)
     */
    key?: string | string[];
  }

  /**
   * Specific list options
   */
  list?: {
    /**
     * Key(path) to access list from
     */
    key?: string | string[];
    /**
     * Key(path) to an entry id value
     */
    id?: string | string[];
  }
}