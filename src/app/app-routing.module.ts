import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ResetFormComponent } from './components/forms/reset-form/reset-form.component';

const routes: Routes = [
  { path: 'navigation', component: NavigationComponent },
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'reset', component: ResetFormComponent },
    { path: '**', redirectTo: 'login' }
  ] },
  { path: '**', redirectTo: 'navigation' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
