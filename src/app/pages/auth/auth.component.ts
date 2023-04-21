import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/app/models/helper/animations';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [slideInAnimation]
})
export class AuthPage {
  
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
