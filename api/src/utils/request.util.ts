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

  export function difference(type: 'left' | 'right' | 'intersection' | 'symmetric', arr1: any[], arr2: any[], on?: any | any[]) {
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
