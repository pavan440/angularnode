import {Component,Input,Output,EventEmitter,ViewContainerRef} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import{}
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent {
   // @Input() _ref:ViewContainerRef;   
   imagepath:string;
   file:string
   
  @Input() message:Message;
   constructor(private messageService:MessageService){
        
        
    }
    ngOnInit(){
       console.log("am printing init ");
       //console.log(this._ref);
       
    }

   onEdit(){
       console.log("edit clicked");
       this.messageService.editMessage(this.message);
        this.messageService.messageIsEditted.subscribe((message)=>this.message=message);
       console.log("editcliced");
   }
   onDelete(){
       console.log("edit clicked");
       this.messageService.deletemessage(this.message).subscribe(result=>console.log(result));
       console.log("message deleted");
   }
   checkimage():Boolean{
       //console.log("checkimage condition");
      // console.log(this.message.file);
      console.log(this.message.content);
      console.log(this.message.file);
       if(this.message.file!==null){
           this.file1=this.message.file;
           this.imagepath="https://s3.amazonaws.com/mediamedia449/"+this.file1;
          // console.log(this.imagepath);
           return true;
           
       }
       return false;
   }
   checkuser():Boolean{
       const userId=localStorage.getItem('userId');
       if(this.message.userId==userId){
           return true ;
       }
       return false;
   }
    ngOnDestroy(){
        this.message=null;
        
       // this._ref.clear();
  
    }
    
}