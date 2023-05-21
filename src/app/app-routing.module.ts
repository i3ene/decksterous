import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './pages/navigation/navigation.component';
import { AuthPage } from './pages/auth/auth.component';
import { LoginForm } from './pages/auth/forms/login-form/login-form.component';
import { RegisterForm } from './pages/auth/forms/register-form/register-form.component';
import { ResetForm } from './pages/auth/forms/reset-form/reset-form.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AboutPage } from './pages/about/about.component';
import { DevComponent } from './pages/dev/dev.component';
import { GamePage } from './pages/game/game.component';
import { UserInventoryPage } from './pages/navigation/inventory/inventory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePage } from './pages/navigation/home/home.component';
import { LobbyPage } from './pages/navigation/lobby/lobby.component';
import { DefaultComponent } from './components/default/default.component';
import { MarketplacePage } from './pages/navigation/marketplace/marketplace.component';
import { SettingsComponent } from './pages/navigation/settings/settings.component';

const routes: Routes = [
  { path: 'dev', component: DevComponent },
  { path: 'about', component: AboutPage, data: { animation: 'bottom' }  },
  {
    path: 'auth',
    component: AuthPage,
    children: [
      { path: 'login', component: LoginForm, data: { animation: 'left' } },
      { path: 'register', component: RegisterForm, data: { animation: 'right' } },
      { path: 'reset', component: ResetForm, data: { animation: 'right' } },
      { path: '**', redirectTo: 'login' },
    ]
  },
  {
    path: 'navigation',
    component: NavigationPage,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomePage, data: { animation: 'bottom' } },
      { path: 'lobby', component: LobbyPage, data: { animation: 'left' } },
      { path: 'inventory', component: UserInventoryPage, data: { animation: 'right' } },
      { path: 'profile', component: ProfileComponent, data: { animation: 'top' } },
      { path: 'solo', component: DefaultComponent },
      { path: 'marketplace', component: MarketplacePage, data: { animation: 'left' } },
      { path: 'leaderboard', component: DefaultComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: 'game', component: GamePage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'navigation' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
