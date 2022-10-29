import { Component, isDevMode } from '@angular/core';
import { MenuCategory } from 'src/app/models/menu.model';

@Component({
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  menuCategories: MenuCategory[] = [
    {
      name: 'Dashboard',
      items: [
        { name: 'Home', icon: 'home', link: ['/navigation/home'] },
        { name: 'Game', icon: 'style', link: ['/game'] },
      ],
    },
    {
      name: 'Community',
      items: [
        { name: 'Marketplace', icon: 'storefront', link: [] },
        { name: 'Lobbies', icon: 'list', link: [] },
      ],
    },
    {
      name: 'Profile',
      items: [
        { name: 'Stats', icon: 'query_stats', link: [] },
        { name: 'Inventory', icon: 'inventory_2', link: [] },
        { name: 'Settings', icon: 'settings', link: [] },
      ],
    },
  ];

  constructor() {
    if (isDevMode()) this.menuCategories.push({
      name: 'Development',
      items: [{ name: 'Test', icon: 'bug_report', link: ['/dev'] }],
    });
  }
}
