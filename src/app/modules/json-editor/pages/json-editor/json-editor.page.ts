import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { JSONType, JSONFieldType, JSONObject, JSONValue } from 'src/app/core/services/json/json.interface';
import { ModalService } from 'src/app/modules/modal/state/modal.service';
import { ToastService } from 'src/app/modules/toast/state/toast.service';
import { SaveOptionsModal } from '../../modals/save-options/save-options.modal';
import { Subscription, timer } from 'rxjs';
import { requiredFileType } from 'src/app/core/validators/extension.validator';
import { JsonService } from 'src/app/core/services/json/json.service';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.page.html',
  styleUrls: ['./json-editor.page.scss'],
})
export class JsonEditorPage implements OnInit, OnDestroy {
  form = new FormArray<JSONFieldType>([]);
  fileForm = new FormGroup({
    file: new FormControl<File>(null, { validators: [requiredFileType('json')] }),
  });

  fileSubscription: Subscription;

  constructor(
    private toastService: ToastService,
    private modalService: ModalService,
    private jsonService: JsonService
  ) {}

  ngOnInit() {
    this.addItem();
    this.fileSubscription = this.fileForm.get('file').valueChanges.subscribe((file) => {
      // bug on change detection when subscribing to field with custom validation
      timer(1).subscribe(() => this.loadFile(file));
    });
  }

  ngOnDestroy() {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
  }

  addItem() {
    this.form.push(this.getEmptyControl());
  }

  removeItem(index: number) {
    this.form.removeAt(index);
  }

  resetForm() {
    this.form = new FormArray<JSONFieldType>([this.getEmptyControl()]);
  }

  async openJsonFileOptions() {
    if (this.form.invalid) {
      return;
    }

    const modal = this.modalService.create(SaveOptionsModal);

    await modal.onDismiss.then((data: any) => {
      if (data) {
        const finalJson = this.generateJsonFromForm(data.indentation, data.spaces);

        const tempFile = new File([finalJson], `${data.name}.json`, { type: 'application/json' });

        saveAs(tempFile);
      }
    });
  }

  private getJsonIndentation(type: string, spaces: number): any {
    switch (type) {
      case 'none':
        return null;
      case 'tabs':
        return '\t';
      case 'spaces':
        return Number(spaces);
    }
  }

  private generateJsonFromForm(type: string, spaces: number) {
    if (this.form.invalid) {
      return null;
    }

    let indentation = this.getJsonIndentation(type, spaces);

    const finalObject = this.getObjectFromArray(this.form.value);
    const finalJson = JSON.stringify(finalObject, null, indentation);

    return finalJson.replace(/\\\\/gm, '\\');
  }

  private getObjectFromArray(formArray: any[]) {
    const finalObject: JSONObject = {};

    formArray.forEach((arrayItem) => {
      if (!finalObject[arrayItem.key]) {
        const value = this.getValueFromItem(arrayItem);
        finalObject[arrayItem.key] = value;
      }
    });

    return finalObject;
  }

  private getArrayFromArray(formArray: any[]) {
    const finalArray: JSONType[] = [];

    if (formArray.length > 0) {
      formArray.forEach((arrayItem) => {
        const value = this.getValueFromItem(arrayItem);
        finalArray.push(value);
      });
    }

    return finalArray;
  }

  private getValueFromItem(item: { key: string; type: JSONType; value: any }) {
    switch (item.type) {
      case 'string':
        return item.value;
      case 'number': {
        const result = Number(item.value);
        return isNaN(result) ? '' : result;
      }
      case 'boolean':
        return item.value;
      case 'object': {
        if (item.value.invalid) {
          this.toastService.error(
            `Object with key "${item.key}" is not valid. JSON file will be generated with missing data.`
          );
        }
        return this.getObjectFromArray(item.value.value);
      }
      case 'array': {
        {
          if (item.value.invalid) {
            this.toastService.error(
              `Array with key "${item.key}" is not valid. JSON file will be generated with missing data.`
            );
          }
          return this.getArrayFromArray(item.value.value);
        }
      }
    }
  }

  private getEmptyControl() {
    return new FormGroup({
      key: new FormControl<string>('', { validators: Validators.required }),
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });
  }

  private loadFile(file: File) {
    if (this.fileForm.invalid) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      let jsonData: { [key: string]: any };

      try {
        jsonData = JSON.parse(event.target.result as string);
      } catch (_) {
        const escapedJson = this.jsonService.escapeControlCharacters(event.target.result as string);
        jsonData = JSON.parse(escapedJson as string);
      }

      if (!jsonData || Object.keys(jsonData).length < 1) {
        return;
      }

      const keys = Object.keys(jsonData);

      const groups = keys.map((key) => this.createFieldFromJson(jsonData[key], key));

      this.form = new FormArray(groups);
    };

    reader.readAsText(file);
  }

  private createFieldFromJson(value: any, key?: string) {
    const control: FormGroup = new FormGroup({
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });

    if (key) {
      control.addControl('key', new FormControl<string>(key, { validators: Validators.required }));
    }

    if (typeof value === 'string') {
      const valueControl = this.jsonService.getControl('string', value);
      control.get('type').setValue('string');
      control.addControl('value', valueControl);
    } else if (typeof value === 'number') {
      const valueControl = this.jsonService.getControl('number', value);
      control.get('type').setValue('number');
      control.addControl('value', valueControl);
    } else if (typeof value === 'boolean') {
      const valueControl = this.jsonService.getControl('boolean', value);
      control.get('type').setValue('boolean');
      control.addControl('value', valueControl);
    } else if (value === null || value === undefined) {
      const valueControl = this.jsonService.getControl('null', value);
      control.get('type').setValue('null');
      control.addControl('value', valueControl);
    } else if (Array.isArray(value) && value.length < 1) {
      const valueControl = this.jsonService.getControl('array');
      control.get('type').setValue('array');
      control.addControl('value', valueControl);
    } else if (Array.isArray(value)) {
      const valueControl = this.jsonService.getControl('array');
      control.get('type').setValue('array');
      control.addControl('value', valueControl);

      value.forEach((item) => {
        const itemControl = this.createFieldFromJson(item);
        (control.get('value').value as FormArray).push(itemControl);
      });
    } else if (typeof value === 'object' && Object.keys(value).length < 1) {
      const valueControl = this.jsonService.getControl('array');
      control.get('type').setValue('object');
      control.addControl('value', valueControl);
    } else if (typeof value === 'object') {
      // get an empty array
      const valueControl = this.jsonService.getControl('array');
      control.get('type').setValue('object');
      control.addControl('value', valueControl);

      const objKeys = Object.keys(value);
      objKeys.forEach((objKey) => {
        const keyControl = this.createFieldFromJson(value[objKey], objKey);
        (control.get('value').value as FormArray).push(keyControl);
      });
    }

    return control;
  }
}
