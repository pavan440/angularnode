import {Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import * as socketIo from "socket.io-client";
import privatemessage from './PrivateMessage';
@Injectable()
export class MessengerService{
    
    private socket;
    private link:String="https://nodechat1-pavan91.c9users.io:8080/";
    privatemessage:PrivateMessage;
    loginstaus:any;
    
    private sendmessage(){
        this.socket=socketIo(this.link);
        const userId=localStorage.getItem('userId');
        console.log('te value of userid is ',userId);
       this.socket.emit('UserId',userId);
       
      // this.loginstatus=true;
       this.socket.on("Error_Login",(data)=>{
           console.log(data);
           this.loginstatus=true;
       });
       console.log("emitting data");
       this.socket.on("updateuserlist",(data)=>
       {
           console.log(this.userId);
           this.socket.emit('sentupdateduserlist',localStorage.getItem('userId'));
       });
        
    }
    private getusername():Observable<Any>{
        return new Observable<Any>(observer=>{
           this.socket.on('Username',(data)=>{
             return observer.next(data);  
           });
        });
    }
    private sendprivatechat(privateMessage){
        this.privateMessage=privateMessage;
        console.log("emitting privatemessage");
        this.socket.emit('privatechat',JSON.stringify(privateMessage));
        
    }
    private getmessage():Observable<Any>{
        return new Observable<Any>(observer => {
            this.socket.on('privatemessage', (data) =>{ 
                console.log(data);
                //result=data.json();
                //console.log(result);
                console.log(data.touserid);
               return observer.next(data)});
        });
        
        
    }
    private getUserlist():Observable<Any>{
        return new Observable<Any>(observer => {
            this.socket.on('updateUserlist', (data) =>{ 
                console.log(data);
               return observer.next(data)});
        });
        
    }
}