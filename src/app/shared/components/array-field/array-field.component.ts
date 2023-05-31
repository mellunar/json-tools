import { Component, Input, OnInit } from '@angular/core';
import { ValueAccessorDirective, injectNgControl } from '../../directives/value-accessor.directive';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JSONType } from 'src/app/core/services/json/json.interface';

@Component({
  selector: 'app-array-field',
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class ArrayFieldComponent implements OnInit {
  ngControl = injectNgControl();

  ngOnInit() {
    this.addItem();
  }

  addItem() {
    this.ngControl.value.push(
      new FormGroup({
        type: new FormControl<JSONType>(null, { validators: Validators.required }),
        value: new FormControl<string>(null),
      })
    );
  }

  removeItem(index: number) {
    if (index === 0) {
      return;
    }

    this.ngControl.value.removeAt(index);
  }
}
