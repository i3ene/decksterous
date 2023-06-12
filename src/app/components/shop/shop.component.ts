import { Component, OnInit } from '@angular/core';
import { ItemAny } from 'src/app/models/data/item.model';
import { _Object } from 'src/app/models/data/object.model';
import { ModelUtils } from 'src/app/utils/model.util';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  objects: _Object<ItemAny>[] = ModelUtils.parseArray(_Object, new Array(5).fill({ item: { name: "Event Item" } }));

  constructor() { }

  ngOnInit(): void {
  }

}
