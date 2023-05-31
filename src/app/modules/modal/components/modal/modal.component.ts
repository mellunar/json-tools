import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Modal, ModalType } from '../../state/modal.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy, ModalType {
  @ViewChild('modalHost', { read: ViewContainerRef }) modalHost: ViewContainerRef;

  @Input() modal: Modal;

  @Output() dismiss = new EventEmitter<any>();

  dismissSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setModal();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.dismissSubscription) {
      this.dismissSubscription.unsubscribe();
    }
  }

  callDismiss(data?: any) {
    this.dismiss.emit(data);
  }

  setModal() {
    this.modalHost.clear();

    const componentRef = this.modalHost.createComponent(this.modal.component);
    const { data } = this.modal;

    if (data) {
      componentRef.instance.data = data;
    }

    const { dismiss } = componentRef.instance;

    if (dismiss) {
      this.dismissSubscription = dismiss.subscribe((data: any) => {
        this.callDismiss(data);
      });
    }
  }
}
