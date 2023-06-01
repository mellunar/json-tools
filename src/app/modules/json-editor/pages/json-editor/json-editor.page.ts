import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { JSONType, JSONFieldType, JSONObject } from 'src/app/core/services/json/json.interface';
import { ModalService } from 'src/app/modules/modal/state/modal.service';
import { ToastService } from 'src/app/modules/toast/state/toast.service';
import { SaveOptionsModal } from '../../modals/save-options/save-options.modal';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.page.html',
  styleUrls: ['./json-editor.page.scss'],
})
export class JsonEditorPage {
  form = new FormArray<JSONFieldType>([]);
  emptyItem: JSONFieldType;

  constructor(private toastService: ToastService, private modalService: ModalService) {
    this.emptyItem = new FormGroup({
      key: new FormControl<string>('', { validators: Validators.required }),
      type: new FormControl<JSONType>(null, { validators: Validators.required }),
    });

    this.addItem();
  }

  addItem() {
    this.form.push(this.emptyItem);
  }

  removeItem(index: number) {
    if (index === 0) {
      return;
    }

    this.form.removeAt(index);
  }

  resetForm() {
    this.form = new FormArray<JSONFieldType>([this.emptyItem]);
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

    return finalJson;
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

    formArray.forEach((arrayItem) => {
      const value = this.getValueFromItem(arrayItem);
      finalArray.push(value);
    });

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
      case 'empty-object':
        return {};
      case 'empty-array':
        return [];
    }
  }
}
