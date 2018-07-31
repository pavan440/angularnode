import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import {AuthService} from './auth.service';
import {User} from "./user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl:'./signup.component.html'
})
export class SignupComponent implements OnInit {
   
    myForm:FormGroup;
    constructor(private authService:AuthService,private router:Router){
        
        
    }
    ngOnInit(){
        this.myForm=new FormGroup({
            firstName:new FormControl(null,Validators.required),
            lastName:new FormControl(null,Validators.required),
            password:new FormControl(null,Validators.required),
            email:new FormControl(null,Validators.required),
        })
        
    }
        
        onSubmit(){
            console.log(this.myForm);
            console.log(this.myForm.value.firstName);
           const user=new User(this.myForm.value.email,this.myForm.value.password,this.myForm.value.firstName,this.myForm.value.lastName);
            this.authService.signup(user).subscribe((result)=>{console.log(result);
            this.router.navigateByUrl('auth/signin');
            });
            this.myForm.reset();
        }
    
   
}