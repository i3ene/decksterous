export type RequestDifference = 'left' | 'right' | 'intersection' | 'symmetric';

export type RequestOptions = RequestOptionsModel & RequestOptionsAssociation & RequestOptionsData & RequestOptionsBody & RequestOptionsList & RequestOptionsPage;

export interface RequestOptionsScope {
  /**
     * Additional Scopes
     */
  scopes?: any[];
}

export interface RequestOptionsModel extends RequestOptionsScope {
  /**
   * The instance Model
   */
  model: { new (...args: any[]): any } & any;
}

export interface RequestOptionsAssociation {
  /**
   * Specific association options
   */
  association: {
    /**
     * Association name
     */
    name: string;
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
}

export interface RequestOptionsData {
  /**
   * Specifc data options.
   * (This affects `req.data`.)
   */
  data?: {
    /**
     * Key(path) to access data from
     * (E.g. `req.data[key1][key2]...`.)
     */
    key?: string | string[] | any | any[];
    /**
     * Key(path) to save data to
     * (E.g. `req.data[key1][key2]...`.)
     */
    name?: string | string[];
  }
}

export interface RequestOptionsBody {
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
}

export interface RequestOptionsList {
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

export interface RequestOptionsPage {
  /**
   * Pagination for big data results
   */
  page?: {
    /**
     * How many elements are inside a page
     */
    size: number;
    /**
     * Key(path) to pagination
     */
    key: string | string[];
  }
}