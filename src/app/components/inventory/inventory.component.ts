import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent implements OnInit {

  items: any[] = [];

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    const payload = await this.request.get("/ITEMS");
    this.items = payload.map((x: any) => x); // => new Object(x)
  }

}
