import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class MsgDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}