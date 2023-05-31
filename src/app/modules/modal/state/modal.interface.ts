import { EventEmitter, Type } from '@angular/core';

export interface ModalType {
  dismiss?: EventEmitter<any>;
  [key: string]: any;
}

export class Modal implements ModalType {
  constructor(public component: Type<any>, public id?: number, public data?: any) {}
}
