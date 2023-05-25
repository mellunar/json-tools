import { Component, Input } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class FieldInputComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: 'text' | 'number' = 'text';

  ngControl = injectNgControl();
}
