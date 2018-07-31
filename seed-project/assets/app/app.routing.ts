import { RouterModule, Routes } from '@angular/router';
import {MessagesComponent} from  './messages/messages.component';
import {AuthenticationComponent} from  './auth/authentication.component';
import {AUTH_ROUTES} from './auth/auth.routs';
import{SignupComponent} from './auth/signup.component';
import {MessengerComponent} from './messenger/mesenger-component';

const App_Routes:Routes=[
    {path:'',redirectTo:'/messages',pathMatch:'full'},
    {path: 'messages', component: MessagesComponent },
    {path:'auth',component: AuthenticationComponent,children:AUTH_ROUTES }
    {path:'auth/signup',component:SignupComponent},
    {path:'messenger',component:MessengerComponent}
    ];
    
    
export const routing=RouterModule.forRoot(App_Routes);