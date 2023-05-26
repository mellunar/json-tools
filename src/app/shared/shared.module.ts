import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { FeatherIconsModule } from '../modules/feather-icons/feather-icons.module';

@NgModule({
  declarations: [FieldInputComponent],
  imports: [CommonModule, ReactiveFormsModule, FeatherIconsModule],
  exports: [FieldInputComponent],
})
export class SharedModule {}
