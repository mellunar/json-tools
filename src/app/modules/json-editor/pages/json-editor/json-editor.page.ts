import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.page.html',
  styleUrls: ['./json-editor.page.scss'],
})
export class JsonEditorPage {
  form = new FormGroup({
    test: new FormControl('', { validators: [Validators.required] }),
    options: new FormControl('', { validators: [Validators.required] }),
    toggle: new FormControl<boolean>(false),
  });
}
