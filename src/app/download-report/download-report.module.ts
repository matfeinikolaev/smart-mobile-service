import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DownloadReportPage } from './download-report.page';

import { DownloadReportPageRoutingModule } from './download-report-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadReportPageRoutingModule
  ],
  declarations: [DownloadReportPage]
})
export class DownloadReportPageModule {}
