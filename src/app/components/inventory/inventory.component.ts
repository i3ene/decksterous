import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {

  @Input() set userId(value: number) {
    this.loadItems(value);
  }

  items: any[] = new Array(14).fill({ name: "Item", description: "Description", image: "Image" });

  constructor(private request: RequestService) { }

  async loadItems(id: number) {
    const payload = await this.request.get(`/ITEMS?id=${id}`);
    this.items = payload.map((x: any) => x); // => new Object(x)
  }

}
