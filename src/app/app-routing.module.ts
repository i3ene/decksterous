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

const routes: Routes = [
  { path: 'dev', component: DevComponent },
  { path: 'about', component: AboutPage },
  {
    path: 'auth',
    component: AuthPage,
    children: [
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterForm },
      { path: 'reset', component: ResetForm },
      { path: '**', redirectTo: 'login' },
    ],
  },
  {
    path: 'navigation',
    component: NavigationPage,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: 'lobby', component: LobbyPage },
      { path: 'inventory', component: UserInventoryPage },
      { path: 'profile', component: ProfileComponent },
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
