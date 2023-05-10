import { Component, Input, OnInit } from '@angular/core';
import { Marketplace } from 'src/app/models/data/marktplace.model';

@Component({
  selector: 'app-marketplace-item',
  templateUrl: './marketplace-item.component.html',
  styleUrls: ['./marketplace-item.component.scss']
})
export class MarketplaceItemComponent implements OnInit {

  @Input() marketplace!: Marketplace;

  constructor() { }

  ngOnInit(): void {
  }

}
