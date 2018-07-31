import {Routes} from "@angular/router";
import {PROFILE_ROUTES} from './profile/profile.routs';
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {LogoutComponent} from "./logout.component";
import {ProfileComponent} from "./profile/profile.component";
export const AUTH_ROUTES:Routes=[
    //{path:'',redirectTo: 'signup',pathMatch:'full'},
    {path:'signup',component:SignupComponent},
    {path:'signin',component:SigninComponent},
    {path:'logout',component:LogoutComponent},
    {path:'profile',component:ProfileComponent,children:PROFILE_ROUTES},
    
    ];
    
