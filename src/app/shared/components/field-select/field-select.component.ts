import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';
import { timer } from 'rxjs';

@Component({
  selector: 'app-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class FieldSelectComponent implements OnDestroy {
  @ViewChild('button') button: ElementRef;
  @Input() label: string;
  @Input() placeholder = 'Select an option';
  @Input() options: string[] = [];

  ngControl = injectNgControl();

  open = false;

  ngOnDestroy() {
    window.removeEventListener('click', this.clickListener.bind(this));
  }

  dropdownToggle() {
    this.open = !this.open;

    if (this.open) {
      this.openOptions();
    } else {
      this.closeOptions();
    }
  }

  openOptions() {
    window.addEventListener('click', this.clickListener.bind(this));
  }

  closeOptions() {
    this.ngControl.control.markAsTouched();
    window.removeEventListener('click', this.clickListener.bind(this));
  }

  private clickListener(event: Event) {
    if (!this.button.nativeElement.contains(event.target) && this.open) {
      timer(1).subscribe(() => {
        this.open = false;
        this.closeOptions();
      });
    }
  }
}
