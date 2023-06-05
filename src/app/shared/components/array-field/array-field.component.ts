import { Component } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JSONType } from 'src/app/core/services/json/json.interface';
import { timer } from 'rxjs';
import { JsonService } from 'src/app/core/services/json/json.service';

@Component({
  selector: 'app-array-field',
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class ArrayFieldComponent {
  ngControl = injectNgControl();

  constructor(private jsonService: JsonService) {}

  addItem() {
    const newItem: FormGroup = new FormGroup({
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });

    timer(1).subscribe(() => {
      const formArray = this.ngControl?.value?.value;

      if (formArray.length > 0 && formArray[0].type) {
        const firstType = formArray[0].type;
        const value = this.jsonService.getControl(firstType);

        newItem.get('type').setValue(firstType);
        newItem.addControl('value', value);
      }

      if (!newItem.value?.value) {
        newItem.addControl('value', new FormControl<string>(null));
      }

      this.ngControl.value.push(newItem);
    });
  }

  removeItem(index: number) {
    this.ngControl.value.removeAt(index);
  }
}
