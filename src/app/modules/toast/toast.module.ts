import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { ToastComponent } from './components/toast/toast.component';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';

@NgModule({
  declarations: [ToastContainerComponent, ToastComponent],
  imports: [CommonModule, FeatherIconsModule],
  exports: [ToastContainerComponent, ToastComponent],
})
export class ToastModule {}
