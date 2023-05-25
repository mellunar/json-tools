import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonEditorPage } from './pages/json-editor/json-editor.page';

const routes: Routes = [{ path: '', component: JsonEditorPage, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsonEditorRoutingModule {}
