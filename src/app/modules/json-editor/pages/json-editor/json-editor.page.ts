import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { JSONType, JSONFieldType } from 'src/app/core/services/json.interface';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.page.html',
  styleUrls: ['./json-editor.page.scss'],
})
export class JsonEditorPage {
  form = new FormArray<JSONFieldType>([
    new FormGroup({
      key: new FormControl<string>('', { validators: Validators.required }),
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    }),
  ]);

  log() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

  addItem() {
    this.form.push(
      new FormGroup({
        key: new FormControl<string>('', { validators: Validators.required }),
        type: new FormControl<JSONType>(null, { validators: Validators.required }),
      })
    );
  }

  removeItem(index: number) {
    if (index === 0) {
      return;
    }

    this.form.removeAt(index);
  }
}
