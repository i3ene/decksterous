import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';

@Component({
  selector: 'dev-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss']
})
export class DevUserInventoryComponent {
  @ViewChild(InventoryComponent) inventory!: InventoryComponent;

  @Input() set inventoryId(value: number) {
    this.inventory.inventoryId = value;
  }
  @Input() set userId(value: number) {
    this.inventory.userId = value;
  }

}
