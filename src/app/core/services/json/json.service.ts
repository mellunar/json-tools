import { Injectable } from '@angular/core';
import { JSONFieldInterface, JSONType } from './json.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  getControl(type: JSONType): FormControl {
    switch (type) {
      case 'string':
        return new FormControl<string>('');
      case 'number':
        return new FormControl<number>(null, { validators: Validators.pattern(/^\d+(\.\d+)?$/g) });
      case 'boolean':
        return new FormControl<boolean>(false);
      case 'object':
        return new FormControl<FormArray>(
          new FormArray([
            new FormGroup<JSONFieldInterface>({
              key: new FormControl<string>('', { validators: Validators.required }),
              type: new FormControl<JSONType>(null, { validators: Validators.required }),
            }),
          ])
        );
      case 'array':
        return new FormControl<FormArray>(new FormArray([]));
      case 'empty-object':
        return new FormControl<any>({});
      case 'empty-array':
        return new FormControl<any>([]);
    }
  }
}
