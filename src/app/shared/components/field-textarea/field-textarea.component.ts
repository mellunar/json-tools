import { Component, Input } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-field-textarea',
  templateUrl: './field-textarea.component.html',
  styleUrls: ['./field-textarea.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class FieldTextareaComponent {
  @Input() compact = true;
  @Input() label: string;
  @Input() noPadding = false;

  ngControl = injectNgControl();
}
