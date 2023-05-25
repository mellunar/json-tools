import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';

@NgModule({
  declarations: [FieldInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldInputComponent],
})
export class SharedModule {}
