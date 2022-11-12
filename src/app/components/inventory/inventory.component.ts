import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {

  @Input() set inventoryId(value: number) {
    if (!value) return;
    this.loadItems(value, false);
  }

  @Input() set userId(value: number) {
    if (!value) return;
    this.loadItems(value, true);
  }

  items: any[] = new Array(14).fill({ name: "Item", description: "Description", image: "Image" });

  constructor(private request: RequestService) { }

  async loadItems(id: number, user?: boolean) {
    const payload = await this.request.get(`/inventory?${user ? 'userId' : 'id'}=${id}`);
    if (!payload || !payload.items) this.items = [];
    else this.items = payload.items.map((x: any) => x); // => new Object(x)
  }

}
