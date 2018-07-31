import {Component,Input,Output,EventEmitter} from '@angular/core';
import {AuthService} from '.././auth.service';

@Component({
    selector: 'app-friendslist',
    templateUrl:'./friendslist.component.html'
})
export class FriendsListComponent {
    constructor(private authService:AuthService){}
   friendlist:Any=[];
  ngOnInit(){
   
      if(localStorage.getItem('userId')){
          const userId=localStorage.getItem('userId');
          console.log(userId);
          this.authService.getuserfriends(userId).subscribe((result)=>{
              console.log(result);
              this.friendlist=result.friendslist;
              console.log(this.friendlist);
              
          });
          
      }
}