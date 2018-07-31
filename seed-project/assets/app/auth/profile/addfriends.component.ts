import {Component,Input,Output,EventEmitter,ViewChild,ElementRef,ChangeDetectorRef} from '@angular/core';
import {AuthService} from '.././auth.service';

@Component({
    selector: 'app-addfriends',
    templateUrl:'./addfriends.component.html'
})
export class AddFriendsComponent {
    friendlist:Any=[];
    
    constructor(private authService:AuthService,private ref: ChangeDetectorRef){}
   // @ViewChild('addfriend') addfriendbutton:ElementRef;
    
   ngOnInit(){
   
      if(localStorage.getItem('userId')){
          const userId=localStorage.getItem('userId');
          console.log(userId);
          this.authService.addfriends(userId).subscribe((result)=>{console.log(result);
              this.friendlist=result.addfriendslist;
              
          });
          
      }
      console.log(this.friendlist);
   }
   sentfriendrequest(toId){
       console.log(toId)
       console.log('in sentfunction');
       const userId=localStorage.getItem('userId');
       this.authService.sentfriendrequest(userId,toId).subscribe((result)=>{
           console.log(result);
         var i:number;
         var id:number;
         var toid:number=toId;
         console.log(toid);
       for(i=0;i<this.friendlist.length;i++){
           id=this.friendlist[i].id
           console.log(id);
           
           //console.log(id,toid);
           console.log((id==toid));
           if(id==toid){
              this.friendlist[i].sentrequest='pending';
           }
          
       }
       //this.ref.markForCheck();
       //this.addfriendbutton.nativeElement.outerHTML="<p>Request Pending</P>";
       console.log(this.friendlist);
       
   });
   }
   checkstatus(requestStatus){
       if(requestStatus=='pending'){
           return true;
       }
       else{
       return false;
       }
   }
   checksentstatusbutton(sentStatus,requestStatus){
       if(sentStatus=='pending'){
           return false;
       }
       if(requestStatus=='pending'){
           return false; 
       }
       if(requestStatus=='done'){
           return false;
       }
       return true;
   }
   checksentstatus(sentStatus){
       if(sentStatus=='pending'){
           return true;
       }
       else{
           return false;
       }
       
   }
   updateconfirmfriend(requestStatus){
       if(requestStatus=='done'){
           return true;
       }return false
       
   }
   confrimfriendrequest(toId){
       const userId=localStorage.getItem('userId');
       this.authService.confrimfriendrequest(userId,toId).subscribe((result)=>{
           console.log(result);
            var i:number;
         var id:number;
         var toid:number=toId;
         console.log(toid);
       for(i=0;i<this.friendlist.length;i++){
           id=this.friendlist[i].id
           console.log(id);
           
           //console.log(id,toid);
           console.log((id==toid));
           if(id==toid){
              this.friendlist[i].receivedrequest='done';
           }
          
       }
       });
   }
   
   
   
}