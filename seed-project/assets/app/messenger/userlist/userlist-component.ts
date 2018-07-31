import { Component, OnInit, OnDestroy,Input,Output,EventEmitter} from '@angular/core';
import { Control }   from '@angular/common';
import { MessengerService } from '../messenger.service';
import {Message} from '../message';
@Component({
  selector: 'userlist',
  styleUrls:['./userlist-component.css'],
  templateUrl:'./userlist-component.html',
  providers: [MessengerService]
})
export class UserListComponent implements OnInit, OnDestroy {
    @Input('userlist') userlistchild:[];
    @Input('unreadmessages') unreadmessages:Map<String,Array<Message>>;
    @Output() sendinguser=new EventEmitter<boolean>();
    unread:number;
    ngOnInit(){
        console.log(this.unreadmessages);
    }
    sendtouser(user) {
        console.log("sending user details to messenger");
    this.sendinguser.emit(user);
  }
  checkunreadmessages(id){
      console.log("checking userid");
      if(this.unreadmessages.has(id)){
          this.unread=this.unreadmessages.get(id).length;
          return true;
          
      }
      return false;
  }
  checkonline(Status){
      console.log(Status);
      if(Status=="login"){
        return  true;
      }
      return false;
  }
  checkoffline(Status){
      if(Status=="logout"){
          return true;
      }
      return false;
  }
  color(user){
      let styles={};
      styles.color='green';
      return styles;
  }
   }