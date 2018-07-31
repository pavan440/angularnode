import {Http} from '@angular/http';
import {EventEmitter} from '@angular/core';
import{Injectable} from '@angular/core';
import {User} from './user.model';
import 'rxjs/Rx';
import {Observable} from "rxjs";
@Injectable()
export class AuthService{
    
    
    constructor(private http:Http){
        
    }
    signup(user:User){
        const headers =new Headers({'Content-Type':'application/json'});
        console.log(user);
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user', user, {headers:headers})
         .map((response:Response)=> {
               const result =response.json();
            })
        .catch((error:Response)=>Observable.throw(error));
        
    }
    signin(user:User){
        const headers =new Headers({'Content-Type':'application/json'});
        console.log(user);
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user/sigin', user, {headers:headers})
         .map((response:Response)=> {
               const data =response.json();
               console.log(data);
               return data;
            })
        .catch((error:Response)=>Observable.throw(error));
        
    }
    getuserfriends(userId){
        console.log("am inside authservice add friends method");
        const headers =new Headers({'Content-Type':'application/json'});
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user/friendslist', {id:userId}, {headers:headers})
        .map((response:Response)=> {
               const data =response.json();
               console.log(data);
               return data;
            })
        .catch((error:Response)=>Observable.throw(error));
    }
    addfriends(userId:Any){
        console.log("am inside authservice add friends method");
        const headers =new Headers({'Content-Type':'application/json'});
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user/addfriends', {userId}, {headers:headers})
        .map((response:Response)=> {
               const data =response.json();
               console.log(data);
               return data;
            })
        .catch((error:Response)=>Observable.throw(error));
    }
    sentfriendrequest(fromId:Any,toId:Any){
        const headers =new Headers({'Content-Type':'application/json'});
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user/addfriends/sentfriendrequest',{fromId:fromId,toId:toId})
        .map((response:Response)=>{
            console.log(response);
            const data=response.json();
            return data;
            console.log(this.data);
        }).catch((error:Response)=>Observable.throw(error));
    }
    confrimfriendrequest(fromId:Any,toId:Any){
        const headers =new Headers({'Content-Type':'application/json'});
        return this.http.post('https://nodechat1-pavan91.c9users.io:8080/user/addfriends/confirmfriendsrequest',{fromId:fromId,toId:toId})
        .map((response:Response)=>{
            const data=response.json();
            return data;
        }).catch((error:Response)=>Observable.throw(error));
    }
    logout(){
        localStorage.clear();
    }
}