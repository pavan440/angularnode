import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from "./app.component";
import {MessageComponent} from  "./messages/message.component";
import {MessageListComponent} from  "./messages/message-list.component";
import {MessageInputComponent} from  "./messages/message-input.component";
import {MessagesComponent} from  "./messages/messages.component";
import {MessageHostComponent} from "./messages/message-host.component.ts";
import {SignupComponent} from  "./auth/signup.component";
import {SigninComponent} from  "./auth/signin.component";
import {LogoutComponent} from  "./auth/logout.component";
import {AuthService} from './auth/auth.service';
import {AuthenticationComponent} from  "./auth/authentication.component";
import {ProfileComponent} from './auth/profile/profile.component';
import {FriendsListComponent} from './auth/profile/friendslist.component';
import {AddFriendsComponent} from './auth/profile/addfriends.component';
import {HeaderComponent} from  "./header.component";
import {MsgDirective} from "./messages/message-host.directive";
import {routing} from  "./app.routing";
import {MessengerComponent} from "./messenger/mesenger-component";
import {UserListComponent} from "./messenger/userlist/userlist-component";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import {FileSelectDirective,FileDropDirective} from 'ng2-file-upload';
const config: SocketIoConfig = { url: 'https://nodechat1-pavan91.c9users.io:8080/', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        MessageHostComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        MsgDirective,
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        AuthenticationComponent,
        ProfileComponent,
        FriendsListComponent,
        AddFriendsComponent
        HeaderComponent,
        MessengerComponent,
        UserListComponent,
        FileSelectDirective,
        FileDropDirective
        
    ],
    entryComponents[
        MessageListComponent
        ],
    imports: [BrowserModule,FormsModule,routing,ReactiveFormsModule,HttpModule,SocketIoModule.forRoot(config)],
    providers:[AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}