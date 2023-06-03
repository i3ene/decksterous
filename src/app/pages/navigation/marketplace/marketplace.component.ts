import { Component, OnInit } from '@angular/core';
import { ItemAny } from 'src/app/models/data/item.model';
import { Marketplace, _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplacePage implements OnInit {

  _ownItems: boolean = false;
  set ownItems(value: boolean) {
    this._ownItems = value;
    this.loadMarketplace(value);
  }
  get ownItems() {
    return this._ownItems;
  }

  items: _Object<ItemAny>[] = [];

  constructor(private request: RequestService, private data: DataService) { }

  ngOnInit(): void {
    this.loadMarketplace(this.ownItems);
  }

  async loadMarketplace(ownItems: boolean) {
    this.items = await (ownItems ? this.data.self.marketplaceObjects : this.data.self.getOtherMarketplaceObjects());
  }

}
