import { Component, Input, OnInit } from '@angular/core';
import { Marketplace } from 'src/app/models/data/marktplace.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-marketplace-item',
  templateUrl: './marketplace-item.component.html',
  styleUrls: ['./marketplace-item.component.scss']
})
export class MarketplaceItemComponent {

  isSelf: boolean = false;
  editing: boolean = false;

  _marketplace!: Marketplace;
  @Input() set marketplace(value: Marketplace) {
    this._marketplace = value;
    this.checkSelf();
  }
  get marketplace(): Marketplace {
    return this._marketplace;
  }

  constructor(private token: TokenService, private request: RequestService) { }

  checkSelf() {
    const data = this.token.getTokenData();
    this.isSelf = this.marketplace.inventoryItem?.inventory?.user?.id == data.id;
  }

  edit() {
    this.editing = true;
  }

  buy() {
    // TODO
  }

  remove() {
    // TODO
  }

  update(value: any) {
    // TODO
    console.log(value);
    this.editing = false;
  }

  reset() {
    // TODO
    this.editing = false;
  }
}
