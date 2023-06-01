import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredFileType(type: string): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    const file = control.value;

    if (!file) {
      return null;
    }

    const extension = file.name.split('.')[1].toLowerCase();

    if (type.toLowerCase() !== extension.toLowerCase()) {
      return {
        invalidExtension: true,
      };
    }

    return null;
  };
}
