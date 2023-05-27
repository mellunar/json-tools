import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { FeatherIconsModule } from '../modules/feather-icons/feather-icons.module';
import { FieldSelectComponent } from './components/field-select/field-select.component';
import { FieldToggleComponent } from './components/field-toggle/field-toggle.component';
import { FieldFileComponent } from './components/field-file/field-file.component';
import { JsonFieldComponent } from './components/json-field/json-field.component';

@NgModule({
  declarations: [
    FieldInputComponent,
    FieldSelectComponent,
    FieldToggleComponent,
    FieldFileComponent,
    JsonFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FeatherIconsModule],
  exports: [
    FieldInputComponent,
    FieldSelectComponent,
    FieldToggleComponent,
    FieldFileComponent,
    JsonFieldComponent,
  ],
})
export class SharedModule {}
