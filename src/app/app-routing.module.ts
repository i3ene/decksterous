import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './pages/navigation/navigation.component';
import { AuthPage } from './pages/auth/auth.component';
import { LoginForm } from './pages/auth/forms/login-form/login-form.component';
import { RegisterForm } from './pages/auth/forms/register-form/register-form.component';
import { PasswordForm } from './pages/auth/forms/password-form/password-form.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AboutPage } from './pages/about/about.component';
import { DevComponent } from './pages/dev/dev.component';
import { GamePage } from './pages/game/game.component';
import { UserInventoryPage } from './pages/navigation/inventory/inventory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePage } from './pages/navigation/home/home.component';
import { LobbyPage } from './pages/navigation/lobby/lobby.component';
import { DefaultComponent } from './components/default/default.component';
import { EmailForm, EmailFormType } from './pages/auth/forms/email-form/email-form.component';

const routes: Routes = [
  { path: 'dev', component: DevComponent },
  { path: 'about', component: AboutPage, data: { animation: 'bottom' }  },
  {
    path: 'auth',
    component: AuthPage,
    children: [
      { path: 'login', component: LoginForm, data: { animation: 'left' } },
      { path: 'signup', component: EmailForm, data: { animation: 'right', type: EmailFormType.REGISTER } },
      { path: 'reset', component: EmailForm, data: { animation: 'right', type: EmailFormType.PASSWORD } },
      { path: EmailFormType.PASSWORD, component: PasswordForm, data: { animation: 'right' } },
      { path: EmailFormType.REGISTER, component: RegisterForm, data: { animation: 'right' } },
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
      { path: 'marketplace', component: DefaultComponent },
      { path: 'leaderboard', component: DefaultComponent },
      { path: 'settings', component: DefaultComponent },
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
