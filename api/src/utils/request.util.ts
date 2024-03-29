import { RequestDifference } from "../models/object/request.model";

export namespace RequestUtils {
  export function byAttribute(data: any, key?: string | any[] | any): any {
    if (key == undefined) return data
    if (typeof key == 'string') return data[key];
    if (!Array.isArray(key)) return data[key.name];
    for (const attr of key) {
      if (data == undefined) break;
      if (typeof attr == 'string') {
        data = data[attr];
      } else {
        data = data[attr.name];
      }
    }
    return data;
  }

  export function toAttribute(data: any, key: string | any[] | any, payload: any) {
    if (key == undefined) return;
    if (typeof key == 'string') return data[key] = payload;
    if (!Array.isArray(key)) return data[key.name] = payload;
    for (const attr of key) {
      if (data == undefined) break;
      if (typeof attr == 'string') {
        data = data[attr];
      } else {
        data = data[attr.name];
      }
    }
    return data = payload;
  }

  export function difference(type: RequestDifference, arr1: any[], arr2: any[], on?: any | any[]) {
    switch(type) {
      case 'intersection':
        return arr1.filter(x => arr2.map((y: any) => RequestUtils.byAttribute(y, on)).includes(RequestUtils.byAttribute(x, on)));
      case 'left':
        return arr1.filter(x => !arr2.map((y: any) => RequestUtils.byAttribute(y, on)).includes(RequestUtils.byAttribute(x, on)));
      case 'right':
        return arr2.filter(x => !arr1.map((y: any) => RequestUtils.byAttribute(y, on)).includes(RequestUtils.byAttribute(x, on)));
      case 'symmetric':
        return arr1.filter(x => !arr2.map((y: any) => RequestUtils.byAttribute(y, on)).includes(RequestUtils.byAttribute(x, on))).concat(arr2.filter(x => !arr1.map((y: any) => RequestUtils.byAttribute(y, on)).includes(RequestUtils.byAttribute(x, on))));
    }
  }
}
