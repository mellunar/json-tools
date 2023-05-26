import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from './toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<ToastMessage>();

  info(message: string, icon?: string) {
    this.createToast(message, 'neutral', icon);
  }

  success(message: string, icon?: string) {
    this.createToast(message, 'success', icon);
  }

  warning(message: string, icon?: string) {
    this.createToast(message, 'warning', icon);
  }

  error(message: string, icon?: string) {
    this.createToast(message, 'error', icon);
  }

  private createToast(message: string, type: ToastType, icon?: string) {
    icon = icon ? icon : this.getDefaultIcon(type);
    this.message.next({ message, type, icon });
  }

  private getDefaultIcon(type: ToastType) {
    switch (type) {
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert-triangle';
      case 'success':
        return 'check-circle';
      default:
        return 'info';
    }
  }
}
