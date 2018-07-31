import {Component,Input,Output,EventEmitter} from '@angular/core';
import {Message} from './message.model';
@Component({
    selector: 'app-messages',
    templateUrl:'./messages.component.html'
})
export class MessagesComponent {
    
   checksignin(){
    const userId=localStorage.getItem('userId');
    if(userId!=null || userId!=undefined){
        return true;
    }
    return false;
}
checksignout(){
    const userId=localStorage.getItem('userId');
    if(userId!=null || userId!=undefined){
        return false;
    }
    return true;
}
}