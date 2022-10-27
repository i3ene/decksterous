import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ResetFormComponent } from './components/forms/reset-form/reset-form.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { DevComponent } from './pages/dev/dev.component';

const routes: Routes = [
  { path: 'dev', component: DevComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'reset', component: ResetFormComponent },
    { path: '**', redirectTo: 'login' }
  ] },
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'navigation' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
