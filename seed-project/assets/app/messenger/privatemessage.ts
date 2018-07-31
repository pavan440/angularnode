export class PrivateMessage{
    msg:string;
    touserid:number;
    tousername:String;
    fromuserid:number;
    fromusername:string;
    constructor(msg,tousername,touserid,fromuserid,fromusername){
        
        this.msg=msg;
        this.tousername=tousername;
        this.touserid=touserid;
        this.fromuserid=fromuserid
        this.fromusername=fromusername;
    }
}