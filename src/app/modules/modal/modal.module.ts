import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';

@NgModule({
  declarations: [ModalComponent, ModalContainerComponent],
  imports: [CommonModule, FeatherIconsModule],
  exports: [ModalContainerComponent],
})
export class ModalModule {}
