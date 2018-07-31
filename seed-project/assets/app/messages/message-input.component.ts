import {Component,Input,Output,EventEmitter,OnInit,ViewChild,ElementRef} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import {NgForm} from '@angular/forms';
@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
   
})
export class MessageInputComponent implements OnInit{
    message:Message;
    filedata:Any;
    files:Any[]=[];
    file:any;
    upload:any;
   
   
    constructor(private messageService:MessageService){
        
        
    }
    @ViewChild('uploader') uploader:ElementRef;
    
    onSubmit(form:NgForm){
        const userId=localStorage.getItem('userId');
        console.log("in submit method");
        if(this.message){
            this.files=uploader.files;
            if(this.files.length){
                console.log("has file");
                var i:number;
                for(var i=0;i<this.files.length;i++){
                    this.file=this.files[i];
                    console.log(this.file.name);
                }
                 this.uploader.nativeElement.value="";
                 
                 var formData=new FormData();
                 console.log(form.value.content);
                 formData.append('content',form.value.content);
                 formData.append('userfile',this.file,this.file.name);
                 formData.append('userId',this.message.userId);
                 formData.append('username'this.message.username);
                 var Id=this.message.messageId;
                 this.messageService.updatemessagewithfile(formData,Id).subscribe(
                     result=>{console.log(result);
                     this.message=result;
                         
                     });
                     form.resetForm();
            }else{
                console.log(form.value.content);
            this.message.content=form.value.content;
            this.message.userId=localStorage.getItem('userId');
           
            this.messageService.updatemessage(this.message).subscribe(
                result=>{console.log(result);
                    this.message=result;
                });
                form.resetForm();
            }    
        }else{
            console.log(form);
            const userId=localStorage.getItem('userId');
            this.files=uploader.files;
            if(this.files.length){
                var i:number;
                for(var i=0;i<this.files.length;i++){
                    this.file=this.files[i];
                    console.log(this.file.name);
                }
                
                this.uploader.nativeElement.value="";
            
        
            const message=new Message(form.value.content,userId);
             var formData = new FormData();
            formData.append('content',form.value.content);
            formData.append('userId',userId);
            formData.append('userfile',this.file,this.file.name);
            console.log(formData);
             console.log(form.value.content);
           // console.log(formData.message);
            this.messageService.addfile(formData).subscribe(response=>{
                console.log(response);
             //var filename=response.filename1;
             //var type=response.type1;
             //var message=new Message(form.value.content,userId,null,filename,type);
             // return this.addmessage(message);
            },error=>console.log(error));
            form.resetForm();
            } 
            else{
                console.log('am in last else without file');
                const userId=localStorage.getItem('userId');
               const message=new Message(form.value.content,userId) ;
               this.messageService.addmessage(message).subscribe(data=>console.log(data));
               form.resetForm();
            }
        }
        }
        addmessage(message){
            this.messageService.addmessage(message).subscribe(data=>console.log(data));
        }
        cancell(){
            console.log('cancel clicked');
            this.upload="";
            this.uploader="";
        }
        onClear(form:Ngform){
            console.log("on clear funtion provoked");
            form.resetForm();
            this.message=null;
        }
        onFileChange(event){
            console.log("am in filechange");
            const reader =new FileReader();
            if(event.target.files && event.target.files.length){
                const [file]=event.target.files;
                reader.readAsDataURL(file);
                reader.onload=()=>{
                    console.log("reading file data");
                    this.filedata=reader.result;
                    console.log(this.filedata);
                }
            }
        }
        ngOnInit(){
            this.messageService.messageIsEmitted.subscribe((message)=>this.message=message);
        }
   
   }
    
}