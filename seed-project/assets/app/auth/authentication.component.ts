import {Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'app-authentication',
    templateUrl:'./auth.component.html'
})
export class AuthenticationComponent {
    
   const userId=localStorage.getItem('userId');
   checkuser(){
       const userId=localStorage.getItem('userId');
       if(userId!=null || userId!=undefined){
         return false;
   }
   return true;
}
checksignin(){
    const userId=localStorage.getItem('userId');
    if(userId!=null || userId!=undefined){
        return true;
    }
    return false;
}