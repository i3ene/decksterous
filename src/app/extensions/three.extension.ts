import { Subject } from 'rxjs';
import { Object3D } from 'three';
import { Event } from 'three';

declare module "three" {}

Object3D.prototype.disabled = false;
Object3D.prototype._selected = false;
Object3D.prototype.selectable = false;
Object3D.prototype.clickable = false;

Object.defineProperties(Object3D.prototype, {
  selecting: {
    get() {
      this._selecting ??= new Subject<boolean>();
      return this._selecting;
    }
  },
  selected: {
    get() {
      return this._selected;
    },
    set(value: boolean) {
      if (this._selected != value) this.selecting.next(value);
      this._selected = value;
    }
  },
  clicking: {
    get() {
      this._clicking ??= new Subject<number>();
      return this._clicking;
    },
    
  },
  clicked: {
    set(value: number) {
      if (value) this.clicking.next(value);
    }
  }
});