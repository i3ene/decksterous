import { Component, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class UserInventoryComponent {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

}
