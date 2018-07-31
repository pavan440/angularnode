import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import {MessageHostInput} from './message-hostInput.model';
@Component({
    selector: 'app-message-list',
    templateUrl:'./message-list.component.html',
    
})
export class MessageListComponent {
    subscribtion:any;
   messages:Message[]=[];
   messagesHostInput:MessageHostInput[]=[];
    constructor(private messageService:MessageService){
        
        }
        ngOnInit(){
            this.messages=[];
            
             this.messageService.messageIsadded.subscribe((message)=>{
                 //console.log(message);
                 this.messages.push(message)});
                 this.messageService.messageIsdeleted.subscribe((message)=>{
                     var i:number;
                     console.log(message);
                     var message1:Message;
                     console.log(message.messageId);
                     for(i=0;i<this.messages.length;i++){
                         message1=this.messages[i];
                         console.log(message1.messageId);
                         if(message1.messageId==message.messageId)
                         this.messages.splice(i,1);
                     }
                 });
        this.subscribtion=this.messageService.getMessage().subscribe(
            messagesarray=>{this.messages=[];
            console.log(this.messages);
            var i:number;
            if(messagesarray=='null'){
                this.messages=[]
            }
            for(i=0;i<messagesarray.length;i++){
                this.messages.push(messagesarray[i]);
            }
            console.log(this.messages);
               // this.messages=messages;
                /*var i:number;
                for(i=0;i<messages.length;i++){
                    this.messagesHostInput.push(new MessageHostInput('MessageComponent',this.messages[i],null));
                }*/
            });
        console.log("after get message");
        }
        ngOnDestroy(){
            console.log("calling destroy");
            this.messages=[];
            //this.subscribtion.unsubscribe();
        }
}