import {Http} from '@angular/http';
import {EventEmitter} from '@angular/core';
import{Injectable} from '@angular/core';
import {Message} from './message.model';
import 'rxjs/Rx';
import {Observable} from "rxjs";
@Injectable()
export class MessageService{
    
    private messages:Message[]=[];
    private transformedmessages:Message[]=[];
    messageIsEditted=new EventEmitter<any>();
    messageIsadded=new EventEmitter<any>();
    messageIsEmitted=new EventEmitter<any>();
    messageIsdeleted=new EventEmitter<any>();
    constructor(private http:Http){
        
    }
    addfile(formdata:FormData){
        const headers=new Headers({'Content-Type':'application/json'});
        console.log(formdata.content);
        console.log(formdata.userId);
       return this.http.post('https://nodechat1-pavan91.c9users.io:8080/message/savefile',formdata,{headers:headers}).map((response:Response)=>{
                   //console.log(response);
                    console.log(response);
            const result =response.json();
            console.log(result);
            let message=result;
                 var message=response.result;
                 let message1 =new Message(message.result.content,message.result.userId,message.result.id,message.result.username,message.result.filename,message.result.type);
                 this.messages.push(message1);
                 this.messageIsadded.emit(this.message1);
             return message1;
        }).catch((error:Response)=>{
            Observable.throw(error);
        });
    }
    addmessage(message){
        

         const headers =new Headers({'Content-Type':'application/json'});
         console.log(message);
         return this.http.post('https://nodechat1-pavan91.c9users.io:8080/message/',{content:message.content,userId:message.userId},{headers:headers})
             .map((response:Response)=>{
                  console.log(response);
                const result =response.json();
                console.log(result);
                let message=result;
                 let message1 =new Message(message.result.content,message.result.userId,message.result.id,message.result.username,message.result.filename,message.result.type);
                console.log(message1);
                 //this.messages.push(message1);
                 this.messageIsadded.emit(message1);
             return message1;
             //this.messages.push(message);
         }).catch((error:Response)=>Observable.throw(error));
        
    
    }
    getMessage(){
        console.log("inside getmessagesrvice");
        const userId=localStorage.getItem('userId');
      return this.http.get('https://nodechat1-pavan91.c9users.io:8080/message/'+userId)
      .map((response:Response)=>{
          
            if(response.obj=='null'){
                return this.messages=[];
            }
          
          
          const messages=response.json().obj ;
          console.log(messages);
           this.transformedmessages=[];
           if(messages){
           for(let message of messages){
              console.log("inside for loop");
              console.log(message);
              let message1 =new Message(message.content,message.userId,message.id,message.username,message.filename,message.type);
              console.log(message1);
              
              this.transformedmessages.push(message1);
              
           }
           }
           //console.log(this.transformedmessages);
           this.messages=this.transformedmessages;
           return this.messages;
            
      }).catch((error:any)=>{
          console.log("an error occured");
          console.log(error);
         // return Observable.of(error:true);
      });
    }
    errorHandler(error: any): Any {
        console.log("am in error handler");
    console.log(error)
    return Observable.of(error);
  }
    editMessage(message:Message){
        this.messageIsEmitted.emit(message);
        
    }
    updatemessage(message:Message){
       const headers =new Headers({'Content-Type':'application/json'});
        return this.http.patch('https://nodechat1-pavan91.c9users.io:8080/message/'+message.messageId, message, {headers:headers})
         .map((response:Response)=> {
            console.log(response);
            const result =response.json();
            console.log(result);
            let message=result;
            let message1=new Message(message.result.content,message.result.userId,message.result.id,message.result.username,message.result.filename,message.result.type);
            this.messageIsEditted.emit(message1);
            return message1;
            console.log("result");
            console.log(result);
            
        })
        .catch((error:Response)=>Observable.throw(error));      
        
    }
    updatemessagewithfile(formData:FormData,Id){
        console.log("updatemessagewithfile");
        const headers =new Headers({'Content-Type':'application/json'});
        return this.http.patch('https://nodechat1-pavan91.c9users.io:8080/message/withfile/'+Id,formData, {headers:headers})
         .map((response:Response)=> {
            console.log(response);
            const result=response.json();
            console.log(result);
            console.log(result.id);
            console.log(result.content);
            let message=result;
            
            console.log
            let message1=new Message(message.result.content,message.result.userId,message.result.id,message.result.username,message.result.filename,message.result.type);
            console.log(message1);
            this.messageIsEditted.emit(message1);
            return message1;
            console.log("result");
            console.log(result);
            
        })
        .catch((error:Response)=>Observable.throw(error)); 
    }
    deletemessage(message:Message){
        this.messages.splice(this.messages.indexOf(message),1);
        this.messageIsdeleted.emit(message);
        return this.http.delete('https://nodechat1-pavan91.c9users.io:8080/message/'+message.messageId)
         .map((response:Response)=> {
            const result =response.json();
                console.log(result);
                let message=result;
                 let message1 =new Message(message.result.content,message.result.userId,message.result.id,message.result.username,message.result.filename,message.result.type);
                console.log(message1);
             this.messageIsdeleted.emit(message1);
            return result;
            
            
        })
        .catch((error:Response)=>Observable.throw(error));  
    }
}