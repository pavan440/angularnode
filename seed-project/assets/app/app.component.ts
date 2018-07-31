import { Component } from '@angular/core';
import {Message} from './messages/message.model';
import {MessageService} from './messages/message.service';
import {MessengerService} from './messenger/messenger.service'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[MessageService,MessengerService]
})
export class AppComponent {
    
   
    
}