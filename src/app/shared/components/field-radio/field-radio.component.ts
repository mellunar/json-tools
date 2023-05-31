import { Component, Input } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-field-radio',
  templateUrl: './field-radio.component.html',
  styleUrls: ['./field-radio.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class FieldRadioComponent {
  @Input() label: string;
  @Input() value: any;

  ngControl = injectNgControl();
}
