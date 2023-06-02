import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { JSONFieldInterface, JSONFieldType, JSONType, JSONValue } from 'src/app/core/services/json/json.interface';
import { Subscription } from 'rxjs';
import { JsonService } from 'src/app/core/services/json/json.service';

@Component({
  selector: 'app-json-field',
  templateUrl: './json-field.component.html',
  styleUrls: ['./json-field.component.scss'],
})
export class JsonFieldComponent implements OnInit, OnDestroy {
  formGroup: JSONFieldType;

  typeOptions: JSONType[] = ['string', 'number', 'boolean', 'array', 'object', 'empty-array', 'empty-object'];

  configSubscription$: Subscription;

  constructor(private formGroupDirective: FormGroupDirective, private jsonService: JsonService) {}

  ngOnInit() {
    this.formGroup = this.formGroupDirective.form;

    this.configSubscription$ = this.formGroup.get('type').valueChanges.subscribe((type) => {
      const value = this.formGroup.get('value');

      if (value) {
        this.formGroup.removeControl('value');
      }

      const control = this.jsonService.getControl(type);

      this.formGroup.addControl('value', control);
    });
  }

  ngOnDestroy() {
    if (this.configSubscription$) {
      this.configSubscription$.unsubscribe();
    }
  }

  addItem() {
    const newItem = new FormGroup({
      key: new FormControl<string>('', { validators: Validators.required }),
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });

    (this.formGroup.get('value').value as FormArray).push(newItem);
  }

  removeItem(index: number) {
    (this.formGroup.get('value').value as FormArray).removeAt(index);
  }
}
