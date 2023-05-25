import { Directive, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ValueAccessorDirective,
    },
  ],
})
export class ValueAccessorDirective implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (!ngControl) throw new Error('Form Control not found');

  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  }

  throw new Error('Form Control is not valid');
}
