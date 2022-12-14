import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationPage } from './pages/navigation/navigation.component';
import { MaterialModule } from './modules/material.module';
import { LoginForm } from './pages/auth/forms/login-form/login-form.component';
import { AuthPage } from './pages/auth/auth.component';
import { RegisterForm } from './pages/auth/forms/register-form/register-form.component';
import { ResetForm } from './pages/auth/forms/reset-form/reset-form.component';
import { VisibilityButtonComponent } from './components/visibility-button/visibility-button.component';
import { FormCardTemplate } from './templates/form-card/form-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { REQUEST_CONFIG } from './config/request.config';
import { FormsModule } from '@angular/forms';
import { AboutPage } from './pages/about/about.component';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketConnection } from './services/request/socket.connection';
import { DevComponent } from './pages/dev/dev.component';
import { DevSocketComponent } from './pages/dev/socket/socket.component';
import { GamePage } from './pages/game/game.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DevUserComponent } from './pages/dev/user/user.component';
import { DevInventoryComponent } from './pages/dev/inventory/inventory.component';
import { FormTableTemplate } from './templates/form-table/form-table.component';
import { FormTableColumnTemplate } from './templates/form-table-column/form-table-column.component';
import { UserInventoryPage } from './pages/navigation/inventory/inventory.component';
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
import { FormSearchTemplate } from './templates/form-search/form-search.component';
import { DevCardDeckComponent } from './pages/dev/card-deck/card-deck.component';
import { DevDeckInventoryComponent } from './pages/dev/deck-inventory/deck-inventory.component';
import { DevUserInventoryComponent } from './pages/dev/user-inventory/user-inventory.component';
import { EditCardDeckDialogue } from './dialogues/edit-card-deck/edit-card-deck.component';
import { HomePage } from './pages/navigation/home/home.component';
import { LobbyPage } from './pages/navigation/lobby/lobby.component';
import { DevGameComponent } from './pages/dev/dev-game/dev-game.component';
import { NewLobbyDialogue } from './dialogues/new-lobby/new-lobby.component';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component';
import { LobbyActionsComponent } from './components/lobby-actions/lobby-actions.component';
import { LobbyRoomComponent } from './components/lobby-room/lobby-room.component';
import { LobbyGameComponent } from './components/lobby-game/lobby-game.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationPage,
    AuthPage,
    LoginForm,
    RegisterForm,
    ResetForm,
    VisibilityButtonComponent,
    FormCardTemplate,
    AboutPage,
    DevComponent,
    DevSocketComponent,
    GamePage,
    InventoryComponent,
    DevUserComponent,
    DevInventoryComponent,
    FormTableTemplate,
    FormTableColumnTemplate,
    UserInventoryPage,
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
    FriendListSearchComponent,
    FormSearchTemplate,
    DevCardDeckComponent,
    DevDeckInventoryComponent,
    DevUserInventoryComponent,
    EditCardDeckDialogue,
    HomePage,
    LobbyPage,
    DevGameComponent,
    NewLobbyDialogue,
    LobbyListComponent,
    LobbyActionsComponent,
    LobbyRoomComponent,
    LobbyGameComponent
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
