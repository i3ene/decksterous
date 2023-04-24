import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/object/menu.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage {

  items: (MenuItem & { title: string; })[] = [
    { name: "lobbies", link: ["/navigation/lobby"], icon: "list", title: "Lobbies" },
    { name: "ranking", link: ["/navigation/ranking"], icon: "leaderboard", title: "Ranking" },
    { name: "solo", link: ["/game"], icon: "style", title: "Solo" },
    { name: "profile", link: ["/navigation/profile"], icon: "person", title: "Profile" },
    { name: "inventory", link: ["/navigation/inventory"], icon: "category", title: "Inventory" }
  ];
}
