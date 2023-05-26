import { Component } from '@angular/core';
import { ToastMessage } from '../../state/toast.interface';
import { ToastService } from '../../state/toast.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.message.subscribe((toast) => {
      if (this.messages.length > 4) {
        this.messages.shift();
      }

      this.messages.push(toast);

      timer(10000).subscribe(() => {
        const index = this.messages.indexOf(toast);
        if (index > -1) {
          this.closeMessage(index);
        }
      });
    });
  }

  closeMessage(index: number) {
    this.messages.splice(index, 1);
  }
}
