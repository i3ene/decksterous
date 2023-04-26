import { Component, isDevMode } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { slideInAnimation } from 'src/app/models/helper/animations';
import { MenuCategory } from 'src/app/models/object/menu.model';

@Component({
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [slideInAnimation]
})
export class NavigationPage {
  menuCategories: MenuCategory[] = [
    {
      name: 'Dashboard',
      items: [
        { name: 'Home', icon: 'home', link: ['/navigation/home'] },
        { name: 'Solo', icon: 'style', link: ['/navigation/solo'] },
      ],
    },
    {
      name: 'Community',
      items: [
        { name: 'Lobbies', icon: 'list', link: ["/navigation/lobby"] },
        { name: 'Marketplace', icon: 'storefront', link: ["/navigation/marketplace"] },
        { name: 'Ranking', icon: 'leaderboard', link: ["/navigation/leaderboard"] },
      ],
    },
    {
      name: 'General',
      items: [
        { name: 'Profile', icon: 'person', link: ['/navigation/profile'] },
        { name: 'Inventory', icon: 'category', link: ['/navigation/inventory'] },
        { name: 'Settings', icon: 'settings', link: ["/navigation/settings"] },
      ],
    },
  ];

  constructor(private router: Router, private contexts: ChildrenOutletContexts) {
    if (isDevMode())
      this.menuCategories.push({
        name: 'Development',
        items: [
          { name: 'Test', icon: 'bug_report', link: ['/dev'] },
          { name: 'Game', icon: 'sports_esports', link: ['/game'] }
        ],
      });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  logout() {
    delete localStorage[Config.AuthToken];
    this.router.navigate(['/auth']);
  }

  profile() {
    this.router.navigate(['/navigation/profile']);
  }
}
