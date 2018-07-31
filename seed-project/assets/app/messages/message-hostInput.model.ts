import{Message,} from './messsage.model';
import {ViewContainerRef} from '@angular/core';
export class MessageHostInput{
    component:string;
    message:Message;
    viewcontainerarray:ViewContainerRef[]=[];
    constructor(component,message,viewcontainerarray){
        this.component=component;
        this.message=message;
        this.viewcontainerarray=viewcontainerarray;
    }
}