import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorRoutingModule } from './json-editor-routing.module';
import { JsonEditorPage } from './pages/json-editor/json-editor.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';

@NgModule({
  declarations: [JsonEditorPage],
  imports: [CommonModule, JsonEditorRoutingModule, SharedModule, ReactiveFormsModule, FeatherIconsModule],
})
export class JsonEditorModule {}
