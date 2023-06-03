import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { JSONType, JSONValue } from 'src/app/core/services/json/json.interface';
import { JsonService } from 'src/app/core/services/json/json.service';

@Component({
  selector: 'app-array-row-field',
  templateUrl: './array-row-field.component.html',
  styleUrls: ['./array-row-field.component.scss'],
})
export class ArrayRowFieldComponent implements OnInit, OnDestroy {
  @Output() remove = new EventEmitter();

  formGroup: FormGroup<{
    type: FormControl<JSONType>;
    value: FormControl<JSONValue>;
  }>;

  typeOptions: JSONType[] = ['string', 'number', 'boolean', 'array', 'object', 'empty-array', 'empty-object'];

  typeSubscription$: Subscription;

  constructor(private formGroupDirective: FormGroupDirective, private jsonService: JsonService) {}

  ngOnInit() {
    this.formGroup = this.formGroupDirective.form;

    const preSetType = this.formGroup.get('type').value;

    if (preSetType) {
      this.setValueControl(preSetType);
    }

    this.typeSubscription$ = this.formGroup.get('type').valueChanges.subscribe((type) => {
      const value = this.formGroup.get('value');

      if (value) {
        this.formGroup.removeControl('value');
      }

      this.setValueControl(type);
    });
  }

  ngOnDestroy() {
    if (this.typeSubscription$) {
      this.typeSubscription$.unsubscribe();
    }
  }

  callRemove() {
    this.remove.emit();
  }

  addItem() {
    const newItem = new FormGroup({
      key: new FormControl<string>('', { validators: Validators.required }),
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });

    timer(1).subscribe(() => {
      let formArray = this.formGroup.get('value').value as FormArray;

      if (!formArray) {
        const type = this.formGroup.get('type').value;
        this.formGroup.removeControl('value');
        this.setValueControl(type);
        formArray = this.formGroup.get('value').value as FormArray;
      }

      if (formArray.value.length > 0) {
        const firstType = formArray.value[0].type;
        newItem.get('type').setValue(firstType);
      }

      formArray.push(newItem);
    });
  }

  removeItem(index: number) {
    (this.formGroup.get('value').value as FormArray).removeAt(index);
  }

  private setValueControl(type: JSONType) {
    const control = this.jsonService.getControl(type);

    this.formGroup.addControl('value', control);
  }
}
