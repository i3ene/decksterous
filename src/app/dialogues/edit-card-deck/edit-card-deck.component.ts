import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { Item, ItemType } from 'src/app/models/data/item.model';

@Component({
  templateUrl: './edit-card-deck.component.html',
  styleUrls: ['./edit-card-deck.component.scss']
})
export class EditCardDeckComponent implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.inventory.items = (this.data.items as Item[]).filter(x => x.type == ItemType.CARD);
    console.log(this.data.deck);
  }

}
