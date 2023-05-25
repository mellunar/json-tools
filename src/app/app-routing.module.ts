import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'json-editor', pathMatch: 'full' },
  {
    path: 'json-editor',
    loadChildren: () => import('./modules/json-editor/json-editor.module').then((m) => m.JsonEditorModule),
  },
  { path: '**', redirectTo: 'json-editor' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
