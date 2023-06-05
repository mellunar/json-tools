import { Injectable } from '@angular/core';
import { JSONFieldInterface, JSONType } from './json.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  convertUnicodeToChar(str: string) {
    return str.replace(/\\u([\dA-F]{4})/gi, function (match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
  }

  escapeControlCharacters(rawJson: string) {
    return this.convertUnicodeToChar(rawJson).replace(/[\u0000-\u001F]/g, function (match) {
      return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).slice(-4);
    });
  }

  getControl(type: JSONType, value?: any): FormControl {
    // null
    switch (type) {
      case 'string':
        return new FormControl<string>(value ? value : '');
      case 'number':
        return new FormControl<number>(value || value === 0 ? value : null, {
          validators: Validators.pattern(/^\d+(\.\d+)?$/g),
        });
      case 'boolean':
        return new FormControl<boolean>(value ? value : false);
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
      case 'null':
        return new FormControl<null>(null);
    }
  }
}
