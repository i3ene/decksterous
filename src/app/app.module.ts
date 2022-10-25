import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MaterialModule } from './modules/material.module';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ResetFormComponent } from './components/forms/reset-form/reset-form.component';
import { VisibilityButtonComponent } from './components/forms/utils/visibility-button/visibility-button.component';
import { FormCardComponent } from './templates/form-card/form-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { REQUEST_CONFIG } from './config/request.config';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketConnection } from './services/request/socket.connection';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ResetFormComponent,
    VisibilityButtonComponent,
    FormCardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: REQUEST_CONFIG, useValue: { url: "/api" } },
    SocketConnection
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
