import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { FeatherModule } from 'angular-feather';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Check,
  ChevronDown,
  Delete,
  Download,
  Edit,
  Plus,
  X,
} from 'angular-feather/icons';

const icons = {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Check,
  ChevronDown,
  Delete,
  Download,
  Edit,
  Plus,
  X,
};

@NgModule({
  declarations: [FieldInputComponent],
  imports: [CommonModule, ReactiveFormsModule, FeatherModule.pick(icons)],
  exports: [FieldInputComponent, FeatherModule],
})
export class SharedModule {}
