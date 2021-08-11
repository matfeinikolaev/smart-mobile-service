import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryPage } from './entry.page';

const routes: Routes = [
  {
    path: '',
    component: EntryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryPageRoutingModule {}
