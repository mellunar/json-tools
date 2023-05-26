import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { FeatherIconsModule } from '../modules/feather-icons/feather-icons.module';
import { FieldSelectComponent } from './components/field-select/field-select.component';

@NgModule({
  declarations: [FieldInputComponent, FieldSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, FeatherIconsModule],
  exports: [FieldInputComponent, FieldSelectComponent],
})
export class SharedModule {}
