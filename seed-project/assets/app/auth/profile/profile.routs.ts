import {Routes} from "@angular/router";
import {FriendsListComponent} from "./friendslist.component";
import {AddFriendsComponent} from "./addfriends.component";

export const PROFILE_ROUTES:Routes=[
    {path:'',redirectTo: 'friendslist',pathMatch:'full'},
    {path:'friendslist',component:FriendsListComponent},
    {path:'addfriends',component:AddFriendsComponent},
    ];
    