import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemAny } from 'src/app/models/data/item.model';
import { Marketplace, _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.scss']
})
export class SellItemDialogue {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: _Object<ItemAny>,
    public ref: MatDialogRef<SellItemDialogue>) {
      data.marketplace = new Marketplace(data);
    }

}
