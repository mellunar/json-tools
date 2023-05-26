import { Component, Input } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-field-toggle',
  templateUrl: './field-toggle.component.html',
  styleUrls: ['./field-toggle.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class FieldToggleComponent {
  @Input() label = 'Value';

  ngControl = injectNgControl();
}
