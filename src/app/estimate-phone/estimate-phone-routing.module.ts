import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatePhonePage } from './estimate-phone.page';

const routes: Routes = [
  {
    path: '',
    component: EstimatePhonePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimatePhonePageRoutingModule {}
