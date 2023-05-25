import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorRoutingModule } from './json-editor-routing.module';
import { JsonEditorPage } from './pages/json-editor/json-editor.page';

@NgModule({
  declarations: [JsonEditorPage],
  imports: [CommonModule, JsonEditorRoutingModule],
})
export class JsonEditorModule {}
