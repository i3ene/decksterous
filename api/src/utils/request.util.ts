export namespace RequestUtils {
  export function byAttribute(data: any, key?: string | any[] | any): any {
    if (key) {
      if (typeof key == 'string') {
        data = data[key];
      } else if (Array.isArray(key)) {
        data = data;
        for (const attr of key) {
          if (typeof attr == 'string') {
            data = data[attr];
          } else {
            data = data[attr.name];
          }
        }
      } else {
        data = data[key.name];
      }
    }
    return data;
  }
}
