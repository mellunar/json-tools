import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface JSONObject {
  [key: string]: string | number | boolean | null | FormGroup | FormArray | {} | [];
}

export type JSONType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

export type JSONValue = string | number | boolean | FormGroup | FormArray | {} | [];

export type JSONFieldType = FormGroup<JSONFieldInterface>;

export interface JSONFieldInterface {
  key: FormControl<string>;
  type: FormControl<JSONType>;
  value?: FormControl<JSONValue>;
}
