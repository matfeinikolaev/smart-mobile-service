import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadReportPage } from './download-report.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadReportPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadReportPageRoutingModule {}
