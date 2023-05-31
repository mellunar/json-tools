import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-save-options',
  templateUrl: './save-options.modal.html',
  styleUrls: ['./save-options.modal.scss'],
})
export class SaveOptionsModal {
  @Output() dismiss = new EventEmitter();

  callDismiss() {
    this.dismiss.emit();
  }
}
