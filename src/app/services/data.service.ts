import { Injectable } from '@angular/core';
import { RequestService } from './request/request.service';
import { Inventory, User } from '../models/data/user.model';
import { SelfService } from './self.service';
import { ModelUtils } from '../utils/model.util';
import { SubInventory, _Object } from '../models/data/object.model';
import { Item, ItemAny } from '../models/data/item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private request: RequestService, public self: SelfService) { }

  async getObject<T extends Item>(objectHash: string) {
    const payload = await this.request.get(`/object/${objectHash}`);
    return new _Object<T>(payload);
  }

  async getUser(userId: number) {
    const payload = await this.request.get(`/user/${userId}`);
    return new User(payload);
  }

  async getFriends(userId: number) {
    const payload = await this.request.get(`/user/${userId}/friend`);
    return ModelUtils.parseArray(User, payload);
  }

  async getInventoryObjects(inventoryId: number) {
    const payload = await this.request.get(`/inventory/${inventoryId}/object`);
    return ModelUtils.parseArray(_Object, payload);
  }

  async getSubInventory(objectHash: string) {
    const payload = await this.request.get(`/object/${objectHash}/subinventory`);
    return new SubInventory(payload);
  }

  async getSubInventoryObjects(objectHash: string) {
    const payload = await this.request.get(`/object/${objectHash}/subinventory/object`);
    return ModelUtils.parseArray(_Object, payload);
  }
}
