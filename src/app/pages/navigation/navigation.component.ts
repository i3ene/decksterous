import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { MenuCategory } from 'src/app/models/object/menu.model';

@Component({
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationPage {
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
        { name: 'Lobbies', icon: 'list', link: ["/navigation/lobby"] },
      ],
    },
    {
      name: 'Profile',
      items: [
        { name: 'Stats', icon: 'leaderboard', link: [] },
        { name: 'Inventory', icon: 'category', link: ['/navigation/inventory'] },
        { name: 'Settings', icon: 'settings', link: [] },
      ],
    },
  ];

  constructor(private router: Router) {
    if (isDevMode())
      this.menuCategories.push({
        name: 'Development',
        items: [{ name: 'Test', icon: 'bug_report', link: ['/dev'] }],
      });
  }

  logout() {
    delete localStorage[Config.AuthToken];
    this.router.navigate(['/auth']);
  }

  profile() {
    this.router.navigate(['/navigation/profile']);
  }
}
