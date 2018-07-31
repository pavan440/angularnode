import { Component, OnInit, OnDestroy } from '@angular/core';
import { Control }           from '@angular/common';
import { MessengerService }       from './messenger.service';
import {NgForm} from '@angular/forms';
import {chatuser} from './user';
import {Message} from './message';
import {PrivateMessage} from './privatemessage';
import {Router} from "@angular/router";

@Component({
  selector: 'chat',
  styleUrls:['./messenger-component.css'],
  templateUrl:'./messenger-component.html',
  providers: [MessengerService]
})
export class MessengerComponent implements OnInit, OnDestroy {
  messages:Message[];
  messagesqueue:Message[];
  messageslist:Message[];
  retrievemessages:Message[];
  currentstorage:Message[];
  clearMessages=[];
  messagesmap:Map<String,Array<Message>>;
  connection;
  formmessage;
  outputmessage;
  inputmessage:Message;
  receivedmessage:Message;
  Userlist=[];
  username;
  messageFrmAId=[];
  tempmessage:Message[];
  myname:string;
  userId:any;
  userme:any;
  privateMessage:PrivateMessage;
  unreadmessages:Map<String,Array<Message>>=new Map();
  disable:Boolean;
  constructor(private messengerService:MessengerService,private router:Router) {}

  ngOnInit() {
    this.userme= localStorage.getItem('userId');
    this.disable=true;
     this.messengerService.sendmessage();
     this.messengerService.getusername().subscribe(data=>{
       console.log(data);
       this.myname=data;
     })
     this.tempmessage=[];
     this.messages=[];
     console.log(this.messages);
     this.messagesmap=new Map();
     if(this.messengerService.isloginstatus){
         console.log('login');
         console.log('printing the login status');
         console.log(isloginstatus);
         this.router.navigateByUrl('auth/sigin');
       }
     this.messengerService.getUserlist().subscribe(data=>{
       console.log(data.length);
       //console.log(data[0]);
       var i=0;
       this.Userlist=[];
       while(i<data.length){
         //console.log(data[i]);
         this.Userlist.push(data[i]);
         this.messagesmap.set(data[i].id);
         i++
       }
       console.log("am printing Userlist");
      console.log(this.Userlist);
      console.log(this.messagesmap.keys());
     
      //console.log(data);
     });
     this.messengerService.getmessage().subscribe(data=>{
       if(data!=null){
         if(data.touserid==this.userme){
          if(data.fromuserid!==this.userId){
           if(this.unreadmessages.has(data.fromuserid)){
               this.tempmessage=[];
               this.messageslist=[];
          this.messageslist=this.unreadmessages.get(data.fromuserid);
          console.log(this.messageslist);
          console.log(this.messageslist.length);
          console.log(this.unreadmessages.get(data.fromuserid).length);
          //console.log(this.receivedmessage);
          var i:number;
          for(i=0;i<this.messageslist.length;i++){
              console.log(this.messageslist[i]);
              this.tempmessage.push(this.messageslist[i]);
          }
            
            this.receivedmessage=new Message(data.msg,data.fromusername);
            this.tempmessage.push(this.receivedmessage);
            console.log(this.tempmessage);
            this.unreadmessages.set(data.fromuserid,this.tempmessage);
            console.log(this.unreadmessages);
           // var arrlength=this.tempmessage.length;
            //this.tempmessage.splice(0,arrlength);
            //console.log("tempmesage after splice",this.tempmessage);
        }else{
            this.tempmessage=[];
        this.receivedmessage=new Message(data.msg,data.fromusername);
        console.log(this.receivedmessage);
        this.tempmessage.push(this.receivedmessage);
        console.log(this.tempmessage)
         this.unreadmessages.set(data.fromuserid,this.tempmessage);
         //var arrlength=this.tempmessage.length;
        //this.tempmessage.splice(0,arrlength);
        //console.log("tempmesage after splice",this.tempmessage);
        console.log(this.unreadmessages);}
        }else{
          this.receivedmessage=new Message(data.msg,data.fromusername);
          this.messages.push(this.receivedmessage);
          this.messagesmap.set(data.fromuserid,this.messages);
          console.log("messagesmap after pushng messages");
          console.log(this.messagesmap);
        }
        
     }
         
     });
     
  }
     
 
  
  onSubmit(form:NgForm){
    this.formmessage=form.value.outputmessage;
    console.log(this.formmessage);
    this.inputmessage=new Message(this.formmessage,'you');
    console.log(this.inputmessage);
    console.log(this.messages);
    this.messages.push(this.inputmessage);
  
    
    
   this.messagesmap.set(this.userId,this.messages);
    console.log(this.messagesmap);
    console.log(this.messages.length);
    console.log(this.messages);
    console.log(this.userId);
    console.log(this.username);
    this.privateMessage=new PrivateMessage(this.formmessage,this.username,this.userId,this.userme,this.myname);
    console.log('private message before sending');
    console.log(this.privateMessage);
    this.messengerService.sendprivatechat(this.privateMessage);
    form.resetForm();
  }
  onReceivingmessage(user){
    console.log("received user details from userlist component");
    this.disable=false;
    this.username=user.name;
    this.userId=user.id;
    console.log(this.userId);
    this.messages=[];
    this.messagesqueue=[];
    if(this.messagesmap.get(this.userId)){
      console.log("it has messages");
     //var tempmessge:Message[]=[];
    this.messagesqueue=this.messagesmap.get(this.userId);
    var i:number;
    for(i=0;i<this.messagesqueue.length,i++){
       this.messages.push(messagesqueue[i]); 
    } 
    console.log(this.messages);
    }
    
    if(this.unreadmessages.has(this.userId)){
      if(this.unreadmessages.get(this.userId)){
          console.log("you have unread messages");
          this.messagesqueue=[];
          this.messagesqueue=this.unreadmessages.get(this.userId);
          console.log(this.messagesqueue.length);
          var i:number;
        for(i=0;i<this.messagesqueue.length;i++){
            console.log(this.messagesqueue[i]);
       this.messages.push(this.messagesqueue[i]); 
        } 
        console.log(this.messages);
        this.messagesmap.set(this.userId,this.messages);
        
      }
      console.log(this.messages);
      this.unreadmessages.set(this.userId,this.clearMessages);
    }
    
  }
  isUserNamePresent():Boolean{
      if(this.username){
          return true;
      }
      return false;
  }
  isUserNameNotPresent():Boolean{
      if(this.username){
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
checksignout(){
    const userId=localStorage.getItem('userId');
    if(userId!=null || userId!=undefined){
        return false;
    }
    return true;
}
  
  ngOnDestroy() {
     // this.messengerService.getmessage.unsubscribe;
     // this.messengerService.getUserlist.unsubscribe();
    
  }