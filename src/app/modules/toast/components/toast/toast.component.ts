import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastType } from '../../state/toast.interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() message: string;
  @Input() type: ToastType;
  @Input() icon: string;
  @Input() index: number;

  @Output() close = new EventEmitter();

  constructor() {}

  closeMessage() {
    this.close.emit();
  }
}
