export class Message{
    content:string;
    username:string;  
    messageId:number;
    userId:string;
    file:File;
    
    constructor(content:string,userId?:string,messageId?:number,username?:string,file?:string,type?:string){
        this.content=content;
        this.userId=userId;
        this.messageId=messageId;
        this.username=username;
        this.file=file;
        this.type=type;
        
        
    }
}