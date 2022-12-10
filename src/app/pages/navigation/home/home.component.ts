import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/object/menu.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage {

  items: MenuItem[] = [
    { name: "lobbies", link: ["/navigation/lobby"], icon: "list" },
    { name: "ranking", link: ["/navigation/ranking"], icon: "leaderboard" },
    { name: "solo", link: ["/game"], icon: "style" },
    { name: "profile", link: ["/navigation/profile"], icon: "person" },
    { name: "inventory", link: ["/navigation/inventory"], icon: "category" }
  ];
}
