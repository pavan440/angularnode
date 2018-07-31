import {Component,Input,Output,EventEmitter} from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from './auth.service';
import {User} from "./user.model";

@Component({
    selector: 'app-signin',
    templateUrl:'./sigin.component.html'
})
export class SigninComponent {
    myForm:FormGroup;
    constructor(private authService:AuthService,private router:Router){}
    onSubmit(){
        console.log(this.myForm);
         const user=new User(this.myForm.value.email,this.myForm.value.password);
            this.authService.signin(user).subscribe(
                (data)=>{
                    console.log(data);
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userId',data.userId);
                    this.router.navigateByUrl('/');
                },
                error=>console.log(error)
                );
            this.myForm.reset();
    }
    ngOnInit(){
        this.myForm=new FormGroup({
            password:new FormControl(null,Validators.required),
            email:new FormControl(null,Validators.required)
        
          });
    }  
   
}