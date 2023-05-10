import { Component, OnInit } from '@angular/core';
import { Marketplace } from 'src/app/models/data/marktplace.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplacePage implements OnInit {

  items: Marketplace[] = [];

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.loadMarketplace();
  }

  async loadMarketplace() {
    const payload = await this.request.get('/marketplace/all');
    const items = payload.map((x: any) => new Marketplace(x));
    this.items = items;
  }

}
