import { Component, Input } from '@angular/core';

@Component({
  selector: 'dev-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class DevInventoryComponent {
  @Input() userId!: number;
}
