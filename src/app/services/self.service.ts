import { Injectable } from '@angular/core';
import { Friends, Inventory, User } from '../models/data/user.model';
import { RequestService } from './request/request.service';
import { IMarketplace, Marketplace, _Object } from '../models/data/object.model';
import { ModelUtils } from '../utils/model.util';
import { Deck, Item } from '../models/data/item.model';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  private _user?: User;
  set user(value: Promise<User> | undefined) {
    if (value) value.then(x => this._user = x);
    else this._user = undefined;
  }
  get user(): Promise<User> {
    return new Promise(async (resolve) => resolve(this._user ??= await this.getUser()));
  }

  private _friends?: Friends;
  set friends(value: Promise<Friends> | undefined) {
    if (value) value.then(x => this._friends = x);
    else this._friends = undefined;
  }
  get friends(): Promise<Friends> {
    return new Promise(async (resolve) => resolve(this._friends ??= await this.getFriends()));
  }

  private _inventory?: Inventory;
  set inventory(value: Promise<Inventory> | undefined) {
    if (value) value.then(x => this._inventory = x);
    else this._inventory = undefined;
  }
  get inventory(): Promise<Inventory> {
    return new Promise(async (resolve) => resolve(this._inventory ??= await this.getInventory()));
  }

  private _marketplaceObjects?: _Object<Item>[];
  set marketplaceObjects(value: Promise<_Object<Item>[]> | undefined) {
    if (value) value.then(x => this._marketplaceObjects = x);
    else this._marketplaceObjects = undefined;
  }
  get marketplaceObjects(): Promise<_Object<Item>[]> {
    return new Promise(async (resolve) => resolve(this._marketplaceObjects ??= await this.getMarketplaceObjects()));
  }

  constructor(private request: RequestService) { }

  reset() {
    this._user = undefined;
    this._friends = undefined;
    this._inventory = undefined;
    this._marketplaceObjects = undefined;
  }

  /** User **/

  private async getUser() {
    const payload = await this.request.get("/self");
    return new User(payload);
  }

  /** Friends **/

  private async getFriends() {
    const payload = await this.request.get("/self/friends/all");
    return new Friends(payload);
  }

  public async addFriend(userId: number) {
    const result = await this.request.post(`/self/friends/${userId}`);
    console.log(result);
  }

  public async removeFriend(userId: number) {
    const result = await this.request.delete(`/self/friends/${userId}`);
    console.log(result);
  }

  public async searchFriends(name: string) {
    const payload = await this.request.get(`/self/friends?name=${name}`);
    return ModelUtils.parseArray(User, payload);
  }

  /** Inventory **/

  private async getInventory() {
    const payload = await this.request.get("/self/inventory");
    return new Inventory(payload);
  }

  public async getInventoryObjects() {
    const payload = await this.request.get("/self/inventory/objects");
    return ModelUtils.parseArray(_Object, payload);
  }

  public async deleteObject(objectHash: string | _Object<Item>) {
    if(typeof objectHash == "object") objectHash = objectHash.hash;
    const result = await this.request.delete(`/self/object/${objectHash}`);
    console.log(result);
  }

  public async addDeck(deckId: number | Deck) {
    if(typeof deckId == "object") deckId = deckId.id;
    const result = await this.request.post(`/self/deck/${deckId}`);
    console.log(result);
  }

  public async addCardToDeck(deckHash: string | _Object<Item>, cardHash: string | _Object<Item>) {
    if(typeof deckHash == "object") deckHash = deckHash.hash;
    if(typeof cardHash == "object") cardHash = cardHash.hash;
    const result = await this.request.post(`/self/deck/card/${deckHash}/${cardHash}`);
    console.log(result);
  }

  public async removeCardFromDeck(deckHash: string | _Object<Item>, cardHash: string | _Object<Item>) {
    if(typeof deckHash == "object") deckHash = deckHash.hash;
    if(typeof cardHash == "object") cardHash = cardHash.hash;
    const result = await this.request.delete(`/self/deck/card/${deckHash}/${cardHash}`);
    console.log(result);
  }

  /** Marketplace **/

  private async getMarketplaceObjects() {
    const payload = await this.request.get("/self/marketplace");
    return ModelUtils.parseArray(_Object, payload);
  }

  public async getOtherMarketplaceObjects() {
    const payload = await this.request.get("/self/marketplace/other");
    return ModelUtils.parseArray(_Object, payload);
  }

  public async sellMarketplaceObject(marketplace: IMarketplace) {
    const result = await this.request.post("/self/marketplace", marketplace);
    console.log(result);
  }

  public async updateMarketplaceObject(marketplace: IMarketplace) {
    const result = await this.request.put(`/self/marketplace/${marketplace.objectHash}`, marketplace);
    console.log(result);
  }

  public async removeMarketplaceObject(objectHash: string) {
    const result = await this.request.delete(`/self/marketplace/${objectHash}`);
    console.log(result);
  }

  public async buyMarketplaceObject(objectHash: string) {
    const result = await this.request.get(`/self/marketplace/${objectHash}`);
    console.log(result);
  }
}
