import{MsgDirective} from './message-host.directive.ts';
import {Component, NgModule,Injector, ComponentFactoryResolver, TemplateRef, ViewChild, ViewContainerRef,Input} from '@angular/core';
import {MessageHostInput} from './message-hostInput.model';
import {MessageListComponent} from './message-list.component';
@Component({
  selector:'msg-host',
  directives: [MsgDirective],
  template: 
            `
            <div class="msg-host">
              <ng-template ad-host></ng-template>
            </div>
          `
})
export class MessageHostComponent implements OnInit, OnDestroy {
      
      
      viewContainerRef:any;
      //@Input('msg') msg:MessageHostInput;
      @ViewChild(MsgDirective) adHost: MsgDirective;
      constructor(private componentFactoryResolver:ComponentFactoryResolver) { }
      
      ngOnInit(){
        this.loadcomponent();
      }
     
      loadcomponent(){
         
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageListComponent);
        this.viewContainerRef = this.adHost.viewContainerRef;
        this.viewContainerRef.clear();
        //viewcontainerarray.push(this.viewContainerRef);
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        //(<MessageComponent>componentRef.instance).message = this.msg.message;
       // (<MessageComponent>componentRef.instance)._ref = viewContainerRef;
        
        console.log(this.viewContainerRef.length);
        console.log(this.viewContainerRef);
          }
          

        ngOnDestroy(){
          this.viewContainerRef.clear();
          }
        
      }
    
}