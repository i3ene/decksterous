import { Op } from 'sequelize';

export namespace QueryUtil {
  /**
   * Create an attribute object for Sequelize
   * @param data Object, collection or array
   * @param key Key, index or name inside data
   * @param operator (In case of multiple property values)
   * @param contains (Will create 'like' queries for string values)
   * @returns Object with key attribute and property values. If no property values are present it returns an empty object.
   */
  export function attribute(data: any, key: string, operator: typeof Op & any = Op.like, contains?: boolean): any {
    return data &&
      data[key] &&
      (!Array.isArray(data[key]) || (Array.isArray(data[key]) && data[key].length && typeof data[key][0] != 'object'))
      ? {
          [key]: Array.isArray(data[key]) ? { [operator]: data[key] } : (contains && typeof data[key] == 'string' ? { [Op.like]: `%${data[key]}%` } : data[key]),
        }
      : {};
  }

  /**
   * Create an attribute collection object for Sequelize
   * @param query The data object to take the properties from
   * @param model The Sequelize model (needed for excluding `primaryKey` attribute)
   * @returns Object collection with properties and values from `query`
   */
  export function attributes(query: any, model: { new (...args: any[]): any } & any): any {
    const obj: { [key: string]: any } = {};
    for (const key of Object.keys(query)) {
      if (model.primaryKeyAttributes.includes(key)) continue;
      obj[key] = query[key];
    }
    return obj;
  }

  /**
   * Create a query scope for Sequelize
   * @param attributes Attributes to use for query
   * @returns Method function for Sequelize scoping
   */
  export function query(attributes: string[]) {
    return (data: any, operator: typeof Op & any = Op.or, contains?: boolean) => ({
      where: Object.keys(data).length
        ? {
            [operator as unknown as symbol]: attributes.map((x) => attribute(data, x, Op.like, contains)).filter((x) => Object.keys(x).length),
          }
        : {},
    });
  }

  /**
   * Create a id scope for Sequelize
   * @returns Method function for Sequelize scoping
   */
  export function id() {
    return (data: any, operator: typeof Op & any = Op.or) => ({
      where: data
        ? {
            id: Array.isArray(data)
              ? {
                  [operator as unknown as symbol]: data.map((x: any) => x.id),
                }
              : data.id,
          }
        : {
            id: null,
          },
    });
  }

  /**
   * Create a ids scope for Sequelize
   * @returns Method function for Sequelize scoping
   */
  export function ids(model: { new (...args: any[]): any } & any, arr: any[]): any {
    const attr = model.primaryKeyAttributes[0];
    return {
      where: {
        [attr]: {
          [Op.in]: arr
        }
      },
    };
  }

  /**
   * Check if object is empty
   * @param obj Object to check
   * @returns `true` if no keys are present
   */
  export function isEmpty(obj: any) {
    if (typeof obj == "number") return false;
    if (!obj) return true;
    return Object.keys(obj).length === 0;
  }

  /**
   * Check if object is empty or `0`
   * @param obj Object to check
   * @returns `true` if no keys are present or `0`
   */
  export function isEmptyOrZero(obj: any) {
    if (typeof obj == "number" && obj == 0) return true;
    return isEmpty(obj);
  }
}
