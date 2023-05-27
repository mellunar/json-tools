import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { JSONFieldInterface, JSONFieldType, JSONType, JSONValue } from 'src/app/core/services/json.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-json-field',
  templateUrl: './json-field.component.html',
  styleUrls: ['./json-field.component.scss'],
})
export class JsonFieldComponent implements OnInit, OnDestroy {
  formGroup: JSONFieldType;

  typeOptions: JSONType[] = ['string', 'number', 'boolean', 'array', 'object', 'empty-array', 'empty-object'];

  configSubscription$: Subscription;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.formGroup = this.formGroupDirective.form;

    this.configSubscription$ = this.formGroup.get('type').valueChanges.subscribe((type) => {
      this.setControl(type);
    });
  }

  ngOnDestroy() {
    if (this.configSubscription$) {
      this.configSubscription$.unsubscribe();
    }
  }

  addItem() {
    let newItem;

    if (this.formGroup.value.type === 'object') {
      newItem = new FormGroup({
        key: new FormControl<string>('', { validators: Validators.required }),
        type: new FormControl<JSONType>(null, { validators: Validators.required }),
      });
    } else if (this.formGroup.value.type === 'array') {
      newItem = new FormArray([]);
    }

    (this.formGroup.get('value').value as FormArray).push(newItem);
  }

  removeItem(index: number) {
    if (index === 0) {
      return;
    }

    (this.formGroup.get('value').value as FormArray).removeAt(index);
  }

  private setControl(type: JSONType) {
    const value = this.formGroup.get('value');

    if (value) {
      this.formGroup.removeControl('value');
    }

    switch (type) {
      case 'string': {
        this.formGroup.addControl('value', new FormControl<string>(''));
        break;
      }
      case 'number': {
        this.formGroup.addControl(
          'value',
          new FormControl<number>(null, { validators: Validators.pattern(/^\d+(\.\d+)?$/g) })
        );
        break;
      }
      case 'boolean': {
        this.formGroup.addControl('value', new FormControl<boolean>(false));
        break;
      }
      case 'object': {
        this.formGroup.addControl('value', new FormControl<FormArray>(new FormArray([])));

        (this.formGroup.get('value').value as FormArray).push(
          new FormGroup<JSONFieldInterface>({
            key: new FormControl<string>('', { validators: Validators.required }),
            type: new FormControl<JSONType>(null, { validators: Validators.required }),
          })
        );

        break;
      }
      case 'array': {
        this.formGroup.addControl('value', new FormControl<FormArray>(new FormArray([])));
        break;
      }
      case 'empty-object': {
        this.formGroup.addControl('value', new FormControl<any>({}));
        break;
      }
      case 'empty-array': {
        this.formGroup.addControl('value', new FormControl<any>([]));
        break;
      }
    }
  }
}
