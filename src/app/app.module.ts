import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MaterialModule } from './modules/material.module';
import { LoginFormComponent } from './pages/auth/forms/login-form/login-form.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterFormComponent } from './pages/auth/forms/register-form/register-form.component';
import { ResetFormComponent } from './pages/auth/forms/reset-form/reset-form.component';
import { VisibilityButtonComponent } from './components/visibility-button/visibility-button.component';
import { FormCardComponent } from './templates/form-card/form-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { REQUEST_CONFIG } from './config/request.config';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketConnection } from './services/request/socket.connection';
import { DevComponent } from './pages/dev/dev.component';
import { DevSocketComponent } from './pages/dev/socket/socket.component';
import { GameComponent } from './pages/game/game.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DevUserComponent } from './pages/dev/user/user.component';
import { DevInventoryComponent } from './pages/dev/inventory/inventory.component';
import { FormTableComponent } from './templates/form-table/form-table.component';
import { FormTableColumnComponent } from './templates/form-table-column/form-table-column.component';
import { UserInventoryComponent } from './pages/navigation/inventory/inventory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ItemComponent } from './components/item/item.component';
import { DevCardComponent } from './pages/dev/card/card.component';
import { DevCardTypeComponent } from './pages/dev/card-type/card-type.component';
import { DevCardAbilityComponent } from './pages/dev/card-ability/card-ability.component';
import { DevItemComponent } from './pages/dev/item/item.component';
import { ProfileMenuItemComponent } from './components/profile-menu-item/profile-menu-item.component';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';
import { DevProfileComponent } from './pages/dev/profile/profile.component';
import { FriendMenuListComponent } from './components/friend-menu-list/friend-menu-list.component';
import { FriendListSearchComponent } from './components/friend-list-search/friend-list-search.component';

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
    AboutComponent,
    DevComponent,
    DevSocketComponent,
    GameComponent,
    InventoryComponent,
    DevUserComponent,
    DevInventoryComponent,
    FormTableComponent,
    FormTableColumnComponent,
    UserInventoryComponent,
    ProfileComponent,
    ItemComponent,
    DevItemComponent,
    DevCardComponent,
    DevCardTypeComponent,
    DevCardAbilityComponent,
    ProfileMenuItemComponent,
    ProfileAvatarComponent,
    FriendListComponent,
    ProfileItemComponent,
    DevProfileComponent,
    FriendMenuListComponent,
    FriendListSearchComponent
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
