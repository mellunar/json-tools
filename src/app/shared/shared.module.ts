import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { FeatherIconsModule } from '../modules/feather-icons/feather-icons.module';
import { FieldSelectComponent } from './components/field-select/field-select.component';
import { FieldToggleComponent } from './components/field-toggle/field-toggle.component';
import { FieldFileComponent } from './components/field-file/field-file.component';
import { JsonFieldComponent } from './components/json-field/json-field.component';
import { ArrayFieldComponent } from './components/array-field/array-field.component';
import { FieldTextareaComponent } from './components/field-textarea/field-textarea.component';
import { ArrayRowFieldComponent } from './components/array-row-field/array-row-field.component';

@NgModule({
  declarations: [
    FieldInputComponent,
    FieldSelectComponent,
    FieldToggleComponent,
    FieldFileComponent,
    JsonFieldComponent,
    ArrayFieldComponent,
    FieldTextareaComponent,
    ArrayRowFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FeatherIconsModule],
  exports: [
    FieldInputComponent,
    FieldSelectComponent,
    FieldToggleComponent,
    FieldFileComponent,
    JsonFieldComponent,
    ArrayFieldComponent,
    FieldTextareaComponent,
    ArrayRowFieldComponent,
  ],
})
export class SharedModule {}
