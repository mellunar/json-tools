import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JSONType, JSONValue } from 'src/app/core/services/json/json.interface';
import { JsonService } from 'src/app/core/services/json/json.service';

@Component({
  selector: 'app-array-row-field',
  templateUrl: './array-row-field.component.html',
  styleUrls: ['./array-row-field.component.scss'],
})
export class ArrayRowFieldComponent implements OnInit, OnDestroy {
  formGroup: FormGroup<{
    type: FormControl<JSONType>;
    value: FormControl<JSONValue>;
  }>;

  typeOptions: JSONType[] = ['string', 'number', 'boolean', 'array', 'object', 'empty-array', 'empty-object'];

  typeSubscription$: Subscription;

  constructor(private formGroupDirective: FormGroupDirective, private jsonService: JsonService) {}

  ngOnInit() {
    this.formGroup = this.formGroupDirective.form;

    this.typeSubscription$ = this.formGroup.get('type').valueChanges.subscribe((type) => {
      const value = this.formGroup.get('value');

      if (value) {
        this.formGroup.removeControl('value');
      }

      const control = this.jsonService.getControl(type);

      this.formGroup.addControl('value', control);
    });
  }

  ngOnDestroy() {
    if (this.typeSubscription$) {
      this.typeSubscription$.unsubscribe();
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
