import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { CardDeckDialogue } from 'src/app/dialogues/card-deck/card-deck.component';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class UserInventoryPage implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

  id!: number;

  constructor(private token: TokenService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.id = data.id;
  }

  createDeck() {
    this.dialog.open(CardDeckDialogue, {
      data: {
        items: this.inventory.items
      },
    });
  }
}
